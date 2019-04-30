import express from 'express';
import * as line from '@line/bot-sdk';
import StateMachine from 'javascript-state-machine';

require('dotenv').config();
require('babel-polyfill');

const app = express();

const config = {
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};
const client = new line.Client(config);


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
  default:
    return 'gotStart';
  }
};

const fsm = createFsm();

const stateMethod = {};

stateMethod.gotStart = (event) => {
  fsm.gotStart();
  client.getProfile(event.source.userId).then((profile) => {
    client.replyMessage(event.replyToken, {
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

stateMethod.selfIntro = (event) => {
  fsm.selfIntro();
  client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'Hello～我是許歆荷，一位對於技術充滿好奇與熱忱的網頁全端工程師，在學習新的方法或專業技術時總是保持著積極主動的態度！ ',
  });
};

stateMethod.projects = (event) => {
  fsm.projects();
  client.replyMessage(event.replyToken, {
    type: 'text',
    text: '專案～～～ ',
  });
};

stateMethod.workExperience = (event) => {
  fsm.workExperience();
  client.replyMessage(event.replyToken, {
    type: 'text',
    text: '經歷～～～ ',
  });
};

stateMethod.skills = (event) => {
  fsm.skills();
  client.replyMessage(event.replyToken, {
    type: 'text',
    text: '技能～～～ ',
  });
};

const respondTo = (event) => {
  let text = '';
  if (event.type === 'message') {
    // eslint-disable-next-line prefer-destructuring
    text = event.message.text;
  } else if (event.type === 'postback') {
    text = event.postback.data;
  }

  const action = eventFromStateAndMessageText(fsm.state, text);
  stateMethod[action](event);
  console.log(fsm.history);
};


function handleEvent(event) {
  switch (event.type) {
  case 'message':
    if (event.type !== 'message') {
      return Promise.resolve(null);
    }
    return respondTo(event);
  default:
    throw new Error('Unknown message');
  }
}


app.post('/linewebhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

app.listen(3000, () => {
  console.log('LineBot is running.');
});
