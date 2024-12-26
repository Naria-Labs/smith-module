const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { db } = require.main.require("database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setremindertime")
    .setDescription("Set time for your personal vocal reminder")
    .addNumberOption((option) => {
      option
        .setName("hour")
        .setDescription("Hour of the reminder")
        .setRequired();
    })
    .addNumberOption((option) => {
      option
        .setName("minute")
        .setDescription("Minute of the reminder (optional)");
    }),

  async execute(interaction) {
    var hour = interaction.options.getNumberOption("hour");
    var minute = interaction.options.getNumberOption("minute");
    await interaction.reply({
      content: `Set the notification time to ${hour}`,
      ephemeral: true,
    });
  },
};
