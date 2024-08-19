<script setup>
import { ref } from 'vue';
import ImageEditor from './imageEditor.vue';
import TheWelcome from '../components/WelcomeItem.vue';
const showEditor = ref(false);
const imageUrl = ref('src/assets/test.png');
const originalClassName = ref('image-class');
const initialRotation = ref(0);
const initialZoom = ref(100);

const openEditor = () => {
  showEditor.value = true;
};

const handleCancel = () => {
  showEditor.value = false;
};

const handleSave = (data) => {
  console.log('Saved data:', data);
  showEditor.value = false;
  // Apply rotation and zoom to the image here if needed
};
</script>

<template>
  <div>
    <TheWelcome :count="2" />
  </div>
</template>
