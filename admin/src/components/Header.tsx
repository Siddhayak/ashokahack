"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-spare-bg/80 backdrop-blur-sm sticky top-0 z-40">
            <div>
                <h1 className="text-xl font-semibold text-white">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64 pl-9 bg-spare-bg-light border-white/10 focus:border-accent"
                    />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-pink rounded-full" />
                </Button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-white hidden sm:block">Admin</span>
                </div>
            </div>
        </header>
    );
}
