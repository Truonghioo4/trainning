import Home from "../pages/Home"
import { Route, Routes } from "react-router-dom"
import NotFound from "../pages/NotFound"
import TodoList from "../pages/TodoList"

const Router = () => (
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/todos" element={<TodoList/>}/>
    <Route element={<NotFound/>}/>
  </Routes>
)

export default Router
