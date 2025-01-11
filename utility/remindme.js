const { SlashCommandBuilder } = require("discord.js");
require("datejs");
const { formatTime } = require("../code_utils/formatter.js");

var db;
var Reminder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remindme")
    .setDescription("Remind yourself about something")
    .addStringOption((option) =>
      option
        .setName("when")
        .setDescription("When do you want to be reminded")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("message").setDescription("Reminder message (optional)")
    ),

  async execute(interaction) {
    const uid = interaction.user.id;
    const when = interaction.options.getString("when");
    const message = interaction.options.getString("message");

    const parsed = Date.parse(when);

    if (parsed === null) {
      await interaction.reply({
        content: `I didn't quite understand. Please repeat the time.`,
        ephemeral: true,
      });
    } else {
      const delay = parsed.getTime() - Date.now();
      // const reminder = await Reminder.create({ userId: uid });
      await interaction.reply({
        content: `Reminder set in ${delay} ms.`,
        ephemeral: true,
      });
    }
  },

  initFromDB: (database) => {
    db = database;
    Reminder = db.models.smith_RemindMe;
  },
};
