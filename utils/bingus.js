const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bingus')
		.setDescription('bing bing!'),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setImage('https://static.wikia.nocookie.net/floppapedia-revamped/images/5/5f/ActualBingus.jpg')
		await interaction.reply({embeds: [embed]});
	},
};