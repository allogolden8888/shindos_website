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
  age: 30,
  planType: "comfort",
  hasChronic: "no",
});

const planFactors = {
  basic: 1,
  comfort: 1.35,
  premium: 1.7,
};

const premium = computed(() => {
  const base = props.config.baseMonthly || 18;
  const ageFactor = form.age > 45 ? props.config.ageFactorOver45 || 1.35 : 1;
  const chronicFactor =
    form.hasChronic === "yes" ? props.config.chronicFactor || 1.4 : 1;
  return base * planFactors[form.planType] * ageFactor * chronicFactor;
});

const planOptions = computed(() => [
  { label: t("calculators.health.basic"), value: "basic" },
  { label: t("calculators.health.comfort"), value: "comfort" },
  { label: t("calculators.health.premium"), value: "premium" },
]);

const yesNoOptions = computed(() => [
  { label: t("calculators.health.no"), value: "no" },
  { label: t("calculators.health.yes"), value: "yes" },
]);
</script>

<template>
  <n-card :title="t('calculators.health.title')" size="small" bordered>
    <n-form label-placement="top">
      <n-form-item :label="t('calculators.health.age')">
        <n-slider v-model:value="form.age" :min="18" :max="75" />
      </n-form-item>
      <n-form-item :label="t('calculators.health.planType')">
        <n-select v-model:value="form.planType" :options="planOptions" />
      </n-form-item>
      <n-form-item :label="t('calculators.health.hasChronic')">
        <n-radio-group v-model:value="form.hasChronic">
          <n-space>
            <n-radio
              v-for="option in yesNoOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-alert type="info">
        {{ t("calculators.health.result") }}: {{ formatUsd(premium) }}
      </n-alert>
    </n-form>
  </n-card>
</template>
