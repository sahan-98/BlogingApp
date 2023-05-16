import { ImUpload } from "react-icons/im";
import Format from "../../layout/format"
import Image from "next/image"
import Link from "next/link"

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { alertService } from '../../services/alertService';
import { postService } from '../../services/postService';
import axios from "axios";

export default function postCreate(props) {

    const post = props?.post;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        content: Yup.string()
            .required('Content is required'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (post) {
        formOptions.defaultValues = props.post;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const [image, setImage] = useState("")


    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;

            const data2 = new FormData();
            data2.append("file", image);
            data2.append("upload_preset", "bloginappdemo");
            data2.append("cloud_name", "thegadgetshop098");

            console.log("<<<<<data", data2)

            let url = ""

            await fetch("https://api.cloudinary.com/v1_1/thegadgetshop098/image/upload", {
                method: "POST",
                body: data2
            })
                .then(res => res.json())
                .then(data => {
                    console.log('adasddasc', data)
                    // setUrl(data.url);
                    url = data.url
                }).catch(err => {
                    console.log(err);
                })

            data.picture = url;
            
            console.log("sDSDSD", data)

            await postService.createPost(data);
            console.log('cacac', data)
            message = 'Post added';


            // redirect to user list with success message
            router.push('/home');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }


    return (

        <Format>
            <div className="flex flex-col items-center md:flex-row md:h-screen">
                <div className="flex items-center justify-center w-full md:w-1/2">
                    <Image src="/images/blog.jpg" alt="Login Image" width={640} height={600} />
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full bg-gray-200">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold">Add a new Post</h1>
                            <p className="mt-2 text-gray-600">
                                Please give to your post details.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="text" className="block font-bold text-gray-700">
                                    Post Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Enter your post title"
                                    {...register('title')}
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}, w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 `}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="textarea" className="block font-bold text-gray-700">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    type="textarea"
                                    placeholder="Enter your content"
                                    {...register('content')}
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}, w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 `}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-bold text-gray-700">
                                    Add a Image
                                </label>
                                <div className="mb-2">
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                                        onChange={(e) => setImage(e.target.files[0])} />
                                    <br></br>
                                    {/* <button onClick={() => uploadImange()} className="w-24 py-2 cursor-pointer border-gray-500 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-300">Uplod Image</button> */}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={formState.isSubmitting}
                                    className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                                >
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                    Submit
                                </button>
                                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="w-full px-4 py-3 mt-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700">Reset</button>
                            </div>
                        </form>
                        <p className="mt-3 text-sm text-center text-gray-700">
                            Do not want to add new post?{" "}
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