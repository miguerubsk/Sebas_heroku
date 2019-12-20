const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

const yt_api_key = process.env.yt_api_key;
const bot = new Discord.Client();
const botid = process.env.botid;
const ownerid = process.env.ownerid;
let prefix = process.env.PREFIX;
var guilds = {};

 


bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('a cazadores en el Smash', { type: 'WATCHING' })
});

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bienvenido al infierno, ${member}`);
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
    	if (user.id == ownerid){
    	    if (message.author.id !== ownerid){
                message.channel.send('Jamás diré nada sobre este usuario');
                bot.fetchUser(ownerid).then((user) => {
                    user.send(message.author.tag + " ha intentado espiarte"); // Enviar mensaje privado al dueño del bot
                });
            }else{
                message.channel.send('No puedes espiarte a ti mismo');
            }

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


bot.on('message', function(message) {
    if(message.channel.type !== "dm") {
        const mess = message.content.toLowerCase();
        const comando = mess.split(" ")[0]; // Extrae el comando
        if (!guilds[message.guild.id]) {
            guilds[message.guild.id] = {
                queue: [],
                queueNames: [],
                url: [],
                titulo: [],
                duracion: [],
                dispatcher: null,
                voiceChannel: null,
                isPlaying: false,
            };
        }
        switch(comando) {
            case prefix + "D":
                bot.destroy(); break;

            case prefix + "kick":
                kickUser(message); break;

            case prefix + "ban":
                banUser(message); break;

        	case prefix + "bucle":
        		message.channel.send(`${prefix}bucle`); break;

        	case prefix + "3":
        		message.channel.send('http://i57.tinypic.com/16avcdw.jpg'); break;

        	case prefix + "hola":
        		message.channel.send(`A sus órdenes <@${message.author.id}>-sama`); break;

        	case prefix + "shinji":
        		message.channel.send('https://media.giphy.com/media/VCthkNbBAZXtm/giphy.gif'); break;

        	case prefix + "ping":
        		message.channel.send('Pong.');
				message.channel.send(`${bot.ping}ms`);
				break;

        	case prefix + "cooperation":
        		message.channel.send('https://i.pinimg.com/originals/f8/35/b8/f835b838475e5d1eee32b1093f76623b.png'); break;

        	case prefix + "solaire":
        		message.channel.send('https://img.etsystatic.com/il/cf62bc/997396536/il_570xN.997396536_22xj.jpg'); break;

        	case prefix + "user":
        		UserInfo(message); break;

            case prefix + "play":
            	message.channel.send("A la espera de una biblioteca que sustituya a ffmpeg-binaries."); return;

                if (message.member.voiceChannel) {
                    if (mess === (prefix + "play"))
                        message.reply("No escribiste el nombre de ninguna canción.");		
                    else {
                        const args = message.content.split(/(?:<|(?:>| ))+/).slice(1).join(" "); // Remover comando, espacios y <> del mensaje
                        if(isURL(args.toLowerCase())){  // Si la búsqueda contiene un link
                            if(isSoundcloud(args)){ // Si lee un link de soundcloud
                            	message.channel.send("Soundcloud no soportado"); break;
                                Soundcloud(args, message); // Soundcloud
                            }else if (isYoutube(args)){ // Si lee un link de youtube
                                Youtube(args, message);
                            } // Youtube
                            else{
                                message.reply("No se encontro ningúna canción con ese link.");
                            }
                        }
                        else{ // Si no
                            buscar_video(args, message); // Buscar video en el buscador de youtube
                        }
                    }
                }else
                    message.reply(" Necesitas unirte a un canal de voz!");
                break;   

            case prefix + "skip":

            	message.channel.send("A la espera de una biblioteca que sustituya a ffmpeg-binaries."); return;

                if(guilds[message.guild.id].queue[0] !== undefined) {
                    message.reply("La canción ha sido saltada!");
                    guilds[message.guild.id].dispatcher.end();
                }
                break;

            case prefix + "server":
            	 serverInfo(message); break;

            case prefix + "cola":

            	message.channel.send("A la espera de una biblioteca que sustituya a ffmpeg-binaries."); return;

                var message2 = "```css\n";
                for (var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
                    var temp = (i + 1) + ": " + (i === 0 ? "🔊 " : "") + guilds[message.guild.id].queueNames[i] + "\n";
                    if ((message2 + temp).length <= 2000 - 3)
                        message2 += temp;
                    else {
                        message2 += "```";
                        message.channel.send(message2);
                        message2 = "```";
                    }
                }
                message2 += "```";
                message.channel.send(message2);
                break;

            case prefix + "salir":

            	message.channel.send("A la espera de una biblioteca que sustituya a ffmpeg-binaries."); return;

                if(guilds[message.guild.id].voiceChannel !== null)
                    Salir(message);
                break;

            case prefix + "servidores":
                var contar_servidores;
                switch(bot.guilds.size) {
                    case 1:
                        contar_servidores = "He sido invitado a " + bot.guilds.size + " servidor.";
                        message.channel.send(contar_servidores);
                        break;
                    default:
                        contar_servidores = "Me han invitado a " + bot.guilds.size + " servidores.";
                        message.channel.send(contar_servidores);
                        break;
                }
                console.log(contar_servidores);
                break;

            case prefix + "comandos":
                message.channel.send(
                	"Prefijo: _\n"+
                    "📜 Lista de comandos:\n"+
                    "```xl\n"+
                    "'_hola' saludo al usuario\n"+
                	"'_espia a <mención>' doy un reporte con la información disponible del usuario mencionado.\n"+
                	"'_user' doy un reporte con la info disponible del usuario que llama al comamdo\n"+
                	"'_server' aporto la informacion del servidor\n"+
                	"'_ban <mención>' baneo al usuario mencionado\n"+
                	"'_kick <mención>' expulso al usuario mencionado\n"+
                    "'_play' Reproducir una canción o añadirla a la cola.\n"+
                    "'_pausa' Pausar la canción actual.\n"+
                    "'_resume' Resumir la canción pausada.\n"+

                    "'_cola' Ver lista de canciones que están en cola de reproducción.\n"+
                    "'_skip' Saltar canción que se está reproduciendo.\n"+
                    "'_salir' Sacar el bot del canal de voz.\n"+
                    "'_servidores' Mostrar la cantidad de servidores que ha sido invitado el bot.\n"+
                    "'_comandos' Lista de comandos."+
                    "```"
                );
                message.channel.send("Los comandos de música no funcionan debido a que la depencia ffmpeg-binaries está obsoleta");
                message.channel.send(
                    "Otros comandos:\n"+
                    "```xl\n"+
                    "'_ping' ping del bot en ms\n"+
                	"'_cooperation'\n"+
                	"'_solaire'\n"+
                	"'_shinji'\n"+
                	"'_bucle' (No se recomienda usar)\n"+
                    "Comando sorpresa\n"+
                    "```"
                );
                break;

            case prefix + "pausa":

            	message.channel.send("A la espera de una biblioteca que sustituya a ffmpeg-binaries."); return;

                if(guilds[message.guild.id].isPlaying === true) {
                    message.reply("Has pausado la canción.");
                    guilds[message.guild.id].dispatcher.pause();
                    guilds[message.guild.id].isPlaying = false;
                }
                break;

            case prefix +"resume":

            	message.channel.send("A la espera de una biblioteca que sustituya a ffmpeg-binaries."); return;

                if(guilds[message.guild.id].queue[0] !== undefined && guilds[message.guild.id].isPlaying === false) {
                    setTimeout(function() {
                        message.reply("La canción ha sido resumida.");
                        guilds[message.guild.id].dispatcher.resume();
                        guilds[message.guild.id].isPlaying = true;
                    }, 500);
                }
                break;
        }
    }else { // Si el bot recibe un mensaje directo
        const mess = message.content;
        if(message.author.id !== botid && message.author.id !== ownerid){
            console.log("El bot ha recibido un mensaje privado ("+ message.channel.type +"): ");
            console.log(message.author.tag + ": " + mess);
            bot.fetchUser(ownerid).then((user) => {
                message.channel.send(message.author.tag + "No tengo permitido hablar por privado contigo, solo puedo hablar con " + user.id);
                user.send("He recibido un mensaje privado de " + message.author.tag + ": " + mess); // Enviar mensaje privado al dueño del bot
            });
        }
    }
});

//Server info
function serverInfo(message) {
    message.channel.send(`Nombre del Servidor: ${message.guild.name}`);
    message.channel.send(`Total de miembros: ${message.guild.memberCount}`);
    message.channel.send(`Fecha de Creación: ${message.guild.createdAt}`);
    message.channel.send(`Región del Servidor: ${message.guild.region}`);

}

//Espiar usuario
function spy(message) {
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
        if (user.id == ownerid){
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

//Iformacion del usuario
function UserInfo(message) {
    message.channel.send(`Tu Nombre de Usuario: ${message.author.username}\n`);
    message.channel.send(`Tu ID: ${message.author.id}\n`);
    message.channel.send(`Fecha de Registro: ${message.author.createdAt}\n`);
    message.channel.send(`Tu avatar: ${message.author.avatarURL}\n`);
    if (message.author.presence.game !== null){
        message.channel.send(`Estás jugando a: ${message.author.presence.game.name}\n`);
        message.channel.send(`Detalles del juego: ${message.author.presence.game.details}\n`);
        message.channel.send(`Estado del juego: ${message.author.presence.game.state}\n`);
        if (message.author.presence.game.streaming){
            message.channel.send(`Tu juego esta siendo retransmitido`);
            message.channel.send(`Enlace a la retransmision: ${message.author.presence.game.url}`);
        }else message.channel.send(`No estas retransmitiendo tu partida`);
    }else message.channel.send(`No estas jugando a nada, ¡VE A JUGAR A ALGO <@${message.author.id}>-SAMA`);
}

//Expulsar usuario
function kickUser(message) {
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

//Banear usuario
function banUser(message) {
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

// Youtube
function Youtube(args, message) {
    var id = getYouTubeID(args);
    if(!id) {
        if(args.indexOf("playlist") > -1)
            message.reply("Se encontró más de una canción. No están permitidas las playlist.");
        else
            message.reply("No se encontro ningúna canción con ese link.");
    }
    else
        reproducirYoutube(id, message);
}

// Buscar video en youtube sin link y obtener el ID para reproducir
async function buscar_video(args, message) {
    let respuesta = await doRequest("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(args) + "&key=" + yt_api_key);
    var json = JSON.parse(respuesta);
    if (!json.items[0])
        message.reply("No se encontro ningúna canción.");
    else {
        let id = json.items[0].id.videoId;
        reproducirYoutube(id, message);
    }
}


function reproducirYoutube(id, message){
    fetchVideoInfo(id, function(err, videoInfo) {
        if (err)
            message.reply("No se encontro ningúna canción con ese link.");
        else {
            var titulo = videoInfo.title;
            var duracion = tiempo(videoInfo.duration);
            var url = videoInfo.url;
            if(guilds[message.guild.id].queue.length > 0) { // Si la cola es mayor a 0
                if(guilds[message.guild.id].queue.indexOf(id) > -1) // Si ya existe el id de la canción
                    message.reply("Esa canción ya está en cola, espera a que acabe para escucharla otra vez.");
                else
                    agregar_a_cola(message, id, url, titulo, duracion); // Agrgar canción a la cola
            }
            else { // Si no hay canciones
                Push(message, id, url, titulo, duracion); // Push canción
                playMusic(message, id, url, titulo, duracion); // Reproducir canción
            }
        }
    });
}


function playMusic(message, id, url) {
    var stream;
    if(isYoutube(url))
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {filter: "audioonly"}); // Pasar stream de youtube
    else
        stream = "http://api.soundcloud.com/tracks/" + id + "/stream?consumer_key=" + sc_clientid; // Pasar stream de soundcloud
    play(stream, message); // Reproducir
}


function play(stream, message){
    // Variables de la canción actual
    var id = guilds[message.guild.id].queue[0]; 
    var url = guilds[message.guild.id].url[0];
    var titulo = guilds[message.guild.id].titulo[0];
    var duracion = guilds[message.guild.id].duracion[0];
    reproduciendo(id, url, titulo, duracion, message); // Mostrar canción que se está reproduciendo
    // Verificar canal de voz del usuario
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
    guilds[message.guild.id].voiceChannel.join().then(connection => {
        connection.setMaxListeners(0);
        guilds[message.guild.id].isPlaying = true;
        guilds[message.guild.id].dispatcher = connection.playStream(stream); // Stream canción
        guilds[message.guild.id].dispatcher.on('end', function() { // Cuando se acaba la canción
            Shift(message); // Liberar datos de la canción y pasar la siguiente a la posición 0
            if (guilds[message.guild.id].queue.length === 0) // Si no hay más canciones en la cola
                Salir(message); // Salir del canal
            else { // Si hay más canciones
                setTimeout(function() {
                    id = guilds[message.guild.id].queue[0]; // Obtener id
                    url = guilds[message.guild.id].url[0]; // Obtener url
                    playMusic(message, id, url); // Reproducir música de Soundcloud o Youtube
                }, 500);
            }
        });
        connection.on('error', function() {
            console.error("Se ha perdido la conexión");
            process.exit(1);
        });
    }).catch(err => console.log(err));
}

// Envía la canción que se está reproduciendo
function reproduciendo(id, url, titulo, duracion, message) {
    console.log("ID: "+ id);
    message.channel.send("🔊 Se está reproduciendo:```fix\n🎵: " + titulo + "\n⏲️: [" + duracion +  "]\n📽️: " + url + "```");
    console.log(message.author.tag + " está reproduciendo: " + titulo);
}

// Agregar canciones a la cola
function agregar_a_cola(message, id, url, titulo, duracion) {
    message.reply("📢 Has añadido una canción a la cola: ```🎵: " + titulo + "\n⏲️: [" + duracion +  "]\n📽️: " + url + "```");
    Push(message, id, url, titulo, duracion); // Push a y!cola
}

// Recibe argumentos del mensaje y retorna true si el mensaje recibido tiene un link de Youtube
function isYoutube(args) {
    return args.indexOf("youtube.com") > -1 || args.indexOf("youtu.be") > -1;
}

// Recibe argumentos del mensaje y retorna true si el mensaje recibido tiene un link de Soundcloud
function isSoundcloud (args) {
    return args.indexOf("soundcloud.com") > -1;
}

// Obtener respuesta del request de un url
async function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
        if (!error && res.statusCode == 200)
            resolve(body);
        else
            reject(error);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Recibe tiempo en segundos y retorna tiempo convertido a minutos:segundos o horas:minutos:segundos
function tiempo(time) {   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = "";
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

// Liberar datos de la canción y pasar la siguiente a la posición 0
function Shift(message) {
    guilds[message.guild.id].queue.shift();
    guilds[message.guild.id].queueNames.shift();
    guilds[message.guild.id].url.shift();
    guilds[message.guild.id].titulo.shift();
    guilds[message.guild.id].duracion.shift();
}

// Salir del canal de voz y reinicializar las variables de los datos de las canciones
function Salir(message) {
    guilds[message.guild.id].queue = [];
    guilds[message.guild.id].queueNames = [];
    guilds[message.guild.id].url = [];
    guilds[message.guild.id].titulo = [];
    guilds[message.guild.id].duracion = [];
    guilds[message.guild.id].voiceChannel.leave();
    guilds[message.guild.id].isPlaying = false;
}

// Push canción (Agregar infromación de la canción)
function Push(message, id, url, titulo, duracion) {
    guilds[message.guild.id].queue.push(id);
    guilds[message.guild.id].queueNames.push(titulo + ", ⏲️: [" + duracion + "]");
    guilds[message.guild.id].url.push(url);
    guilds[message.guild.id].titulo.push(titulo);
    guilds[message.guild.id].duracion.push(duracion);
}

// Verificar si es un link
function isURL(args) {
    var url = args.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
    if (url == null)
        return false;
    else
        return true;
}

bot.login(process.env.TOKEN);

console.log('Bot listo, hijo de tu puta madre estoy mamadísimo');

bot.on('error', function() {
    console.error("Ha ocurrido un error");
});

bot.on('resume', function() {
    console.log("Estoy listo otra vez!");
});