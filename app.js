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
      { name: 'gotStart', from: 'start', to: 'mainMenu' }, // 主選單
      { name: 'selfIntro', from: 'mainMenu', to: 'selfIntro' }, // 自我介紹
      { name: 'school', from: 'selfIntro', to: 'selfIntro_School' }, // 自我介紹_學校科系
      { name: 'leaveSchool', from: 'selfIntro_School', to: 'mainMenu' }, // 離開自我介紹_學校科系
      { name: 'interest', from: 'selfIntro', to: 'selfIntro_Interest' }, // 自我介紹_喜歡的事物
      { name: 'leaveInterest', from: 'selfIntro_Interest', to: 'mainMenu' }, // 離開自我介紹_喜歡的事物
      { name: 'laeveSelfIntro', from: 'selfIntro', to: 'mainMenu' }, // 離開自我介紹
      { name: 'workExperience', from: 'mainMenu', to: 'workExperience' }, // 工作經驗
      { name: 'projects', from: 'mainMenu', to: 'projects' }, // 專案作品
      { name: 'skills', from: 'mainMenu', to: 'skills' }, // 專長技能
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
    case undefined:
      return 'gotStart';
    default:
      return 'gotStart';
    }
  }
  case 'selfIntro':
  {
    switch (text) {
    case '學校科系':
      return 'school';
    case '喜歡的事物':
      return 'interest';
    default:
      return 'laeveSelfIntro';
    }
  }
  case 'selfIntro_Interest':
  {
    switch (text) {
    default:
      return 'leaveInterest';
    }
  }
  case 'selfIntro_School':
  {
    switch (text) {
    case '回選單':
      return 'leaveSchool';
    default:
      return 'leaveSchool';
    }
  }
  default:
    return 'gotStart';
  }
};

const fsm = createFsm();

const stateMethod = {};

const mainMenu = (event) => {
  client.getProfile(event.source.userId)
    .then((profile) => {
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

stateMethod.gotStart = (event) => {
  fsm.gotStart(); // change state
  mainMenu(event);
};

stateMethod.selfIntro = (event) => {
  fsm.selfIntro(); // change state
  client.replyMessage(event.replyToken, [{
    type: 'sticker',
    packageId: '11537',
    stickerId: '52002738',
  },
  {
    type: 'text',
    text: 'Hello～我是許歆荷\u{10007F} \n對於技術充滿好奇與熱忱的網頁全端工程師，在學習新的方法或專業技術時總是保持著積極主動的態度！ ',
  },
  {
    type: 'text',
    text: '還想知道關於Xinhe哪方面的介紹呢\u{100084}',
    quickReply: {
      items: [
        {
          type: 'action',
          imageUrl: 'https://img.icons8.com/color/24/000000/school.png',
          action: {
            type: 'message',
            label: '學校科系',
            text: '學校科系',
          },
        },
        {
          type: 'action',
          imageUrl: 'https://img.icons8.com/cotton/40/000000/novel.png',
          action: {
            type: 'message',
            label: '喜歡的事物',
            text: '喜歡的事物',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '不了，謝謝！',
            text: '不了，謝謝！',
          },
        },
      ],
    },
  },
  ]);
};

stateMethod.school = (event) => {
  fsm.school(); // change state
  client.replyMessage(event.replyToken, {
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://otc.nutc.edu.tw/ezfiles/6/1006/img/492/abbb.gif',
        margin: 'none',
        align: 'center',
        size: '5xl',
        aspectRatio: '4:3',
        aspectMode: 'fit',
        action: {
          type: 'uri',
          label: 'Action',
          uri: 'https://linecorp.com',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        action: {
          type: 'uri',
          label: 'Action',
          uri: 'https://linecorp.com',
        },
        contents: [
          {
            type: 'text',
            text: '我就讀於國立臺中科技大學\n資訊應用菁英班。今年大三。\n\n目前在學校一直持續精進自己的資訊素養、系統架構、開發流程等更專業的知識！',
            size: 'sm',
            align: 'start',
            weight: 'regular',
            color: '#AAAAAA',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'spacer',
            size: 'lg',
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '回選單',
              text: '回選單',
              data: '回選單',
            },
            color: '#7E6C86',
            style: 'primary',
          },
        ],
      },
      styles: {
        hero: {
          backgroundColor: '#F8F6F9',
        },
        footer: {
          separator: true,
        },
      },
    },
  });
};

stateMethod.leaveSchool = (event) => {
  fsm.leaveSchool(); // change state
  mainMenu(event);
};

stateMethod.interest = (event) => {
  fsm.interest(); // change state
  client.replyMessage(event.replyToken, {
    type: 'template',
    altText: '關於Xinhe喜歡的事物...',
    template: {
      type: 'image_carousel',
      columns: [
        {
          imageUrl: 'https://xinhehsu.com/static/quick_fact1-6a91c91aeb68c90caca777b49011eb14.jpg',
          action: {
            type: 'postback',
            label: '閱讀Medium文章',
            data: '閱讀Medium文章',
          },
        },
        {
          imageUrl: 'https://xinhehsu.com/static/quick_fact6-eb00bd8d9a05d80f8e97dfb19bf0f3c3.jpg',
          action: {
            type: 'postback',
            label: '旅行',
            data: '旅行',
          },
        },
        {
          imageUrl: 'https://xinhehsu.com/static/quick_fact2-bc9ad0d9550f30c5e8898156850636fe.jpg',
          action: {
            type: 'postback',
            label: '參加技術年會',
            data: '參加技術年會',
          },
        },
        {
          imageUrl: 'https://truth.bahamut.com.tw/s01/201803/65c788f67b9ac5beb7f6862017bef46e.JPG',
          action: {
            type: 'postback',
            label: '貓',
            data: '貓',
          },
        },
      ],
    },
  });
};

stateMethod.leaveInterest = (event) => {
  fsm.leaveInterest(); // change state
  mainMenu(event);
};

stateMethod.laeveSelfIntro = (event) => {
  fsm.laeveSelfIntro(); // change state
  mainMenu(event);
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
  case 'postback':
    if (event.type !== 'postback') {
      return Promise.resolve(null);
    }
    break;
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
