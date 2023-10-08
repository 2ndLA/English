import { readFileSync } from 'fs'

const REGEX = {
  TOC: /^ *\* \[(?<title>.*)\]\((?<path>.*)\.md\)$/,
  INDEX: /README$/,
  CONTENT: /content\//
}

const SPECIAL_PATH = {
  README: '/README',
  INTRO: '/introduction'
}

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
    return {
      text: this.text,
      link: this.link === SPECIAL_PATH.README
        ? SPECIAL_PATH.INTRO
        : this.link.replace(REGEX.INDEX, '').replace(REGEX.CONTENT, ''),
      collapsed: this.collapsed,
      items: this.items.length > 0 ? this.items : undefined
    }
  }
}

function constructNode(line, result) {
  if (line.startsWith('*')) {
    const match = line.match(REGEX.TOC)
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
  const filteredGbSidebarLines = gbSidebarLines.filter(line => REGEX.TOC.test(line))
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

export default JSON.parse(JSON.stringify(result))
