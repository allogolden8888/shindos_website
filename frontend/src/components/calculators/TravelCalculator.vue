<script setup>
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { formatUsd } from "../../utils/currency";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const form = reactive({
  days: 10,
  destination: "local",
  travelers: 1,
});

const premium = computed(() => {
  const base = (props.config.baseDaily || 1.5) * form.days * form.travelers;
  const destinationFactor =
    form.destination === "global" ? props.config.globalFactor || 1.7 : 1;
  return base * destinationFactor;
});

const destinationOptions = computed(() => [
  { label: t("calculators.travel.local"), value: "local" },
  { label: t("calculators.travel.global"), value: "global" },
]);
</script>

<template>
  <n-card :title="t('calculators.travel.title')" size="small" bordered>
    <n-form label-placement="top">
      <n-form-item :label="t('calculators.travel.days')">
        <n-slider v-model:value="form.days" :min="1" :max="60" />
      </n-form-item>
      <n-form-item :label="t('calculators.travel.destination')">
        <n-select v-model:value="form.destination" :options="destinationOptions" />
      </n-form-item>
      <n-form-item :label="t('calculators.travel.travelers')">
        <n-input-number v-model:value="form.travelers" :min="1" :max="10" />
      </n-form-item>
      <n-alert type="info">
        {{ t("calculators.travel.result") }}: {{ formatUsd(premium) }}
      </n-alert>
    </n-form>
  </n-card>
</template>
