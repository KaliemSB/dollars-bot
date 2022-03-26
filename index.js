const { Client, Intents, MessageEmbed } = require('discord.js');
const axios = require('axios')
require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', client => {
  console.log('Ready!');

  const guildId = null
  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application.commands
  }

  commands.create({
      name: 'info',
      description: 'Retorna as informações e o estado atual do server.'
  })

  commands.create({
      name: 'discord',
      description: 'Servidor oficial dos Dollars do mine.'
  })

  commands.create({
      name: 'modpack',
      description: 'Modpack do servidor.'
  })

  commands.create({
      name: 'mods',
      description: 'Mods do servidor.'
  })

});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return
  }

  if (interaction.commandName === 'info') {
    const ip = 'dollars.redepvp.com'

    const server = await axios({
      method: 'GET',
      url: `https://api.mcsrvstat.us/2/${ip}`
    }).then(res => res.data)

    const modsNumber = Math.round(server.mods.names.length / 2)

    const embed = new MessageEmbed()
      .setTitle('Informações do server:')
      .addFields(
        { name: 'Status:', value: server.online === true ? 'Online' : 'Offline', inline: true },
        { name: 'Versâo:', value: server.version, inline: true },
        { name: 'Players:', value: `${server.players.online} / ${server.players.max}`, inline: true },
        { name: 'Ip:', value: ip, },
        { name: 'Mods:', value: server.mods.names.slice(0, modsNumber).join('\n'), inline: true },
        { name: '\u200B', value: server.mods.names.slice(modsNumber, server.mods.names.length).join('\n'), inline: true },
      )
      .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/avatars/957076774318133268/6df65e887db00980bc4cd0c72a114b9d.png?size=2048')
      .setFooter({ text: 'Dollars', iconURL: 'https://cdn.discordapp.com/avatars/957076774318133268/6df65e887db00980bc4cd0c72a114b9d.png?size=2048' });

    interaction.reply({
      embeds: [embed]
    })
  }

  if (interaction.commandName === 'discord') {
    interaction.reply({
      content: 'https://discord.gg/juZ2D7zHBk'
    })
  }
	
  if (interaction.commandName === 'mods') {
    interaction.reply({
      content: 'pasta mods: https://bit.ly/3iza169'
    })
  }
})

client.login(process.env.TOKEN);
