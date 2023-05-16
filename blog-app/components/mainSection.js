import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react';
import axios from "axios";

// import { Spinner } from '../components/Spinner';
import { postService } from '../services/postService';

export default function mainSection() {


    // function deleteUser(id) {
    //     setUsers(users.map(x => {
    //         if (x.id === id) { x.isDeleting = true; }
    //         return x;
    //     }));
    //     userService.delete(id).then(() => {
    //         setUsers(users => users.filter(x => x.id !== id));
    //     });
    // }  

    return (
        <section className="container mx-auto md:px-20 py-10">
            <h1 className="font-bold text-4xl py-12 text-center"> Blog Posts</h1>

            {/* grid clounms */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
                {Post()}
            </div>
        </section>
    )
}


function Post() {

    const [posts, setPosts] = useState(null);

    const [formattedDateString, setFormattedDateString] = useState("");


    useEffect(() => {
        postService.getAllposts().then(x => setPosts(x.posts));

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/posts/");
                const createdAt = response.data.posts[0].createdAt;
                const date = new Date(createdAt);
                const formattedDate = date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
                setFormattedDateString(formattedDate.toString());
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, []);

    console.log("ffwf", posts)


    return (
        <>{posts && posts.map(post =>
            <div className="item">
                <div className="image">
                    <Link href={`/posts/${post._id}`}>
                        <img className="w-[400px] h-[300px] object-cover bg-cover rounded-md" src={post.postImg} />
                    </Link>
                </div>
                <div className="info flex justify-center flex-col py-4">
                    <div className="cat">
                        <a className="text-orange-600 hover:text-orange-800">Travel</a>
                        <a className="text-gray-600 hover:text-gray-800">-{formattedDateString}</a>
                    </div>
                    <div className="title">
                        <Link href={"/"} className="text-xl font-bold text-gray-800 hover-gray-600">{post.title}</Link>
                    </div>
                    <p className="text-gray-500 py-3">
                        {post.content}
                    </p>
                    {post.postedBy.map((subObj) => (
                        <a className="text-md font-bold text-gray-600">
                            {subObj.name}
                        </a>
                    ))}
                    {post.postedBy.map((subObj) => (
                        <a className="text-sm text-gray-500">{subObj.username}</a>
                    ))}
                </div>
            </div>
        )}
        </>
    )
}