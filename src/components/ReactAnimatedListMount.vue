<script setup lang="ts">
import { createRoot } from 'react-dom/client';
import React from 'react';
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import AnimatedList from './AnimatedList';

const props = withDefaults(defineProps<{
  items?: string[]
  showGradients?: boolean
  enableArrowNavigation?: boolean
  displayScrollbar?: boolean
}>(), {
  items: () => ['Item 1', 'Item 2', 'Item 3'],
  showGradients: true,
  enableArrowNavigation: true,
  displayScrollbar: true,
});

const host = ref<HTMLElement | null>(null);
let root: ReturnType<typeof createRoot> | null = null;

function renderReact() {
  if (!root)
    return;

  root.render(
    React.createElement(AnimatedList, {
      items: props.items,
      showGradients: props.showGradients,
      enableArrowNavigation: props.enableArrowNavigation,
      displayScrollbar: props.displayScrollbar,
      onItemSelect: (item: string, index: number) => {
        // eslint-disable-next-line no-console
        console.log('[React AnimatedList]', item, index);
      },
    }),
  );
}

onMounted(() => {
  if (!host.value)
    return;
  root = createRoot(host.value);
  renderReact();
});

watch(() => [props.items, props.showGradients, props.enableArrowNavigation, props.displayScrollbar], renderReact, { deep: true });

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>

<template>
  <div ref="host" />
</template>
