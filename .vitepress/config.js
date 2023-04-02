import path from 'path'
import sidebarData from './gitbooktoc'
import gtagConfig from './gtag'

const urlBase = process.env.URL_BASE || undefined

export default {
  base: urlBase,
  cleanUrls: true,
  description: 'An easy and comprehensive way to learn English.',
  lastUpdated: true,
  srcDir: '.',
  title: 'The English Learner',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: path.join(urlBase || '', 'favicon.png')
      }
    ],
    ...gtagConfig
  ],
  markdown: {
    config: (md) => {
      md.use(require('markdown-it-task-checkbox'), {
        disabled: true,
        divWrap: false,
        divClass: 'checkbox',
        idPrefix: 'cbx_',
        ulClass: 'task-list',
        liClass: 'task-list-item'
      })
    }
  },
  // You have to write mapping for each depth of README.md
  // https://github.com/vuejs/vitepress/discussions/1942
  rewrites: {
    'home.md': 'index.md',
    'README.md': 'introduction.md',
    ':a*/README.md': ':a*/index.md',
    ':a*/:b*/README.md': ':a*/:b*/index.md',
    ':a*/:b*/:c*/README.md': ':a*/:b*/:c*/index.md'
  },
  themeConfig: {
    logo: 'favicon.png',
    outline: 'deep',
    outlineTitle: '大纲',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      pattern: 'https://github.com/2ndLA/English/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: '🇨🇳 🇬🇧 Second-language Acquisition',
      copyright: '© 2023-present <a href="https://github.com/2ndLA" target="_blank">2ndLA Team</a>. <a href="https://github.com/2ndLA/English/blob/main/LICENSE" target="_blank">CC-BY-SA-4.0</a>.'
    },
    nav: [
      { text: '🗺️ 2ndLA', link: 'https://github.com/2ndLA' }
    ],
    sidebar: sidebarData,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/2ndLA/English' }
    ]
  }
}
