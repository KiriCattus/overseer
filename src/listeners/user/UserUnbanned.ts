import { Client, AuditLogEvent, EmbedBuilder, TextChannel } from 'discord.js';

export default (client: Client): void => {
	
	// Log when a user is unbanned.
	client.on('guildBanRemove', async function (unban) {
		// TODO Per guild configurable channels.
		// Currently set to user-logs.
		const channel = await client.channels.fetch('941543609294016572');
		const fetchAuditLogs = await unban.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberBanRemove,
		});

		const auditLog = fetchAuditLogs.entries.first();
		// Perform a coerence check to make sure the audit log event exists.
		if (!auditLog) {
			return console.warn(`${unban.user.tag} was unbanned from ${unban.guild.name} but no unban record could be found!`);
		}

		const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle('User Unbanned')
			.addFields(
				{ name: 'User tag:', value: unban.user.tag, inline: false },
			)
			.setFooter({ text: `User ID: ${unban.user.id}` })
			.setTimestamp(Date.now());
		(channel as TextChannel).send({ embeds: [embed] });
	});
}