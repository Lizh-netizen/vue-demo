import { watch } from 'vue';
<template>
  <div class="item">
    {{ count }}
    {{ doubleCount1 }}
    {{ doubleCount2 }}
    {{ doubleCount3 }}
    {{ doubleCount4 }}
    {{ doubleCount5 }}
  </div>
</template>

<script setup>
import { ref, watchEffect, computed, defineProps } from 'vue';
const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
});
const doubleCount1 = ref(props.count * 2);
const doubleCount2 = ref(0);
watchEffect(() => {
  doubleCount2.value = props.count * 2;
});
function useDouble3(count) {
  const dbc = ref(count * 2);
  watchEffect(() => {
    dbc.value = count * 2;
  });
  return dbc;
}
const doubleCount3 = useDouble3(props.count);
const doubleCount4 = computed(() => props.count * 2);
function useDouble5(count) {
  const dbc = computed(() => count * 2);
  return dbc;
}
const doubleCount5 = useDouble5(props.count);
</script>
<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
