export function normalizePageCopy<T extends Record<string, string>>(
  fields: T,
  publishedCopy?: Partial<Record<keyof T, string | null>> | null,
): { [K in keyof T]: string } {
  const copy: { [K in keyof T]: string } = { ...fields }
  for (const key in copy) {
    copy[key] = publishedCopy?.[key]?.trim() ?? ""
  }
  return copy
}

export interface ContentItem {
  _key: string
  title?: string | null
  description?: string | null
}

export interface StaffMember extends ContentItem {
  name?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
}

export function filledContentItems<T extends ContentItem>(
  items?: Array<T | null> | null,
): T[] {
  return (items ?? []).filter(
    (item): item is T =>
      !!item && !!(item.title?.trim() || item.description?.trim()),
  )
}

export function filledStaffMembers(
  items?: Array<StaffMember | null> | null,
): StaffMember[] {
  return (items ?? []).filter(
    (item): item is StaffMember =>
      !!item &&
      !!(item.title?.trim() || item.name?.trim() || item.description?.trim()),
  )
}
