import { betterAuth } from "better-auth";

// Mock user database
const MOCK_USERS = [
    {
        id: "1",
        email: "admin@bakersoven.in",
        password: "spare123", // In production, this would be hashed
        name: "Admin",
        restaurant: "Baker's Oven"
    }
];

export const auth = betterAuth({
    // Use a simple secret for development
    secret: process.env.BETTER_AUTH_SECRET || "spare-admin-secret-key-for-dev",
    
    // Email + Password authentication
    emailAndPassword: {
        enabled: true,
        // Custom password verification for mock data
        async verifyPassword(password: string, hash: string) {
            return password === hash; // Simple comparison for mock
        },
    },
    
    // Session configuration
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    
    // Custom user lookup
    database: {
        type: "memory",
    },
    
    // Advanced configuration for mock users
    advanced: {
        generateId: () => crypto.randomUUID(),
    },
});

// Export auth types
export type Session = typeof auth.$Infer.Session;
