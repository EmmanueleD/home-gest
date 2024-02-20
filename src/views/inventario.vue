<script setup>
import { ref, onMounted } from "vue";
import { jsPDF } from "jspdf";
import useSupabaseDB from "@/composables/useSupabaseDB";
import useCustomToast from "@/composables/utils/useCustomToast";

const { showSuccess, showError } = useCustomToast();
const { getAll, getWithFilter, update, dbResp, dbResponseStatus } =
  useSupabaseDB();
const loadingGetInventario = ref(false);
const loadingGetListaDellaSpesa = ref(false);

const inventory = ref([]);

const rowClass = (data) => {
  return [
    {
      "bg-red-100 text-red-700": data.quantity === 0,
      "bg-yellow-100 text-yellow-700": data.quantity <= data.min / 2,
    },
  ];
};
const rowStyle = (data) => {
  if (data.quantity === 0) {
    return { fontWeight: "bold" };
  }
};

async function getInventario() {
  loadingGetInventario.value = true;
  inventory.value.splice(0);

  try {
    await getAll({
      table: "inventory_view",
      orderingBy: "id",
    });
    if (dbResponseStatus.value === "OK") {
      inventory.value = dbResp.value;
      showSuccess(dbResp.value.event, dbResp.value.message);
    } else {
      showError(dbResp.value.event, dbResp.value.message);
    }
  } catch (error) {
    showError("ERROR", error);
  } finally {
    loadingGetInventario.value = false;
  }
}

async function getListaDellaSpesa() {
  loadingGetListaDellaSpesa.value = true;

  try {
    await getWithFilter({
      table: "inventory",
      filter: { column: "quantity", value: 0 },
      orderingBy: "id",
    });
    if (dbResponseStatus.value === "OK") {
      console.log("dbResp", dbResp.value);
      showSuccess(dbResp.value.event, dbResp.value.message);

      // Generate PDF with the fetched data
      generatePDF(dbResp.value);
    } else {
      showError(dbResp.value.event, dbResp.value.message);
    }
  } catch (error) {
    showError("ERROR", error);
  } finally {
    loadingGetListaDellaSpesa.value = false;
  }
}

function generatePDF(data) {
  const doc = new jsPDF();
  let y = 10;
  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.label}: ${item.min}`, 10, y);
    y += 10;
  });
  doc.save("Lista_della_spesa.pdf");
}

onMounted(async () => {
  await getInventario();
});
</script>

<template>
  <h1>Inventario</h1>

  <Card class="w-full m-3">
    <template #title>
      <div class="w-full flex justify-content-between align-items-center">
        <h5>Inventario</h5>
        <Button
          label="Stampa Lista della spesa"
          icon="pi pi-print"
          class="p-button-outlined"
          @click="getListaDellaSpesa"
        ></Button>
      </div>
    </template>

    <template #content>
      <DataTable
        :loading="loadingGetInventario"
        :value="inventory"
        stripedRows
        paginator
        :rows="50"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :rowClass="rowClass"
        :rowStyle="rowStyle"
        sortMode="multiple"
      >
        <Column field="label" header="Item"></Column>
        <Column field="quantity" header="Quantità" sortable></Column>
        <Column field="min" header="Minimo"></Column>
        <Column field="category_label" header="Categoria" sortable></Column>
      </DataTable>
    </template>
  </Card>
</template>
