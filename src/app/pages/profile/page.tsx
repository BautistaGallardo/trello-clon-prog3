import React from "react";
import NavBar from "@/components/navBar/page";
import Profile from "@/components/profile/page";

export default function ProfilePage() {
    return (
        <div className="bg-base-200 min-h-screen">
            <NavBar />
            <Profile />
        </div>
    );
}
