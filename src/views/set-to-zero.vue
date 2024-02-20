<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import useSupabaseDB from "@/composables/useSupabaseDB";
import useCustomToast from "@/composables/utils/useCustomToast";

const { update, dbResp, dbResponseStatus } = useSupabaseDB();
const { showSuccess, showError } = useCustomToast();

const route = useRoute();

const loading = ref(false);
const idItem = route.params.idItem;

async function setToZero() {
  loading.value = true;

  try {
    await update({
      table: "inventory",
      id: { key: "id", value: idItem },
      data: {
        quantity: 0,
      },
    });

    if (dbResponseStatus.value === "OK") {
      showSuccess(dbResp.value.event, dbResp.value.message);
    } else {
      showError(dbResp.value.event, dbResp.value.message);
    }
  } catch (error) {
    showError("ERROR", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  setToZero();
});
</script>

<template>
  <div v-if="loading" class="flex align-items-center justify-content-center">
    <ProgressSpinner />
  </div>

  <div v-else-if="dbResponseStatus === 'OK'">
    <div class="flex align-items-center justify-content-center">
      <i
        class="pi pi-check-circle text-green-500 mr-2"
        style="vertical-align: center"
      ></i>
      <span class="text-green-500">Cambiado a 0</span>
    </div>
  </div>

  <div v-else>
    <div class="flex align-items-center justify-content-center">
      <i
        class="pi pi-times-circle text-red-500 mr-2"
        style="vertical-align: center"
      ></i>
      <span class="text-red-500">Error</span>
    </div>
  </div>
</template>
