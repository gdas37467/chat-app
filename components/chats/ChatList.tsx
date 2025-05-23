'use client'
import React from 'react'

import ChatListItem from './ChatListItem'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import ChatListHeader from './ChatListHeader'
import { RiChatAiLine } from "react-icons/ri";
export interface User{
  created_at : string
  id : string
  name : string
  phone_number : string
}

function  ChatList() {
  const [users , setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Current user:', user)
      setCurrentUser(user as User | null )
      
      if (!user) {
        console.log('No user found')
     
      }

      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .neq('id', user.id)

      console.log('Users:', users)
      console.log('Error:', error)

      if (!error) {
        setUsers( users || [] )
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
     
    }
  }
 
    
    return (
    <div className='w-full overflow-y-scroll relative'>
      <ChatListHeader/>
        {users && users.map((u  )=>{
          return <ChatListItem key={u.id} user={u} currentUser ={currentUser}/>
        })}
        <div className='fixed bottom-10 left-[380px] rounded-full h-8 w-8 bg-green-600 Z-10 flex items-center justify-center'><RiChatAiLine className='text-white'/></div>
    </div>
  )
}

export default ChatList