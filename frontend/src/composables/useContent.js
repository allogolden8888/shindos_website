import { computed, onMounted, ref } from "vue";
import { fetchContent } from "../api/content";
import { defaultContent } from "../constants/defaultContent";

export function useContent() {
  const loading = ref(true);
  const loadError = ref("");
  const content = ref(defaultContent);

  const qrValue = computed(
    () => content.value.selling?.qrUrl || defaultContent.selling.qrUrl,
  );

  onMounted(async () => {
    try {
      const remoteContent = await fetchContent();
      content.value = {
        ...defaultContent,
        ...remoteContent,
        hero: {
          ...defaultContent.hero,
          ...remoteContent.hero,
        },
        selling: {
          ...defaultContent.selling,
          ...remoteContent.selling,
        },
        contact: {
          ...defaultContent.contact,
          ...remoteContent.contact,
        },
        calculators: {
          ...defaultContent.calculators,
          ...remoteContent.calculators,
        },
      };
    } catch (error) {
      loadError.value =
        import.meta.env.VITE_CONTENT_SOURCE === "static"
          ? "Could not load content.json — check that public/content.json exists and base path is correct."
          : "Content API unavailable, fallback values are displayed.";
    } finally {
      loading.value = false;
    }
  });

  return {
    loading,
    loadError,
    content,
    qrValue,
  };
}
