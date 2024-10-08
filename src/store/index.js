import { combineReducers } from "redux";
import { userReducer } from "./user";
import { sidebarGuestReducer } from "./sidebarGuest";
import { modalReducer } from "./modal";
import { regisUserReducer } from "./regisUser";
import { uploadImageReducer } from "./uploadImage";

export const reducers = combineReducers({
    user: userReducer,
    regisUser: regisUserReducer,
    sidebarGuest: sidebarGuestReducer,
    modal: modalReducer,
    uploadImage: uploadImageReducer,
})