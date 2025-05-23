"use client";

import { IoChatbubbleEllipses } from "react-icons/io5";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuRefreshCcwDot } from "react-icons/lu";


function Topbar() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Optionally redirect to login page
    router.push("/signin");
  };
  return (
    <div className="flex justify-between p-2 ">
      <div className="flex  justify-start  ">
        <IoChatbubbleEllipses className="text-gray-400 pt-0.5 mt-0.5" />

        <p className="ml-1 text-sm">chats</p>
      </div>
      <div className="flex justify-start items-center">
        <p className="flex items-center px-2 py-1 text-sm shadow-sm mr-3"><span className="mr-2 text-sm"><LuRefreshCcwDot/></span>Refresh</p>
        <p></p>
        <p></p>
        <p></p>
        <div className="flex px-4 py-1 pr-2 bg-white shadow-sm mr-3">
          <span className="text-sm mr-5">5/6 Phones</span>
          <div className="">
            <span className="text-[10px]">
              <IoIosArrowUp />
            </span>
            <span className="text-[10px]">
              <IoIosArrowDown />
            </span>
          </div>
        </div>
        <button className="px-3 py-1 shadow-sm hover:bg-green-300" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
