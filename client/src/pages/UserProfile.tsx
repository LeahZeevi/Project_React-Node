import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const UserProfile: React.FC = () => {
  const [cookies] = useCookies(['token']);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      const data = await res.json();
      setUserData(data);
    };

    if (cookies.token) {
      fetchUser();
    }
  }, [cookies.token]);

  return (
    <div>
      <h2>פרופיל משתמש</h2>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>טוען נתונים...</p>
      )}
    </div>
  );
};

export default UserProfile;



