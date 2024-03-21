import "@/styles/globals.css";
import {CustomAppProps} from "@/layouts/Types";
import {Layouts} from "@/layouts/Layouts";
import BaseLayout from "@/layouts/BaseLayout";
import {AuthProvider} from "@/context/AuthContext";
import {Provider} from "react-redux";
import {store} from "@/store";

export default function App({Component, pageProps}: CustomAppProps) {
    const Layout = Layouts[Component.Layout] || BaseLayout
    return (
        <>
            <Provider store={store}>
                <AuthProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthProvider>
            </Provider>
        </>
    );
}
