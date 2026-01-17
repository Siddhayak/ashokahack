"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RescueBag } from "@/lib/types";
import { mockRescueBags, formatCurrency, getCategoryLabel, formatTime } from "@/lib/mockData";
import { Plus, Clock, Package, Pencil, Trash2 } from "lucide-react";

export default function RescueBagsPage() {
    const [bags, setBags] = useState<RescueBag[]>(mockRescueBags);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingBag, setEditingBag] = useState<RescueBag | null>(null);

    // Form state for new bag
    const [newBag, setNewBag] = useState({
        category: "mixed_bakery",
        description: "",
        quantity: 5,
        price: 100,
        originalValue: 350,
        pickupStart: "19:00",
        pickupEnd: "20:30"
    });

    const handleAddBag = () => {
        const bag: RescueBag = {
            id: `b${Date.now()}`,
            merchantId: "m1",
            merchantName: "Baker's Oven",
            category: newBag.category as RescueBag["category"],
            description: newBag.description,
            quantity: newBag.quantity,
            quantityRemaining: newBag.quantity,
            price: newBag.price,
            originalValue: newBag.originalValue,
            pickupStart: `2026-01-17T${newBag.pickupStart}:00`,
            pickupEnd: `2026-01-17T${newBag.pickupEnd}:00`,
            status: "available",
            createdAt: new Date().toISOString()
        };
        setBags([...bags, bag]);
        setIsAddOpen(false);
        setNewBag({
            category: "mixed_bakery",
            description: "",
            quantity: 5,
            price: 100,
            originalValue: 350,
            pickupStart: "19:00",
            pickupEnd: "20:30"
        });
    };

    const handleMarkSoldOut = (bagId: string) => {
        setBags(bags.map(b =>
            b.id === bagId ? { ...b, status: "sold_out" as const, quantityRemaining: 0 } : b
        ));
    };

    const handleDeleteBag = (bagId: string) => {
        setBags(bags.filter(b => b.id !== bagId));
    };

    const availableBags = bags.filter(b => b.status === 'available');
    const soldOutBags = bags.filter(b => b.status === 'sold_out');

    return (
        <>
            <Header
                title="Rescue Bags"
                subtitle="Manage today's surplus food bags"
            />

            <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-white">{bags.length}</p>
                            <p className="text-sm text-muted-foreground mt-1">Total Bags</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">{availableBags.length}</p>
                            <p className="text-sm text-muted-foreground mt-1">Available</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-blue-400">{soldOutBags.length}</p>
                            <p className="text-sm text-muted-foreground mt-1">Sold Out</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-pink">
                                {bags.reduce((acc, b) => acc + b.quantity - b.quantityRemaining, 0)}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">Sold Today</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Add Button */}
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-accent hover:bg-accent-hover text-spare-bg font-semibold">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Bag
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-spare-bg-light border-white/10 text-white">
                        <DialogHeader>
                            <DialogTitle>Add New Rescue Bag</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Create a new rescue bag for today
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    value={newBag.category}
                                    onChange={(e) => setNewBag({ ...newBag, category: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-spare-bg px-3 py-2 text-sm text-white"
                                >
                                    <option value="mixed_bakery">Mixed Bakery</option>
                                    <option value="pastries">Pastries</option>
                                    <option value="breads">Breads</option>
                                    <option value="snacks">Snacks</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={newBag.description}
                                    onChange={(e) => setNewBag({ ...newBag, description: e.target.value })}
                                    placeholder="e.g., Assorted pastries and breads"
                                    className="bg-spare-bg border-white/10 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={newBag.quantity}
                                        onChange={(e) => setNewBag({ ...newBag, quantity: parseInt(e.target.value) })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newBag.price}
                                        onChange={(e) => setNewBag({ ...newBag, price: parseInt(e.target.value) })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="pickupStart">Pickup Start</Label>
                                    <Input
                                        id="pickupStart"
                                        type="time"
                                        value={newBag.pickupStart}
                                        onChange={(e) => setNewBag({ ...newBag, pickupStart: e.target.value })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="pickupEnd">Pickup End</Label>
                                    <Input
                                        id="pickupEnd"
                                        type="time"
                                        value={newBag.pickupEnd}
                                        onChange={(e) => setNewBag({ ...newBag, pickupEnd: e.target.value })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddOpen(false)} className="border-white/10 text-white hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button onClick={handleAddBag} className="bg-accent hover:bg-accent-hover text-spare-bg">
                                Add Bag
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Bags Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bags.map((bag) => (
                        <Card key={bag.id} className="bg-spare-bg-light border-white/5">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-pink">
                                        {getCategoryLabel(bag.category)}
                                    </span>
                                    <Badge
                                        variant={bag.status === 'available' ? 'default' : 'secondary'}
                                        className={
                                            bag.status === 'available'
                                                ? 'bg-green-500/20 text-green-500 border-0'
                                                : 'bg-blue-500/20 text-blue-400 border-0'
                                        }
                                    >
                                        {bag.status === 'available' ? 'Available' : 'Sold Out'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {bag.description && (
                                    <p className="text-sm text-muted-foreground">{bag.description}</p>
                                )}

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Package className="w-4 h-4" />
                                        <span>{bag.quantityRemaining} / {bag.quantity} left</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{formatTime(bag.pickupStart)} - {formatTime(bag.pickupEnd)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground line-through">
                                            {formatCurrency(bag.originalValue)}
                                        </span>
                                        <span className="text-xl font-bold text-accent">
                                            {formatCurrency(bag.price)}
                                        </span>
                                    </div>
                                    <Badge className="bg-pink/20 text-pink border-0">
                                        {Math.round((1 - bag.price / bag.originalValue) * 100)}% off
                                    </Badge>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-white/10 text-white hover:bg-white/5"
                                        onClick={() => setEditingBag(bag)}
                                    >
                                        <Pencil className="w-3 h-3 mr-1" />
                                        Edit
                                    </Button>
                                    {bag.status === 'available' && bag.quantityRemaining > 0 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-white/10 text-yellow-500 hover:bg-yellow-500/10"
                                            onClick={() => handleMarkSoldOut(bag.id)}
                                        >
                                            Mark Sold Out
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10"
                                        onClick={() => handleDeleteBag(bag.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {bags.length === 0 && (
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="py-12 text-center">
                            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No rescue bags yet. Add your first one!</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
