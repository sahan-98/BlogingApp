import Format2 from "../layout/format2"
import Image from "next/image"
import Link from "next/link"
import { alertService } from '../services/alertService';
import { userService } from '../services/userServices';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



export default function login(){

    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    //User Login
    function onSubmit({ username, password }) {
        alertService.clear();
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/home';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }


    

    return(
        <Format2>
            <div className="flex flex-col items-center md:flex-row md:h-screen">
                <div className="flex items-center justify-center w-full md:w-1/2">
                    <Image src="/images/login1.jpg" alt="Login Image" width={640} height={600} />
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full bg-gray-200">
                    <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back!</h1>
                        <p className="mt-2 text-gray-600">
                        Please sign in to your account.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6"onSubmit={handleSubmit(onSubmit)}>
                        <div>
                        <label htmlFor="text" className="block font-bold text-gray-700">
                            User Name
                        </label>
                        <input
                            id="userName"
                            type="text"
                            placeholder="Enter your email"
                            {...register('username')}
                            className= {`form-control ${errors.password ? 'is-invalid' : ''}, w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 `}
                            required
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="password"
                            className="block font-bold text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}, w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 `}
                            required
                        />
                        </div>
                        <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Sign In
                            </button>
                            </div>   
                        </form>
                        <p className="mt-4 text-sm text-center text-gray-700">
                            Don't have an account?{" "}
                            <Link href={"http://localhost:3000/posts/signUp"} className="font-medium text-blue-600 hover:underline">
                                 Sign up
                            </Link>
                        </p>    
                    </div>
                </div>
            </div>
        </Format2>
    )
}