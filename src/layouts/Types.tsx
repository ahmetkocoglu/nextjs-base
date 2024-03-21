import { NextComponentType, NextPage, NextPageContext } from "next";
import { AppProps } from "next/app";
import { LayoutKeys } from "./Layouts";
export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: LayoutKeys;
};
export type CustomAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any, any> & {
        Layout: LayoutKeys;
    };
};
