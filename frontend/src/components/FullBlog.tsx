interface BlogContent {
    author: string;
    title: string;
    content: string;
    publishedDate: string;
  }
  
  //@ts-ignore
  export const Fullblog = ({ title, content, author, publishedDate }: BlogContent) => {
    return (
      <div className="flex justify-center mt-10 px-4 lg:px-0">
        <div className="max-w-screen-lg w-full">
  
          {/* Author Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
              <svg
                className="absolute w-12 h-12 text-gray-400"
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
  
            <div className="font-semibold text-xl">
              {author}
            </div>
          </div>
  
          {/* Title */}
          <div className="mb-6">
            <h1 className="font-black text-4xl lg:text-6xl">{title}</h1>
            <div className="flex items-center text-slate-600 font-normal text-sm lg:text-base py-2">
              <span>Posted on {publishedDate}</span>
            </div>
          </div>
  
          {/* Content */}
          <div className="text-slate-800 font-normal text-lg lg:text-xl mb-8">
            {content}
          </div>
        </div>
      </div>
    );
  }
  