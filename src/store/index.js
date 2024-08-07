import { combineReducers } from "redux";
import { userReducer } from "./user";
import { sidebarGuestReducer } from "./sidebarGuest";

export const reducers = combineReducers({
    user: userReducer,
    sidebarGuest: sidebarGuestReducer,
})