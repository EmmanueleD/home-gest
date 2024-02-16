<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import AppMenuItem from "./AppMenuItem.vue";

const authStore = useAuthStore();

const model = ref([
  {
    label: "Dev",
  },
  {
    label: "Gestión",
    items: [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "Inventario",
        icon: "pi pi-fw pi-box",
        to: "/inventario",
      },
    ],
  },
]);
</script>

<template>
  <div class="w-full pt-4 pb-2">
    <h5>Hola {{ authStore.profile?.username }}</h5>
  </div>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
