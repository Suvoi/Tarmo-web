import { getTemplate } from "@/features/templates/api"
import { TemplateDetailView } from "@/features/templates/components/template-detail-view"
import { notFound } from "next/navigation"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, PencilLine } from "lucide-react"
import DeleteTemplateButton from "@/features/templates/components/delete-template-button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const template = await getTemplate(id)

  if (!template) {
    notFound()
  }

  return (
    <div className="h-full w-full flex flex-col justify-between">
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
            <BreadcrumbItem>
              <BreadcrumbPage>{template.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full flex-1 min-h-0 px-4">
        <TemplateDetailView template={template} />
      </div>

      <footer className="p-4 flex justify-between">
        <Button asChild variant="ghost">
          <Link href="/templates/"><ArrowLeft />Back</Link>
        </Button>



        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost">
              <Link href={`/templates/${id}/edit`}><PencilLine /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <DeleteTemplateButton id={id} showButton={true} />

      </footer>
    </div>
  )
}
