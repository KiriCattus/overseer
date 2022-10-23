import { Client, AuditLogEvent, EmbedBuilder, TextChannel } from 'discord.js';

export default (client: Client): void => {

	// Log when a user is kicked.
	client.on('guildMemberRemove', async function (event) {
		// TODO Per guild configurable channels.
		// Currently set to moderation-logs.
		const channel = await client.channels.fetch('941543609294016572');
		const fetchAuditLogs = await event.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberKick,
		});

		const auditLog = fetchAuditLogs.entries.first();
		if (auditLog.target.id === event.user.id && auditLog.createdAt > event.joinedAt) {
			let kickReason = '';

			// Check the ban reason exists else report that it couldn't be found.
			if (auditLog.reason != null) {
				kickReason = auditLog.reason;
			} else {
				kickReason = 'Audit log fetch was inconclusive or does not exist...';
			}

			if (auditLog.executor.bot) {
				let message = `${auditLog.target.tag} has been kicked! Kick Reason: ${kickReason}`;
				(channel as TextChannel).send(message);
			} else {
				const embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle('User Kicked')
				.addFields(
					{ name: 'User tag:', value: event.user.tag, inline: true },
					{ name: 'Kick reason:', value: kickReason, inline: false },
				)
				.setFooter({ text: `User ID: ${event.user.id}`, iconURL: event.user.displayAvatarURL()})
				.setTimestamp(Date.now());
				(channel as TextChannel).send({ embeds: [embed] });
			}
		}
	});
}