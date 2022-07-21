import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "../pages/Search/";

const AllPages = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Search />}>
        <Route path=":name" element={<Search />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AllPages;
