import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { darkTheme } from "naive-ui";

export const useSettingsStore = defineStore("settings", () => {
  const themeMode = ref("light");
  const language = ref("en");

  const naiveTheme = computed(() =>
    themeMode.value === "dark" ? darkTheme : null,
  );

  function setTheme(mode) {
    themeMode.value = mode;
  }

  function toggleTheme() {
    themeMode.value = themeMode.value === "light" ? "dark" : "light";
  }

  function setLanguage(locale) {
    language.value = locale;
  }

  return {
    themeMode,
    language,
    naiveTheme,
    setTheme,
    toggleTheme,
    setLanguage,
  };
});
