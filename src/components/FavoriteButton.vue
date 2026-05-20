<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { useToolStore } from '@/tools/tools.store';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool }>();

const toolStore = useToolStore();
const theme = useThemeVars();

const { tool } = toRefs(props);

const isFavorite = computed(() => toolStore.isToolFavorite({ tool }));

function toggleFavorite(event: MouseEvent) {
  event.preventDefault();

  if (toolStore.isToolFavorite({ tool })) {
    toolStore.removeToolFromFavorites({ tool });
    return;
  }

  toolStore.addToolToFavorites({ tool });
}
</script>

<template>
  <c-tooltip :tooltip="isFavorite ? $t('favoriteButton.remove') : $t('favoriteButton.add') ">
    <c-button
      variant="text"
      circle
      class="favorite-btn"
      :class="{ 'favorite-btn--active': isFavorite }"
      @click="toggleFavorite"
    >
      <icon-mdi-heart
        :style="isFavorite ? { color: theme.primaryColor } : undefined"
      />
    </c-button>
  </c-tooltip>
</template>

<style scoped lang="less">
.favorite-btn {
  opacity: 0.35;
  transition: opacity 0.15s, transform 0.15s;

  &:hover {
    opacity: 0.85;
    transform: scale(1.08);
  }

  &--active {
    opacity: 1;
  }
}
</style>
