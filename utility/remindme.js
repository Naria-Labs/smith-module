const { SlashCommandBuilder } = require("discord.js");
require("datejs");
const { formatTime } = require("../code_utils/formatter.js");

var db;
var User;

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

    // const [user, created] = await User.create({
    //   where: { userId: uid },
    // });

    // user.save();

    await interaction.reply({
      content: `Set your notification time to ${parsed}.`,
      ephemeral: true,
    });
  },

  initFromDB: (database) => {
    db = database;
    Reminder = db.models.smith_RemindMe;
  },
};
