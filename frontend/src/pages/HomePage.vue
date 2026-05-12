<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useContent } from "../composables/useContent";
import { productSlugs } from "../constants/products";
import { useSettingsStore } from "../stores/settings";

const { t } = useI18n();
const { loading, loadError, content, qrValue } = useContent();
const settingsStore = useSettingsStore();
const isDarkTheme = computed(() => settingsStore.themeMode === "dark");

const productCards = computed(() =>
  productSlugs.map((slug) => ({
    slug,
    title: t(`products.${slug}.name`),
    short: t(`products.${slug}.short`),
    lead: t(`products.${slug}.heroLead`),
  })),
);

const featuredSlides = computed(() => {
  if (Array.isArray(content.value.featuredSlides) && content.value.featuredSlides.length) {
    return content.value.featuredSlides;
  }
  return productCards.value.slice(0, 3).map((card, index) => ({
    productSlug: card.slug,
    title: card.title,
    description: card.lead,
    imageUrl: `https://placehold.co/1200x520/6f5bff/ffffff?text=Insurance+Slide+${index + 1}`,
  }));
});
</script>

<template>
  <n-layout-content :class="['home', { 'home--dark': isDarkTheme }]">
    <n-spin :show="loading">
      <n-space vertical :size="18">
        <n-alert v-if="loadError" type="warning">{{ loadError }}</n-alert>

        <n-card class="page-intro" :bordered="false">
          <n-space justify="space-between" align="end" wrap>
            <n-space vertical :size="8">
              <n-h1 class="intro-title">{{ t("home.productGridTitle") }}</n-h1>
              <n-text depth="3">{{ t("home.productGridSubtitle") }}</n-text>
            </n-space>
            <n-button type="primary" secondary tag="a" href="#products-grid">
              {{ t("home.exploreAll") }}
            </n-button>
          </n-space>
        </n-card>

        <n-card :title="t('home.featuredTitle')" class="surface-card" :bordered="false">
          <template #header-extra>
            <n-text depth="3">{{ t("home.featuredSubtitle") }}</n-text>
          </template>
          <n-carousel class="featured-slider" autoplay draggable dot-type="line">
            <div
              v-for="slide in featuredSlides"
              :key="`featured-${slide.title}`"
              class="carousel-slide"
            >
              <div class="carousel-card">
                <div
                  class="carousel-image-layer"
                  :style="{ backgroundImage: `url(${slide.imageUrl})` }"
                />
                <div class="carousel-surface-veil" />
                <div class="carousel-overlay-card">
                  <n-space vertical :size="10" align="center" class="carousel-content">
                    <n-h3 class="slide-title">{{ slide.title }}</n-h3>
                    <n-text class="carousel-text">{{ slide.description }}</n-text>
                    <router-link :to="`/products/${slide.productSlug || 'auto'}`">
                      <n-button type="primary">{{ t("home.viewProduct") }}</n-button>
                    </router-link>
                  </n-space>
                </div>
              </div>
            </div>
          </n-carousel>
        </n-card>

        <n-card id="products-grid" class="surface-card" :title="t('home.productGridTitle')">
          <template #header-extra>
            <n-text depth="3">{{ t("home.productGridSubtitle") }}</n-text>
          </template>
          <div class="products-row">
            <div
              v-for="card in productCards"
              :key="card.slug"
              class="products-row-item"
            >
              <n-card class="product-card" hoverable>
                <n-space vertical :size="10">
                  <n-h3 class="product-title">{{ card.title }}</n-h3>
                  <n-text depth="2">{{ card.short }}</n-text>
                  <router-link :to="`/products/${card.slug}`">
                    <n-button type="primary" text>{{ t("home.viewProduct") }}</n-button>
                  </router-link>
                </n-space>
              </n-card>
            </div>
          </div>
        </n-card>

        <div class="widget-row">
          <n-card :title="t('home.sellingTitle')" class="surface-card compact-widget">
            <div class="offer-block">
              <div class="offer-text">
                <n-text>{{ t("home.sellingText") }}</n-text>
                <n-button
                  type="primary"
                  tag="a"
                  :href="content.selling.ctaUrl"
                  target="_blank"
                  style="margin-top: 12px"
                >
                  {{ t("home.ctaLabel") }}
                </n-button>
              </div>
              <div class="qr-slot">
                <n-qr-code :value="qrValue" :size="140" :padding="0" />
              </div>
            </div>
          </n-card>

          <n-card id="contact" :title="t('home.contactTitle')" class="surface-card compact-widget">
            <n-space vertical :size="6">
              <n-text>
                {{ t("home.contactPortalIntro") }}
                <n-text code>{{ content.contact.portalUrl }}</n-text>
              </n-text>
              <n-text>
                {{ t("home.contactLoginLabel") }}
                <n-text code>{{ content.contact.login }}</n-text>
              </n-text>
              <n-text>
                {{ t("home.contactPasswordLabel") }}
                <n-text code>{{ content.contact.password }}</n-text>
              </n-text>
            </n-space>
          </n-card>

          <n-alert type="default" class="compact-widget disclaimer-widget">
            {{ t("common.insuranceDisclaimer") }}
          </n-alert>
        </div>
      </n-space>
    </n-spin>
  </n-layout-content>
</template>

<style scoped>
.home {
  width: 100%;
}

.page-intro {
  margin-top: 4px;
  background: var(--surface-bg);
  border-radius: 18px;
}

.intro-title {
  margin: 0;
  font-size: 32px;
}

.surface-card {
  border-radius: 18px;
  box-shadow: none;
}

.featured-slider {
  --n-dot-color: rgba(111, 91, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
}

.carousel-slide {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 18px;
}

.carousel-card {
  width: 100%;
  min-height: 220px;
  border-radius: 18px;
  border: 1px solid rgba(111, 91, 255, 0.14);
  background: var(--n-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 22px;
  position: relative;
  overflow: hidden;
}

.carousel-image-layer {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  opacity: 0.55;
}

.carousel-surface-veil {
  position: absolute;
  inset: 0;
  background: rgba(238, 243, 251, 0.3);
}

.carousel-content {
  height: 100%;
  justify-content: center;
  text-align: center;
}

.carousel-overlay-card {
  position: relative;
  z-index: 1;
  width: min(560px, 100%);
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(14, 18, 30, 0.4);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.24);
}


.slide-title {
  margin: 0;
  color: rgba(255, 255, 255, 0.98);
}

.carousel-text {
  max-width: 560px;
  color: rgba(248, 250, 255, 0.94);
}

.product-title {
  margin: 0;
}

.product-card {
  border-radius: 14px;
}

.products-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
  gap: 12px;
}

.products-row-item {
  min-width: 0;
}

.offer-block {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
}

.offer-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.qr-slot {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 164px;
  height: 164px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid rgba(124, 137, 173, 0.2);
  background: var(--surface-bg);
  overflow: hidden;
}

.qr-slot :deep(canvas) {
  display: block;
  width: 140px !important;
  height: 140px !important;
}

.widget-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  justify-content: stretch;
  align-items: stretch;
}

.compact-widget {
  width: 100%;
}

.disclaimer-widget {
  display: flex;
  align-items: center;
  min-height: 120px;
}

.home :deep(.n-card) {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  border-color: rgba(124, 137, 173, 0.14);
  background: var(--surface-bg);
}

.home--dark .carousel-surface-veil {
  background: rgba(18, 27, 43, 0.28);
}


@media (max-width: 1280px) {
  .products-row {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
  }
}

@media (max-width: 860px) {
  .products-row {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
  }
}

@media (max-width: 560px) {
  .products-row {
    grid-template-columns: 1fr;
  }

  .offer-block {
    grid-template-columns: 1fr;
  }

  .qr-slot {
    justify-self: start;
  }
}
</style>
