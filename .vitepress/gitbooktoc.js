import { readFileSync } from 'fs'

class Node {
  constructor(title, path, indent) {
    this._text = title
    this._link = `/${path}`
    this._items = []
  }

  get text() { return this._text }
  get link() { return this._link }
  get items() { return this._items }

  get collapsed() {
    if (this.items.length) {
      return true
    } else {
      return undefined
    }
  }

  toJSON() {
    return {
      text: this.text,
      link: this.link.replace(/README$/, ''),
      collapsed: this.collapsed,
      items: this._items.length > 0 ? this._items : undefined
    }
  }
}

function constructNode(line, pattern, result) {
  if (line.startsWith('*')) {
    const match = line.match(pattern)
    const { title, path } = match.groups
    result.push(new Node(title, path))
    return result
  } else {
    line = line.slice(2)
    result[result.length - 1]._items = constructNode(line, pattern, result[result.length - 1]._items)
    return result
  }
}

function sidebar(lines, pattern, result = []) {
  if (lines.length === 0) {
    return result
  } else {
    return sidebar(lines.slice(1), pattern, constructNode(lines[0], pattern, result))
  }
}

function readGitBookSidebar() {
  const gbSidebarContent = readFileSync('SUMMARY.md')
  const gbSidebarLines = gbSidebarContent.toString().split('\n')
  const pattern = /^(?<indent> *)\* \[(?<title>.*)\]\((?<path>.*)\.md\)$/
  const regex = /\*/
  const filteredGbSidebarLines = gbSidebarLines.filter(line => regex.test(line))
  const sidebarData = sidebar(filteredGbSidebarLines, pattern, [])
  return sidebarData
}

let result
try {
  result = readGitBookSidebar()
} catch (error) {
  console.error(error)
  process.exit(1)
}

export default result
