<template>
  <div>
    <vue-cropper ref="cropper" src="src/assets/test.png" :aspect-ratio="1" :view-mode="1" />
    <div>
      <label>X: {{ cropBoxData.x }}</label>
      <input type="number" v-model="cropBoxData.x" @input="updateCropBox" />
      <label>Y: {{ cropBoxData.y }}</label>
      <input type="number" v-model="cropBoxData.y" @input="updateCropBox" />
      <label>Width: {{ cropBoxData.width }}</label>
      <input type="number" v-model="cropBoxData.width" @input="updateCropBox" />
      <label>Height: {{ cropBoxData.height }}</label>
      <input type="number" v-model="cropBoxData.height" @input="updateCropBox" />
    </div>
    <button @click="getCropBoxData">Get Crop Box Data</button>
    <div>
      <label>Rotate: {{ rotateValue }}°</label>
      <input type="range" min="0" max="360" v-model="rotateValue" @input="rotate" />
    </div>
    <div>
      <label>Zoom: {{ zoomValue }}</label>
      <input type="range" min="0.1" max="3" step="0.1" v-model="zoomValue" @input="zoom" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    VueCropper,
  },
  setup() {
    const imageUrl = ref('../assets/logo.svg');
    const rotateValue = ref(0);
    const zoomValue = ref(1);
    const cropper = ref(null);
    const cropBoxData = ref({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    const rotate = () => {
      cropper.value.rotateTo(rotateValue.value);
    };
    const fetchCropBoxData = async () => {
      try {
        setTimeout(() => {
          cropBoxData.value = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          };
          updateCropBox(); // 获取数据后更新裁剪框
        }, 1000);
      } catch (error) {
        console.error('Error fetching crop box data:', error);
      }
    };
    fetchCropBoxData();
    const zoom = () => {
      cropper.value.zoomTo(zoomValue.value);
    };
    const updateCropBox = () => {
      if (cropper.value) {
        cropper.value.setData({
          x: cropBoxData.value.x,
          y: cropBoxData.value.y,
          width: cropBoxData.value.width,
          height: cropBoxData.value.height,
        });
      }
    };
    const getCropBoxData = () => {
      if (cropper.value) {
        const data = cropper.value.getData();
        cropBoxData.value = {
          x: data.x,
          y: data.y,
          width: data.width,
          height: data.height,
        };
      }
    };
    return {
      imageUrl,
      rotateValue,
      zoomValue,
      cropper,
      rotate,
      zoom,
      getCropBoxData,
      cropBoxData,
      updateCropBox,
    };
  },
};
</script>
