// Chin Ray wrote this
"use client"
import Header from "@/components/Header";
import AddFeed from "@/components/Feeds/AddFeed";

export default function Interests() {
    return (
        <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
            <Header />
            <AddFeed />
        </div>
    )
}