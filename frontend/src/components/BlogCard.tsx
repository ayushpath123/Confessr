import { Link } from "react-router-dom";

interface BlogProp {
  id:string,
  title: string;
  content: string;
  date: string;
  author: string;
}

function BlogCard({id, title, content, date, author }: BlogProp) {
  return (
    <Link to={`/blogs/${id}`} className="max-w-4xl w-full p-6 space-y-6 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 dark:border-gray-700"><div className="">
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="font-light">{author}</div>
      </div>
      <div className="font-thin">{date}</div>
    </div>
    <div className="font-extrabold text-3xl">{title}</div>
    <div>{content.slice(0, 100) + "..."}</div>
    <div className="text-gray-900">{`${Math.ceil(content.length / 100)} minutes read`}</div>
    <div className="bg-slate-200 h-1 w-full"></div>
  </div></Link>
    
  );
}

export default BlogCard;
