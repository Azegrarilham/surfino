'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Hydrate the store
        useAuthStore.persist.rehydrate();
    }, []);

    return <>{children}</>;
};
