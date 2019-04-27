import linebot from 'linebot';
import bodyParser from 'body-parser';
import express from 'express';
// import path from 'path';

require('dotenv').config();

const app = express();

// 建立linebot物件
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const parser = bodyParser.json({
  verify(req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
  },
});

app.post('/linewebhook', parser, (req, res) => {
  if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
    return res.sendStatus(400);
  }
  bot.parse(req.body);
  return res.json({});
});

bot.on('message', (event) => {
  // event.message.text是使用者傳給bot的訊息
  // const replyMsg = `Hello你剛才說的是:${event.message.text}`;
  let replyMsg;
  event.source.profile().then((profile) => {
    replyMsg = `Hello, ${profile.displayName}`;
    event.reply(replyMsg);
  });

  // event.reply(replyMsg).then((data) => {
  //   console.log(data);
  // }).catch((error) => {
  //   console.log(error);
  // });
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

bot.listen('/linewebhook', 3000, () => {
  console.log('LineBot is running.');
});
