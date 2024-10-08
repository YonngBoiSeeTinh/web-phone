import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token } = action.payload;
            console.log('aciton', action);
            // state.name = name;
            // state.email = email;
            // state.access_token = access_token;
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
