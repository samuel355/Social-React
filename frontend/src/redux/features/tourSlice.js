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

//Get single tour 
export const getTour = createAsyncThunk("tour/getTour", async (id, {rejectWithValue}) => { 
    try {
        const response = await api.getTour(id)
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

//Get tours created by a user 
export const getUserTours = createAsyncThunk("tour/getUserTours", async (userId, {rejectWithValue}) => { 
    try {
        const response = await api.getToursByUser(userId)
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

//Delete Tour by creator
export const deleteCreatorTour = createAsyncThunk("tour/deleteCreatorTour", async ({id, toast}, {rejectWithValue}) => { 
    try {
        const response = await api.deleteTourByUser(id)
        toast.success("Tour Deleted Successfully");
        //document.location.reload(true);

        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

//Update Tour by creator
export const updateCreatorTour = createAsyncThunk("tour/updateCreatorTour", async ({id, updatedTourData, toast, navigate}, {rejectWithValue}) => { 
    try {
        const response = await api.updateTourByUser(updatedTourData, id)
        toast.success("Tour updated Successfully");
        navigate('/dashboard')

        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)

    }
})

//Search Tour
export const searchTour = createAsyncThunk("tour/searchTour", async (searchQuery, {rejectWithValue}) => { 
    try {
        const response = await api.getToursBySearch(searchQuery)

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

        // //getUserTours cycle
        [getUserTours.pending]: (state, action) => {
            state.loading = true
        },
        [getUserTours.fulfilled] : (state, action ) => {
            state.loading = false;
            state.userTours = action.payload
        },
        [getUserTours.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

        // Delete Tour cycle
        [deleteCreatorTour.pending]: (state, action) => {
            state.loading = true
        },
        [deleteCreatorTour.fulfilled] : (state, action ) => {
            state.loading = false;
            const {arg: {id}} = action.meta
            if(id){
                state.userTours = state.userTours.filter((item) => item._id !== id)
                state.tours = state.userTours.filter((item) => item._id !== id)
            }
        },
        [deleteCreatorTour.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

        // Update Tour cycle
        [updateCreatorTour.pending]: (state, action) => {
            state.loading = true
        },
        [updateCreatorTour.fulfilled] : (state, action ) => {
            state.loading = false;
            const {arg: {id},} = action.meta
            if(id){
                state.userTours = state.userTours.map((item) => item._id === id ? action.payload : item)
                state.tours = state.tours.map((item) => item._id === id ? action.payload : item)
            }
        },
        [updateCreatorTour.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },

        // Search Tour cycle
        [searchTour.pending]: (state, action) => {
            state.loading = true
        },
        [searchTour.fulfilled] : (state, action ) => {
            state.loading = false;
            const {arg: {id},} = action.meta
            if(id){
                state.userTours = state.userTours.map((item) => item._id === id ? action.payload : item)
                state.tours = state.tours.map((item) => item._id === id ? action.payload : item)
            }
        },
        [searchTour.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
    }
})

export default tourSlice.reducer;