import { Route, Router, createBrowserRouter, BrowserRouter, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";

const router = createBrowserRouter([
    {path : "/",
    element : <MainPage/>}
])

export default router