import { Client, AuditLogEvent, EmbedBuilder, TextChannel } from 'discord.js';

export default (client: Client): void => {
	
	// Log when user is banned.
	client.on('guildBanAdd', async function (ban) {
		// TODO Per guild configurable channels.
		// Currently set to user-logs.
		const channel = await client.channels.fetch('941543609294016572');
		let banReason = '';
		const fetchAuditLogs = await ban.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberBanAdd,
		});

		const auditLog = fetchAuditLogs.entries.first();
		// Perform a coerence check to make sure the audit log event exists.
		if (!auditLog) {
			return console.warn(`${ban.user.tag} was banned from ${ban.guild.name} but no ban record could be found!`);
		}

		// Check the ban reason exists else report that it couldn't be found.
		if (auditLog.reason != null) {
			banReason = auditLog.reason;
		} else {
			banReason = 'Audit log fetch was inconclusive or does not exist...';
		}

		const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle('User Banned')
			.addFields(
				{ name: 'User tag:', value: ban.user.tag, inline: true },
				{ name: 'User ID:', value: ban.user.id, inline: true },
				{ name: 'Ban reason:', value: banReason, inline: false },
			)
			.setFooter({ text: `User ID: ${ban.user.id}`, iconURL: ban.user.displayAvatarURL()})
			.setTimestamp(Date.now());
		(channel as TextChannel).send({ embeds: [embed] });
	});
}