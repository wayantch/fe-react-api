import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);

  // Define method to fetch posts data
  const fetchDataPosts = async () => {
    try {
      const response = await api.get("/api/posts");
      setPosts(response.data.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Run hook to fetch posts on component mount
  useEffect(() => {
    fetchDataPosts();
  }, []);

  // Method to delete a post
  const deletePost = async (id) => {
    try {
      await api.delete(`/api/posts/${id}`);
      fetchDataPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-8">
      {/* Tombol Tambah Data */}
      <Link
        to="/posts/create"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mb-6 focus:outline-none"
      >
        Tambah Data
      </Link>

      {/* Tabel Data */}
      <div className="w-full max-w-5xl overflow-hidden bg-white shadow-lg rounded-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="px-6 py-3 font-medium">No</th>
              <th className="px-6 py-3 font-medium">Nama</th>
              <th className="px-6 py-3 font-medium">NIM</th>
              <th className="px-6 py-3 font-medium">Prodi</th>
              <th className="px-6 py-3 font-medium">Gambar</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-center hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.nim}</td>
                  <td className="px-6 py-4">{item.prodi}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.image} // Ensure image URL is correct
                      alt={item.name}
                      className="w-32 h-20 object-cover rounded shadow-sm mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 flex justify-center space-x-4">
                    <Link
                      to={`/posts/edit/${item.id}`}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                  Tidak Ada Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
