import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axiosInstance from "@/api/axiosInstance";

export interface LoginPayload {
    username?: string;
    email?: string;
    password: string;
    captcha?: string;
}

export interface RegisterPayload {
    username?: string;
    email: string;
    password1: string;
    password2: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    captchaResponse?: string;
}

export interface PasswordResetPayload {
    email: string;
}

export interface PasswordResetConfirmPayload {
    uid: string;
    token: string;
    new_password1: string;
    new_password2: string;
}

export interface GoogleLoginPayload {
    id_token: string;
}

// Success response payloads (per backend views)
export interface BaseOkResponse {
    detail: string; // e.g., 'login_ok', 'register_ok', etc.
}
export interface UserInfo {
    id?: number | string; // some endpoints use id
    pk?: number | string; // dj-rest-auth typically exposes pk
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}
export interface LoginResponse extends BaseOkResponse {
    access_token?: string;
    refresh_token?: string;
    user: UserInfo;
}
export interface RegisterResponse extends BaseOkResponse {
    access_token?: string;
    refresh_token?: string;
    user: UserInfo;
}
export interface PasswordResetResponse extends BaseOkResponse {}
export interface PasswordResetConfirmResponse extends BaseOkResponse {}
export interface GoogleLoginResponse extends BaseOkResponse { user: UserInfo }

// Error response payloads (DRF ValidationError or general API errors)
export type ApiErrorResponse = {
    detail?: string;
    message?: string;
    type?: string;
    [key: string]: any; // field errors or nested structures
};

export const getApiErrorMessage = (error: unknown): string => {
    const fallback = "Unexpected error";
    const axiosErr = error as AxiosError<ApiErrorResponse> | undefined;
    const data = axiosErr?.response?.data;
    if (!data) return axiosErr?.message || fallback;
    // Prefer explicit message, then detail
    if (typeof data.message === 'string' && data.message) return data.message;
    if (typeof data.detail === 'string' && data.detail) return data.detail;
    // Try common field errors (first string)
    for (const key of Object.keys(data)) {
        const val = (data as any)[key];
        if (typeof val === 'string' && val) return val;
        if (Array.isArray(val) && val.length && typeof val[0] === 'string') return val[0];
        if (val && typeof val === 'object') {
            // Nested error
            const nestedFirst = Object.values(val)[0] as any;
            if (typeof nestedFirst === 'string') return nestedFirst;
            if (Array.isArray(nestedFirst) && nestedFirst.length && typeof nestedFirst[0] === 'string') return nestedFirst[0];
        }
    }
    return axiosErr?.message || fallback;
};

export const useLogin = () => {
    return useMutation<LoginResponse, AxiosError<ApiErrorResponse>, LoginPayload>({
        mutationFn: async (payload: LoginPayload) => {
            const res = await axiosInstance.post("/auth/login/", payload);
            return res.data as LoginResponse;
        },
    });
};

export const useRegister = () => {
    return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterPayload>({
        mutationFn: async (payload: RegisterPayload) => {
            const res = await axiosInstance.post("/auth/register/", payload);
            return res.data as RegisterResponse;
        },
    });
};

export const usePasswordReset = () => {
    return useMutation<PasswordResetResponse, AxiosError<ApiErrorResponse>, PasswordResetPayload>({
        mutationFn: async (payload: PasswordResetPayload) => {
            const res = await axiosInstance.post("/auth/password/reset/", payload);
            return res.data as PasswordResetResponse;
        },
    });
};

export const usePasswordResetConfirm = () => {
    return useMutation<PasswordResetConfirmResponse, AxiosError<ApiErrorResponse>, PasswordResetConfirmPayload>({
        mutationFn: async (payload: PasswordResetConfirmPayload) => {
            const res = await axiosInstance.post("/auth/password/reset/confirm/", payload);
            return res.data as PasswordResetConfirmResponse;
        },
    });
};

export const useGoogleLogin = () => {
    return useMutation<GoogleLoginResponse, AxiosError<ApiErrorResponse>, GoogleLoginPayload>({
        mutationFn: async (payload: GoogleLoginPayload) => {
            const res = await axiosInstance.post("/auth/google/", payload);
            return res.data as GoogleLoginResponse;
        },
    });
};

// Utility to load the Google Identity Services script on demand
export const loadGoogleScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.getElementById("google-identity-services")) return resolve();
        const script = document.createElement("script");
        script.id = "google-identity-services";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Google script"));
        document.head.appendChild(script);
    });
};
