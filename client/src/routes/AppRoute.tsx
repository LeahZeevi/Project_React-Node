
import { createBrowserRouter } from "react-router"
import HomePage from "../pages/HomePage"
import MyWardrobe from "../pages/MyWardrobe"
import AppLayout from "../components/AppLayout"
import Graphs from "../pages/Graphs"
import MyLocks from "../pages/MyLocks"


const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        {
            index: true,
            element: <HomePage />
        },
        { path: "myWardrobe", element: <MyWardrobe /> },
        { path: "myLocks", element: <MyLocks /> },
        { path: "graphs", element: <Graphs /> }
    ]
}])
export default router






