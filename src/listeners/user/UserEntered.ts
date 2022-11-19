import { Client, EmbedBuilder, TextChannel } from 'discord.js';

export default (client: Client): void => {
	// Log when a user joins the server.
	client.on('guildMemberAdd', async function (event) {
		// TODO Per guild configurable channels.
		// Currently set to user-logs.
		const channel = await client.channels.fetch('941543609294016572');
		const embed = new EmbedBuilder()
			.setColor(0x00ff00)
			.setAuthor({
				name: event.user.tag,
				iconURL: event.user.avatarURL(),
			})
			.addFields(
				{
					name: 'User ID:',
					value: event.user.id,
				},
				{
					name: 'Account Creation Time:',
					value: event.user.createdAt.toUTCString(),
				}
			)
			.setFooter({ text: 'User Entered' })
			.setTimestamp(Date.now());
		(channel as TextChannel).send({ embeds: [embed] }).catch((exception) => console.error(exception));
	});
};
