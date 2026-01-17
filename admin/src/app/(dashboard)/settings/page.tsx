"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { restaurantInfo } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Store, Clock, Bell, Save } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("restaurant");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { key: "restaurant", label: "Restaurant Info", icon: Store },
        { key: "hours", label: "Bag Settings", icon: Clock },
        { key: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <>
            <Header
                title="Settings"
                subtitle="Manage your restaurant settings"
            />

            <div className="p-6">
                {/* Tabs */}
                <div className="flex gap-1 border-b border-white/10 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                                    activeTab === tab.key
                                        ? "text-accent border-accent"
                                        : "text-muted-foreground border-transparent hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-2xl space-y-6">
                    {/* Restaurant Info */}
                    {activeTab === 'restaurant' && (
                        <>
                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Restaurant Details</CardTitle>
                                    <CardDescription>Basic information about your restaurant</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Restaurant Name</Label>
                                            <Input
                                                id="name"
                                                defaultValue={restaurantInfo.name}
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue={restaurantInfo.email}
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                defaultValue={restaurantInfo.phone}
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                defaultValue={restaurantInfo.city}
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            defaultValue={restaurantInfo.address}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="bg-accent hover:bg-accent-hover text-spare-bg">
                                    <Save className="w-4 h-4 mr-2" />
                                    {saved ? "Saved!" : "Save Changes"}
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Bag Settings */}
                    {activeTab === 'hours' && (
                        <>
                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Default Pickup Hours</CardTitle>
                                    <CardDescription>Default time window for new rescue bags</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="pickupStart">Start Time</Label>
                                            <Input
                                                id="pickupStart"
                                                type="time"
                                                defaultValue="19:00"
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pickupEnd">End Time</Label>
                                            <Input
                                                id="pickupEnd"
                                                type="time"
                                                defaultValue="20:30"
                                                className="bg-spare-bg border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Bag Categories</CardTitle>
                                    <CardDescription>Enable or disable categories you offer</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { id: "mixed_bakery", label: "Mixed Bakery", enabled: true },
                                        { id: "pastries", label: "Pastries", enabled: true },
                                        { id: "breads", label: "Breads", enabled: true },
                                        { id: "snacks", label: "Snacks", enabled: false },
                                    ].map((category) => (
                                        <div key={category.id} className="flex items-center justify-between">
                                            <Label htmlFor={category.id} className="text-white font-normal">
                                                {category.label}
                                            </Label>
                                            <Switch id={category.id} defaultChecked={category.enabled} />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="bg-accent hover:bg-accent-hover text-spare-bg">
                                    <Save className="w-4 h-4 mr-2" />
                                    {saved ? "Saved!" : "Save Changes"}
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Notifications */}
                    {activeTab === 'notifications' && (
                        <>
                            <Card className="bg-spare-bg-light border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Order Notifications</CardTitle>
                                    <CardDescription>Choose which notifications you receive</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { id: "new_order", label: "New order received", description: "Get notified when someone reserves a bag", enabled: true },
                                        { id: "pickup", label: "Pickup confirmed", description: "When a customer picks up their bag", enabled: true },
                                        { id: "cancelled", label: "Order cancelled", description: "When a reservation is cancelled", enabled: true },
                                        { id: "daily", label: "Daily summary", description: "End of day summary of sales", enabled: false },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-start justify-between gap-4 py-2">
                                            <div>
                                                <Label htmlFor={item.id} className="text-white font-normal">
                                                    {item.label}
                                                </Label>
                                                <p className="text-sm text-muted-foreground mt-0.5">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <Switch id={item.id} defaultChecked={item.enabled} />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="bg-accent hover:bg-accent-hover text-spare-bg">
                                    <Save className="w-4 h-4 mr-2" />
                                    {saved ? "Saved!" : "Save Changes"}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
