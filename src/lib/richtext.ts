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
