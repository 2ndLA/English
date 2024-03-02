import mdImageFigures from 'markdown-it-image-figures'
import mdTaskCheckbox from 'markdown-it-task-checkbox'

function appendImageFigures(md) {
  // usage: ![alt](https://link-to-image 'title'){.class}
  md.use(mdImageFigures, {
    figcaption: 'title',
    copyAttrs: '^class$'
  })
}

function taskCheckbox(md) {
  md.use(mdTaskCheckbox, {
    disabled: true,
    divWrap: false,
    divClass: 'checkbox',
    idPrefix: 'cbx_',
    ulClass: 'task-list',
    liClass: 'task-list-item'
  })
}

export default function useMDItPlugins(md) {
  appendImageFigures(md)
  taskCheckbox(md)
}
