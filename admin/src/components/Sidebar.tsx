"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";
import {
    LayoutDashboard,
    ShoppingBag,
    ClipboardList,
    Settings,
    LogOut
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Rescue Bags", href: "/rescue-bags", icon: ShoppingBag },
    { label: "Orders", href: "/orders", icon: ClipboardList },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // Get restaurant name from user or use default
    const restaurantName = user?.restaurant || "Baker's Oven";

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/5 bg-spare-bg-dark flex flex-col">
            {/* Restaurant Logo/Name */}
            <div className="flex items-center gap-3 p-5 mb-4">
                <div className="flex items-center justify-center shrink-0">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                        <path
                            d="M8 12C8 10 10 8 12 8H28C30 8 32 10 32 12V32C32 34 30 36 28 36H12C10 36 8 34 8 32V12Z"
                            fill="#E88BC3"
                        />
                        <path
                            d="M14 8V6C14 4 16 2 20 2C24 2 26 4 26 6V8"
                            stroke="#E88BC3"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M20 28C20 28 14 22 14 18C14 15 16 14 18 14C19 14 20 15 20 16C20 15 21 14 22 14C24 14 26 15 26 18C26 22 20 28 20 28Z"
                            fill="#0D3B2E"
                        />
                    </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-lg font-bold text-accent truncate">{restaurantName}</span>
                    <span className="text-xs text-muted-foreground">Powered by Spare</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                isActive
                                    ? "bg-accent/10 text-accent"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
