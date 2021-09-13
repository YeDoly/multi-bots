<template>
  <div id="wrapper">
    <router-view @sidebarToogle="sidebarToogle" />
    <router-view
      @sidebarToogle="sidebarToogle"
      :sidebarActive="sidebarActive"
      name="sidebar"
    />
  </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta2/css/bootstrap.min.css";
@import "./assets/fonts/fontawesome-all.min.css";
@import "./assets/css/styles.min.css";
</style>

<script>
export default {
  name: "App",
  data: () => ({
    sidebarActive: false,
  }),
  methods: {
    sidebarToogle() {
      this.sidebarActive = !this.sidebarActive;
    },
  },
};
</script>
