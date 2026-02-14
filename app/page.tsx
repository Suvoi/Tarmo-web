import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-full flex flex-col">
            <header className="bg-background flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
            </header>
            <div className="flex-1 p-6 grid grid-rows-4 grid-cols-6 items-center justify-center">
                <h1 className="text-5xl col-span-6">Welcome Back!</h1>
            </div>
        </div>
    )
}