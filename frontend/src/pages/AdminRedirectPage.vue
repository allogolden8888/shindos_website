<script setup>
import { computed, onMounted } from "vue";

const backendBaseUrl =
  import.meta.env.VITE_ADMIN_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000";
const targetAdminUrl = computed(() => `${backendBaseUrl}/admin/login`);

onMounted(() => {
  window.location.assign(targetAdminUrl.value);
});
</script>

<template>
  <n-card title="Redirecting to admin panel">
    <n-space vertical>
      <n-text>
        You are being redirected to backend admin:
        <n-text code>{{ targetAdminUrl }}</n-text>
      </n-text>
      <n-button type="primary" tag="a" :href="targetAdminUrl">
        Open admin manually
      </n-button>
    </n-space>
  </n-card>
</template>
