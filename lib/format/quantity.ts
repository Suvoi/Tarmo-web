import { Quantity } from "@/src/features/shared/schemas/quantity-schemas";

export function formatQuantity(base_quantity: number, base_unit: string) {
    if (base_unit === "g") {
        if (base_quantity < 1) return `${base_quantity * 1000} mg`
        if (base_quantity >= 1000) return `${base_quantity / 1000} kg`
    }
    if (base_unit === "l") {
        if (base_quantity < 1) return `${base_quantity * 1000} ml`
    }
    return `${base_quantity} ${base_unit}`
}