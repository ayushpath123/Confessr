import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import  axios from 'axios'
import  {url}   from "./url";
import { SignupInput } from '@ayuspthak/medium-zod/dist/zod'
function Auth({ types }: { types: "signup" | "signin" }) {
  const navigate=useNavigate();
  
   const [form, setform] = useState<SignupInput>({
    name:"",
    email:"",
    password:"",
   });
   async function handlesubmit() {
    try {
      const res = await axios.post(`${url}/api/v1/${types === "signup" ? 'signup' : 'signin'}`, form);
  
      if (types === "signup") {
        const jwt = res.data.msg;
        if (!jwt) {
          throw new Error("No token returned for signup");
        }
        localStorage.setItem("token", jwt);
        navigate("/blogs");
      } else {
        const jwt = res.data.token;
        if (!jwt) {
          throw new Error("No token returned for signin");
        }
        localStorage.setItem("token", jwt);
        navigate("/blogs");
      }
    } catch (e) {
      alert("Unable to signup/signin. Please check your credentials and try again.");
      console.error(e); // Log the error for debugging
    }
  }
  
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center flex-col items-center gap-2">
            <div className="text-4xl font-extrabold">
              {types === "signup" ? "Create Your account" : "Login Your account"}
            </div>
            <div className="text-gray-600">
          {types === "signup" ? (
            <div>
              Already have an account? <Link to={"/signin"} className="underline">Login</Link>
            </div>
          ) : <div>
            Don't have an account? <Link to={"/signup"} className="underline">Sign up </Link></div>
           }
      </div>
      </div>
      <div className="flex justify-center mx-16 w-[70%] p-8 flex-col rounded-lg gap-4"> 
        {types==="signup"?(<LabelledInput label={"Name"} placeholder={"Enter your name..."} onchange={(e)=>(
          setform({
            ...form,
            name:e.target.value
          })
        )} ></LabelledInput>):null}
        <LabelledInput label={"Email"} placeholder={"Enter your email..."} onchange={(e)=>(
          setform({
            ...form,
            email:e.target.value
          })
        )} ></LabelledInput>
        <LabelledInput label={"Password"} placeholder={"Enter your password..."} onchange={(e)=>(
          setform({
            ...form,
            password:e.target.value
            })
        )}></LabelledInput>
        <button type="submit" onClick={handlesubmit} className="bg-gray-900 border border-gray-300 text-slate-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
  {types === "signup" ? "Signup" : "Login"}
</button>

     </div>
     </div>
  );
}
interface labelface {
  label:string,
  placeholder:string,
  onchange:(e:ChangeEvent<HTMLInputElement>)=>void
}
function LabelledInput({label,placeholder ,onchange}:labelface){
  return (
    <div>
    <label className="block mb-2 ml-4 text-sm font-medium text-black">{label}</label>
    <input onChange={onchange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
   </div>
  )
}

export default Auth;
