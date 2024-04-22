import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    username: string;
}

export interface IInitialState {
    user: User | null;
}

export const initialState: IInitialState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

// const User = useSelector((state: RootState) => state.user.user)

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
