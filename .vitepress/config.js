import path from 'path'
import sidebarData from './gitbooktoc'
import gtagConfig from './gtag'
import { tokenize } from './search'

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
        href: path.join(urlBase || '/', 'favicon.png')
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
    'HOME.md': 'index.md',
    'README.md': 'introduction.md',
    ':z/:a/README.md': ':a/index.md',
    ':z/:a/:b/README.md': ':a/:b/index.md',
    ':z/:a/:b*': ':a/:b*'
  },
  themeConfig: {
    logo: 'favicon.png',
    outline: 'deep',
    outlineTitle: '大纲',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      pattern: 'https://github.com/2ndLA/English/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '🇨🇳 🇬🇧 Second-language Acquisition',
      copyright: '© 2023-present <a href="https://github.com/2ndLA" target="_blank">2ndLA Team</a>. <a href="https://github.com/2ndLA/English/blob/main/LICENSE" target="_blank">CC BY-NC-SA 4.0</a>.'
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    nav: [
      { text: '🗺️ 2ndLA', link: 'https://github.com/2ndLA' }
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          // https://lucaong.github.io/minisearch/modules/MiniSearch.html
          options: {
            tokenize
          },
          searchOptions: {
            fuzzy: 0.1,
            prefix: true,
            boost: {
              title: 4,
              text: 2
            },
            combineWith: 'AND'
          }
        }
      }
    },
    sidebar: sidebarData,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/2ndLA/English' }
    ]
  }
}
