import React from "react";

import { FaOpera } from "react-icons/fa";

import { MdHome } from "react-icons/md";

import { IoChatbubbleEllipses } from "react-icons/io5";

import { IoTicketSharp } from "react-icons/io5";

import { GoGraph } from "react-icons/go";

import { TfiMenuAlt } from "react-icons/tfi";

import { HiMiniMegaphone } from "react-icons/hi2";

import { IoIosGitNetwork } from "react-icons/io";

import { RiContactsBookFill } from "react-icons/ri";

import { RiFolderImageFill } from "react-icons/ri";

import { MdChecklist } from "react-icons/md";

import { RiSettings5Fill } from "react-icons/ri";

import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

import { TbStarsFilled } from "react-icons/tb";

function Sidebar() {
  return (
    <div className="shadow-1g flex flex-col justify-between h-screen border-0">
      <div className="flex flex-col">
        <div className="w-full mt-2 flex justify-center">
          <FaOpera className="text-3xl text-green-500" />
        </div>

        <div className="mt-5 w-full flex justify-center">
          <MdHome className="text-xl text-gray-500" />
        </div>

        <hr className="mx-3.5 mt-2 text-gray-400 border-1 bg-red-500" />

        <div className="mt-3 w-full flex justify-center">
          <IoChatbubbleEllipses className="text-3xl text-green-500 bg-gray-200 px-1 py-1" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <IoTicketSharp className="text-xl text-gray-500" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <GoGraph className="text-xl text-gray-500" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <TfiMenuAlt className="text-xl text-gray-500" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <HiMiniMegaphone className="text-xl text-gray-500" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <IoIosGitNetwork className="text-xl text-gray-500" />
        </div>

        <hr className="mx-3.5 mt-2 text-gray-400 border-1 bg-red-500" />

        <div className="mt-3 w-full flex justify-center">
          <RiContactsBookFill className="text-xl text-gray-500" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <RiFolderImageFill className="text-xl text-gray-500"  />
        </div>

        <hr className="mx-3.5 mt-2 text-gray-400 border-1 bg-red-500" />

        <div className="mt-3 w-full flex justify-center">
          <MdChecklist className="text-xl text-gray-500" />
        </div>

        <div className="mt-3 w-full flex justify-center">
          <RiSettings5Fill className="text-xl text-gray-500" />
        </div>
      </div>

      <div className="mb-4 py-3">
        <div className="mt-3 w-full flex justify-center">
          <TbStarsFilled className="text-xl text-gray-500" />
        </div>
        <div className="mt-3 w-full flex justify-center">
          <TbLayoutSidebarLeftExpandFilled className="text-xl text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
