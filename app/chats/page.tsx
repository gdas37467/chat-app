"use client"
import React, { useEffect } from 'react'
import { supabase } from "@/lib/supabaseClient";
import {useRouter} from 'next/navigation'
function Chat() {
  const router = useRouter()
  useEffect(()=>{
    const authVerify = async () =>{
    const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user)
      if(!user)
      {
        console.log(user)
        router.push('/signin')
      }
    }
    authVerify()
  })
  return (
    <div className="flex items-center justify-center h-full text-gray-400">
      Select a chat to get started
    </div>
  )
}

export default Chat;