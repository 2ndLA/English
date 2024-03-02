<template>
    <p
        v-if="frontmatter.description"
        :class="$style.description"
    >{{ frontmatter.description }}
    </p>
</template>
  
<script lang="ts" setup>
import { useData } from "vitepress";

const { frontmatter } = useData();
</script>
  
<style module scoped>
.description {
    color: #8899a8;
    font-size: 20px;
    padding-bottom: 10px;
}
</style>
  