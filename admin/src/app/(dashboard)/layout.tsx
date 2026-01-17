"use client";

import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-spare-bg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    // Don't render if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-spare-bg">
            <Sidebar />
            <main className="flex-1 ml-64 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
