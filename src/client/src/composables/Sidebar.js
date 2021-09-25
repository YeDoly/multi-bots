export default function Sidebar(emit) {
  const sidebarToogle = () => {
    emit('sidebarToogle')
  }

  const generateName = (val) => {
    if (typeof val !== 'string') return
    const args = val.split(/ +/g)
    let text = args.map((name) => name[0]).join('')

    if (text.length < 4 && args.length > 1)
      text = `${text[0]}${args
        .map((name) => name.slice(1))[0]
        .slice(0, 4 - text.length)}${text.slice(1)}`

    if (text.length < 4) text = args.join('')
    return text.slice(0, 4)
  }

  const generateLink = (val) => {
    return (
      'https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=624272125762600985&guild_id=' +
      val
    )
  }

  return {
    sidebarToogle,
    generateLink,
    generateName,
  }
}
