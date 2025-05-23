import React from "react";

import { RiFolderDownloadFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

function ChatListHeader() {
  return (
    <div className="p-5 shadow-sm bg-gray-50 w-full">
      <div className="flex items-center">
        <span className="mb-0.5">
          <RiFolderDownloadFill className="text-sm mt-1 text-green-500" />
        </span>

        <div className="text-sm ml-1 mt-0.5 text-green-500">Custom filter</div>

        <button className="shadow-sm bg-white px-2 py-1 text-xs ml-3">Save</button>
        <p className="shadow-sm px-2 py-1  bg-white text-xs ml-3 flex">
          <span className="mr-2 mt-0.5">
            <CiSearch />
          </span>
          Search
        </p>
        <p className="shadow-sm px-2 py-1 bg-white text-xs ml-3 flex text-green-500"><span className="mr-2 mt-0.5"><IoFilter/></span>Filtered</p>
      </div>
    </div>
  );
}

export default ChatListHeader;
