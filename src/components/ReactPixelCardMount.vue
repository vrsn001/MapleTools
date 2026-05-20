<script setup lang="ts">
import React from 'react';
import { createRoot } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import PixelCard from './PixelCard';

const props = withDefaults(defineProps<{
  variant?: string
  gap?: number
  speed?: number
  colors?: string
  noFocus?: boolean
}>(), {
  variant: 'pink',
  gap: undefined,
  speed: undefined,
  colors: undefined,
  noFocus: undefined,
});

const host = ref<HTMLElement | null>(null);
let root: ReturnType<typeof createRoot> | null = null;

function renderReact() {
  if (!root)
    return;

  root.render(
    React.createElement(PixelCard, {
      variant: props.variant,
      gap: props.gap,
      speed: props.speed,
      colors: props.colors,
      noFocus: props.noFocus,
    }, React.createElement('div', {
      style: {
        position: 'absolute',
        zIndex: 2,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 700,
        letterSpacing: '0.04em',
      },
    }, 'PixelCard')),
  );
}

onMounted(() => {
  if (!host.value)
    return;
  root = createRoot(host.value);
  renderReact();
});

watch(() => [props.variant, props.gap, props.speed, props.colors, props.noFocus], renderReact, { deep: true });

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>

<template>
  <div ref="host" />
</template>
