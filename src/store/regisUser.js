const DEFAULT_STATE = {
    username: "",
    tokenAccess: "",
}

export const regisUserReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "DELETE_USER":
            return { 
                ...state, tokenAccess: "", username: "" 
            }
        case "SET_USER":
            return {
                ...state, tokenAccess: action.payload.tokenAccess, username: action.payload.username,
            }
        default:
            return state
    }
}