import { Routes, Route } from "react-router-dom";

import { Header } from "../components";

import { Register, Login, Home } from "../pages";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Router;
