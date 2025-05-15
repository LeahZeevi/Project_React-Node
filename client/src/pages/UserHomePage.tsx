

import { useGetMyWardrobe } from "../hooks/useGetMyWardrobe";
import { useGetUser } from "../hooks/useGetUser";


const UserHomePage = () => {

     const { user, isLoadingUser, errorUser } = useGetUser();
   const { myWardrobe, isLoadingMyWardrobe, errorMyWardrobe } = useGetMyWardrobe();
    console.log( myWardrobe);
    
    if (isLoadingUser) {
        return <p>טוען...</p>;
    }


    if (errorUser) {
        return <p>שגיאה בטעינה</p>;
    }
 


    return (
        <div>
            {user && <h1>{user.userName}</h1>}
        </div>
    );
};

export default UserHomePage;


