import linebot from 'linebot';
import bodyParser from 'body-parser';
import express from 'express';
import StateMachine from 'javascript-state-machine';

require('dotenv').config();
require('babel-polyfill');

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

// State Machine
const StateMachineHistory = require('javascript-state-machine/lib/history');

function createFsm() {
  return new StateMachine({
    init: 'start',
    transitions: [
      { name: 'gotStart', from: 'start', to: 'mainMenu' },
      { name: 'selfIntro', from: 'mainMenu', to: 'selfIntro' },
      { name: 'workExperience', from: 'mainMenu', to: 'workExperience' },
      { name: 'projects', from: 'mainMenu', to: 'projects' },
      { name: 'skills', from: 'mainMenu', to: 'skills' },
    ],
    plugins: [
      new StateMachineHistory(),
    ],
  });
}

const eventFromStateAndMessageText = (state, text) => {
  console.log(state, text);
  switch (state) {
  case 'start':
    return 'gotStart';
  case 'mainMenu':
  {
    switch (text) {
    case '自我介紹':
      return 'selfIntro';
    case '實習工作經歷':
      return 'workExperience';
    case '專案作品':
      return 'projects';
    default:
      return 'gotStart';
    }
  }
  case 'waitingname':
    return 'gotName';
  case 'echoing':
    return text === '/stop' ? 'gotstop' : 'gottext';
  case 'confirm':
    if (text === 'yes') {
      return 'confirmed';
    }
    if (text === 'no') {
      return 'cancelled';
    }
    return 'invalid';
  default:
    return 'gotStart';
  }
};

const fsm = createFsm();
fsm.gotStart();

const respondTo = async (event) => {
  let text = '';
  if (event.type === 'message') {
    // eslint-disable-next-line prefer-destructuring
    text = event.message.text;
  } else if (event.type === 'postback') {
    text = event.postback.data;
  }
  // eslint-disable-next-line no-unused-vars
  let lastMessage;

  fsm.gotStart = () => {
    lastMessage = event.source.profile().then((profile) => {
      event.reply({
        type: 'template',
        altText: 'Hi, I am Xinhe.',
        template: {
          type: 'buttons',
          thumbnailImageUrl: 'https://i.imgur.com/gopa6mjl.png',
          title: `${profile.displayName}, 很高興認識你！`,
          text: '想從哪方面開始聊呢？',
          actions: [
            {
              type: 'postback',
              label: 'Xinhe自我介紹一下吧！',
              text: '自我介紹',
              data: '自我介紹',
            },
            {
              type: 'postback',
              label: '實習工作經歷',
              data: 'action=add&itemid=123',
              text: '實習工作經歷',
            },
            {
              type: 'postback',
              label: '專案作品',
              data: 'action=add&itemid=123',
              text: '專案作品',
            },
            {
              type: 'uri',
              label: '專長＆技能樹',
              uri: 'http://example.com/page/123',
              text: '專長＆技能樹',
            },
          ],
        },
      });
    });
  };

  fsm.selfIntro = async () => {
    lastMessage = await event.reply({
      type: 'text',
      text: 'Hello～我是許歆荷，一位對於技術充滿好奇與熱忱的網頁全端工程師，在學習新的方法或專業技術時總是保持著積極主動的態度！ ',
    });
  };

  fsm.projects = async () => {
    lastMessage = await event.reply({
      type: 'text',
      text: '專案～～～ ',
    });
  };

  fsm.workExperience = async () => {
    lastMessage = await event.reply({
      type: 'text',
      text: '經歷～～～ ',
    });
  };

  fsm.skills = async () => {
    lastMessage = await event.reply({
      type: 'text',
      text: '技能～～～ ',
    });
  };

  const action = eventFromStateAndMessageText(fsm.state, text);
  await fsm[action.toString()]();
  console.log(fsm.history);
};

bot.on('message', (event) => {
  respondTo(event);
});

bot.on('follow', (event) => {
  // event.reply(`follow: ${event.source.userId}`);
  fsm.gotStart();
});

// bot.on('unfollow', (event) => {
//   event.reply(`unfollow: ${event.source.userId}`);
// });

// bot.on('join', (event) => {
//   event.reply(`join: ${event.source.groupId}`);
// });

// bot.on('leave', (event) => {
//   event.reply(`leave: ${event.source.groupId}`);
// });

// bot.on('postback', (event) => {
//   event.reply(`postback: ${event.postback.data}`);
//   respondTo(event);
// });

bot.listen('/linewebhook', 3000, () => {
  console.log('LineBot is running.');
});
