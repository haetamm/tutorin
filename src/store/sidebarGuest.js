const DEFAULT_STATE = {
    isOpen: false,
}

export const sidebarGuestReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "CLOSE_SIDEBAR_GUEST":
            return { ...state, isOpen: false }
        case "OPEN_SIDEBAR_GUEST":
            return { ...state, isOpen: true }
        default:
            return state
    }
}