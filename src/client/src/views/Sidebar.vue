<!-- @format -->

<template>
  <div
    class="shadow-lg"
    :class="{sidebarOpened: sidebarActive, sidebarClosed: !sidebarActive}"
  >
    <div id="sidebar-header">
      <i
        class="fas fa-align-justify"
        id="sidebar-hide"
        @click="sidebarToogle"
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
import {useStore} from 'vuex'

import Menu from '@/components/SidebarMenu'
import Server from '@/composables/Server'
import Sidebar from '@/composables/Sidebar'

export default {
  name: 'Sidebar',
  setup(props, { emit }) {
    const store = useStore()

    const { list } = Server(store)
    const { sidebarToogle } = Sidebar(emit)

    return { list, sidebarToogle }
  },
  components: {
    Menu,
  },
  props: {
    sidebarActive: {
      type: Boolean,
      equired: true,
    },
  },
}
</script>
