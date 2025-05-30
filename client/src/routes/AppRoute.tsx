
import { createBrowserRouter } from "react-router"
import HomePage from "../pages/HomePage"
import MyWardrobe1 from "../pages/MyWardrobe"
import AppLayout from "../components/AppLayout"
import Graphs from "../pages/Graphs"
// import GeneralCategory from "../pages/GeneralCategory"


 const router=createBrowserRouter([{
       element:<AppLayout/>,
       children:[
        {
             index:true,
             element:<HomePage/>
        },
        // {path:"addItem",element:<AddItem/>},
        // {path:"weather",element:<Weather city="אלעד" />},
        {path:"myWardrobe",element:<MyWardrobe1/>},
        {path:"graphs",element:<Graphs/>}

            // {index:true,element:<MyWardrobe1/>},
            // {path:":typeCategory", element: <GeneralCategory/>}
       
        // {path:"mySets",element:<DigitalWardrobeApp/>}
    ]
 }])
 export default router






