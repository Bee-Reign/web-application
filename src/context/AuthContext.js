import { createContext } from 'react';

const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
    setReloadUser: () => null,
    redirectUser: () => null,
});

export default AuthContext;