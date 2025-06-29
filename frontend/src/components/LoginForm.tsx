'use client';
import {useForm} from 'react-hook-form';
import {useAuthStore} from '@/store/authStore';
import { useState } from 'react';
import { apiRequest } from '@/lib/api';


interface LoginResponse {
    message: string;
    token: string;
    user:{
        id: string;
        email: string;
        role: string;
    };
}


export function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const userRole = useAuthStore((state) => state.userRole);
    const userId = useAuthStore((state) => state.userId);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const onSubmit = async (data: any) => {
        setLoading(true);
        setApiError(null);
        try {
            const response = await apiRequest<LoginResponse>('/auth/login', 'POST', data);
            useAuthStore.getState().setAuth(response.token, response.user.id, response.user.role); // Use getState() to access setAuth
            alert('Login successful! Welcome, ' + response.user.email);
        } catch (error: any) {
            setApiError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        clearAuth(); // Call the clearAuth action from the store
        alert('You have been logged out.');
    };

    if (isAuthenticated) {
        return (
            <div className="p-4 border rounded shadow-md text-center bg-green-50">
                <p className="text-lg font-semibold text-green-700">You are logged in as {userRole}.</p>
                <p className="text-sm text-gray-600 mb-2">User ID: {userId}</p>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
            </div>

            {apiError && <p className="text-red-500 text-center text-sm">{apiError}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
  }
