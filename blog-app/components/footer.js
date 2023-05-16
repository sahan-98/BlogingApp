import { ImFacebook,ImTwitter,ImYoutube } from "react-icons/im";
import Link from "next/link";


export default function footer(){
    return(
        <footer className="bg-gray-50">
            <div className="py-5">
                <div className="flex gap-6 justify-center">
                <Link href={"/"}>
                      <ImFacebook color="#888888"/>
                    </Link>
                    <Link href={"/"}>
                      <ImTwitter color="#888888"/>
                    </Link>
                    <Link href={"/"}>
                      <ImYoutube color="#888888"/>
                    </Link>   
                </div>

                <p className="py-5 text-gray-400 text-center">Empower your voice, leave a legacy through blogging</p>
            </div>
        </footer>
    )
}