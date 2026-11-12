import {
  createImageUrlBuilder,
  type SanityImageObject,
} from "@sanity/image-url"

export function getSanityImage(
  image: SanityImageObject | null | undefined,
  config: { projectId: string; dataset: string },
  size: { width: number; height?: number } = { width: 2400 },
) {
  if (!image?.asset) return undefined

  let builder = createImageUrlBuilder(config)
    .image(image)
    .width(size.width)
    .fit("max")
    .auto("format")
  if (size.height) builder = builder.height(size.height).fit("crop")

  const left = image.crop?.left ?? 0
  const top = image.crop?.top ?? 0
  const width = 1 - left - (image.crop?.right ?? 0)
  const height = 1 - top - (image.crop?.bottom ?? 0)
  if (width <= 0 || height <= 0) {
    throw new Error("Sanity image crop must leave a visible image area")
  }
  // Full-bleed heroes crop further as the viewport changes, after the saved crop.
  const x = ((image.hotspot?.x ?? 0.5) - left) / width
  const y = ((image.hotspot?.y ?? 0.5) - top) / height
  const percent = (value: number) => Math.min(100, Math.max(0, value * 100))

  return {
    url: builder.url(),
    objectPosition: image.hotspot ? `${percent(x)}% ${percent(y)}%` : "50% 50%",
  }
}
