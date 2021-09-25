/** @format */

const express = require('express')
const router = express.Router()

const {Permissions} = require('discord.js')

const permissionsArray = new Array(['ADMINISTRATOR', 'MANAGE_GUILD'])

module.exports = (client) => {
  router.get('/:user', (req, res) => {
    req.sessionStore.get(req.params.user, (err, sess) => {
      if (err || !sess) res.status(401).json({status: 401, user: null})
      else {
        sess.user.guilds = sess.user.guilds
          .filter((guild) =>
            new Permissions(Number(guild.permissions)).any(permissionsArray)
          )
          .map((guild) => {
            guild.is = !!client.guilds.cache.get(guild.id)
            return guild
          })
          
        res.status(200).json({status: 200, user: sess.user})
      }
    })
  })

  return router
}
