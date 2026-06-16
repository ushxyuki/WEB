const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const staffMembers = [
  {
    userId: "644010298579091466",
    customName: "Alvin"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Sheha"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Harry"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Rush"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Crimson"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Sippi"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Hawi"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Amaya"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Dileshan"
  },
  {
    userId: "USER_ID_HERE",
    customName: "Dagi"
  }
];

app.get("/api/staff", async (req, res) => {
  try {
    const staff = await Promise.all(
      staffMembers.map(async (member) => {
        const user = await client.users.fetch(member.userId);

        return {
          id: user.id,
          name: member.customName || user.globalName || user.username,
          discordLink: `https://discord.com/users/${user.id}`,
          avatar: user.displayAvatarURL({
            extension: "png",
            size: 256
          })
        };
      })
    );

    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not load staff members" });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});