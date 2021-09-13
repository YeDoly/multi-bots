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
      {{ shorttext() }}
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
      {{ shorttext() }}
    </p>
  </a>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
      item: {
          type: Object,
          required: true
      }
  },
  methods: {
    shorttext() {
      const args = this.item.name.split(/ +/g);
      let text = args.map((name) => name[0]).join("");
        
      if (text.length < 4 && args.length > 1)
        text = `${text[0]}${args
          .map((name) => name.slice(1))[0]
          .slice(0, 4 - text.length)}${text.slice(1)}`;
        
      if (text.length < 4) text = args.join("");
      return text.slice(0, 4);
    },
    generateLink(guild) {
      return (
        "https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=624272125762600985&guild_id=" +
        guild
      );
    },
  },
};
</script>
