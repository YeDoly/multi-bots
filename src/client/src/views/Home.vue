<template>
  <button
    class="btn btn-primary btn-dark"
    id="sidebar-show"
    type="button"
    @click="sidebarShow"
  >
    <i class="fas fa-align-justify"></i>
  </button>
</template>

<script>
export default {
  name: "Home",
  methods: {
    sidebarShow() {
      this.$emit("sidebarToogle");
    },
  },
};
</script>
