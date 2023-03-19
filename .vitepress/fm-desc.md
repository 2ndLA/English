<!-- markdownlint-disable -->
<p :class="$style.description"></p>

<style module>
.description {
  color: #8899a8;
  font-size: 20px;
  padding-bottom: 10px;
}
</style>

<script>
export default {
  mounted () {
    document.querySelector(`.${this.$style.description}`)
      .textContent = document.querySelector('meta[name="description"]').content
  }
}
</script>
