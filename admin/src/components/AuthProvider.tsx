"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string;
    restaurant: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials
const MOCK_USER: User = {
    id: "1",
    email: "admin@bakersoven.in",
    name: "Admin",
    restaurant: "Baker's Oven"
};
const MOCK_PASSWORD = "spare123";

// Storage key
const AUTH_KEY = "spare_auth_session";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const session = localStorage.getItem(AUTH_KEY);
                if (session) {
                    const parsed = JSON.parse(session);
                    if (parsed.expiresAt > Date.now()) {
                        setUser(parsed.user);
                    } else {
                        localStorage.removeItem(AUTH_KEY);
                    }
                }
            } catch {
                localStorage.removeItem(AUTH_KEY);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    // Handle route protection
    useEffect(() => {
        if (isLoading) return;

        const isLoginPage = pathname === "/login";
        const isProtectedRoute = !isLoginPage && pathname !== "/";

        if (!user && !isLoginPage && pathname !== "/") {
            // Redirect to login if not authenticated
            router.push("/login");
        } else if (!user && pathname === "/") {
            // Redirect root to login if not authenticated
            router.push("/login");
        } else if (user && isLoginPage) {
            // Redirect to dashboard if already authenticated
            router.push("/");
        }
    }, [user, isLoading, pathname, router]);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
            const session = {
                user: MOCK_USER,
                expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(session));
            setUser(MOCK_USER);
            return { success: true };
        }
        return { success: false, error: "Invalid email or password" };
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
