import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { url } from "../components/url";
import { useNavigate } from "react-router-dom";

function Publish() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      // Ensure only the title and content values (not the event object) are passed
      const response = await axios.post(
        `${url}/api/v1/blogs/newblog`,
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const blogId = response.data.id; // Adjust according to your response structure
      setTitle("");
      setContent("");
      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error("Error publishing blog:", error);
      // Add error handling (e.g., show an error message)
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col m-2 gap-4 h-full max-w-lg w-full">
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update to capture only the value
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Write a brief title....."
            />
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)} // Update to capture only the value
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your confessions here..."
            ></textarea>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
