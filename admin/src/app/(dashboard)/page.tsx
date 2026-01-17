"use client";

import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    mockRestaurantStats,
    mockDailyStats,
    mockOrders,
    formatCurrency,
    getCategoryLabel
} from "@/lib/mockData";
import {
    DollarSign,
    ShoppingBag,
    Star,
    Leaf,
    TrendingUp,
    TrendingDown,
    Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DashboardPage() {
    const stats = mockRestaurantStats;
    const recentOrders = mockOrders.slice(0, 5);

    return (
        <>
            <Header
                title="Dashboard"
                subtitle="Today's overview for your restaurant"
            />

            <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                                    <p className="text-2xl font-bold text-accent mt-1">
                                        {formatCurrency(stats.todayRevenue)}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-xs">
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500">+{stats.revenueChange}%</span>
                                        <span className="text-muted-foreground">from yesterday</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-accent" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Bags Sold Today</p>
                                    <p className="text-2xl font-bold text-pink mt-1">{stats.bagsSoldToday}</p>
                                    <div className="flex items-center gap-1 mt-2 text-xs">
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500">+{stats.bagsChange}%</span>
                                        <span className="text-muted-foreground">from yesterday</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-pink" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Average Rating</p>
                                    <p className="text-2xl font-bold text-yellow-500 mt-1">{stats.averageRating.toFixed(1)}</p>
                                    <div className="flex items-center gap-1 mt-2 text-xs">
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500">+{stats.ratingChange}</span>
                                        <span className="text-muted-foreground">this week</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                    <Star className="w-6 h-6 text-yellow-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Waste Saved</p>
                                    <p className="text-2xl font-bold text-green-500 mt-1">{stats.wasteSaved} kg</p>
                                    <div className="flex items-center gap-1 mt-2 text-xs">
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500">+{stats.wasteChange}%</span>
                                        <span className="text-muted-foreground">this week</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-green-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Revenue (Last 7 Days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-48 flex items-end justify-between gap-2">
                                {mockDailyStats.map((stat) => {
                                    const maxRevenue = Math.max(...mockDailyStats.map(s => s.revenue));
                                    const height = (stat.revenue / maxRevenue) * 100;
                                    return (
                                        <div key={stat.date} className="flex-1 flex flex-col items-center gap-2">
                                            <div
                                                className="w-full bg-gradient-to-t from-leaf-dark to-accent rounded-t-md transition-all hover:opacity-80"
                                                style={{ height: `${height}%` }}
                                                title={formatCurrency(stat.revenue)}
                                            />
                                            <span className="text-xs text-muted-foreground uppercase">
                                                {new Date(stat.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Today's Bags */}
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Today's Rescue Bags</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-around py-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-accent">{stats.bagsAvailable}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Available</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-pink">{stats.bagsSoldToday}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Sold</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-yellow-500">{stats.pendingPickups}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Pending Pickup</p>
                                </div>
                            </div>
                            <Link
                                href="/rescue-bags"
                                className="block text-center text-sm text-accent hover:text-accent-hover py-4 border-t border-white/5 transition-colors"
                            >
                                Manage Bags →
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Orders */}
                <Card className="bg-spare-bg-light border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-white">Recent Pickups</CardTitle>
                        <Link href="/orders" className="text-sm text-accent hover:text-accent-hover transition-colors">
                            View All →
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                            <span className="text-sm font-medium text-accent">
                                                {order.consumerName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{order.consumerName}</p>
                                            <p className="text-sm text-pink">{getCategoryLabel(order.bagCategory)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden sm:block">
                                            <p className="font-semibold text-accent">{formatCurrency(order.price)}</p>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                {new Date(order.pickupTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        <Badge
                                            variant={order.status === 'picked_up' ? 'default' : order.status === 'reserved' ? 'secondary' : 'outline'}
                                            className={
                                                order.status === 'picked_up' ? 'bg-green-500/20 text-green-500 border-0' :
                                                    order.status === 'reserved' ? 'bg-yellow-500/20 text-yellow-500 border-0' :
                                                        order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-500 border-0' :
                                                            ''
                                            }
                                        >
                                            {order.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
