<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useContent } from "../composables/useContent";
import { productCalculatorMap, productSlugs } from "../constants/products";
import { useSettingsStore } from "../stores/settings";
import AutoCalculator from "../components/calculators/AutoCalculator.vue";
import PropertyCalculator from "../components/calculators/PropertyCalculator.vue";
import HealthCalculator from "../components/calculators/HealthCalculator.vue";
import TravelCalculator from "../components/calculators/TravelCalculator.vue";
import LifeCalculator from "../components/calculators/LifeCalculator.vue";

const route = useRoute();
const { t, tm } = useI18n();
const { loading, loadError, content, qrValue } = useContent();
const settingsStore = useSettingsStore();

const calculatorComponents = {
  auto: AutoCalculator,
  property: PropertyCalculator,
  health: HealthCalculator,
  travel: TravelCalculator,
  life: LifeCalculator,
};

const slug = computed(() => String(route.params.slug || ""));
const isValidProduct = computed(() => productSlugs.includes(slug.value));
const productInfo = computed(() =>
  isValidProduct.value ? tm(`products.${slug.value}`) : null,
);
const calculatorKey = computed(() =>
  isValidProduct.value ? productCalculatorMap[slug.value] : "auto",
);
const currentCalculator = computed(
  () => calculatorComponents[calculatorKey.value] || AutoCalculator,
);
const isDarkTheme = computed(() => settingsStore.themeMode === "dark");
</script>

<template>
  <n-layout-content :class="['product-page', { 'product-page--dark': isDarkTheme }]">
    <n-spin :show="loading">
      <n-space vertical :size="18">
        <n-alert v-if="loadError" type="warning">{{ loadError }}</n-alert>

        <template v-if="isValidProduct && productInfo">
          <n-breadcrumb>
            <n-breadcrumb-item>
              <router-link to="/">{{ t("nav.home") }}</router-link>
            </n-breadcrumb-item>
            <n-breadcrumb-item>{{ productInfo.name }}</n-breadcrumb-item>
          </n-breadcrumb>

          <n-card embedded class="product-hero">
            <n-space vertical :size="10">
              <n-h1 class="page-title">{{ productInfo.name }}</n-h1>
              <n-text depth="2">{{ productInfo.heroLead }}</n-text>
              <div class="hero-points">
                <div
                  v-for="highlight in productInfo.highlights"
                  :key="highlight"
                  class="hero-point"
                >
                  <span class="hero-point-dot" />
                  <n-text depth="2">{{ highlight }}</n-text>
                </div>
              </div>
            </n-space>
          </n-card>

          <div class="widget-row widget-row--primary">
            <n-card class="product-widget" :title="t('productPage.statsTitle')">
              <n-space vertical :size="10">
                <n-card
                  v-for="stat in productInfo.stats"
                  :key="stat.label"
                  size="small"
                  embedded
                  class="mini-widget"
                >
                  <n-statistic :label="stat.label" :value="stat.value" />
                </n-card>
              </n-space>
            </n-card>

            <n-card class="product-widget" :title="t('productPage.calculateTitle')">
              <n-space vertical :size="12">
                <n-text depth="3">{{ t("productPage.calculateSubtitle") }}</n-text>
                <component
                  :is="currentCalculator"
                  :config="content.calculators[calculatorKey]"
                />
              </n-space>
            </n-card>
          </div>

          <div class="widget-row widget-row--secondary">
            <n-card class="product-widget" :title="t('productPage.whatCovered')">
              <n-list>
                <n-list-item
                  v-for="covered in productInfo.coverage"
                  :key="covered"
                >
                  {{ covered }}
                </n-list-item>
              </n-list>
            </n-card>

            <n-card class="product-widget" :title="t('productPage.requiredDocs')">
              <n-list>
                <n-list-item
                  v-for="doc in productInfo.documents"
                  :key="doc"
                >
                  {{ doc }}
                </n-list-item>
              </n-list>
            </n-card>

            <n-card class="product-widget" :title="t('productPage.stepsTitle')">
              <n-space vertical :size="8">
                <div
                  v-for="(step, index) in productInfo.steps"
                  :key="step"
                  class="mini-row"
                >
                  <n-tag round type="primary" size="small">{{ index + 1 }}</n-tag>
                  <n-text>{{ step }}</n-text>
                </div>
              </n-space>
            </n-card>

            <n-card class="product-widget" :title="t('productPage.faqTitle')">
              <n-collapse accordion>
                <n-collapse-item
                  v-for="item in productInfo.faq"
                  :key="item.question"
                  :title="item.question"
                  :name="item.question"
                >
                  <n-text depth="2">{{ item.answer }}</n-text>
                </n-collapse-item>
              </n-collapse>
            </n-card>
          </div>

          <n-card class="product-widget" :title="t('home.sellingTitle')">
            <div class="offer-block">
              <div class="offer-text">
                <n-text>{{ t("home.sellingText") }}</n-text>
                <n-button type="primary" tag="a" :href="content.selling.ctaUrl" target="_blank" style="margin-top: 12px">
                  {{ t("home.ctaLabel") }}
                </n-button>
              </div>
              <div class="qr-slot">
                <n-qr-code :value="qrValue" :size="140" :padding="0" />
              </div>
            </div>
          </n-card>

          <n-card id="contact" class="product-widget" :title="t('home.contactTitle')">
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
        </template>

        <n-result
          v-else
          status="404"
          :title="t('productPage.notFoundTitle')"
          :description="t('productPage.notFoundDescription')"
        >
          <template #footer>
            <router-link to="/">
              <n-button type="primary">{{ t("productPage.back") }}</n-button>
            </router-link>
          </template>
        </n-result>
      </n-space>
    </n-spin>
  </n-layout-content>
</template>

<style scoped>
.product-page {
  width: 100%;
}

.product-hero {
  background: var(--surface-bg);
  border: 1px solid rgba(121, 126, 157, 0.14);
  border-radius: 16px;
}

.product-hero :deep(.n-card__content) {
  padding: 28px 30px;
  max-width: 980px;
  margin: 0 auto;
}

.page-title {
  margin: 0;
  font-size: 36px;
}

.hero-points {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-point {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.45);
  width: fit-content;
  max-width: 100%;
}

.hero-point-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #6f5bff;
  flex: 0 0 7px;
}

.widget-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.widget-row--primary {
  grid-template-columns: 1fr 2fr;
  align-items: stretch;
}

.widget-row--secondary {
  grid-template-columns: repeat(4, minmax(220px, 1fr));
}

.product-widget {
  border-radius: 14px;
  border-color: rgba(124, 137, 173, 0.14);
  box-shadow: none;
}

.mini-widget {
  border-radius: 10px;
}

.mini-row {
  display: flex;
  align-items: center;
  gap: 8px;
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

.product-page :deep(.n-card) {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background: var(--surface-bg);
}

@media (max-width: 1200px) {
  .widget-row--primary,
  .widget-row--secondary {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 820px) {
  .widget-row--primary,
  .widget-row--secondary {
    grid-template-columns: 1fr;
  }

  .offer-block {
    grid-template-columns: 1fr;
  }

  .qr-slot {
    justify-self: start;
  }
}

.product-page--dark .product-hero {
  background: var(--surface-bg);
  border-color: rgba(158, 167, 190, 0.28);
}

.product-page--dark .hero-point {
  background: rgba(20, 24, 35, 0.6);
  border: 1px solid rgba(130, 139, 165, 0.2);
}

.product-page--dark .hero-point-dot {
  background: #a496ff;
}

.product-page--dark .product-widget {
  border-color: rgba(154, 167, 196, 0.22);
  box-shadow: none;
}
</style>
