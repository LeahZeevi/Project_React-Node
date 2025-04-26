
import { useCookies } from 'react-cookie';

const LogoutButton: React.FC = () => {
    const [, , removeCookie] = useCookies(['token']);
  
    return <button onClick={() => removeCookie('token')}>התנתק</button>;
  };