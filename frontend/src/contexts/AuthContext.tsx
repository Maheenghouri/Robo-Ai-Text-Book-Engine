import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type UserRate = 'software' | 'hardware' | null;

export interface User {
    id: string;
    name: string;
    email: string;
    background: UserRate;
    xp: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    signup: (name: string, email: string, background: UserRate) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Data
const MOCK_USER: User = {
    id: 'user-1',
    name: 'Pilot Candidate',
    email: 'pilot@robotics.com',
    background: 'software',
    xp: 1250,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate session check on mount
    useEffect(() => {
        const initAuth = async () => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Check localStorage for persisted "session"
            const storedUser = localStorage.getItem('robo_auth_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API

        // For demo: Create a user based on email (or use mock)
        const newUser = { ...MOCK_USER, email };
        setUser(newUser);
        localStorage.setItem('robo_auth_user', JSON.stringify(newUser));
        setIsLoading(false);
    };

    const signup = async (name: string, email: string, background: UserRate) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API

        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            background,
            xp: 0,
        };
        setUser(newUser);
        localStorage.setItem('robo_auth_user', JSON.stringify(newUser));
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(null);
        localStorage.removeItem('robo_auth_user');
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
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
