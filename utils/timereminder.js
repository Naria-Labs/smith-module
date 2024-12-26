const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { db } = require.main.require("./database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setremindertime")
    .setDescription("Set time for your personal vocal reminder")
    .addIntegerOption((option) =>
      option
        .setName("hour")
        .setDescription("Hour of the reminder")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(23)
    )
    .addIntegerOption((option) =>
      option
        .setName("minute")
        .setDescription("Minute of the reminder (optional)")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(59)
    ),

  async execute(interaction) {
    var hour = interaction.options.getInteger("hour");
    var minute = interaction.options.getInteger("minute");
    await interaction.reply({
      content: `Set the notification time to ${hour}`,
      ephemeral: true,
    });
  },
};
