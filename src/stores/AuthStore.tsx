import { create } from 'zustand'

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
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    login: async (username, _) => {
        set({ isLoading: true });
        
        // This would be replaced with actual API call
        // Simulating API call for MVP
        await new Promise(resolve => setTimeout(resolve, 500));
        
        set({ 
            isAuthenticated: true,
            user: {
                id: '1',
                username,
                email: `${username}@example.com`,
                walletAddress: null,
                avatar: null,
            },
            isLoading: false,
        });
    },

    logout: () => {
        set({
            isAuthenticated: false,
            user: null,
        });
    },

    connectWallet: (address) => {
        set(state => ({
            user: state.user ? {
                ...state.user,
                walletAddress: address
            } : null
        }));
    }
}))
