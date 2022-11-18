import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

//Create Tour
export const createTour = createAsyncThunk("tour/createTour", async ({updatedTourData, navigate, toast}, {rejectWithValue}) => { 
    try {
        const response = await api.createTour(updatedTourData)
        toast.success("Tour Created Successfully");
        navigate('/');
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

//Get all Tours
export const getTours = createAsyncThunk("tour/allTours", async (_, {rejectWithValue}) => { 
    try {
        const response = await api.getTours()
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

//Get single tour Tour
export const getTour = createAsyncThunk("tour/getTour", async (id, {rejectWithValue}) => { 
    try {
        const response = await api.getTour(id)
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        error: "",
        loading: false
    },

    reducers: {
        
    },

    extraReducers: {
        //createTour Cycle
        [createTour.pending]: (state, action) => {
            state.loading = true
        },
        [createTour.fulfilled] : (state, action ) => {
            state.loading = false;
            state.tours = [action.payload]
        },
        [createTour.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

        //getTours cycle
        [getTours.pending]: (state, action) => {
            state.loading = true
        },
        [getTours.fulfilled] : (state, action ) => {
            state.loading = false;
            state.tours = action.payload
        },
        [getTours.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

        //getTour cycle
        [getTour.pending]: (state, action) => {
            state.loading = true
        },
        [getTour.fulfilled] : (state, action ) => {
            state.loading = false;
            state.tour = action.payload
        },
        [getTour.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

    }
})

export default tourSlice.reducer;