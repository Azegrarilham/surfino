import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/authApi';

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
};

type AuthState = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUserProfile: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await authApi.login(email, password);

                    set({
                        token: data.token,
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Login failed',
                        isLoading: false,
                    });
                }
            },

            fetchUserProfile: async () => {
                const { token } = get();
                if (!token) return;

                set({ isLoading: true });
                try {
                    const user = await authApi.getUserProfile(token);
                    set({ user, isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to fetch profile',
                        isLoading: false,
                    });
                }
            },

            logout: () => {
                set({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    error: null,
                });
            },
        }),
        {
            name: 'auth-storage',
            skipHydration: true,
        }
    )
);
