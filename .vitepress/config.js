import sidebarData from './gitbooktoc'

export default {
  base: '/English/',
  cleanUrls: true,
  description: 'An easy and comprehensive way to learn English.',
  lastUpdated: true,
  srcDir: '.',
  title: 'The English Learner',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' }]
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
    'README.md': 'index.md',
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
      copyright: 'Contributed by 2ndLA@GitHub © Since 2023'
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
