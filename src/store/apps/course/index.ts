import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    course: {}
}

export const courseSlice = createSlice({
    initialState,
    name: 'course',
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.course = action.payload
        }
    }
})

export default courseSlice.reducer

export const {setUser} = courseSlice.actions
