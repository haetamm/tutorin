const DEFAULT_STATE = {
    imageUrl: "",
    fetch: null,
}

export const uploadImageReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "DELETE_IMAGE":
            return { 
                ...state, fetch: "", imageUrl: "" 
            }
        case "SET_IMAGE":
            return {
                ...state, fetch: action.payload.fetch, imageUrl: action.payload.imageUrl,
            }
        default:
            return state
    }
}