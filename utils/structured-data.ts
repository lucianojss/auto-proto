import type { BreadcrumbItem } from "@/components/breadcrumb"

/**
 * Generate structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[], baseUrl = "https://example.com") {
  // Start with Home as the first item
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  }

  // Add the rest of the items
  items.forEach((item, index) => {
    structuredData.itemListElement.push({
      "@type": "ListItem",
      position: index + 2, // +2 because we already have Home at position 1
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })
  })

  return structuredData
}

