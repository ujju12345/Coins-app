// Auth types
export interface LoginCredentials {
    email: string;
    password: string;
    keepSignedIn?: boolean;
}

export interface VerificationData {
    email: string;
    code: string;
}

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    verifyOTP: (code: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}
