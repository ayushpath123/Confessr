import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Fullblog } from "../components/FullBlog";
import { useBlog } from "../hooks/getBlog"

function ViewBlog(){
    const {id}=useParams()
    
    const {blog,loading}=useBlog({
        id:id || " "
    });
    console.log(blog)
    return(
    
        <>
        <Header/>
        <div>
        {loading?(<div><div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen">
  <div
    role="status"
    className="max-w-4xl w-full p-10 space-y-6 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
    </div>
    <div className="flex items-center justify-between pt-6">
      <div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
    </div>
    <div className="flex items-center justify-between pt-6">
      <div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
    </div>
    <div className="flex items-center justify-between pt-6">
      <div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
    </div>
    <div className="flex items-center justify-between pt-6">
      <div>
        <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
</div></div>):
            //@ts-ignore
            <Fullblog author={blog.id} title={blog.title} content={blog.content}  publishedDate="24th feb 2024"></Fullblog>
        }
        </div>
        </>
    )
}
export default ViewBlog