import { ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";
import Link from "next/link";
import { useState } from "react";
import { userService } from "@/services/userServices";
import { useRouter } from 'next/router'


export default function header() {
  const router = useRouter()
  return (
    <header className="bg-gray-50">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
        <div className="md:flex-none order-2 sm:order-1 flex justify-center py-4 sm:py-0 pl-10">
          <input type="text" className="input-text" placeholder="Search..." />
        </div>
        <div className="shrink sm:order-2 flex justify-center">
          <Link href={"/home"} className="font-bold uppercase text-3xl  flex justify-center">
            The Blogger
          </Link>
        </div>
        <div className="flex justify-end order-3 gap-6 pr-10">

          <button className="bg-gray-500 hover:bg-gray-700 text-white font- text-center py-1 px-5 rounded"
            onClick={() => router.push("/posts/postCreate")}
          >
            Add a new post
          </button>
          <button onClick={userService.logout}  className="btn btn-link nav-item nav-link bg-red-500 font- text-white hover:bg-red-700">
            Logout
          </button>

        </div>
      </div>
    </header>
  )
}
