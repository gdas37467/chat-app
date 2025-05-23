"use client";

import React from "react";
import whatsappDP from "../../assets/whatsapp_dp.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
interface User {
  created_at: string;
  id: string;
  name: string;
  phone_number: string;
}

interface ChatListItemProps {
  user: User;
  currentUser: User | null;
}

function ChatListItem({ user, currentUser }: ChatListItemProps) {
  const router = useRouter();
  const handleClick = async () => {
    console.log("hi");
    const { data: userChats } = await supabase
      .from("chat_members")
      .select("chat_id")
      .eq("user_id", user.id);
    const { data: currentUserChats } = await supabase
      .from("chat_members")
      .select("chat_id")
      .eq("user_id", currentUser?.id);

    const chatSet1 = new Set(userChats?.map((c) => c.chat_id));

    const sharedChat = currentUserChats?.find((c) => chatSet1.has(c.chat_id));

    if (sharedChat) {
      console.log("Shared chat : ", sharedChat.chat_id);
      router.push(
        `/chats/${sharedChat.chat_id}?name=${encodeURIComponent(user.name)}`
      );
    } else {
      console.log("No shared Chat");
      const { data: newChat, error: error4 } = await supabase
        .from("chats")
        .insert([{ is_group: false }])
        .select()
        .single();

      if (error4) {
        console.log(error4);
      }
      if (newChat) {
        console.log(newChat);
        const { error: error5 } = await supabase.from("chat_members").insert([
          { chat_id: newChat.id, user_id: user.id },
          { chat_id: newChat.id, user_id: currentUser?.id },
        ]);

        if (error5) {
          console.log(error5);
        } else {
          console.log("succefully created chat");
          router.push(
            `/chats/${newChat.id}/?name=${encodeURIComponent(user.name)}`
          );
        }
      }
    }

    // Create a new chat if it doesn't exist
    // const { data: newChat, error: createError } = await supabase
    //   .from("chats")
    //   .insert([{ user_id_1: user.id, user_id_2: currentUser?.id }])
    //   .single();

    // if (createError) {
    //   console.log(createError);
    // }
    // if (newChat) {
    //   console.log(newChat);
    // }
  };
  return (
    <div
      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={whatsappDP}
        alt="User DP"
        className="w-12 h-12 rounded-full object-cover"
      />
      {/* <span className="w-12 h-12 rounded-full object-cover">
    SP
  </span> */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start">
          <span className=" text-gray-900">{user.name} </span>
          <span className="px-2 text-xs py-0.5 bg-red-200">{`Demo`}</span>
        </div>
        <span className="text-sm text-gray-500">Hey! How are you?...</span>
        <div className="flex justify-between items-start mt-2">
          <span className="text-xs px-2 py-0.5 text-gray-600 bg-gray-200 rounded-sm">
            {user.phone_number}
            <span className="ml-2">+1</span>
          </span>
          <span className="px-2 text-xs py-0.5 text-gray-600">26-11-2005</span>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
