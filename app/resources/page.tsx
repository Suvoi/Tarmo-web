import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getResources } from "@/src/features/resources/api";
import { columns } from "@/src/features/resources/components/columns";
import { DataTable } from "@/src/features/resources/components/data-table";
import { Link, Plus, BookDashed, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ResourceForm } from "@/src/features/resources/components/resource-form"

export default async function Page() {
    const resources = await getResources()

    return (
        <div className="h-full flex flex-col">
            <header className="bg-background flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Resources</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <ResourceForm />

            <div className="w-full p-8 h-full">
                <DataTable columns={columns} data={resources} />
            </div>
        </div>
    )
}