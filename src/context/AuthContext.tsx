import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials, AuthUser } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
    });

    const [pendingEmail, setPendingEmail] = useState<string>('');

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setAuthState({
                user: JSON.parse(storedUser),
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

            // Simulate API call - Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store email for OTP verification
            setPendingEmail(credentials.email);

            // In real implementation, this would send OTP to email
            console.log('OTP sent to:', credentials.email);

            setAuthState(prev => ({ ...prev, isLoading: false }));
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Login failed. Please try again.',
            }));
            throw error;
        }
    };

    const verifyOTP = async (code: string): Promise<void> => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

            // Simulate API call - Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data
            const user: AuthUser = {
                id: '1',
                email: pendingEmail,
                name: 'Admin User',
                role: 'admin',
                avatar: '',
            };

            // Store in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', 'mock-jwt-token');

            setAuthState({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });

            setPendingEmail('');
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Invalid verification code.',
            }));
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
    };

    const clearError = () => {
        setAuthState(prev => ({ ...prev, error: null }));
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                verifyOTP,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
