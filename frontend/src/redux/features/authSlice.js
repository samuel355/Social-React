import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

//Login
export const login = createAsyncThunk("auth/login", async ({formValue, navigate, toast}, {rejectWithValue}) => { 
    try {

        const response = await api.signIn(formValue)
        toast.success("Login Successfully");
        navigate('/');
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//Register
export const register = createAsyncThunk("auth/register", async ({formValue, navigate, toast}, {rejectWithValue}) => { 
    try {
        const response = await api.signUp(formValue)
        toast.success("Registered Successfully");
        navigate('/');
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: "",
        loading: false
    },

    extraReducers: {
        //Login Cycle
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled] : (state, action ) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [login.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

        //Register Cycle 
        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled] : (state, action ) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [register.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        }
    }
})

export default authSlice.reducer;