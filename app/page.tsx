import Image from "next/image";
import Signin from "./signin/page";
import { redirect } from "next/navigation";

export default function Home() {
  return (
  redirect('/signin')
  );
}
