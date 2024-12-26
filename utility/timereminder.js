const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { db } = require.main.require("./database.js");
const { formatTime } = require("../code_utils/formatter.js");

var User;

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
        .setDescription("Minute of the reminder")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(59)
    ),

  async execute(interaction) {
    const uid = interaction.user.id;
    const hour = interaction.options.getInteger("hour");
    const minute = interaction.options.getInteger("minute");
    const [user, created] = await User.findOrCreate({
      where: { userId: uid },
    });

    user.hour = hour;
    user.minute = minute;
    user.save();

    await interaction.reply({
      content: `Set your notification time to ${formatTime(hour, minute)}.`,
      ephemeral: true,
    });
  },

  initFromDB: () => {
    User = db.models.NotificationHour;
  },
};
