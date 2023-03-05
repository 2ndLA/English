import { readFileSync } from 'fs'

const PATTERN = /^ *\* \[(?<title>.*)\]\((?<path>.*)\.md\)$/

class Node {
  constructor(title, path) {
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
    let link
    if (this.link === '/README') {
      link = '/introduction'
    } else {
      link = this.link.replace(/README$/, '')
    }
    return {
      text: this.text,
      link,
      collapsed: this.collapsed,
      items: this.items.length > 0 ? this.items : undefined
    }
  }
}

function constructNode(line, result) {
  if (line.startsWith('*')) {
    const match = line.match(PATTERN)
    const { title, path } = match.groups
    result.push(new Node(title, path))
    return result
  } else {
    line = line.slice(2)
    result[result.length - 1].items = constructNode(line, result[result.length - 1].items)
    return result
  }
}

function sidebar(lines, result = []) {
  if (lines.length === 0) {
    return result
  } else {
    return sidebar(lines.slice(1), constructNode(lines[0], result))
  }
}

function readGitBookSidebar() {
  const gbSidebarContent = readFileSync('SUMMARY.md')
  const gbSidebarLines = gbSidebarContent.toString().split('\n')
  const filteredGbSidebarLines = gbSidebarLines.filter(line => PATTERN.test(line))
  const sidebarData = sidebar(filteredGbSidebarLines, [])
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
