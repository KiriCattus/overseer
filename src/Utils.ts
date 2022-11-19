import { Client, GatewayIntentBits } from 'discord.js';

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const MODE_LAUNCHED = process.env.MODE_LAUNCHED;
export const WATCHING_ACTIVITY = process.env.WATCHING_ACTIVITY;
export const BOT_INTENTS = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildBans,
];

export default (client: Client): void => {
	client.on('ready', async () => {
		if (!client.user || !client.application) {
			return;
		}
		
		// Just our startup messages to print to terminal.
		// Don't edit it even if it looks wrong here, it's fine.
		console.log('----------------------------------------------------------------------------------');
		console.log('  /$$$$$$  /$$    /$$ /$$$$$$$$ /$$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$$$ /$$$$$$$');
		console.log(' /$$__  $$| $$   | $$| $$_____/| $$__  $$ /$$__  $$| $$_____/| $$_____/| $$__  $$');
		console.log('| $$  \\ $$| $$   | $$| $$      | $$  \\ $$| $$  \\__/| $$      | $$      | $$  \\ $$');
		console.log('| $$  | $$|  $$ / $$/| $$$$$   | $$$$$$$/|  $$$$$$ | $$$$$   | $$$$$   | $$$$$$$/');
		console.log('| $$  | $$ \\  $$ $$/ | $$__/   | $$__  $$ \\____  $$| $$__/   | $$__/   | $$__  $$');
		console.log('| $$  | $$  \\  $$$/  | $$      | $$  \\ $$ /$$  \\ $$| $$      | $$      | $$  \\ $$');
		console.log('|  $$$$$$/   \\  $/   | $$$$$$$$| $$  | $$|  $$$$$$/| $$$$$$$$| $$$$$$$$| $$  | $$');
		console.log(' \\______/     \\_/    |________/|__/  |__/ \\______/ |________/|________/|__/  |__/');
		console.log('----------------------------------------------------------------------------------');
		console.log('Author: KiriCattus');
		console.log(`Version: ${process.env.VERSION}`);
		console.log('Repository: https://github.com/KiriCattus/overseer');
		console.log('Description: A Discord bot for logging events fired in your Discord server to set channels.');
		console.log('----------------------------------------------------------------------------------');
		console.info(`Overseer: Ready to montor world...`);
	});
}