
import { Link,useNavigate } from 'react-router-dom';
import {useState} from "react"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface loginType{
  auth: string,
  password:string
}


export default function Login() {

  const [userDetails,setUserdetails]=useState<loginType>({
  auth:"",
  password:""})
  // const notify = () => toast("Wow so easy!");
  const navigate=useNavigate()


  const handleChange=(a:string,b:string):void=>{
    setUserdetails({...userDetails,[a]:b})
  }

const Login=():void=>{
//   console.log(userDetails,import.meta.env.VITE_REGISTER_URL)

 if(userDetails.auth&&userDetails.password){
     axios.post(import.meta.env.VITE_LOGIN_URL,userDetails)
     .then((res)=>{
       console.log(res.data)
    if(res.data.msg=="login successful") {
       toast.success(`${res.data.msg}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          sessionStorage.setItem("user_token",JSON.stringify(res.data))
          setTimeout(()=>{
              navigate("/home")
          },3000)
      }
      else {
          toast.warn(`${res.data.msg}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          
      
           
      }    

     }).catch((err)=>{
      toast.error(`${err}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
     
     })

 }else{
  toast.error('Please fill all Details', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
 }
}

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address or username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e)=>handleChange(e.target.name,e.target.value)}
               
                  name="auth"
                  type="text"
                  autoComplete="auth"
                  required
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                 
                </div>
              </div>
              <div className="mt-2">
                <input
                 
                  onChange={(e)=>handleChange(e.target.name,e.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
               onClick={Login}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

         

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Regsiter
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </>
  )
}
