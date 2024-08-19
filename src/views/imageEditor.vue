<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div :class="originalClassName" class="image-container">
        <vue-cropper ref="cropper" :src="imageUrl" :aspect-ratio="1" :view-mode="1" />
      </div>
      <div class="controls">
        <div class="rotation-controls">
          <button @click="resetRotation">重置旋转</button>
          <button @click="rotateLeft90">向左旋转90度</button>
          <button @click="rotateLeft1">向左旋转1度</button>
          <div v-if="isDraggingRotation" class="rotation-display" :style="rotationDisplayStyle">{{ rotation }}°</div>
          <a-slider
            v-model:step="rotation"
            min="-180"
            max="180"
            :tooltipVisible="false"
            @input="updateRotationDisplay"
            @mousedown="startDraggingRotation"
            @mouseup="stopDraggingRotation" />
          <button @click="rotateRight1">向右旋转1度</button>
          <button @click="rotateRight90">向右旋转90度</button>
        </div>
        <div class="zoom-controls">
          <button @click="resetZoom">重置缩放</button>
          <button @click="zoomIn">放大</button>
          <div v-if="isDraggingZoom" class="zoom-display" :style="zoomDisplayStyle">{{ zoom }}%</div>
          <input
            type="range"
            v-model="zoom"
            min="5"
            max="800"
            @input="applyZoom"
            @mousedown="startDraggingZoom"
            @mouseup="stopDraggingZoom"
            @touchstart="startDraggingZoom"
            @touchend="stopDraggingZoom"
            @mousemove="updateZoomDisplay"
            @touchmove="updateZoomDisplay" />
          <button @click="zoomOut">缩小</button>
        </div>
      </div>
      <div class="modal-actions">
        <button class="action-button cancel" @click="closeModal">取消</button>
        <button class="action-button save" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue';
import { Slider } from '@arco-design/web-vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
const emit = defineEmits(['cancel', 'save']);
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  initialRotation: {
    type: Number,
    default: 0,
  },
  initialZoom: {
    type: Number,
    default: 100,
  },
  originalClassName: {
    type: String,
    default: '',
  },
});

const rotation = ref(props.initialRotation);
const zoom = ref(props.initialZoom);
const isDraggingRotation = ref(false);
const isDraggingZoom = ref(false);
const cropper = ref(null);
const rotationDisplayStyle = ref({});
const zoomDisplayStyle = ref({});

const applyRotation = () => {
  if (cropper.value) {
    cropper.value.rotateTo(rotation.value);
    cropper.value.zoomTo(zoom.value / 100); // Ensure the zoom is reapplied
  }
};

const applyZoom = () => {
  if (cropper.value) {
    cropper.value.zoomTo(zoom.value / 100);
    cropper.value.rotateTo(rotation.value); // Ensure the rotation is reapplied
  }
};

const resetRotation = () => {
  rotation.value = 0;
  applyRotation();
};

const resetZoom = () => {
  zoom.value = 100;
  applyZoom();
};

const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 10, 800);
  applyZoom();
};

const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 10, 5);
  applyZoom();
};

const rotateLeft90 = () => {
  rotation.value -= 90;
  applyRotation();
};

const rotateLeft1 = () => {
  rotation.value -= 1;
  applyRotation();
};

const rotateRight1 = () => {
  rotation.value += 1;
  applyRotation();
};

const rotateRight90 = () => {
  rotation.value += 90;
  applyRotation();
};

const startDraggingRotation = (event) => {
  isDraggingRotation.value = true;
  updateRotationDisplay(event);
};

const stopDraggingRotation = () => {
  isDraggingRotation.value = false;
};

const startDraggingZoom = (event) => {
  isDraggingZoom.value = true;
  updateZoomDisplay(event);
};

const stopDraggingZoom = () => {
  isDraggingZoom.value = false;
};

const updateRotationDisplay = (event) => {
  if (isDraggingRotation.value) {
    const input = event.target;
    const inputRect = input.getBoundingClientRect();
    const inputWidth = inputRect.width;
    const thumbSize = 20; // Adjust according to the actual thumb size
    const offset = ((rotation.value + 180) / 360) * (inputWidth - thumbSize) + thumbSize / 2;

    rotationDisplayStyle.value = {
      left: `${offset}px`,
      top: `-30px`,
    };
  }
};

const updateZoomDisplay = (event) => {
  if (isDraggingZoom.value) {
    const input = event.target;
    const inputRect = input.getBoundingClientRect();
    const inputHeight = inputRect.height;
    const thumbSize = 20; // Adjust according to the actual thumb size
    const offset = ((zoom.value - 5) / 795) * (inputHeight - thumbSize) + thumbSize / 2;

    zoomDisplayStyle.value = {
      left: `-${thumbSize + 20}px`,
      top: `${offset}px`,
    };
  }
};

const closeModal = () => {
  emit('cancel');
};

const save = () => {
  const rotationValue = rotation.value;
  const zoomValue = zoom.value;
  emit('save', { rotation: rotationValue, zoom: zoomValue });
};

watch(
  () => props.initialRotation,
  (newVal) => {
    rotation.value = newVal;
    applyRotation();
  }
);

watch(
  () => props.initialZoom,
  (newZoom) => {
    zoom.value = newZoom;
    applyZoom();
  }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;

  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.rotation-controls,
.zoom-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.rotation-controls button,
.zoom-controls button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}

.rotation-controls input[type='range'],
.zoom-controls input[type='range'] {
  width: 300px;
  margin: 0 10px;
}

.rotation-display,
.zoom-display {
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  position: absolute;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.action-button.cancel {
  background-color: #777;
  color: #fff;
}

.action-button.save {
  background-color: #333;
  color: #fff;
}
</style>
