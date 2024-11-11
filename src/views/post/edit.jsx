import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function PostEdit() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDetailPost = async () => {
    await api.get(`/api/posts/${id}`).then((response) => {
      const post = response.data.data;
      setName(post.name);  // Set the name from the fetched data
      setNim(post.nim);    // Set the nim from the fetched data
      setProdi(post.prodi); // Set the prodi from the fetched data
    });
  };

  useEffect(() => {
    fetchDetailPost();
  }, [id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("nim", nim);
    formData.append("prodi", prodi);
    formData.append("_method", "PUT");

    await api
      .post(`/api/posts/${id}`, formData)
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Edit Post</h1>
        <form onSubmit={updatePost} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.image && (
              <div className="text-red-500 text-sm mt-1">
                {errors.image[0]}
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama"
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {errors.name[0]}
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">NIM</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="NIM"
            />
            {errors.nim && (
              <div className="text-red-500 text-sm mt-1">
                {errors.nim[0]}
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Prodi</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              placeholder="Prodi"
            />
            {errors.prodi && (
              <div className="text-red-500 text-sm mt-1">
                {errors.prodi[0]}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
