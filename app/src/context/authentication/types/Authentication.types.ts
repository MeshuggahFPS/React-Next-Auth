import IUser from "./User.types";

interface IAuthenticationState {
    user?: IUser | null;
    hasLoaded: boolean;
    jwt: null;

    handleLogin: (user: IUser) => void;
    handleLogout: () => void;
    handleRegister: (user: IUser) => void;
}

export default IAuthenticationState;