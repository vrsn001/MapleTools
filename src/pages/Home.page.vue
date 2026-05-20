<script setup lang="ts">
import { IconDragDrop, IconHeart, IconTools } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ColoredCard from '../components/ColoredCard.vue';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { config } from '@/config';

const toolStore = useToolStore();

useHead({ title: 'Maple Tools — Handy online tools for developers' });
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);
const toolCount = computed(() => toolStore.tools.length);
const categoryCount = computed(() => toolStore.toolsByCategory.length);

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div class="home-page">
    <section class="home-hero">
      <div class="home-hero-badge">
        <n-icon :component="IconTools" size="16" />
        <span>{{ toolCount }} tools · {{ categoryCount }} categories</span>
      </div>
      <h1 class="home-hero-title">
        {{ $t('home.hero.title') }}
      </h1>
      <p class="home-hero-subtitle">
        {{ $t('home.hero.description') }}
      </p>
      <div class="home-hero-search">
        <command-palette />
      </div>
    </section>

    <div class="home-content">
      <div v-if="config.showBanner" class="home-banner">
        <ColoredCard :title="$t('home.follow.title')" :icon="IconHeart">
          {{ $t('home.follow.p1') }}
          <a
            href="https://github.com/CorentinTh/it-tools"
            rel="noopener"
            target="_blank"
            :aria-label="$t('home.follow.githubRepository')"
          >GitHub</a>
          {{ $t('home.follow.p2') }}
          <a
            href="https://x.com/ittoolsdottech"
            rel="noopener"
            target="_blank"
            :aria-label="$t('home.follow.twitterXAccount')"
          >X</a>.
          {{ $t('home.follow.thankYou') }}
          <n-icon :component="IconHeart" />
        </ColoredCard>
      </div>

      <transition name="height">
        <section v-if="toolStore.favoriteTools.length > 0" class="home-section">
          <h2 class="section-heading">
            {{ $t('home.categories.favoriteTools') }}
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
              <n-icon :component="IconDragDrop" size="18" class="section-icon" />
            </c-tooltip>
          </h2>
          <Draggable
            :list="favoriteTools"
            class="tools-grid"
            ghost-class="ghost-favorites-draggable"
            item-key="name"
            @end="onUpdateFavoriteTools"
          >
            <template #item="{ element: tool }">
              <ToolCard :tool="tool" />
            </template>
          </Draggable>
        </section>
      </transition>

      <section v-if="toolStore.newTools.length > 0" class="home-section">
        <h2 class="section-heading">
          {{ t('home.categories.newestTools') }}
        </h2>
        <div class="tools-grid">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
        </div>
      </section>

      <section
        v-for="category in toolStore.toolsByCategory"
        :key="category.name"
        class="home-section"
      >
        <h2 class="section-heading">
          {{ category.name }}
          <span class="section-count">{{ category.components.length }}</span>
        </h2>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in category.components"
            :key="tool.path"
            :tool="tool"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-page {
  max-width: 1280px;
  margin: 0 auto;
}

.home-hero {
  text-align: center;
  padding: 32px 16px 40px;
  margin-bottom: 8px;
}

.home-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--maple-primary);
  background: var(--maple-primary-faded);
  margin-bottom: 20px;
}

.home-hero-title {
  margin: 0 0 12px;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--maple-text);
  line-height: 1.15;
}

.home-hero-subtitle {
  margin: 0 auto 28px;
  max-width: 520px;
  font-size: 17px;
  line-height: 1.55;
  color: var(--maple-text-muted);
}

.home-hero-search {
  max-width: 480px;
  margin: 0 auto;
}

.home-content {
  padding: 0 4px 48px;
}

.home-banner {
  max-width: 420px;
  margin-bottom: 8px;
}

.home-section {
  margin-top: 36px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 600;
  color: var(--maple-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-icon {
  opacity: 0.6;
}

.section-count {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--maple-primary-faded);
  color: var(--maple-primary);
  text-transform: none;
  letter-spacing: 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.ghost-favorites-draggable {
  opacity: 0.5;
  border: 2px dashed var(--maple-primary) !important;
  box-shadow: var(--maple-card-shadow-hover);
  transform: scale(1.02);
}
</style>
