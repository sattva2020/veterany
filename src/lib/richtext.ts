// Хелпери для Payload Lexical richText → простий текст.
// Використовуються там, де у фронтенді потрібен звичайний текст, а не Lexical-розмітка
// (наприклад, абзаци секції «Про нас» або SEO-опис).

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

function nodeText(node: LexicalNode): string {
  if (typeof node?.text === 'string') return node.text
  if (Array.isArray(node?.children)) return node.children.map(nodeText).join('')
  return ''
}

/**
 * Повертає масив абзаців (по одному рядку на верхньорівневий блок Lexical).
 * Порожні блоки відкидаються. Якщо значення не Lexical — повертає [].
 */
export function lexicalToParagraphs(value: unknown): string[] {
  const root = (value as { root?: { children?: LexicalNode[] } })?.root
  if (!root || !Array.isArray(root.children)) return []
  return root.children
    .map((child) => nodeText(child).trim())
    .filter((text) => text.length > 0)
}

/**
 * Повертає весь текст richText одним рядком (абзаци через пробіл).
 */
export function lexicalToPlainText(value: unknown): string {
  return lexicalToParagraphs(value).join(' ').trim()
}

export type LexicalBlock =
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'quote'; text: string }

/**
 * Спрощене перетворення Lexical richText у список блоків для рендеру.
 * Підтримує абзаци, заголовки (h2/h3), списки та цитати — цього достатньо
 * для текстів новин, які набирає менеджер. Форматування (жирний/курсив) не зберігається.
 */
export function lexicalToBlocks(value: unknown): LexicalBlock[] {
  const root = (value as { root?: { children?: LexicalNode[] } })?.root
  if (!root || !Array.isArray(root.children)) return []
  const blocks: LexicalBlock[] = []

  for (const node of root.children) {
    const type = node?.type
    if (type === 'heading') {
      const tag = (node as any).tag as string | undefined
      const text = nodeText(node).trim()
      if (text) blocks.push({ kind: 'heading', level: tag === 'h2' ? 2 : 3, text })
    } else if (type === 'list') {
      const ordered = (node as any).listType === 'number'
      const items = (node.children || [])
        .map((li) => nodeText(li).trim())
        .filter((t) => t.length > 0)
      if (items.length) blocks.push({ kind: 'list', ordered, items })
    } else if (type === 'quote') {
      const text = nodeText(node).trim()
      if (text) blocks.push({ kind: 'quote', text })
    } else {
      const text = nodeText(node).trim()
      if (text) blocks.push({ kind: 'paragraph', text })
    }
  }

  return blocks
}
