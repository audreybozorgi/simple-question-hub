import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "src/types/auth/user";

const initialState = {} as IUser;

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        handleSaveUser: (state: IUser, action: PayloadAction<IUser>) => {
            return state = action.payload
        },
        handlePurgeUser: (state: IUser) => {
            return state = initialState
        },
    },
});

export const {
    handleSaveUser,
    handlePurgeUser,
} = userSlice.actions;
export default userSlice.reducer;