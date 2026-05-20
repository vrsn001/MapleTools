<script setup lang="ts">
import React from 'react';
import { createRoot } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Aurora from './Aurora';

const props = withDefaults(defineProps<{
  colorStops?: [string, string, string]
  blend?: number
  amplitude?: number
  speed?: number
  height?: string
}>(), {
  colorStops: () => ['#7cff67', '#B497CF', '#5227FF'],
  blend: 0.5,
  amplitude: 1,
  speed: 0.5,
  height: '280px',
});

const host = ref<HTMLElement | null>(null);
let root: ReturnType<typeof createRoot> | null = null;

function renderReact() {
  if (!root)
    return;
  root.render(
    React.createElement('div', { style: { width: '100%', height: props.height } },
      React.createElement(Aurora, {
        colorStops: props.colorStops,
        blend: props.blend,
        amplitude: props.amplitude,
        speed: props.speed,
      })),
  );
}

onMounted(() => {
  if (!host.value)
    return;
  root = createRoot(host.value);
  renderReact();
});

watch(() => [props.colorStops, props.blend, props.amplitude, props.speed, props.height], renderReact, { deep: true });

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>

<template>
  <div ref="host" />
</template>
