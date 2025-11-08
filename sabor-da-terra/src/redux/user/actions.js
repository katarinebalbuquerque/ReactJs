import UserActionTypes from "./action-types";

export const logarUser = (payload) => ({
    type: UserActionTypes.LOGIN,
    payload,
})

export const logoutUser = () => ({
    type: UserActionTypes.LOGOUT,
})