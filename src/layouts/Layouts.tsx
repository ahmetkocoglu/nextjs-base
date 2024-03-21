import BaseLayout from "./BaseLayout";
import AuthLayout from "./AuthLayout";
export const Layouts = {
    Auth: AuthLayout,
    Base: BaseLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Auth" | "Base"
