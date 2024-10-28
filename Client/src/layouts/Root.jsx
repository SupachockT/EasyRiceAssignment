import { Outlet } from "react-router-dom"

import Navigation from "../components/Navigation";

export default function Root() {
    return (
        <div className="h-screen bg-gray-100">
            <Navigation />
            <Outlet />
        </div>
    )
}