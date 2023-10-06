import IAuthenticationState from "../types/Authentication.types"
import IUser from "../types/User.types"

const AuthenticationState: IAuthenticationState = {
    user: null,
    hasLoaded: false,
    jwt: null,
    handleLogin: (user: IUser) => {},
    handleLogout: () => {},
    handleRegister: (user: IUser) => {},
}

export default AuthenticationState
