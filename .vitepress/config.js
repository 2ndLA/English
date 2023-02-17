import sidebarData from './gitbooktoc'

export default {
  cleanUrls: true,
  description: 'An easy enough and comprehensive way to learn English.',
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
  rewrites: {
    'README.md': 'index.md',
    ':any*/README.md': ':any*/index.md'
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
