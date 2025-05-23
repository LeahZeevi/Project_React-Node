
import UserHomePage from "../pages/UserHomePage"
import MyWardrobe from "../pages/MyWardrobe"
import MySets from "../pages/MySets"
import { createBrowserRouter } from "react-router"
import WardrobeLayout from "../components/WardrobeLayout"
import AppLayout from "../components/AppLayout"
import AddItem from "../pages/AddItem"
import Weather from "../pages/Weather"
import AlertExampel from "../pages/AlertExampel"

// import GeneralCategory from "../pages/GeneralCategory"


 const router=createBrowserRouter([{
       element:<AppLayout/>,
       children:[
        {
             index:true,
             element:<UserHomePage/>
        },
        {path:"addItem",element:<AddItem/>},
        {path:"weather",element:<Weather city="אלעד" />},
        {path:"myWardrobe",element:<WardrobeLayout/>,children:[
            {index:true,element:<MyWardrobe/>},
            // {path:":typeCategory", element: <GeneralCategory/>}
        ]},
        {path:"mySets",element:<MySets/>}
       ]
 }])
 export default router






