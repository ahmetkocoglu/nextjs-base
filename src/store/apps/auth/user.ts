import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    initialState,
    name: 'login',
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = {}
        }
    }
})

export default userSlice.reducer

export const {setUser, removeUser} = userSlice.actions
