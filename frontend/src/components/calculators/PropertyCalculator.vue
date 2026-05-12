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
  propertyValue: 40000,
  area: 80,
  securityLevel: "medium",
});

const premium = computed(() => {
  const base = form.propertyValue * (props.config.baseRate || 0.002);
  const areaFactor =
    form.area > 120 ? props.config.areaFactorOver120 || 1.1 : 1;
  const securityFactor =
    form.securityLevel === "high" ? props.config.securityHigh || 0.9 : 1;
  return base * areaFactor * securityFactor;
});

const securityOptions = computed(() => [
  { label: t("calculators.property.low"), value: "low" },
  { label: t("calculators.property.medium"), value: "medium" },
  { label: t("calculators.property.high"), value: "high" },
]);
</script>

<template>
  <n-card :title="t('calculators.property.title')" size="small" bordered>
    <n-form label-placement="top">
      <n-form-item :label="t('calculators.property.propertyValue')">
        <n-input-number
          v-model:value="form.propertyValue"
          :min="5000"
          :max="400000"
        />
      </n-form-item>
      <n-form-item :label="t('calculators.property.area')">
        <n-slider v-model:value="form.area" :min="20" :max="350" />
      </n-form-item>
      <n-form-item :label="t('calculators.property.securityLevel')">
        <n-select v-model:value="form.securityLevel" :options="securityOptions" />
      </n-form-item>
      <n-alert type="info">
        {{ t("calculators.property.result") }}: {{ formatUsd(premium) }}
      </n-alert>
    </n-form>
  </n-card>
</template>
