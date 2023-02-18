import { readFileSync } from 'fs'

class Node {
  constructor(title, path, indent) {
    this._text = title
    this._link = `/${path}`
    this._items = []
    // custom fields
    this._level = indent.length / 2
    this._parent = null
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

  get level() { return this._level }

  get parent() {
    if (this.level === 0) {
      return null
    }
    return this._parent
  }

  set parent(value) {
    this._parent = value
  }

  get isRoot() { return this.level === 0 }

  isAdjacentDeeper(node) { return this.level - node.level === 1 }

  affiliate(node) {
    node.parent = this
    this._items.push(node)
  }

  findClosestParent(node) {
    let temp = this
    while (temp) {
      if (temp.level === node.level) {
        return temp.parent
      } else {
        temp = temp.parent
      }
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

function readGitBookSidebar() {
  const gbSidebarContent = readFileSync('SUMMARY.md')
  const gbSidebarLines = gbSidebarContent.toString().split('\n')
  const pattern = /^(?<indent> *)\* \[(?<title>.*)\]\((?<path>.*)\.md\)$/
  const sidebarData = []

  let currentParent = null
  for (const line of gbSidebarLines) {
    const match = line.match(pattern)
    if (!match || !match.groups) {
      continue
    }

    const { title, path, indent } = match.groups
    const current = new Node(title, path, indent)
    if (current.isRoot) {
      sidebarData.push(current)
    } else {
      if (!current.isAdjacentDeeper(currentParent)) {
        currentParent = currentParent.findClosestParent(current)
      }
      currentParent.affiliate(current)
    }
    currentParent = current
  }

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
