<!-- markdownlint-disable -->

<p :class="$style.description"></p>

<style module>
/* front matter description */
.description {
  color: #8899a8;
  font-size: 20px;
  padding-bottom: 10px;
}

/* image alt as subtitle */
.imgSubtitle {
  text-align: center;
}

.imgSubtitleText {
  color: #8899a8;
  font-size: 12px;
  font-weight: 400;
}
</style>

<script>
function renderImageAltAsSubtitle(ctx) {
  const imgElems = ctx.$el.querySelectorAll('img')
  imgElems.forEach((elem, index) => {
    if (elem.alt && !elem.alt.startsWith('Badge:')) {
      const elemId = `image-subtitle-${index}`
      const subtitle = `
        <div id="${elemId}" class="${ctx.$style.imgSubtitle}">
          <span class="${ctx.$style.imgSubtitleText}">${elem.alt}</span>
        </div>
      `
      // prevent duplicated insertion
      if (!document.getElementById(elemId)) {
        const parser = new DOMParser()
        const htmlDoc = parser.parseFromString(subtitle, 'text/html')
        const subtitleDiv = htmlDoc.body.firstChild
        elem.insertAdjacentElement('afterend', subtitleDiv)
      }
    }
  })
}

function renderFrontMatterDescription(ctx) {
  document.querySelector(`.${ctx.$style.description}`)
    .textContent = document.querySelector('meta[name="description"]').content
}

export default {
  mounted () {
    renderFrontMatterDescription(this)
    renderImageAltAsSubtitle(this)
  }
}
</script>
