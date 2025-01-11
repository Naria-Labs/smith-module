const { SlashCommandBuilder } = require("discord.js");
require("datejs");
const { Op } = require("sequelize");

var db;
var Reminder;
var client;
const reminderTimeoutLimit = 300000;

async function remind(userId, message, id) {
  const user = await client.users.fetch(userId);
  await user.send(`Reminder: ${message}`);
  const reminder = await Reminder.findByPk(id);
  if (reminder !== null) {
    await reminder.destroy();
  }
}

async function setReminders() {
  const maxTime = Date.now() + reminderTimeoutLimit;
  const toSchedule = await Reminder.findAll({
    where: { when: { [Op.lte]: maxTime } },
  });
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
      const reminder = await Reminder.create({
        userId: uid,
        when: timestamp,
        message: message,
      });
      if (delay <= reminderTimeoutLimit) {
        setTimeout(remind, delay, uid, message, reminder.id);
      }
      await interaction.reply({
        content: `Reminder set to ${parsed}.`,
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

    setTimeout(setReminders, reminderTimeoutLimit);
  },
};
