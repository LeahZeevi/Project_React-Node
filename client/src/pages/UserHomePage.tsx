
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { Users } from "../interfaces/Users";


const UserHomePage = () => {
const currentUser:Users=useSelector(selectUser);
console.log(currentUser);

    return (
        <div>
             <h1>{currentUser?.userName}</h1>
        </div>
    );
};

export default UserHomePage;


