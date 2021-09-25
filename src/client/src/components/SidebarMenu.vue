<template>
  <router-link
    v-if="item.img && item.is"
    :to="{ name: 'Guild', params: { guild: item.id } }"
  >
    <img
      class="rounded-circle server"
      data-bs-toggle="tooltip"
      data-bss-tooltip=""
      data-bs-placement="bottom"
      :src="item.img"
      width="50"
      height="50"
      :title="item.name"
    />
  </router-link>
  <a v-else-if="item.img" :href="generateLink(item.id)">
    <img
      class="rounded-circle server"
      data-bs-toggle="tooltip"
      data-bss-tooltip=""
      data-bs-placement="bottom"
      :src="item.img"
      width="50"
      height="50"
      :title="item.name"
    />
  </a>

  <router-link
    v-else-if="item.is"
    :to="{ name: 'Guild', params: { guild: item.id } }"
  >
    <p
      data-bs-toggle="tooltip"
      data-bss-tooltip=""
      data-bs-placement="bottom"
      class="server rounded-circle server-text"
      :title="`${item.name}`"
    >
      {{ generateName(item.name) }}
    </p>
  </router-link>
  <a v-else :href="generateLink({ path: item.id })">
    <p
      data-bs-toggle="tooltip"
      data-bss-tooltip=""
      data-bs-placement="bottom"
      class="server rounded-circle server-text"
      :title="`${item.name}`"
    >
      {{ generateName(item.name) }}
    </p>
  </a>
</template>

<script>
import Sidebar from '@/composables/Sidebar'

export default {
  name: "Sidebar",
  props: {
      item: {
          type: Object,
          required: true
      }
  },
  setup(props, { emit }) {    
    const { generateLink, generateName } = Sidebar(emit)

    return { generateLink, generateName }
  },
};
</script>
