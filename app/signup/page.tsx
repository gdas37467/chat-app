"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log(data);
    console.log('error ' + error)
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      const {error} = await supabase.from('users').insert({ id: data.user?.id, name , phone_number : phone })
      if(error) 
      {
        console.log(error)
      }
      console.log("sign up successfull");
      
      router.push("/chats");
    }
  };
  console.log(error)
  return (
    <div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign up</div>
            </div>
            <div className="pt-2">
                <LabelledInput
                label="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type={"name"}
                placeholder="Gourab Das"
              />
              <LabelledInput
                label="Email"
                type={"email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="gdas@gmail.com"
              />
              <LabelledInput
                label="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type={"phone number"}
                placeholder="9000000000"
              />
              <LabelledInput
                label="Password"
                value={password}
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="123456"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Sign up
              </button>
            </div>
            <div className="pt-2 flex justify-center">
              <Link
                href={`/signin`}
                className="mt-6 w-full text-gray-800 mb-2 text-sm text-center underline"
              >
                Already a User?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  value,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default SignUp;
