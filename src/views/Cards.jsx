import { useState, useEffect } from "react";
import api from "./../api";
import { Link } from "react-router-dom";

export default function Cards() {
  const [posts, setPosts] = useState([]);

  // Define method to fetch posts data
  const fetchDataPosts = async () => {
    try {
      const response = await api.get("/api/posts");
      console.log(response.data.data.data);
      setPosts(response.data.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Run hook to fetch posts on component mount
  useEffect(() => {
    fetchDataPosts();
  }, []);

  return (
    <div className="container px-20 py-10">

      {/* Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              {/* Gambar */}
              <div className="mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full object-cover rounded-md"
                />
              </div>

              {/* Konten */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">NIM: {item.nim}</p>
                <p className="text-gray-600">Prodi: {item.prodi}</p>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            Tidak Ada Data
          </div>
        )}
      </div>
    </div>
  );
}
