import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'
import { setToken } from '@/store/apps/auth/token';
import {removeUser, setUser} from "@/store/apps/auth/user";

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base.base,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = localStorage.getItem('token') as string

            if (token !== '') {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getIsLogin: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        me: builder.query<any, string>({
            query: () => `/users/me`,
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data))
                } catch (error) {
                    dispatch(removeUser())
                }
            }
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string, user: any }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data.token))
                    dispatch(setUser(data.user))
                } catch (error) {
                }
            }
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (error) {
                }
            }
        }),
    }),
})

export const { useGetIsLoginQuery, useMeQuery, useLoginMutation, useRegisterMutation } = loginApi
