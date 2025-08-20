import { ImageBlockProps, renderImageBlock, renderVideoBlock, VideoBlockProps } from './renderMediaBlocks'
import {
  HeadingBlockProps,
  ListBlockProps,
  ParagraphBlockProps,
  renderHeadingBlock,
  renderListBlock,
  renderParagraphBlock,
} from './renderTextualBlocks'

type CustomMarkdownBlockProps = VideoBlockProps | ImageBlockProps | HeadingBlockProps | ParagraphBlockProps | ListBlockProps

const blockRenderers = {
  paragraph: renderParagraphBlock,
  heading: renderHeadingBlock,
  list: renderListBlock,
  image: renderImageBlock,
  video: renderVideoBlock,
}

export function renderCustomMarkdownBlocks(nodes: CustomMarkdownBlockProps[]) {
  return nodes.map((block, index) => {
    type Block = Extract<CustomMarkdownBlockProps, { type: typeof block.type }>

    const key = `${block.type}-${index}`
    const render = blockRenderers[block.type] as (block: Block, key: string) => React.JSX.Element | null

    return render ? render(block, key) : null
  })
}
