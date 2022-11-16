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

//Sign in with google
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async ({result, navigate, toast}, {rejectWithValue}) => { 
    try {
        const response = await api.googleSignIn(result)
        toast.success("Google Sign-in Successfully");
        navigate('/');
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('profile') !== undefined ? JSON.parse(localStorage.getItem('profile')) : null,
        error: "",
        loading: false
    },

    reducers: {
        setLogout : (state, action) => {
            state.user = null;
            localStorage.removeItem('profile');
            //localStorage.clear()
            document.location.href = '/'
        }
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
        },

        //Google Sign in Cycle 
        [googleSignIn.pending]: (state, action) => {
            state.loading = true
        },
        [googleSignIn.fulfilled] : (state, action ) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [googleSignIn.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
    }
})

export const {setLogout} = authSlice.actions;

export default authSlice.reducer;