<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = withDefaults(defineProps<{
  items?: string[]
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  itemClassName?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
}>(), {
  items: () => ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  showGradients: true,
  enableArrowNavigation: true,
  className: '',
  itemClassName: '',
  displayScrollbar: true,
  initialSelectedIndex: -1,
});

const emit = defineEmits<{
  itemSelect: [item: string, index: number]
}>();

const listRef = ref<HTMLElement | null>(null);
const selectedIndex = ref(props.initialSelectedIndex);
const topGradientOpacity = ref(0);
const bottomGradientOpacity = ref(1);
const keyboardNav = ref(false);

const containerClass = computed(() => `scroll-list-container ${props.className}`.trim());
const listClass = computed(() => `scroll-list ${!props.displayScrollbar ? 'no-scrollbar' : ''}`.trim());

function handleItemMouseEnter(index: number) {
  selectedIndex.value = index;
}

function handleItemClick(item: string, index: number) {
  selectedIndex.value = index;
  emit('itemSelect', item, index);
}

function handleScroll(e: Event) {
  const target = e.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;
  topGradientOpacity.value = Math.min(scrollTop / 50, 1);
  const bottomDistance = scrollHeight - (scrollTop + clientHeight);
  bottomGradientOpacity.value = scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1);
}

function onKeyDown(e: KeyboardEvent) {
  if (!props.enableArrowNavigation)
    return;

  if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
    e.preventDefault();
    keyboardNav.value = true;
    selectedIndex.value = Math.min(selectedIndex.value + 1, props.items.length - 1);
  }
  else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
    e.preventDefault();
    keyboardNav.value = true;
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  }
  else if (e.key === 'Enter' && selectedIndex.value >= 0 && selectedIndex.value < props.items.length) {
    e.preventDefault();
    emit('itemSelect', props.items[selectedIndex.value], selectedIndex.value);
  }
}

function scrollSelectedIntoView() {
  if (!keyboardNav.value || selectedIndex.value < 0 || !listRef.value)
    return;

  const container = listRef.value;
  const selectedItem = container.querySelector(`[data-index="${selectedIndex.value}"]`) as HTMLElement | null;
  if (!selectedItem)
    return;

  const extraMargin = 50;
  const containerScrollTop = container.scrollTop;
  const containerHeight = container.clientHeight;
  const itemTop = selectedItem.offsetTop;
  const itemBottom = itemTop + selectedItem.offsetHeight;

  if (itemTop < containerScrollTop + extraMargin) {
    container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
  }
  else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
    container.scrollTo({ top: itemBottom - containerHeight + extraMargin, behavior: 'smooth' });
  }

  keyboardNav.value = false;
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown);
});

watch(selectedIndex, () => {
  scrollSelectedIntoView();
});
</script>

<template>
  <div :class="containerClass">
    <div ref="listRef" :class="listClass" @scroll="handleScroll">
      <div
        v-for="(item, index) in props.items"
        :key="`${item}-${index}`"
        :data-index="index"
        class="animated-list-item"
        style="margin-bottom: 1rem; cursor: pointer; animation-delay: 80ms"
        @mouseenter="handleItemMouseEnter(index)"
        @click="handleItemClick(item, index)"
      >
        <div :class="`item ${selectedIndex === index ? 'selected' : ''} ${props.itemClassName}`">
          <p class="item-text">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <template v-if="props.showGradients">
      <div class="top-gradient" :style="{ opacity: topGradientOpacity }" />
      <div class="bottom-gradient" :style="{ opacity: bottomGradientOpacity }" />
    </template>
  </div>
</template>

<style scoped src="./AnimatedList.css"></style>
<style scoped>
.animated-list-item {
  opacity: 0;
  transform: scale(0.7);
  animation: list-item-in 0.2s ease forwards;
}

@keyframes list-item-in {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
