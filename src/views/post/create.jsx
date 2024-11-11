import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function PostCreate() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const storePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("nim", nim);
    formData.append("prodi", prodi);

    await api
      .post("/api/posts", formData)
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">Create Post</h1>
        <form onSubmit={storePost} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.image && (
              <div className="text-red-500 text-sm mt-1">{errors.image[0]}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Nama</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama"
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name[0]}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">NIM</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setNim(e.target.value)}
              placeholder="NIM"
            />
            {errors.nim && (
              <div className="text-red-500 text-sm mt-1">{errors.nim[0]}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Prodi</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setProdi(e.target.value)}
              placeholder="NIM"
            />
            {errors.prodi && (
              <div className="text-red-500 text-sm mt-1">{errors.prodi[0]}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
