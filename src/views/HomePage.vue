<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push("/shopping-lists")
})

</script>

<template>
  <main>
    <h1>This is the homepage</h1>
  </main>
</template>
