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
  carValue: 12000,
  age: 28,
  experience: 5,
});

const premium = computed(() => {
  const base = form.carValue * (props.config.baseRate || 0.03);
  const ageFactor = form.age < 25 ? props.config.ageFactorUnder25 || 1.25 : 1;
  const expFactor = form.experience < 3 ? props.config.expFactorUnder3 || 1.2 : 1;
  return base * ageFactor * expFactor;
});
</script>

<template>
  <n-card :title="t('calculators.auto.title')" size="small" bordered>
    <n-form label-placement="top">
      <n-form-item :label="t('calculators.auto.carValue')">
        <n-input-number v-model:value="form.carValue" :min="1000" :max="150000" />
      </n-form-item>
      <n-form-item :label="t('calculators.auto.age')">
        <n-slider v-model:value="form.age" :min="18" :max="75" />
      </n-form-item>
      <n-form-item :label="t('calculators.auto.experience')">
        <n-slider v-model:value="form.experience" :min="0" :max="40" />
      </n-form-item>
      <n-alert type="info">
        {{ t("calculators.auto.result") }}: {{ formatUsd(premium) }}
      </n-alert>
    </n-form>
  </n-card>
</template>
