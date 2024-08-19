<template>
  <div class="about">
    <img :src="src" />
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
const src = 'https://orange-odos.oss-cn-hangzhou.aliyuncs.com/2024/07/30/Cover_20240730072616A175.jpeg';
async function imageUrlToBlob(imageUrl) {
  return fetch(imageUrl).then((response) => response.blob()); // 将响应内容转换为Blob
}
imageUrlToBlob(src);
</script>
<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
