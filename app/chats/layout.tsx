import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/chats/Topbar";
import ChatList from "@/components/chats/ChatList";




async function  ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (
    <div>
      <div className="flex">
        <div className="w-[60px] ">
          <Sidebar />
        </div>

        <div className="w-full">
          <div className="flex flex-col h-screen ">
            <div className="shadow-sm">
              <Topbar />
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="flex flex-1">
                <div className="flex w-1/4 border-gray-800 bg-white flex-col h-full">
                  <ChatList />
                </div>
                <div className="flex-1 flex flex-col h-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
