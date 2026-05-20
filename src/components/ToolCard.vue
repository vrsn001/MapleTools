<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
const theme = useThemeVars();
</script>

<template>
  <router-link :to="tool.path" class="tool-card-link">
    <c-card class="tool-card">
      <div class="tool-card-header">
        <div class="tool-card-icon" :style="{ backgroundColor: `${theme.primaryColor}18` }">
          <n-icon class="tool-card-icon-svg" size="28" :component="tool.icon" :color="theme.primaryColor" />
        </div>

        <div class="tool-card-actions">
          <div
            v-if="tool.isNew"
            class="tool-card-badge"
            :style="{ backgroundColor: theme.primaryColor }"
          >
            {{ $t('toolCard.new') }}
          </div>
          <FavoriteButton :tool="tool" />
        </div>
      </div>

      <h3 class="tool-card-title">
        {{ tool.name }}
      </h3>

      <p class="tool-card-description">
        {{ tool.description }}
      </p>

      <span class="tool-card-category text-muted">
        {{ tool.category }}
      </span>
    </c-card>
  </router-link>
</template>

<style scoped lang="less">
.tool-card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}

.tool-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--maple-border) !important;
  cursor: pointer;

  &:hover {
    border-color: var(--maple-primary) !important;
    box-shadow: var(--maple-card-shadow-hover);
    transform: translateY(-2px);
  }
}

.tool-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}

.tool-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.tool-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-card-badge {
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
}

.tool-card-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 600;
  color: var(--maple-text);
  line-height: 1.3;
}

.tool-card-description {
  margin: 0;
  flex: 1;
  font-size: 13px;
  line-height: 1.5;
  color: var(--maple-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-card-category {
  margin-top: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
</style>
