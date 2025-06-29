import {create} from 'zustand';

interface AuthState{
    token: string | null;
    userId: string | null;
    userRole: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string, userId: string, userRole: string) => void;
    clearAuth: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: null,
    userId: null,
    userRole: null,
    isAuthenticated: false,
    setAuth: (token, userId, userRole) => {
        set({
            token,
            userId,
            userRole,
            isAuthenticated: true
        });
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', userRole);
    },
    clearAuth: () => {
        set({
            token: null,
            userId: null,
            userRole: null,
            isAuthenticated: false
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    },
    initializeAuth: () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        if (token && userId && userRole) {
            set({
                token,
                userId,
                userRole,
                isAuthenticated: true
            });
        } else {
            set({
                token: null,
                userId: null,
                userRole: null,
                isAuthenticated: false
            });
        }
    }
}));
