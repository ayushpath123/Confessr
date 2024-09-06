import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../components/url";
export const useBlogs=()=>{
    const [blogs, setBlogs]=useState<any>([]);
    const [loading,setLoading]=useState(false)
    const response = async()=>{
        setLoading(true)
        const res= await axios.get(`${url}/api/v1/blogs`,{headers:
            {
                'Authorization':localStorage.getItem("token")
            }
        })
        console.log(res.data.blogs)
        const blogss:any=res.data.blogs
        setBlogs(blogss);
        setLoading(false)
    }
    useEffect(()=>{
       response();
    },[])

    return {
        loading,blogs
    }
}