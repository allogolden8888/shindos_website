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
  age: 32,
  coverage: 40000,
  term: 15,
});

const premium = computed(() => {
  const base =
    form.coverage *
    (props.config.baseMonthlyRate || 0.0012) *
    (form.term / 10);
  const ageFactor = form.age > 40 ? props.config.ageFactorOver40 || 1.5 : 1;
  const termFactor = form.term > 15 ? props.config.termFactorOver15 || 1.2 : 1;
  return base * ageFactor * termFactor;
});
</script>

<template>
  <n-card :title="t('calculators.life.title')" size="small" bordered>
    <n-form label-placement="top">
      <n-form-item :label="t('calculators.life.age')">
        <n-slider v-model:value="form.age" :min="18" :max="70" />
      </n-form-item>
      <n-form-item :label="t('calculators.life.coverage')">
        <n-input-number v-model:value="form.coverage" :min="10000" :max="200000" />
      </n-form-item>
      <n-form-item :label="t('calculators.life.term')">
        <n-slider v-model:value="form.term" :min="5" :max="30" />
      </n-form-item>
      <n-alert type="info">
        {{ t("calculators.life.result") }}: {{ formatUsd(premium) }}
      </n-alert>
    </n-form>
  </n-card>
</template>
