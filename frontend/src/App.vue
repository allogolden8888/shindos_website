<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "./stores/settings";
import { productSlugs } from "./constants/products";

const settingsStore = useSettingsStore();
const { t, locale } = useI18n();
const route = useRoute();

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
  { label: "O'zbekcha", value: "uz" },
];

const themeIsDark = computed({
  get: () => settingsStore.themeMode === "dark",
  set: (value) => settingsStore.setTheme(value ? "dark" : "light"),
});
const isDarkTheme = computed(() => settingsStore.themeMode === "dark");
const themeOverrides = computed(() =>
  isDarkTheme.value
    ? {
        common: {
          primaryColor: "#8B7CFF",
          primaryColorHover: "#9A8EFF",
          primaryColorPressed: "#7363F5",
          primaryColorSuppl: "#8B7CFF",
          infoColor: "#8B7CFF",
          successColor: "#32C9A8",
          cardColor: "#121b2b",
          popoverColor: "#121b2b",
          modalColor: "#121b2b",
          borderRadius: "12px",
        },
      }
    : {
        common: {
          primaryColor: "#6F5BFF",
          primaryColorHover: "#7D6AFF",
          primaryColorPressed: "#5947E8",
          primaryColorSuppl: "#6F5BFF",
          infoColor: "#6F5BFF",
          successColor: "#1FBF9A",
          cardColor: "#edf2fa",
          popoverColor: "#ffffff",
          modalColor: "#ffffff",
          borderRadius: "12px",
        },
      },
);

const productMenu = computed(() =>
  productSlugs.map((slug) => ({
    slug,
    label: t(`nav.${slug}`),
    to: `/products/${slug}`,
  })),
);

const isHome = computed(() => route.path === "/");

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

watch(
  () => settingsStore.language,
  (newValue) => {
    locale.value = newValue;
  },
  { immediate: true },
);
</script>

<template>
  <n-config-provider :theme="settingsStore.naiveTheme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-layout position="absolute" class="app-shell">
      <n-layout-header :class="['app-header', { 'app-header--dark': isDarkTheme }]">
        <n-space vertical :size="10">
          <n-space justify="space-between" align="center" wrap>
            <n-space align="center" :size="12">
              <div>
                <n-text strong class="brand-title">{{ t("app.title") }}</n-text>
                <div>
                  <n-text depth="3" class="brand-subtitle">{{ t("app.subtitle") }}</n-text>
                </div>
              </div>
            </n-space>
            <n-space align="center">
              <n-button tertiary @click="scrollToContact">{{ t("app.contact") }}</n-button>
            </n-space>
          </n-space>

          <n-space justify="space-between" align="center" wrap>
            <n-space align="center" :size="8">
              <router-link to="/">
                <n-button :type="isHome ? 'primary' : 'default'" quaternary>
                  {{ t("nav.home") }}
                </n-button>
              </router-link>
              <router-link
                v-for="item in productMenu"
                :key="item.slug"
                :to="item.to"
              >
                <n-button
                  :type="route.path === item.to ? 'primary' : 'default'"
                  quaternary
                >
                  {{ item.label }}
                </n-button>
              </router-link>
            </n-space>

            <n-space align="center">
              <n-select
                :value="settingsStore.language"
                :options="languageOptions"
                style="width: 120px"
                @update:value="settingsStore.setLanguage"
              />
              <n-space align="center">
                <n-text depth="3">
                  {{ themeIsDark ? t("app.themeDark") : t("app.themeLight") }}
                </n-text>
                <n-switch
                  :value="themeIsDark"
                  @update:value="(value) => (themeIsDark = value)"
                />
              </n-space>
            </n-space>
          </n-space>
        </n-space>
      </n-layout-header>
      <n-layout-content :class="['app-content', { 'app-content--dark': isDarkTheme }]">
        <router-view />
      </n-layout-content>
      <n-layout-footer bordered class="app-footer">
        <n-text depth="3">© 2026 Shindos Insurance</n-text>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 12px 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(28, 31, 36, 0.08);
}

.app-header--dark {
  background: linear-gradient(180deg, rgba(24, 24, 28, 0.95), rgba(24, 24, 28, 0.85));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
}

.brand-subtitle {
  font-size: 12px;
}

.app-content {
  padding: 20px 20px 28px;
  background: #eef3fb;
  --page-bg: #eef3fb;
  --surface-bg: #f7f9ff;
  --surface-border: rgba(125, 140, 176, 0.16);
  --list-item-bg: rgba(247, 249, 255, 0.65);
  --list-item-hover: rgba(231, 238, 252, 0.85);
  transition: background 0.25s ease;
}

.app-content--dark {
  background: #121b2b;
  --page-bg: #121b2b;
  --surface-bg: #1a263a;
  --surface-border: rgba(149, 164, 194, 0.2);
  --list-item-bg: rgba(26, 38, 58, 0.72);
  --list-item-hover: rgba(34, 48, 72, 0.9);
}

.app-shell :deep(.n-layout),
.app-shell :deep(.n-layout-scroll-container) {
  background: var(--page-bg) !important;
}

.app-content :deep(.n-card) {
  background: var(--surface-bg) !important;
  border-color: var(--surface-border) !important;
  box-shadow: none;
}

.app-content--dark :deep(.n-card) {
  background: var(--surface-bg) !important;
  border-color: var(--surface-border) !important;
}

.app-content :deep(.n-card-header),
.app-content :deep(.n-card__content),
.app-content :deep(.n-card__footer) {
  background: transparent !important;
}

.app-content :deep(.n-alert) {
  background: var(--surface-bg) !important;
  border-color: var(--surface-border) !important;
}

.app-content :deep(.n-list-item) {
  background: var(--list-item-bg) !important;
  border-color: var(--surface-border) !important;
  border-radius: 8px;
  margin-bottom: 6px;
}

.app-content :deep(.n-list-item:hover) {
  background: var(--list-item-hover) !important;
}

.app-footer {
  padding: 14px 20px;
  background: var(--n-color);
}

a {
  text-decoration: none;
}
</style>
