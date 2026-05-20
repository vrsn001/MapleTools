<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} - Maple Tools`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
</script>

<template>
  <BaseLayout>
    <header class="tool-header">
      <div class="tool-header-top">
        <h1 class="tool-title">
          {{ toolTitle }}
        </h1>
        <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
      </div>
      <p class="tool-description">
        {{ toolDescription }}
      </p>
    </header>

    <div class="tool-content">
      <slot />
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;

  ::v-deep(& > *) {
    flex: 0 1 600px;
  }
}

.tool-header {
  max-width: 640px;
  margin: 0 auto 32px;
  padding: 24px 0 0;
  width: 100%;
  box-sizing: border-box;
}

.tool-header-top {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.tool-title {
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--maple-text);
  line-height: 1.2;
}

.tool-description {
  margin: 12px 0 0;
  font-size: 16px;
  line-height: 1.55;
  color: var(--maple-text-muted);
  max-width: 56ch;
}
</style>
