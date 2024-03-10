import mdImageFigures from 'markdown-it-image-figures'
import mdTaskCheckbox from 'markdown-it-task-checkbox'

function appendImageFigures(md) {
  // usage: ![alt](https://link-to-image 'title'){.class}
  md.use(mdImageFigures, {
    figcaption: 'title',
    copyAttrs: '^class$'
  })
}

function renderTaskCheckbox(md) {
  md.use(mdTaskCheckbox, {
    disabled: true,
    divWrap: false,
    divClass: 'checkbox',
    idPrefix: 'cbx_',
    ulClass: 'task-list',
    liClass: 'task-list-item'
  })
}

function insertPostElements(md) {
  md.renderer.rules.heading_close = (tokens, idx, options, _env, self) => {
    let result = self.renderToken(tokens, idx, options)
    if (tokens[idx].markup === '#') {
      result += '\n\n<Description />\n\n'
    }
    return result
  }
}

export default function useMDItPlugins(md) {
  insertPostElements(md)
  appendImageFigures(md)
  renderTaskCheckbox(md)
}
