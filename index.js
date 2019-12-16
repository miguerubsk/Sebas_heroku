const Discord = require('discord.js');
//const { prefix, token } = require('./config.json');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
var dispatcherglobal;

//const args = message.content.slice(prefix.length).split(/ +/);
//const command = args.shift().toLowerCase();
//const stream = ytdl(`${args}`, { filter : 'audioonly' });

 


bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('al Señor Poronga aniqular Baharut', { type: 'WATCHING' })
});


let prefix = process.env.PREFIX;

//Interctúa con el usuario de diferentes maneras

bot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith(`${prefix}mata a`)) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
		 message.channel.send('https://i.redd.it/fv9z83qe1rn01.png')
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.channel.send(`He matado a <@${user.id}>, <@${message.author.id}>-sama`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.channel.send(`He sido incapaz de matar a <@${user.id}>, <@${message.author.id}>-sama, ¡ES DEMASIADO PODEROSO!`);
//		  message.channel.send('https://vignette.wikia.nocookie.net/overlordmaruyama/images/3/35/Sebas_003.png/revision/latest?cb=20150804091323');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send(`El usuario no está en este servidor, <@${message.author.id}>-sama`);
      }
    // Otherwise, if no user was mentioned
    } else {
      message.channel.send(`No has mencionado al usuario que debo matar, <@${message.author.id}>-sama`);
    }
  }
});


bot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(`${prefix}elimina a`)) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: `${user.tag} se oponía a <@${message.author.id}>-sama`,
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.channel.send(`<@${user.id}> eliminado con éxito, <@${message.author.id}>-sama`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply(`He sido incapaz de eliminar a <@${user.id}>, <@${message.author.id}>-sama, ¡ES DEMASIADO PODEROSO!`);
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send(`El usuario no está en este servidor, <@${message.author.id}>-sama`);
      }
    } else {
    // Otherwise, if no user was mentioned
      message.channel.send(`No has mencionado al usuario que debo eliminar, <@${message.author.id}>-sama`);
    }
  }
});



//Proporciona info del usuario con _user
bot.on('message', message => {
	
	if (message.content === `${prefix}user`) {
			message.channel.send(`Tu Nombre de Usuario: ${message.author.username}\n`);
			message.channel.send(`Tu ID: ${message.author.id}\n`);
			message.channel.send(`Fecha de Registro: ${message.author.createdAt}\n`);
			message.channel.send(`Tu avatar: ${message.author.avatarURL}\n`);
	if (message.author.presence.game !== null){
			message.channel.send(`Estás jugando a: ${message.author.presence.game.name}\n`);
			message.channel.send(`Detalles del juego: ${message.author.presence.game.details}\n`);
			message.channel.send(`Estado del juego: ${message.author.presence.game.state}\n`);
//			message.channel.send(`Empezaste a jugar: ${message.author.presence.game.timestamps.start}\n`);
	
		if (message.author.presence.game.streaming){
				message.channel.send(`Tu juego esta siendo retransmitido`);
				message.channel.send(`Enlace a la retransmision: ${message.author.presence.game.url}`);
		}else message.channel.send(`No estas retransmitiendo tu partida`);
	}else message.channel.send(`No estas jugando a nada, ¡VE A JUGAR A ALGO <@${message.author.id}>-SAMA`);
	
	
	}else if (message.content === `esto es un bucle`){
	message.channel.send(`esto es un bucle`);
}else if (message.content === `${prefix}3`){
		message.channel.send('http://i57.tinypic.com/16avcdw.jpg');
}else if (message.content === `${prefix}shinji`){
		message.channel.send('https://media.giphy.com/media/VCthkNbBAZXtm/giphy.gif');
}else if (message.content === `${prefix}solaire`){
		message.channel.send('https://img.etsystatic.com/il/cf62bc/997396536/il_570xN.997396536_22xj.jpg');
}else if (message.content === `${prefix}cooperation`){
		message.channel.send('https://i.pinimg.com/originals/f8/35/b8/f835b838475e5d1eee32b1093f76623b.png');
}else if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
		message.channel.send(`${bot.ping}ms`);
}else if (message.content === `_hola`){
		message.channel.send(`A sus órdenes <@${message.author.id}>-sama`);
}else if (message.content === `gordo` && message.author.id == '271756529303158784'){
	message.channel.send('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSemShcXby_Pq0htEwIL3fbe6qV00u_F_1klH5ri_u8Cdme3RVNsg');	
}
	
});



bot.on('message', message => {
	
	if (message.content === `${prefix}soy joto`) {
		message.channel.send(`Prefijo: ${prefix}`);
		message.channel.send(`hola: saludo al usuario`);
		message.channel.send(`espia a <mención>: doy un reporte con la información disponible del usuario mencionado`);
		message.channel.send(`user: doy un reporte con la inf disponiblesobre el usuario que llama al comamdo`);
		message.channel.send(`server: aporto la informacion del servidor`);
		message.channel.send(`play <youtube url>: me uno al canal de voz en el que este el usuario y reproduzco el audio del video`);
		message.channel.send(`elimina a <mención>: baneo al usuario mencionado`);
		message.channel.send(`mata a <mención>: espulso al usuario mencionado`);
		message.channel.send(`Otros comandos:`);
		message.channel.send(`ping`);
		message.channel.send(`hola`);
		message.channel.send(`cooperation`);
		message.channel.send(`solaire`);
		message.channel.send(`3`);
		message.channel.send(`shinji`);
		message.channel.send(`esto es un bucle   (peligroso)`);
		message.channel.send(`Otro comando que no voy a decir`);
	}
			
	
});




bot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(`${prefix}espia a`)) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
    	if (user.id == '271756529303158784'){
    		message.channel.send('Jamás diré nada sobre este usuario');
		}else{
			message.channel.send(`Aqui esta el reporte del espionaje <@${message.author.id}>-sama`);
			if (user.id == '401038834508496896')
				message.channel.send(`Este usuario es un payaso\n`);
			if (user.id == '382936913721556994')
				message.channel.send('Este usuario es JOTO, porque no sabe jugar a dark souls');
			if (user.id == '631193439421202446')
				message.channel.send('A esta usuaria le gusta hacer cosplay de Megumin y Assasins Creed');
			if (user.presence.status == 'online')
				message.channel.send(`El usuario esta online\n`);
			if (user.presence.status == 'offline')
				message.channel.send(`El usuario esta offline\n`);
			if (user.presence.status == 'idle')
				message.channel.send(`El usuario esta AFK\n`);
			if (user.presence.status == 'dnd')
				message.channel.send(`El usuario no quiere ser molestado\n`);
			if (user.bot)
				message.channel.send(`El usuario es un bot\n`);
			else
				message.channel.send(`El usuario no es un bot\n`);


			message.channel.send(`Nombre de Usuario: ${user.username}\n`);
			message.channel.send(`ID: ${user.id}\n`);
			message.channel.send(`Fecha de Registro: ${user.createdAt}\n`);
			if (user.lastMessage == null)
				message.channel.send('No ha hablado por este canal');
			else
				message.channel.send(`Ultimo mensaje del usuario del usuario: ${user.lastMessage}`);
			message.channel.send(`Avatar: ${user.avatarURL}\n`);
			if (user.presence.game !== null){
				message.channel.send(`Está jugando a: ${user.presence.game.name}\n`);
				message.channel.send(`Detalles del juego: ${user.presence.game.details}\n`);
				message.channel.send(`Estado del juego: ${user.presence.game.state}\n`);


				if (user.presence.game.streaming){
					message.channel.send(`El juego esta siendo retransmitido`);
					message.channel.send(`Enlace a la retransmision: ${user.presence.game.url}`);
				}else message.channel.send(`No esta retransmitiendo nada`);
			}else message.channel.send(`No esta jugando a nada`);
		}
	}
  }
});




bot.on('message', message => {
if (message.content === `${prefix}D`){
	bot.destroy();
}
});



//proporciona info del server con _server
bot.on('message', message => {

  if (message.content === `${prefix}server`) {
    message.channel.send(`Nombre del Servidor: ${message.guild.name} \nTotal de miembros: ${message.guild.memberCount}\nFecha de Creación: ${message.guild.createdAt}\nRegión del Servidor: ${message.guild.region}`);
}
});







//dejar el chat de voz con _leave
bot.on('message', message => {
	  if (message.content.startsWith(`${prefix}leave`)) {
    // Solo se desconecta si el usuario esta conectado al chat de voz
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave()
          message.channel.send(`Me he desconectado correctamente del canal: ${message.member.voiceChannel}, ${message.author.username}-sama`);
    } else {
      message.reply(`Antes tienes que conectarte a un canal de voz, ${message.author.username}-sama`);
    }
  }
});
  
  
//Reproduce música con _play
bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'play') {
 
		if (message.member.voiceChannel) {
			      message.member.voiceChannel.join().then(connection => {
					const stream = ytdl(`${args}`, { filter : 'audioonly' });
					const dispatcher = connection.playStream(stream, streamOptions);
					dispatcherglobal = dispatcher;
					message.channel.send(`Entendido <@${message.author.id}>-sama`);
					message.channel.send('Iniciando...');
					dispatcherglobal.resume();
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply(`He sido incapaz de unirme al chat de voz`);
          // Log the error
          console.error(err);
        });
			
		} else {
		message.reply('Antes tienes que conectarte a un canal de voz');
		}
	
	}
});





//Pausar la música con _pause
bot.on('message', message => {


	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'stop') {
 
		if (message.member.voiceChannel) {
			      message.member.voiceChannel.join().then(connection => {
					message.channel.send(`Entendido <@${message.author.id}>-sama`);
					message.channel.send('Parando...');
					dispatcherglobal.pause();
					message.channel.send('Parado');
					message.member.voiceChannel.leave()
					message.channel.send(`Me he desconectado correctamente del canal: ${message.member.voiceChannel}, <@${message.author.id}>-sama`);
        })
			
		} else {
		message.reply('Antes tienes que conectarte a un canal de voz');
		}
	
	}
});









bot.login(process.env.TOKEN);

console.log('Bot listo');