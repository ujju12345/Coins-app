// User types
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    status: 'Active' | 'Inactive' | 'Pending';
    registeredDate: string;
    lastActive: string;
    totalOrders: number;
    totalCoins: number;
    role: string;
}

export interface HealthProfile {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    bloodGroup: string;
    height: string;
    weight: string;
    conditions: string[];
    medications: string[];
    allergies: string[];
    lastUpdated: string;
    status: 'Complete' | 'Incomplete' | 'Pending';
}

export interface UserFilters {
    search?: string;
    status?: string;
    role?: string;
    dateFrom?: string;
    dateTo?: string;
}
