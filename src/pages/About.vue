<script setup lang="ts">
import { useHead } from '@vueuse/head';
import AnimatedListVue from '@/components/AnimatedListVue.vue';
import ReactAuroraMount from '@/components/ReactAuroraMount.vue';
import ReactAnimatedListMount from '@/components/ReactAnimatedListMount.vue';
import ReactPixelCardMount from '@/components/ReactPixelCardMount.vue';

useHead({ title: 'About - Maple Tools' });

const demoItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

function logSelection(item: string, index: number) {
  // eslint-disable-next-line no-console
  console.log('[Vue AnimatedList]', item, index);
}
</script>

<template>
  <div class="about-aurora-wrap">
    <div class="about-aurora-bg">
      <ReactAuroraMount
        :color-stops="['#7cff67', '#B497CF', '#5227FF']"
        :blend="0.5"
        :amplitude="1.0"
        :speed="0.5"
        height="100%"
      />
    </div>
    <div class="about-content" mx-auto mt-50px max-w-900px>
      <c-markdown :markdown="$t('about.content')" max-w-600px />

      <h2 text-24px font-700 mt-40px mb-16px>
        PixelCard (React Embedded)
      </h2>
      <div flex justify-center py-8px>
        <ReactPixelCardMount variant="pink" />
      </div>

      <h2 text-24px font-700 mt-40px mb-16px>
        AnimatedList (Vue Native)
      </h2>
      <AnimatedListVue
        :items="demoItems"
        :show-gradients="true"
        :enable-arrow-navigation="true"
        :display-scrollbar="true"
        @item-select="logSelection"
      />

      <h2 text-24px font-700 mt-40px mb-16px>
        AnimatedList (React Embedded)
      </h2>
      <ReactAnimatedListMount
        :items="demoItems"
        :show-gradients="true"
        :enable-arrow-navigation="true"
        :display-scrollbar="true"
      />
    </div>
  </div>
</template>

<style scoped>
.about-aurora-wrap {
  position: relative;
  min-height: calc(100vh - 120px);
  border-radius: 18px;
  overflow: hidden;
}

.about-aurora-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.75;
}

.about-content {
  position: relative;
  z-index: 1;
  padding: 24px;
  backdrop-filter: blur(1px);
}
</style>
