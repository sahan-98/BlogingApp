import LoginHeader from "../components/loginHeader"
import Footer from "../components/footer"
import Head from "next/head"

export default function format2({children}){
    return(
        <>

        <Head>
           <title>Login Blog</title> 
        </Head>

            <LoginHeader></LoginHeader>
             <main>{children}</main>
            <Footer></Footer>
        </>
    )
}