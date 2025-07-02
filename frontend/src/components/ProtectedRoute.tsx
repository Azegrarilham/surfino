'use client';

import { useAuthStore } from '@/src/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    // Return null or a loading indicator if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
