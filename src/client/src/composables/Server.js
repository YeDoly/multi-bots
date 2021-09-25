import {onBeforeMount} from '@vue/runtime-dom'
import {ref} from 'vue'

export default function Server(store) {
  let list = ref(new Array())

  const getServers = async () => {
    console.log(true)
    if (!store.getters.getUser) return
    const res = await fetch(
      'http://localhost:3000/api/data/' + store.getters.getUser
    )
    if (res.status !== 200) return
    const json = await res.json()

    for (let {name, id, icon, is} of json.user.guilds) {
      list.value.push({
        name,
        id,
        img: icon
          ? `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=4096`
          : null,
        is,
      })
    }
  }

  onBeforeMount(() => {
    getServers()
  })

  return {
    list
  }
}
