<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; title: string }>();
const { icon, title } = toRefs(props);
</script>

<template>
  <c-card class="colored-card">
    <div class="colored-card-inner">
      <n-icon class="icon" size="36" :component="icon" />
      <h3 class="title">
        <n-ellipsis>{{ title }}</n-ellipsis>
      </h3>
      <div class="description">
        <n-ellipsis :line-clamp="3" :tooltip="false">
          <slot />
        </n-ellipsis>
      </div>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.colored-card {
  background: linear-gradient(135deg, #9a3412 0%, #e85d04 45%, #f97316 100%);
  color: #fff;
  border: none !important;
  box-shadow: 0 8px 32px rgba(232, 93, 4, 0.35) !important;

  .colored-card-inner {
    position: relative;
  }

  .icon {
    opacity: 0.9;
    margin-bottom: 8px;
  }

  .title {
    color: #fff;
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 600;
  }

  .description {
    opacity: 0.92;
    font-size: 14px;
    line-height: 1.5;

    ::v-deep(a) {
      color: inherit;
      text-decoration: underline;
      font-weight: 600;

      &:hover {
        color: #fff7ed;
      }
    }
  }
}
</style>
