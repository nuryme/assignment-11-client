import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthHook = () => {
    const authInfo = useContext(AuthContext)
    return (
        authInfo
    );
};

export default useAuthHook;
