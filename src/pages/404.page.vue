<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'Page not found - Maple Tools' });
</script>

<template>
  <div class="not-found">
    <div class="not-found-code">
      404
    </div>
    <h1 class="not-found-title">
      {{ $t('404.notFound') }}
    </h1>
    <p class="not-found-text">
      {{ $t('404.sorry') }}
    </p>
    <p class="not-found-hint text-muted">
      {{ $t('404.maybe') }}
    </p>
    <c-button to="/" type="primary" class="not-found-btn">
      {{ $t('404.backHome') }}
    </c-button>
  </div>
</template>

<style scoped lang="less">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 24px;
  max-width: 420px;
  margin: 0 auto;
}

.not-found-code {
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, #e85d04, #f97316);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

.not-found-title {
  margin: 0 0 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--maple-text);
}

.not-found-text,
.not-found-hint {
  margin: 0 0 8px;
  font-size: 15px;
  line-height: 1.5;
}

.not-found-btn {
  margin-top: 24px;
}
</style>
