const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { db } = require.main.require("./database.js");

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
        .setDescription("Minute of the reminder (optional)")
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
    var prevTime = "none";
    if (!created) {
      prevTime = user.hour + ":" + user.minute;
    }

    user.hour = hour;
    user.minute = minute;
    user.save();

    await interaction.reply({
      content: `Set your notification time from ${prevTime} to ${hour}:${minute}.`,
      ephemeral: true,
    });
  },

  initFromDB: () => {
    User = db.models.NotificationHour;
  },
};
