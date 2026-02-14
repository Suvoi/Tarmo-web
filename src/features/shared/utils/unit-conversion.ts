
// Types for unit categories
export type UnitCategory = 'weight' | 'volume' | 'count' | 'unknown'

const WEIGHT_UNITS = ['kg', 'g', 'mg']
const VOLUME_UNITS = ['l', 'ml', 'cl']
const COUNT_UNITS = ['u', 'pcs', 'unit', 'piece']

export const getUnitCategory = (unit: string): UnitCategory => {
    const normalized = unit.toLowerCase().trim()
    if (WEIGHT_UNITS.includes(normalized)) return 'weight'
    if (VOLUME_UNITS.includes(normalized)) return 'volume'
    if (COUNT_UNITS.includes(normalized)) return 'count'
    return 'unknown'
}

// Factor related to the base unit (g for weight, ml for volume, 1 for count)
const getConversionFactor = (unit: string): number => {
    const normalized = unit.toLowerCase().trim()
    switch (normalized) {
        // Weight (base: g)
        case 'kg': return 1000
        case 'g': return 1
        case 'mg': return 0.001

        // Volume (base: ml)
        case 'l': return 1000
        case 'cl': return 10
        case 'ml': return 1

        // Count
        default: return 1
    }
}

/**
 * Converts a value from one unit to another.
 * Returns null if units are incompatible.
 */
export const convertUnit = (value: number, fromUnit: string, toUnit: string): number | null => {
    const fromCategory = getUnitCategory(fromUnit)
    const toCategory = getUnitCategory(toUnit)

    if (fromCategory !== toCategory || fromCategory === 'unknown') {
        return null
    }

    const fromFactor = getConversionFactor(fromUnit)
    const toFactor = getConversionFactor(toUnit)

    // Convert to base unit then to target unit
    const valueInBase = value * fromFactor
    return valueInBase / toFactor
}

/**
 * Formats a price based on resource definition and usage
 */
export const calculateCost = (
    resourcePrice: number,        // Price in cents
    resourceBaseQty: number,      // Base quantity (e.g. 1)
    resourceBaseUnit: string,     // Base unit (e.g. 'kg')
    usageQty: number,             // Usage quantity (e.g. 500)
    usageUnit: string             // Usage unit (e.g. 'g')
): number | null => {
    // If units are the same string, simple ratio
    if (resourceBaseUnit.toLowerCase() === usageUnit.toLowerCase()) {
        return (usageQty / resourceBaseQty) * resourcePrice
    }

    // Try to convert usage quantity to resource base unit
    const convertedUsage = convertUnit(usageQty, usageUnit, resourceBaseUnit)

    if (convertedUsage === null) {
        return null
    }

    return (convertedUsage / resourceBaseQty) * resourcePrice
}

export const formatCurrency = (cents: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(cents / 100)
}
