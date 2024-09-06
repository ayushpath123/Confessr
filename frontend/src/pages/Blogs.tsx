import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { useBlogs } from "../hooks/getBlogs";

function Blogs() {
  const { blogs, loading } = useBlogs();
  
  if (loading)
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen">
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
</div>

    );

  return (
    <div className="flex flex-col gap-8 m-2">
      <div>
        <Header />
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        {blogs.slice().reverse().map((blog: any) => (
          <BlogCard
            id={blog.id}
            title={blog.title}
            author={blog.authorId}
            content={blog.content}
            date={"3 Aug 2021"}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
