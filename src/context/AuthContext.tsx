// ** React Imports
import {createContext, useEffect, useState, ReactNode} from 'react'
import {useLoginMutation, useMeQuery} from "@/services/auth";
// ** Types
import {AuthValuesType, LoginParams, ErrCallbackType, UserDataType} from '@/type/types'
import {useRouter} from "next/router";
import {removeToken} from "@/store/apps/auth/token";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";

// ** Defaults
const defaultProvider: AuthValuesType = {
    token: null,
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({children}: Props) => {
    const [login, result] = useLoginMutation()

    // ** Dispatch
    const dispatch = useDispatch<AppDispatch>();

    // ** Selector **
    const token = useSelector((state: RootState) => state.tokenState);

    // ** States
    const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

    // ** Hooks
    const router = useRouter()

    const {data: me, isSuccess, isError} = useMeQuery('');

    useEffect(() => {
        if (result.isSuccess) {
            if (router.pathname === '/auth/sign-in') router.push("/home")
        } else if (isError && router.pathname === '/auth/sign-up') {
        } else if (isError && router.pathname !== '/auth/sign-in') {
            router.replace("/auth/sign-in")
        } else if (isSuccess) {
            if (router.pathname === '/auth/sign-in') router.push("/home")
        }
    }, [isError, isSuccess, result.isSuccess, router])

    const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
        login(params)
    }

    const handleLogout = () => {
        router.push("/")
        dispatch(removeToken())
    }

    const values = {
        token: token.token,
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}
