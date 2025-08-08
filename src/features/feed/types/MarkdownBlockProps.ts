export type MarkdownBlockProps = {
  type: 'video' | 'paragraph' | 'heading' | 'image' | 'list'
  text: string
  level?: number
  aspectRatio?: number
  src?: string
  alt?: string
  caption?: string
  link?: string
}
