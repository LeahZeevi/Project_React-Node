import { Route, Routes } from "react-router"
import UserHomePage from "../pages/UserHomePage"
import MyWardrobe from "../pages/MyWardrobe"
import MySets from "../pages/MySets"
import { createBrowserRouter } from "react-router"
import WardrobeLayout from "../components/WardrobeLayout"
import AppLayout from "../components/AppLayout"
import AddItem from "../pages/AddItem"
import GeneralCategory from "../pages/GeneralCategory"


 const router=createBrowserRouter([{
       element:<AppLayout/>,
       children:[
        {
             index:true,
             element:<UserHomePage/>
        },
        {path:"addItem",element:<AddItem/>},
        {path:"myWardrobe",element:<WardrobeLayout/>,children:[
            {index:true,element:<MyWardrobe/>},
            {path:":typeCategory",element:<GeneralCategory/>}
            
        ]},
        {path:"mySets",element:<MySets/>}
       ]
 }])
 export default router






