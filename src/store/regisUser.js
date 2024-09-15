const DEFAULT_STATE = {
    name: "",
    email: "",
    username: "",
}

export const regisUserReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "DELETE_USER":
            return { 
                ...state, name: "", email: "", username: "" 
            }
        case "SET_USER":
            return {
                ...state, name: action.payload.name, email: action.payload.email, username: action.payload.username,
            }
        default:
            return state
    }
}