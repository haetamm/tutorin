import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
let decodedToken = {}
let role = ""

if (token) {
    try {
        decodedToken = jwtDecode(token)
        role = decodedToken ? decodedToken.roles[0] : ""
    } catch (e) {
        console.error('Invalid token', e)
    }
}

const DEFAULT_STATE = {
    name: decodedToken.name || "",
    role,
    token: token || ""
}

export const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, name: action.payload.name, role: action.payload.role, token: action.payload.token }
        case "LOGOUT":
            return { ...state, name: "", role: "", token: "" }
        default:
            return state
    }
}