<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { Heart, Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="brand-header">
        <div class="brand-logo">
          <span class="brand-logo-icon">🍁</span>
        </div>
        <div class="brand-text">
          <div class="brand-title">
            Maple Tools
          </div>
          <div class="brand-subtitle">
            {{ $t('home.subtitle') }}
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div>
            Maple Tools
            <c-link target="_blank" rel="noopener" :href="`https://github.com/CorentinTh/it-tools/tree/v${version}`">
              v{{ version }}
            </c-link>
            <template v-if="commitSha && commitSha.length > 0">
              —
              <c-link
                target="_blank"
                rel="noopener"
                type="primary"
                :href="`https://github.com/CorentinTh/it-tools/tree/${commitSha}`"
              >
                {{ commitSha }}
              </c-link>
            </template>
          </div>
          <div class="footer-credit">
            Based on
            <c-link target="_blank" rel="noopener" href="https://it-tools.tech">
              IT Tools
            </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <header class="top-bar">
        <c-button
          circle
          variant="text"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon size="22" :component="Menu2" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
            <NIcon size="22" :component="Home2" />
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
          <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
            <icon-mdi:brush-variant text-20px />
          </c-button>
        </c-tooltip>

        <command-palette class="top-bar-search" />

        <locale-selector v-if="!styleStore.isSmallScreen" />

        <div class="top-bar-actions">
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>

        <c-tooltip position="bottom" :tooltip="$t('home.support')">
          <c-button
            round
            href="https://www.buymeacoffee.com/cthmsst"
            rel="noopener"
            target="_blank"
            class="support-button"
            :bordered="false"
            @click="() => tracker.trackEvent({ eventName: 'Support button clicked' })"
          >
            {{ $t('home.buyMeACoffee') }}
            <NIcon v-if="!styleStore.isSmallScreen" :component="Heart" ml-2 />
          </c-button>
        </c-tooltip>
      </header>
      <main class="main-content">
        <slot />
      </main>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.support-button {
  background: linear-gradient(135deg, #9a3412 0%, #e85d04 50%, #f97316 100%);
  color: #fff !important;
  border: none !important;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;

  &:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(232, 93, 4, 0.4);
  }
}

.footer {
  text-align: center;
  color: var(--maple-text-muted);
  margin-top: 24px;
  padding: 16px 12px;
  font-size: 12px;
  line-height: 1.6;
}

.footer-credit {
  margin-top: 4px;
  opacity: 0.85;
}

.sider-content {
  padding-top: 88px;
  padding-bottom: 120px;
}

.brand-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 14px;
  text-decoration: none;
  background: var(--maple-surface);
  border-bottom: 1px solid var(--maple-border);
}

.brand-logo {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #e85d04 0%, #f97316 100%);
  box-shadow: 0 4px 12px rgba(232, 93, 4, 0.35);
}

.brand-logo-icon {
  font-size: 22px;
  line-height: 1;
}

.brand-text {
  min-width: 0;
}

.brand-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--maple-text);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 11px;
  color: var(--maple-text-muted);
  margin-top: 2px;
  line-height: 1.3;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.top-bar-search {
  flex: 1;
  min-width: 160px;
  max-width: 420px;
}

.top-bar-actions {
  display: flex;
  align-items: center;
}

.main-content {
  min-height: 0;
}
</style>
