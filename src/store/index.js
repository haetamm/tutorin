import { combineReducers } from "redux";
import { userReducer } from "./user";
import { sidebarGuestReducer } from "./sidebarGuest";
import { modalReducer } from "./modal";

export const reducers = combineReducers({
    user: userReducer,
    sidebarGuest: sidebarGuestReducer,
    modal: modalReducer,
})