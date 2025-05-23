"use client";
import Image from "next/image";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import whatsappDP from "../../assets/whatsapp_dp.jpg";
import AvatarGroup from "./AvatarGroup";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useSearchParams } from "next/navigation";

import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { VscSmiley } from "react-icons/vsc";
import { FaRegClock } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { RiGeminiLine } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender_name: string | null;
};

type CurrentUser = {
  id: string;
};
const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();

  const sender_name = searchParams.get("name");
  const chatId = (
    Array.isArray(params?.chatId) ? params.chatId[0] : undefined
  ) as UUID | undefined;

  console.log(chatId);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      if (!user) {
        console.log(user);
        redirect("/signin");
      }
      console.log("Current user:", user);
      setCurrentUser({ id: user.id });

      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          id,
          content,
          created_at,
          sender_id,
          users:sender_id ( name )
        `
        )
        .eq("chat_id", chatId)
        .order("created_at");

      if (error) console.error(error);
      if (data) {
        console.log(data);
        const typedMessages: Message[] = (
          data as unknown as {
            id: string;
            chat_id: string;
            sender_id: string;
            content: string;
            created_at: string;
            users: { name: string | null } | null;
          }[]
        ).map((msg) => ({
          id: msg.id,
          chat_id: msg.chat_id,
          sender_id: msg.sender_id,
          content: msg.content,
          created_at: msg.created_at,
          sender_name: msg.users?.name ?? "Unknown",
        }));
        setMessages(typedMessages);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel("chat-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMsg = payload.new as Omit<Message, "sender_name">;

          const typedMsg: Message = {
            ...newMsg,
            sender_name:
              newMsg.sender_id === currentUser?.id ? "You" : sender_name,
          };

          setMessages((prev) => [...prev, typedMsg]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, sender_name, currentUser?.id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const { error } = await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: currentUser?.id,
      content: input,
    });
    if (error) {
      console.log(error);
    }
    if (!error) setInput("");
  };
  return (
    <div className="flex flex-col w-full shadow h-full">
      <div className="flex items-center justify-between p-2 bg-white  text-gray-600 rounded-t-lg">
        <div className="flex items-center gap-3">
          <Image
            src={whatsappDP}
            alt="User DP"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-black">{sender_name}</div>
            <div className="text-xs text-gray-400">{`Roshnag Airtel, Roshnag Jio, Bharat Kumar Ramesh, Periscope`}</div>
          </div>
        </div>
        <div className="flex items-center px-3">
          <AvatarGroup />
          <div className="ml-10">
            <span>
              <CiSearch />
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === currentUser?.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col px-4 py-2 rounded-lg text-sm max-w-[70%] ${
                msg.sender_id === currentUser?.id
                  ? "bg-green-200 text-right"
                  : "bg-white shadow"
              }`}
            >
              {!(msg.sender_id === currentUser?.id) && (
                <span className="text-xs text-gray-500 font-medium mb-1">
                  {msg.sender_name}
                </span>
              )}
              <div className="inline-flex flex-col items-start">
                <span className="text-left">{msg.content}</span>
              </div>
              <div className="inline-flex flex-col items-end">
                <span className="text-gray-400 text-xs mt-1">
                  {msg.created_at.slice(11, 16)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center px-3 py-3 bg-white">
        <input
          type="text"
          placeholder="Message..."
          className="flex-1  w-full  px-4 py-2 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 text-green-600 hover:text-green-800"
        >
          <IoSend size={20} />
        </button>
      </div>
      <div className="flex items-center px-6 pb-3 pt-1 bg-white justify-between">
        <div className="flex justify-start">
          <span className="mr-4 text-sm">
            <GrAttachment />
          </span>
          <span className="mr-4 text-sm">
            <VscSmiley />
          </span>
          <span className="mr-4 text-sm">
            <FaRegClock />
          </span>
          <span className="mr-4 text-sm">
            <FaClockRotateLeft />
          </span>
          <span className="mr-4 text-sm">
            <RiGeminiLine />
          </span>
          <span className="mr-4 text-sm">
            <FaMicrophone />
          </span>
          <span className="mr-4 text-sm">
            <GrAttachment />
          </span>
        </div>
        <div className="flex px-4 py-1 pr-2 bg-white shadow-sm">
          <span className="text-sm mr-10">Periscope</span>
          <div className="">
            <span className="text-[10px]">
              <IoIosArrowUp />
            </span>
            <span className="text-[10px]">
              <IoIosArrowDown />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
