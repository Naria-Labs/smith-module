const { SlashCommandBuilder } = require("discord.js");
require("datejs");

var db;
var Reminder;
var client;
const reminderTimeoutLimit = (5).minutes().getTime();

async function remind(userId, message) {
  const user = await client.users.fetch(userId);
  await user.send(`Reminder: ${message}`);
}

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
      const timestamp = parsed.getTime();
      const delay = parsed.getTime() - Date.now();
      // const reminder = await Reminder.create({
      //   userId: uid,
      //   when: timestamp,
      //   message: message,
      // });
      if (delay <= reminderTimeoutLimit) {
        setTimeout(remind, delay, uid, message);
      }
      await interaction.reply({
        content: `Reminder set.`,
        ephemeral: true,
      });
    }
  },

  initFromDB: (database) => {
    db = database;
    Reminder = db.models.smith_RemindMe;
  },

  afterLogin: (c) => {
    client = c;

    setReminders();
  },
};
