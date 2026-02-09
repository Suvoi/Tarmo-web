import { TemplateFormWrapper } from "../../new/components/TemplateFormWrapper"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getTemplate } from "@/features/templates/api"
import { notFound } from "next/navigation"
import { EditTemplateClient } from "./EditTemplateClient"

export default async function EditTemplatePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const template = await getTemplate(Number(id))

    if (!template) {
        notFound()
    }

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
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/templates">
                                Templates
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={`/templates/${id}`}>
                                {template.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Edit</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <EditTemplateClient templateId={Number(id)} template={template} />
        </div>
    )
}
