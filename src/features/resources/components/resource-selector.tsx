"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getResources } from "@/features/resources/api/resources-api"
import useSWR from "swr"

interface ResourceSelectorProps {
    onSelect: (resourceId: number) => void
    excludeIds?: number[]
}

export function ResourceSelector({ onSelect, excludeIds = [] }: ResourceSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const { data: resources = [] } = useSWR("/resources", getResources)

    const filteredResources = resources.filter(
        (resource) => !excludeIds.includes(resource.id!)
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    Select resource...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                <Command>
                    <CommandInput placeholder="Search resources..." />
                    <CommandList>
                        <CommandEmpty>No resource found.</CommandEmpty>
                        <CommandGroup>
                            {filteredResources.map((resource) => (
                                <CommandItem
                                    key={resource.id}
                                    value={resource.name}
                                    onSelect={() => {
                                        onSelect(resource.id!)
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{resource.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {resource.description || "No description"}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
