// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { selectUser, setCurrentUser } from '../redux/slices/userSlice';
// import { useCookies } from 'react-cookie';
// import { jwtDecode } from 'jwt-decode';
// import { Users } from '../interfaces/Users';

// const UserHomePage = () => {
//     const [cookies] = useCookies(['token'], { doNotParse: true });
//     const [user, setUser] = useState<Users>()
//     const dispatch = useDispatch();

//     useEffect(() => {
//            setUser(useSelector(selectUser))

//         if (user?.userName === "") {
//             const userToken = cookies.token;

//             // אם הטוקן קיים, שלח אותו ל-Redux
//             setUser(jwtDecode<Users>(userToken));
//             dispatch(setCurrentUser(user));
//             console.log('current user  updated in global:', user); // אופציונלי: לוג לבדיקה
//         }


//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     return (
//         <div>
//             <h1>{user?.userName}</h1>
//         </div>
//     )
// }

// export default UserHomePage


import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setCurrentUser } from '../redux/slices/userSlice';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { Users } from '../interfaces/Users';

const UserHomePage = () => {
    const [cookies] = useCookies(['token']);
    let user = useSelector(selectUser);
    const dispatch = useDispatch();
<<<<<<< HEAD

    //   useEffect(() => {
    const updateStateCurrentUser = () => {
=======
    console.log(user);
    
    useEffect(() => {
>>>>>>> 3a78f0a5e1f762f32671087cff32ccf7b6629665
        if (!user || !user.userName) {
            const userToken = cookies.token;
            if (userToken) {
                try {
                    user = jwtDecode<Users>(JSON.stringify(userToken));
                    dispatch(setCurrentUser(user));
                    console.log('User updated:', user);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    // כאן תוכל לטפל בשגיאה (למשל, מחיקת ה-cookie הלא תקין)
                }
            }
        }
<<<<<<< HEAD
    }
    updateStateCurrentUser();
=======
    },[cookies.token])
    const updateStateCurrentUser = () => {

    }
    updateStateCurrentUser();
    let lytdt = useSelector(selectUser);
    console.log(lytdt);


>>>>>>> 3a78f0a5e1f762f32671087cff32ccf7b6629665
    //   }, []);
    return (
        <div>
            <h1>{user?.userName || 'טוען פרטי משתמש...'}</h1>
        </div>
    );
};

export default UserHomePage;
