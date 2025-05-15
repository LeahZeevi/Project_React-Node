import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectUser, setCurrentUser } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { Users } from "../interfaces/Users";
import { useGetUserByIdQuery } from "../redux/api/apiSllices/usersApiSlice";

export const useGetUser = () => {
    const [cookies] = useCookies(['token']);
    const dispatch = useDispatch();
    const currentUser: Users = useSelector(selectUser);
    const [userId, setUserID] = useState<string>();
    const { data, isLoading, error } = useGetUserByIdQuery(userId as string, { skip: !userId });


    useEffect(() => {
        if (currentUser._id === "" || currentUser.userName == "") {
            try {
                const userString: string | null = localStorage.getItem('user');
                if (userString) {
                    const user: Users = JSON.parse(userString);
                    setUserID(user._id);
                }
            } catch (e) {
                console.error('Token decode failed', e);
            }
        }
    }, [data]);

    useEffect(() => {
        if (data) {

            dispatch(setCurrentUser(data));
        }
    }, [data]);
    console.log("currentUser", currentUser, "data", data);

    return { user: data ? data : currentUser, isLoadingUser:isLoading,errorUser: error };
};
