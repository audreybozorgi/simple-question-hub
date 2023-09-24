import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestionPayload } from "src/types/question";

const initialState = [] as IQuestionPayload[];

export const questionSlice = createSlice({
    name: "Questions",
    initialState,
    reducers: {
        handleSaveQuestions: (state: IQuestionPayload[], action: PayloadAction<IQuestionPayload[]>) => {
            return state = action.payload
        },
    },
});

export const {
    handleSaveQuestions,
} = questionSlice.actions;
export default questionSlice.reducer;