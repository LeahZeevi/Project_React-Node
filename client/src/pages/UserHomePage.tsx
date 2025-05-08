import {  useEffect } from "react";
import { Users } from "../interfaces/Users";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { current } from "@reduxjs/toolkit";

const UserHomePage = () => {
            
    const [cookies] = useCookies(['token'])
    const token=cookies.token  
    const currentUser: Users = jwtDecode<Users>(token);
    // useEffect(() => {
    
    // },[])
    return (
        <>
        <h1>{currentUser.userName}</h1>
        <h1>{currentUser.password}</h1>


            <div className="full-background" >
            <h1>ארון הבגדים שלי</h1> 
            <div>
    {currentUser && currentUser.myWardrobe && currentUser.myWardrobe.map(item => (
        <h5 key={item.itemName.toString()}>{item.itemName}</h5>
    ))}
    {!currentUser && <p>המשתמש לא טעון.</p>} {/* הצגת הודעה אם המשתמש לא טעון */}
    {currentUser && !currentUser.myWardrobe && <p>ארון הבגדים של המשתמש ריק או לא קיים.</p>} {/* הודעה אם myWardrobe לא קיים */}
</div>
        </div>
        </>
    )
}
export default UserHomePage;