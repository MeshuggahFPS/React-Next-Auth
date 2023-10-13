import { IAuthContext } from "../types/Provider.types"

const initialValues: IAuthContext = {
    user: null,
    feedback: {
        type: null,
        message: ''
    },
    isAuthenticated: false,
    login: async () => { },
    logout: async () => { },
    register: async () => { },
    reset: async () => { },
}

export default initialValues
