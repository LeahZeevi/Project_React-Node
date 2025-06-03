
import { createBrowserRouter } from "react-router"
import HomePage from "../pages/HomePage"
import MyWardrobe from "../pages/MyWardrobe"
import AppLayout from "../components/AppLayout"
import Graphs from "../pages/Graphs"


const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        {
            index: true,
            element: <HomePage />
        },

        { path: "myWardrobe", element: <MyWardrobe /> },
        { path: "graphs", element: <Graphs /> }
    ]
}])
export default router






