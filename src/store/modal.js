const DEFAULT_STATE = {
    isOpen: false,
    content: "",
    confirmLabel: "",
    type: ""
}

export const modalReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "CLOSE_MODAL":
            return { ...state, isOpen: false }
        case "OPEN_MODAL":
            return {
                ...state, isOpen: true, content: action.payload.content, confirmLabel: action.payload.confirmLabel, type: action.payload.type,
            }
        default:
            return state
    }
}