import Format from "@/layout/format"
import Image from "next/image"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postService } from '../../services/postService';
import { alertService } from '../../services/alertService';

export default function blogPage() {

    const router = useRouter();
    const [posts, setPost] = useState(null);

    const [disable, setdisable] = useState(true);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
        postService.getPostById(id)
            // .then(x => setPost(x))
            .then((x) => {
                setPost(x);

                console.log('sdads', x.postedBy[0])
                console.log(x.postedBy[0]._id === JSON.parse(localStorage.getItem("user")).user._id);

                if (x.postedBy[0]._id === JSON.parse(localStorage.getItem("user")).user._id) {
                    setdisable(false);
                }
            })
            .catch(alertService.error)
    }, [router]);



    function deletePost(id) {
       
      
        const updatedPosts = post => {
          if (post._id === id) {
            return { ...post, isDeleting: true };
          }
          return post;
        };
      
        setPost(updatedPosts);
      
        postService
          .deletePost(id)
          .then(() => {
            const filteredPosts = updatedPosts.filter(post => post.id !== id);
            setPost(filteredPosts);
          })
          .catch(error => {
            console.error("Error deleting post:", error);
          });

          router.push('/home');
      }
      


    return (
        <Format>
            <>{posts && (
                <section className="container mx-auto md:px-2 py-16 w-1/2">
                    <div className="flex justify-center">
                        {posts.postedBy.map((subObj) => (
                            <a className="text-md font-bold text-gray-600">
                                {subObj.name}
                            </a>
                        ))}
                    </div>
                    {posts.postedBy.map((subObj) => (
                        <a className="text-sm text-gray-500 flex justify-center"> {subObj.username}</a>
                    ))}

                    <div className="post py-10">
                        <h1 className="font-bold text-4xl text-center pb-5">{posts.title}</h1>
                        <p className="text-gray=500 text-xl text-center">{posts.content}</p>

                        <div className="py-10">
                            <img className="w-[900px] h-[600px] object-cover bg-cover rounded-md" width={900} height={600} src={posts.postImg} />
                        </div>

                        <div className="content text-gray-600 text-lg flex flex-col gap-4">
                            <p>
                                Learn how to multiply your leadership and impact through free thought leadership. Free church planting resources to help you thrive and multiply your efforts. Church Plant Coaching. Personalized Coaching. Courses: learn at your own pace, collaborate on mission. xbvcbvckvcxvcx vxc  bkcvbkvkvv  svksfvkfv v vkvkv
                                Learn how to multiply your leadership and impact through free thought leadership. Free church planting resources to help you thrive and multiply your efforts. Church Plant Coaching. Personalized Coaching. Courses: learn at your own pace, collaborate on mission. xbvcbvckvcxvcx vxc  bkcvbkvkvv  svksfvkfv v vkvkv
                                Learn how to multiply your leadership and impact through free thought leadership. Free church planting resources to help you thrive and multiply your efforts. Church Plant Coaching. Personalized Coaching. Courses: learn at your own pace, collaborate on mission. xbvcbvckvcxvcx vxc  bkcvbkvkvv  svksfvkfv v vkvkv
                                Learn how to multiply your leadership and impact through free thought leadership. Free church planting resources to help you thrive and multiply your efforts. Church Plant Coaching. Personalized Coaching. Courses: learn at your own pace, collaborate on mission. xbvcbvckvcxvcx vxc  bkcvbkvkvv  svksfvkfv v vkvkv
                            </p>
                        </div>
                    </div>

                    {
                        !disable &&

                        <div className="flex flex justify-center gap-5 pr-10">
                            {posts && (
                            <button onClick={() => router.push(`/posts/edit/${posts._id}`)} className="btn btn-link nav-item nav-link bg-blue-500 font- text-white hover:bg-blue-700">
                                Edit
                            </button>
                            )}
                            {posts && (
                            <button onClick={() => deletePost(posts._id)} className="btn btn-link nav-item nav-link bg-red-500 font- text-white hover:bg-red-700">
                                Delete
                            </button>
                            )}

                        </div>

                    }

                </section>
            )}
            </>
        </Format>
    )
}