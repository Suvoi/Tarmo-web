import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
return (
    <>
    <SidebarTrigger />
    <div className="h-screen flex items-center justify-center">
        <h1 className="text-6xl">Welcome Back!</h1>
    </div>
    </>
)
}