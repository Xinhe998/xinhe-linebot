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
      { name: 'advantech', from: 'workExperience', to: 'workExperience_Advantech' }, // 工作經驗_advantech
      { name: 'leaveAdvantech', from: 'workExperience_Advantech', to: 'mainMenu' }, // 離開工作經驗_advantech（回選單）
      { name: 'advantechBackToWorkExperience', from: 'workExperience_Advantech', to: 'workExperience' }, // 回工作經驗
      { name: 'leaveWorkExperience', from: 'workExperience', to: 'mainMenu' }, // 工作經驗
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
  case 'workExperience':
  {
    switch (text) {
    case 'Xinhe 在研華科技...':
      return 'advantech';
    default:
      return 'leaveWorkExperience';
    }
  }
  case 'workExperience_Advantech':
  {
    switch (text) {
    case '回選單':
      return 'leaveAdvantech';
    case '回工作經驗':
      return 'advantechBackToWorkExperience';
    default:
      return 'advantechBackToWorkExperience';
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

const workExperienceMenu = (event) => {
  client.replyMessage(event.replyToken, {
    type: 'flex',
    altText: '實習工作經歷',
    contents: {
      type: 'carousel',
      contents: [
        {
          type: 'bubble',
          direction: 'ltr',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'image',
                url: 'https://www.avnet.com/opasdata/d120001/derivates/3/072/350/Advantech_logo_web.png',
                margin: 'none',
                size: 'full',
                aspectRatio: '16:9',
                aspectMode: 'fit',
              },
              {
                type: 'text',
                text: '網頁開發 Intern',
                size: 'lg',
                margin: 'xl',
                weight: 'bold',
                color: '#4A4A4A',
              },
              {
                type: 'text',
                text: '@ 研華科技',
                margin: 'sm',
                size: 'md',
                align: 'start',
                weight: 'bold',
                color: '#AEAEAE',
              },
              {
                type: 'box',
                layout: 'vertical',
                spacing: 'xs',
                margin: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        url: 'https://img.icons8.com/color/48/000000/marker.png',
                        aspectRatio: '1:1',
                      },
                      {
                        type: 'text',
                        text: '台北市, 內湖',
                        margin: 'md',
                        size: 'sm',
                        align: 'start',
                        gravity: 'center',
                        color: '#818181',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'icon',
                            url: 'https://img.icons8.com/color/48/000000/calendar.png',
                          },
                          {
                            type: 'text',
                            text: '2018/01 - 2018/07',
                            size: 'sm',
                            margin: 'md',
                            color: '#818181',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '了解更多',
                  data: 'Advantech',
                  text: 'Xinhe 在研華科技...',
                },
                color: '#B9AFAF',
                style: 'primary',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'image',
                url: 'https://t.kfs.io/upload_images/61083/105-1202____-____-___-02_promote.png',
                margin: 'none',
                size: 'full',
                aspectRatio: '16:9',
                aspectMode: 'fit',
              },
              {
                type: 'text',
                text: '軟體開發 Intern',
                size: 'lg',
                margin: 'xl',
                weight: 'bold',
                color: '#4A4A4A',
              },
              {
                type: 'text',
                text: '@ 創科資訊',
                margin: 'sm',
                size: 'md',
                align: 'start',
                weight: 'bold',
                color: '#AEAEAE',
              },
              {
                type: 'box',
                layout: 'vertical',
                spacing: 'xs',
                margin: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        url: 'https://img.icons8.com/color/48/000000/marker.png',
                        aspectRatio: '1:1',
                      },
                      {
                        type: 'text',
                        text: '台中市, 北區',
                        size: 'sm',
                        margin: 'md',
                        align: 'start',
                        gravity: 'center',
                        color: '#818181',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'icon',
                            url: 'https://img.icons8.com/color/48/000000/calendar.png',
                          },
                          {
                            type: 'text',
                            text: '2017/07 - 2018/01',
                            size: 'sm',
                            margin: 'md',
                            color: '#818181',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: '了解更多',
                  uri: 'https://linecorp.com',
                },
                color: '#B9AFAF',
                style: 'primary',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'image',
                url: 'https://taiwancloud.com/s/img/sites/logo1.png?20180302062003',
                margin: 'none',
                size: 'full',
                aspectRatio: '16:9',
                aspectMode: 'fit',
                backgroundColor: '#303030',
              },
              {
                type: 'text',
                text: 'ERP專案開發 Intern',
                margin: 'xl',
                size: 'lg',
                weight: 'bold',
                color: '#4A4A4A',
              },
              {
                type: 'text',
                text: '@ 臺灣寬雲',
                margin: 'sm',
                size: 'md',
                align: 'start',
                weight: 'bold',
                color: '#AEAEAE',
              },
              {
                type: 'box',
                layout: 'vertical',
                spacing: 'xs',
                margin: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        url: 'https://img.icons8.com/color/48/000000/marker.png',
                        aspectRatio: '1:1',
                      },
                      {
                        type: 'text',
                        text: '台中市, 南區',
                        margin: 'md',
                        size: 'sm',
                        align: 'start',
                        gravity: 'center',
                        color: '#818181',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'icon',
                            url: 'https://img.icons8.com/color/48/000000/calendar.png',
                          },
                          {
                            type: 'text',
                            text: '2017/01 - 2017/03',
                            margin: 'md',
                            size: 'sm',
                            color: '#818181',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: '了解更多',
                  uri: 'https://linecorp.com',
                },
                color: '#B9AFAF',
                style: 'primary',
              },
            ],
          },
        },
      ],
    },
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
  workExperienceMenu(event);
};

stateMethod.leaveWorkExperience = (event) => {
  fsm.leaveWorkExperience(); // change state
  mainMenu(event);
};

stateMethod.advantech = (event) => {
  fsm.advantech();
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '\u{100077} 主要負責以 C# .NET MVC 5 開發與維護研華雲端軟體市集專案網站系統。',
    },
    {
      type: 'text',
      text: '\u{100077} 僅花費一星期，獨自研究並成功為研華導入網頁自動化測試與撰寫了50項測試案例，\n並完成持續整合(CI)流程，減少部門10%人力資源成本。',
    },
    {
      type: 'text',
      text: '\u{100077} 舉辦跨國技術分享會議，教導中國大陸昆山QA同仁及總部IT同仁自動化測試代碼撰寫及相關經驗。',
    },
    {
      type: 'text',
      text: '\u{100077} 與協理、PM、UI/UX 設計師及多位工程師合作開發雲端軟體市集和其他網站專案。',
    },
    {
      type: 'flex',
      altText: 'Flex Message',
      contents: {
        type: 'bubble',
        header: {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: '看看我在研華的實習心得',
              size: 'sm',
              weight: 'bold',
              color: '#AAAAAA',
            },
          ],
        },
        hero: {
          type: 'image',
          url: 'https://cdn-images-1.medium.com/max/1600/0*mdXaoSSoDsq6TRgO.jpg',
          size: 'full',
          aspectRatio: '20:13',
          aspectMode: 'cover',
          action: {
            type: 'uri',
            label: 'Action',
            uri: 'https://medium.com/@xinhe998/advantech-internship-f4ba6a13acf6',
          },
        },
        footer: {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'button',
              action: {
                type: 'postback',
                label: '回工作經驗',
                data: '回工作經驗',
                text: '回工作經驗',
              },
              flex: 1,
              color: '#83728B',
              margin: 'md',
              style: 'primary',
            },
            {
              type: 'button',
              action: {
                type: 'postback',
                label: '回選單',
                data: '回選單',
                text: '回選單',
              },
              color: '#E1D5D5',
              margin: 'md',
              style: 'secondary',
            },
          ],
        },
      },
    },
  ]);
};

stateMethod.leaveAdvantech = (event) => {
  fsm.leaveAdventch(); // change state
  mainMenu(event);
};

stateMethod.advantechBackToWorkExperience = (event) => {
  fsm.advantechBackToWorkExperience(); // change state
  workExperienceMenu(event);
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
