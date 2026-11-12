export function isContentHref(value: unknown): value is string {
  if (typeof value !== "string") return false
  const href = value.trim()
  if (!href || /[\u0000-\u0020\u007f\\]/.test(href)) return false
  if (href.startsWith("#")) return true
  if (href.startsWith("/")) return !href.startsWith("//")
  if (!/^(https?:\/\/|mailto:|tel:)/i.test(href)) return false

  try {
    const url = new URL(href)
    return url.protocol === "http:" || url.protocol === "https:"
      ? !!url.hostname
      : !!url.pathname
  } catch (error) {
    if (error instanceof TypeError) return false
    throw error
  }
}
