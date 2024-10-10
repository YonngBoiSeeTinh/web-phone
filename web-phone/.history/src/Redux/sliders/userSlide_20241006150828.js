import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: '',
    id:'',
    phone:'',
    address:'',
    avatar:''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            
            const { name, email, access_token,_id, phone, address, avatar,role } = action.payload;
            state.name = name;
            state.email = email;
            state.access_token = access_token;
            state.id = _id;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar; 
            state.role = role; 
        },
        resetUser: (state) => {
            
           
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.id = "";
            state.phone = "";
            state.adress = "";
            state.avatar = "";
            state.role = "";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
