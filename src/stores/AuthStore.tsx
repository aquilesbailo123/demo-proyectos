import { create } from 'zustand'
import axiosInstance from '@/api/axiosInstance'
import toast from 'react-hot-toast'
import i18n from '@/i18n'
import { queryClient } from '@/queryClient'

interface User {
    id: string;
    username: string;
    email: string;
    walletAddress: string | null;
    avatar: string | null;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    connectWallet: (address: string) => void;
    initialize: () => Promise<void>;
    applyLogin: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()((set, _get) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    login: async (username, password) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post('/auth/login/', { username, password });
            const apiUser = res.data?.user;
            set({
                user: {
                    id: String(apiUser?.id ?? 'self'),
                    username: apiUser?.username ?? username,
                    email: apiUser?.email ?? '',
                    walletAddress: null,
                    avatar: null,
                },
                isAuthenticated: true,
            });

            set({ isLoading: false });
            toast.dismiss();
            toast.success(i18n.t('login_success', 'Logged in'));

            // Keep queries in sync
            await queryClient.invalidateQueries({ queryKey: ['profile'] });
        } catch (error: any) {
            console.error('Login failed', error);
            set({ isLoading: false, isAuthenticated: false });
            toast.dismiss();
            const message = error?.response?.data?.detail || error?.message;
            toast.error(message || i18n.t('login_general_error', 'Login failed'));
            throw error;
        }
    },

    logout: () => {
        set({ isAuthenticated: false, user: null });
        // Clear cached queries on logout
        queryClient.clear();
    },

    connectWallet: (address) => {
        set((state) => ({
            user: state.user
              ? {
                    ...state.user,
                    walletAddress: address,
                }
              : null,
        }));
    },

    // Optionally hydrate user on app start if tokens exist
    initialize: async () => {
        // No token persistence by default in this template.
        return;
    },

    applyLogin: (user) => {
        set({
            isAuthenticated: true,
            user: {
                id: String(user?.id ?? 'self'),
                username: user?.username ?? '',
                email: user?.email ?? '',
                walletAddress: user?.walletAddress ?? null,
                avatar: user?.avatar ?? null,
            },
        });
    },
}))
