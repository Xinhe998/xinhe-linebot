import linebot from 'linebot';
import express from 'express';
import path from 'path';

require('dotenv').config();
require('./index.js');

// 建立linebot物件
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();
const linebotParser = bot.parser();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));
app.get('/', (req, res) => {
  res.sendFile(__dirname);
});
app.post('/linewebhook', linebotParser);

bot.on('message', (event) => {
  // event.message.text是使用者傳給bot的訊息
  const replyMsg = `Hello你剛才說的是:${event.message.text}`;

  event.reply(replyMsg).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  });
});

bot.on('follow', (event) => {
  event.reply(`follow: ${event.source.userId}`);
});

bot.on('unfollow', (event) => {
  event.reply(`unfollow: ${event.source.userId}`);
});

bot.on('join', (event) => {
  event.reply(`join: ${event.source.groupId}`);
});

bot.on('leave', (event) => {
  event.reply(`leave: ${event.source.groupId}`);
});

bot.on('postback', (event) => {
  event.reply(`postback: ${event.postback.data}`);
});

bot.on('beacon', (event) => {
  event.reply(`beacon: ${event.beacon.hwid}`);
});

bot.listen(process.env.PORT || 80, () => {
  console.log('LineBot is running.');
});
