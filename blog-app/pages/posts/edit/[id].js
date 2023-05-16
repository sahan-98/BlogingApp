import Format from "../../../layout/format"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function postUpdate(){


    const  id  = useParams();
    const router = useRouter();

    console.log('asada' ,router.query.id )
    
    const [title, setTopic] = useState("");
    const [content, setBody] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/api/v1/posts/${router.query.id}`, {
            method: "GET",
            // headers: {
            //     "Authorization": "Bearer " + localStorage.getItem("jwt")
            // }
        })
            .then((response) => response.json())
            .then((data) => {
                setTopic(data.title);
                setBody(data.content);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);


    
    
    return(
        <Format>
           <div className="flex flex-col items-center md:flex-row md:h-screen">
                <div className="flex items-center justify-center w-full md:w-1/2">
                    <Image src="/images/image3.png" alt="Login Image" width={640} height={600} />
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full bg-gray-200">
                    <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold">Update Post details</h1>
                        <p className="mt-2 text-gray-600">
                        Please give to your post details.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div>
                        <label htmlFor="title" className="block font-bold text-gray-700">
                            Post Title
                        </label>
                        <input
                            id="title"
                            type="title"
                            className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            required
                            value={title}
                            onChange={(event) => setTopic(event.target.value)}
                        />
                        </div>
                        <div>
                        <label htmlFor="content" className="block font-bold text-gray-700">
                            Content
                        </label>
                        <input
                            id="content"
                            type="content"
                            className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            required
                            value={content}
                            onChange={(event) => setTopic(event.target.value)}
                        />
                        </div>
                        {/* <div>
                        <label htmlFor="email" className="block font-bold text-gray-700">
                            Add a Image
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            required
                        />
                        </div> */}
                        <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                        >
                            Update
                            </button>
                            </div>   
                        </form> 
                        <p className="mt-3 text-sm text-center text-gray-700">
                            Do not want to update post?{" "}
                            <Link href={"http://localhost:3000/home"} className="font-medium text-red-600 hover:underline">
                                Cancel
                            </Link>
                        </p>    
                    </div>
                </div>
            </div>
        </Format>
    )
}