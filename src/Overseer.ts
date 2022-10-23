import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
config();
import startup from './listeners/Startup';
import userKicked from './listeners/user/UserKicked';
import userBanned from './listeners/user/UserBanned';
import userUnbanned from './listeners/user/UserUnbanned';

const BOT_TOKEN = process.env.BOT_TOKEN;
const MODE_LAUNCHED = process.env.MODE_LAUNCHED;
const DEV_SERVER_ID = process.env.DEV_SERVER_ID;
const SET_ACTIVITY = process.env.SET_ACTIVITY;

// Create a new client instance.
export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	    GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
	] });

// Attempt to authenticate with Discord using the bots token.
client.login(BOT_TOKEN).catch(exception =>
	console.error('Failed to authenticate with Discord services, are we using a valid token?' + exception));

startup(client);
//Start user event logging.
userKicked(client);
userBanned(client);
userUnbanned(client);