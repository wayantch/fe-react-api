import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import PostIndex from "../views/post";
import PostCreate from "../views/post/create";
import PostEdit from "../views/post/edit";
import Cards from "../views/Cards";

function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Cards />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
        </Routes>
    );
}

export default RoutesIndex;