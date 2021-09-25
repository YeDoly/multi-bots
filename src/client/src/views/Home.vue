<template>
  <button
    class="btn btn-primary btn-dark"
    id="sidebar-show"
    type="button"
    @click="sidebarToogle"
  >
    <i class="fas fa-align-justify"></i>
  </button>
</template>

<script>
import Sidebar from '@/composables/Sidebar'

export default {
  name: 'Home',
  setup(props, {emit}) {
    const {sidebarToogle} = Sidebar(emit)

    return {sidebarToogle}
  },
}
</script>
