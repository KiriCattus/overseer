import { ActivityType, Client, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import { createLogger, format, transports } from 'winston';
import userBanned from './listeners/moderation/UserBanned';
import userKicked from './listeners/moderation/UserKicked';
import userUnbanned from './listeners/moderation/UserUnbanned';
import userEntered from './listeners/user/UserEntered';
import userLeft from './listeners/user/UserLeft';
import startup, { BOT_INTENTS, BOT_TOKEN, MODE_LAUNCHED, WATCHING_ACTIVITY } from './Utils';
config();

// Create a new client instance.
export const client = new Client({
	intents: [BOT_INTENTS],
});

export const logger = createLogger({
	level: MODE_LAUNCHED === 'DEV' ? 'debug' : 'info',
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	transports: new transports.Console({
		format: format.combine(
			format.colorize(),
			format.timestamp(),
			format.align(),
			format.printf((info) => `[${new Date().toUTCString()}] [${info.level}] ${info.message}`)
		),
	}),
});

async function init() {
	startup(client);
	await client
		.login(BOT_TOKEN)
		.catch((exception) =>
			logger.error(
				'Failed to authenticate with Discord services, are we using a valid token? Is the service down?' +
					exception
			)
		);
	logger.info(`Overseer: Successfully authenticated with Discord as ${client.user.tag}!`);
	userEntered(client);
	userLeft(client);
	userBanned(client);
	userUnbanned(client);
}

//Channel Events (created, deleted, updated (name, permission, overrides)
//Message Events (edits, deletes, bulk deletes, (ban, purge))
//Member Update Events (roles, nicks, boosts)
//Server Events (Settings updates: Name, moderation level, ...)
//Role Events (Created, Deleted, Updated (Name/Permissions))
//Voice Events (Join/Leave/Switch, server muted/deafened)

//TODO Ready and connection events.
init();
