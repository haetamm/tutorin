const DEFAULT_STATE = {
    isOpen: false,
    title: "",
    content: "",
    confirmLabel: "",
}

export const modalReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "CLOSE_MODAL":
            return { ...state, isOpen: false }
        case "OPEN_MODAL":
            return {
                ...state, isOpen: true, title: action.payload.title, content: action.payload.content, confirmLabel: action.payload.confirmLabel,
            }
        default:
            return state
    }
}