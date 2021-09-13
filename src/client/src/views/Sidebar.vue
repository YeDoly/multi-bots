<template>
  <div
    class="shadow-lg"
    :class="{ sidebarOpened: sidebarActive, sidebarClosed: !sidebarActive }"
  >
    <div id="sidebar-header">
      <i
        class="fas fa-align-justify"
        id="sidebar-hide"
        @click="sidebarHide"
      ></i>
    </div>
    <div class="servers">
      <Menu v-for="item in list" :key="item.id" :item="item" />
      <hr />
      <a href="http://localhost:3000/api/endpoint/login"
        ><img
          class="rounded-circle login"
          data-bs-toggle="tooltip"
          data-bss-tooltip=""
          data-bs-placement="bottom"
          src="https://freepikpsd.com/media/2019/10/login-png-icon-1.png"
          width="50"
          height="50"
          title="Zaloguj"
      /></a>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/SidebarMenu.vue";

export default {
  name: "Sidebar",
  data: () => ({
    list: [],
  }),
  components: {
    Menu,
  },
  props: {
    sidebarActive: {
        type: Boolean,
        required: true
    }
  },
  methods: {
    sidebarHide() {
      this.$emit("sidebarToogle");
    },
    checkPerms: (perm) =>
      new Promise(async (resolve) => {
        const res = await fetch("http://localhost:3000/api/data/perms/" + perm)
          if (res.status === 200) {
            const json = await res.json();
              resolve(json.permissions);
          }
      }),
    checkServer: (server) =>
      new Promise(async (resolve) => {
        const res = await fetch("http://localhost:3000/api/data/server/" + server);
          if (res.status === 200) {
            const json = await res.json();
              resolve(json.is);
          }
      }),
    async getServers () {
        if (!this.$store.getters.getUser) return;
        const res = await fetch(
          "http://localhost:3000/api/data/" + this.$store.getters.getUser
        );
        if (res.status !== 200) return;
        const json = await res.json();

        for (let { name, id, icon, permissions } of json.user.guilds) {
          if (!(await this.checkPerms(permissions))) continue;
          const is = await this.checkServer(id);
          this.list.push({
            name,
            id,
            img: icon
              ? `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=4096`
              : null,
            is,
          });
        }
    }
  },
  async created() {
      this.getServers();
  },
};
</script>
