import axios from "axios";
import { url } from '../components/url'
import { useEffect, useState } from "react";

export const useBlog=({id}:{id:string})=>{
    const [loading,setloading]=useState(true)
    const[blog,setblog]=useState({})
    useEffect(()=>{
        axios.get(`${url}/api/v1/blogs/${id}`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then(response=>{
            setblog(response.data.blog)
            setloading(false)
        })
    },[id])

    return {loading,blog}
}