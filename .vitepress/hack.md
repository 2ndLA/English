<!-- markdownlint-disable -->

<p :class="$style.description"></p>

<style module>
/* front matter description */
.description {
  color: #8899a8;
  font-size: 20px;
  padding-bottom: 10px;
}
</style>

<script>
function renderFrontMatterDescription(ctx) {
  document.querySelector(`.${ctx.$style.description}`)
    .textContent = document.querySelector('meta[name="description"]').content
}

export default {
  mounted () {
    renderFrontMatterDescription(this)
  }
}
</script>
