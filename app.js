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
      { name: 'gotStart', from: '*', to: 'mainMenu' }, // 主選單

      { name: 'selfIntro', from: '*', to: 'selfIntro' }, // 自我介紹
      { name: 'school', from: 'selfIntro', to: 'selfIntro_School' }, // 自我介紹_學校科系
      { name: 'leaveSchool', from: 'selfIntro_School', to: 'mainMenu' }, // 離開自我介紹_學校科系
      { name: 'interest', from: 'selfIntro', to: 'selfIntro_Interest' }, // 自我介紹_喜歡的事物
      { name: 'leaveInterest', from: 'selfIntro_Interest', to: 'mainMenu' }, // 離開自我介紹_喜歡的事物
      { name: 'laeveSelfIntro', from: 'selfIntro', to: 'mainMenu' }, // 離開自我介紹

      { name: 'workExperience', from: '*', to: 'workExperience' }, // 工作經驗
      { name: 'leaveWorkExperience', from: 'workExperience', to: 'mainMenu' }, // 工作經驗

      { name: 'advantech', from: 'workExperience', to: 'workExperience_Advantech' }, // 工作經驗_advantech
      { name: 'leaveAdvantech', from: 'workExperience_Advantech', to: 'mainMenu' }, // 離開工作經驗_advantech（回選單）
      { name: 'advantechBackToWorkExperience', from: 'workExperience_Advantech', to: 'workExperience' }, // advantech回工作經驗

      { name: 'trunkStudio', from: 'workExperience', to: 'workExperience_TrunkStudio' }, // 工作經驗_trunk
      { name: 'leaveTrunkStudio', from: 'workExperience_TrunkStudio', to: 'mainMenu' }, // 離開工作經驗_trunk（回選單）
      { name: 'trunkStudioBackToWorkExperience', from: 'workExperience_TrunkStudio', to: 'workExperience' }, // trunk回工作經驗

      { name: 'taiwanCloud', from: 'workExperience', to: 'workExperience_TaiwanCloud' }, // 工作經驗_taiwanCloud
      { name: 'leaveTaiwanCloud', from: 'workExperience_TaiwanCloud', to: 'mainMenu' }, // 離開工作經驗_taiwanCloud（回選單）
      { name: 'taiwanCloudBackToWorkExperience', from: 'workExperience_TaiwanCloud', to: 'workExperience' }, // taiwanCloud回工作經驗

      { name: 'projects', from: '*', to: 'projects' }, // 專案作品
      { name: 'leaveProjects', from: 'projects', to: 'mainMenu' }, // 離開專案作品

      { name: 'ghowa', from: 'projects', to: 'projects_Ghowa' }, // 專案作品_Ghowa
      { name: 'backToGhowa', from: '*', to: 'projects_Ghowa' }, // 專案作品_Ghowa
      { name: 'ghowaRole', from: 'projects_Ghowa', to: 'projects_Ghowa_Role' }, // 專案作品_Ghowa_擔任角色
      { name: 'ghowaLang', from: 'projects_Ghowa', to: 'projects_Ghowa_Lang' }, // 專案作品_Ghowa_程式語言
      { name: 'ghowaScreen', from: 'projects_Ghowa', to: 'projects_Ghowa_Screen' }, // 專案作品_Ghowa_實際畫面

      { name: 'meracle', from: 'projects', to: 'projects_Meracle' }, // 專案作品_Meracle
      { name: 'backToMeracle', from: '*', to: 'projects_Meracle' }, // 專案作品_Meracle
      { name: 'meracleRole', from: 'projects_Meracle', to: 'projects_Meracle_Role' }, // 專案作品_Meracle_擔任角色
      { name: 'meracleLang', from: 'projects_Meracle', to: 'projects_Meracle_Lang' }, // 專案作品_Meracle_程式語言
      { name: 'meracleScreen', from: 'projects_Meracle', to: 'projects_Meracle_Screen' }, // 專案作品_Meracle_實際畫面

      { name: 'here', from: 'projects', to: 'projects_HERE' }, // 專案作品_HERE
      { name: 'backToHERE', from: '*', to: 'projects_HERE' }, // 專案作品_HERE
      { name: 'hereRole', from: 'projects_HERE', to: 'projects_HERE_Role' }, // 專案作品_here_擔任角色
      { name: 'hereLang', from: 'projects_HERE', to: 'projects_HERE_Lang' }, // 專案作品_here_程式語言
      { name: 'hereScreen', from: 'projects_HERE', to: 'projects_HERE_Screen' }, // 專案作品_here_實際畫面

      { name: 'bonERP', from: 'projects', to: 'projects_BonERP' }, // 專案作品_BonERP
      { name: 'backToBonERP', from: '*', to: 'projects_BonERP' }, // 專案作品_BonERP
      { name: 'bonERPRole', from: 'projects_BonERP', to: 'projects_BonERP_Role' }, // 專案作品_BonERP_擔任角色
      { name: 'bonERPLang', from: 'projects_BonERP', to: 'projects_BonERP_Lang' }, // 專案作品_BonERP_程式語言
      { name: 'bonERPScreen', from: 'projects_BonERP', to: 'projects_BonERP_Screen' }, // 專案作品_BonERP_實際畫面

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
    case '專長＆技能樹':
      return 'skills';
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
    case 'Xinhe 在創科資訊...':
      return 'trunkStudio';
    case 'Xinhe 在臺灣寬雲...':
      return 'taiwanCloud';
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
  case 'workExperience_TrunkStudio':
  {
    switch (text) {
    case '回選單':
      return 'leaveTrunkStudio';
    case '回工作經驗':
      return 'trunkStudioBackToWorkExperience';
    default:
      return 'trunkStudioBackToWorkExperience';
    }
  }
  case 'projects':
  {
    switch (text) {
    case '看看Ghowa的詳細介紹':
      return 'ghowa';
    case '看看Meracle的詳細介紹':
      return 'meracle';
    case '看看 HERE 這禮 的詳細介紹':
      return 'here';
    case '看看BonERP的詳細介紹':
      return 'bonERP';
    default:
      return 'leaveProjects';
    }
  }
  case 'projects_Ghowa':
  {
    switch (text) {
    case '擔任的角色':
      return 'ghowaRole';
    case '程式語言':
      return 'ghowaLang';
    case '實際畫面':
      return 'ghowaScreen';
    default:
      return 'projects';
    }
  }
  case 'projects_Meracle':
  {
    switch (text) {
    case '擔任的角色':
      return 'meracleRole';
    case '程式語言':
      return 'meracleLang';
    case '實際畫面':
      return 'meracleScreen';
    default:
      return 'projects';
    }
  }
  case 'projects_HERE':
  {
    switch (text) {
    case '擔任的角色':
      return 'hereRole';
    case '程式語言':
      return 'hereLang';
    case '實際畫面':
      return 'hereScreen';
    default:
      return 'projects';
    }
  }
  case 'projects_BonERP':
  {
    switch (text) {
    case '擔任的角色':
      return 'bonERPRole';
    case '程式語言':
      return 'bonERPLang';
    case '實際畫面':
      return 'bonERPScreen';
    default:
      return 'projects';
    }
  }
  case 'skills':
  {
    switch (text) {
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
              data: '實習工作經歷',
              text: '實習工作經歷',
            },
            {
              type: 'postback',
              label: '專案作品',
              data: '專案作品',
              text: '專案作品',
            },
            {
              type: 'postback',
              label: '專長＆技能樹',
              data: '專長＆技能樹',
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
                  type: 'postback',
                  label: '了解更多',
                  data: 'trunkStudio',
                  text: 'Xinhe 在創科資訊...',
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
                  type: 'postback',
                  label: '了解更多',
                  data: 'taiwanCloud',
                  text: 'Xinhe 在臺灣寬雲...',
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
    type: 'flex',
    altText: '專案作品',
    contents: {
      type: 'carousel',
      contents: [
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Ghowa',
                margin: 'none',
                size: 'lg',
                align: 'center',
                weight: 'bold',
              },
            ],
          },
          hero: {
            type: 'image',
            url: 'https://i.pinimg.com/564x/d7/ea/70/d7ea70b278c94cd4eb90ad335fd82831.jpg',
            margin: 'none',
            size: 'full',
            aspectRatio: '1.51:1',
            aspectMode: 'cover',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '幫助與同伴快速分帳的APP',
                align: 'start',
                color: '#858585',
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
                  label: '詳細介紹',
                  text: '看看Ghowa的詳細介紹',
                  data: '看看Ghowa的詳細介紹',
                },
                color: '#72647A',
                style: 'primary',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Meracle',
                margin: 'none',
                size: 'lg',
                align: 'center',
                weight: 'bold',
              },
            ],
          },
          hero: {
            type: 'image',
            url: 'https://loracy.github.io/images/meracle/cover-new.png',
            margin: 'none',
            size: 'full',
            aspectRatio: '1.51:1',
            aspectMode: 'cover',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '學童腦波記憶力評估訓練系統',
                align: 'start',
                color: '#858585',
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
                  label: '詳細介紹',
                  text: '看看Meracle的詳細介紹',
                  data: '看看Meracle的詳細介紹',
                },
                color: '#72647A',
                style: 'primary',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'HERE 這禮',
                margin: 'none',
                size: 'lg',
                align: 'center',
                weight: 'bold',
              },
            ],
          },
          hero: {
            type: 'image',
            url: 'https://xinhehsu.com/static/here-1-43dda683b48f70712e451000260ab1c0.png',
            margin: 'none',
            size: 'full',
            aspectRatio: '1.51:1',
            aspectMode: 'cover',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '線上贈物平台',
                align: 'start',
                color: '#858585',
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
                  label: '詳細介紹',
                  text: '看看 HERE 這禮 的詳細介紹',
                  data: '看看 HERE 這禮 的詳細介紹',
                },
                color: '#72647A',
                style: 'primary',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'BonERP',
                margin: 'none',
                size: 'lg',
                align: 'center',
                weight: 'bold',
              },
            ],
          },
          hero: {
            type: 'image',
            url: 'https://i.imgur.com/dUphNcYl.png',
            margin: 'none',
            size: 'full',
            aspectRatio: '1.51:1',
            aspectMode: 'cover',
            backgroundColor: '#FFFFFF',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '雲端ERP系統',
                align: 'start',
                color: '#858585',
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
                  label: '詳細介紹',
                  text: '看看BonERP的詳細介紹',
                  data: '看看BonERP的詳細介紹',
                },
                color: '#72647A',
                style: 'primary',
              },
            ],
          },
        },
      ],
    },
  });
};

stateMethod.ghowa = (event) => {
  fsm.ghowa(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: 'Ghowa 幫助使用者清楚列出群組中成員間的欠款關係與金額，使用者可以在Ghowa上新增無限個群組，只要輸入支出的款項，系統就會自動協助計算出群組成員彼此間的欠款\u{100080}',
    },
    {
      type: 'text',
      text: '這份專案目前仍在開發進行中，且預計將於2019年夏季上架至App Store！',
    },
    {
      type: 'text',
      text: '還想知道關於Ghowa的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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

stateMethod.ghowaRole = (event) => {
  fsm.ghowaRole(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '我與來自國立臺北教育大學 數位科技設計學系的同學跨校合作，負責後端開發\u{10003B}',
    },
    {
      type: 'text',
      text: '還想知道關於Ghowa的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToGhowa();
};

stateMethod.ghowaLang = (event) => {
  fsm.ghowaLang(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '後端使用程式語言：\n \u{10002D}Node.js\n \u{10002D}Express.js\n資料庫：\n \u{10002D}MySQL',
    },
    {
      type: 'text',
      text: '還想知道關於Ghowa的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToGhowa();
};

stateMethod.ghowaScreen = (event) => {
  fsm.ghowaScreen(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'flex',
      altText: 'Ghowa 實際畫面',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            direction: 'ltr',
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/ghowa-wireframe-4dabab07acbbbac38df7da4677fd843e.png',
              margin: 'md',
              align: 'center',
              size: 'full',
              aspectRatio: '9:16',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Wireframe',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
          {
            type: 'bubble',
            direction: 'ltr',
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/ghowa-app-1-4fd81c12464c8aa859f564ddbffb7020.png',
              margin: 'md',
              align: 'center',
              size: 'full',
              aspectRatio: '9:16',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'UI Mockup',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
          {
            type: 'bubble',
            direction: 'ltr',
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/ghowa-app-2-968b0a549fba12b6f93f3fe80c049e3c.png',
              margin: 'md',
              align: 'center',
              size: 'full',
              aspectRatio: '9:16',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'UI Mockup',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'text',
      text: '還想知道關於Ghowa的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToGhowa();
};

stateMethod.meracle = (event) => {
  fsm.meracle(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: 'Meracle 憶想奇機是個為學童量身打造的腦波記憶力評估訓練系統，其使用 Neurosky 的頭戴式腦波耳機擷取腦波生理訊號，以量化工作記憶力之演算法得出記憶力指數 ，並為家長提供豐富多元的圖表及數據分析 。Meracle 憶想奇機的目標及宗旨在於提升學童的工作記憶力\u{100080}',
    },
    {
      type: 'text',
      text: '我們的團隊由四個人所組成，利用跨平台行動應用框架React Native完成了一套App，React.js完成了網頁系統，與C# .NET API 2開發後端RESTful API。',
    },
    {
      type: 'text',
      text: '還想知道關於Meracle的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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

stateMethod.meracleRole = (event) => {
  fsm.meracleRole(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '整個專題流程，從發想到實作我都參與其中，尤其在Web前端部分由我獨自開發完成\u{10003B}',
    },
    {
      type: 'text',
      text: '還想知道關於Meracle的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToMeracle();
};

stateMethod.meracleLang = (event) => {
  fsm.meracleLang(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '網頁前端使用程式語言：\n \u{10002D}React.js\n \u{10002D}Redux\n \u{10002D}SCSS\n \u{10002D}JavaScript\n \u{10002D}Webpack',
    },
    {
      type: 'text',
      text: '還想知道關於Ghowa的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToMeracle();
};

stateMethod.meracleScreen = (event) => {
  fsm.meracleScreen(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'flex',
      altText: 'Meracle 實際畫面',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'filler',
                },
              ],
            },
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/meracle-1-b4a9cf768700b3863a8f86d12cd348a5.png',
              margin: 'none',
              align: 'center',
              size: 'full',
              aspectRatio: '1.51:1',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Web',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
          {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'filler',
                },
              ],
            },
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/meracle-2-6a4887182d6e72edacf9a71b85043dec.png',
              margin: 'none',
              align: 'center',
              size: 'full',
              aspectRatio: '1.51:1',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Web',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'text',
      text: '還想知道關於Ghowa的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToMeracle();
};

stateMethod.here = (event) => {
  fsm.here(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: 'HERE 這禮是個基於以物易物、禮物經濟概念的平台。靈感來自於從迴紋針換到一棟房的故事。 HERE 的宗旨在於「Help Everyone, Reuse Everything」。 讓各種不同目的的捐贈者（企業打消期末存貨、家庭二手物品、愛心捐款者等）將物資放上網站，並讓有需求的慈善團體、弱勢家庭或任何有需求之族群至平台上選取需求物資\u{100080}',
    },
    {
      type: 'text',
      text: '還想知道關於HERE 這禮的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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

stateMethod.hereRole = (event) => {
  fsm.hereRole(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '這是我和團隊第一次從發想、規劃、到實作，獨自完成一套完整系統及系統分析文件。\n整個專題流程我都參與其中，尤其在Web前端是由我獨自開發完成\u{10003B}',
    },
    {
      type: 'text',
      text: '還想知道關於HERE 這禮的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToHERE();
};

stateMethod.hereLang = (event) => {
  fsm.hereLang(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '網頁前端使用程式語言：\n \u{10002D}HTML\n \u{10002D}CSS\n \u{10002D}Bootstrap\n \u{10002D}jQuery',
    },
    {
      type: 'text',
      text: '還想知道關於HERE 這禮的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToHERE();
};

stateMethod.hereScreen = (event) => {
  fsm.hereScreen(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'flex',
      altText: 'HERE 這禮 實際畫面',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'filler',
                },
              ],
            },
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/here-2-2a1fd559e155da4af38973e6b4ac5a6c.jpg',
              margin: 'none',
              align: 'center',
              size: 'full',
              aspectRatio: '1.51:1',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Web',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
          {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'filler',
                },
              ],
            },
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/here-4-9234c006b62e2fda30eef1b142a4b587.jpg',
              margin: 'none',
              align: 'center',
              size: 'full',
              aspectRatio: '1.51:1',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Web',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'text',
      text: '還想知道關於HERE 這禮的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToHERE();
};

stateMethod.bonERP = (event) => {
  fsm.bonERP(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '在2017年寒假期間，我與四位同學實習於臺灣寬雲股份有限公司，協助開發及導入雲端ERP系統─BonERP \u{100080}',
    },
    {
      type: 'text',
      text: '還想知道關於BonERP的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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

stateMethod.bonERPRole = (event) => {
  fsm.bonERPRole(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '在這份專案當中，我獨自負責前端開發，亦協助開發後端數個模組\u{10003B}',
    },
    {
      type: 'text',
      text: '還想知道關於BonERP的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToBonERP();
};

stateMethod.bonERPLang = (event) => {
  fsm.bonERPLang(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '網頁前端使用程式語言：\n \u{10002D}HTML\n \u{10002D}CSS\n \u{10002D}Bootstrap\n \u{10002D}jQuery\n網頁後端：\n \u{10002D}C# .NET MVC 5\n資料庫：\n \u{10002D}MS SQL Server',
    },
    {
      type: 'text',
      text: '還想知道關於BonERP的什麼資訊呢？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '擔任的角色',
              text: '擔任的角色',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '程式語言',
              text: '程式語言',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '實際畫面',
              text: '實際畫面',
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
  fsm.backToHERE();
};

stateMethod.bonERPScreen = (event) => {
  fsm.bonERPScreen(); // change state
  client.replyMessage(event.replyToken, [
    {
      type: 'flex',
      altText: 'BonERP 實際畫面',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'filler',
                },
              ],
            },
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/bonerp-1-54d5e913b4c9f4734869a44f1edaa15e.png',
              margin: 'none',
              align: 'center',
              size: 'full',
              aspectRatio: '1.51:1',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Web',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
          {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'filler',
                },
              ],
            },
            hero: {
              type: 'image',
              url: 'https://xinhehsu.com/static/bonerp-2-f9ed797276609f5e18eb8bfa497f15bd.png',
              margin: 'none',
              align: 'center',
              size: 'full',
              aspectRatio: '1.51:1',
              aspectMode: 'fit',
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Web',
                  size: 'sm',
                  align: 'center',
                  color: '#B9B8B8',
                },
              ],
            },
          },
        ],
      },
    },
  ]);
  fsm.backToBonERP();
};

stateMethod.leaveProjects = (event) => {
  fsm.leaveProjects(); // change state
  mainMenu(event);
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

stateMethod.trunkStudio = (event) => {
  fsm.trunkStudio();
  client.replyMessage(event.replyToken, [
    {
      type: 'flex',
      altText: '利用Vue.js, EJS語法，參與 「VIPT JOB」 官方網站(提供外籍移工及企業的人力銀行) 開發，並協助i18n多國語系建置。',
      contents: {
        type: 'bubble',
        direction: 'ltr',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '專案一',
              margin: 'none',
              align: 'center',
              weight: 'bold',
            },
          ],
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '利用Vue.js, EJS語法，參與 「VIPT JOB」 官方網站(提供外籍移工及企業的人力銀行) 開發，並協助i18n多國語系建置。',
              align: 'start',
              wrap: true,
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
                label: '查看 VIPT JOB',
                uri: 'https://viptjob.com',
              },
              color: '#73657B',
              style: 'primary',
              height: 'sm',
            },
          ],
        },
      },
    },
    {
      type: 'flex',
      altText: '利用React Native，參與 「凱擘 Healthcare健康保健室」 app 開發。',
      contents: {
        type: 'bubble',
        direction: 'ltr',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '專案二',
              margin: 'none',
              align: 'center',
              weight: 'bold',
            },
          ],
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              align: 'start',
              text: '利用React Native，參與 「凱擘 Healthcare健康保健室」 app 開發。',
              wrap: true,
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
                label: '取得 Healthcare健康保健室',
                uri: 'https://itunes.apple.com/tw/app/healthcare%E5%81%A5%E5%BA%B7%E4%BF%9D%E5%81%A5%E5%AE%A4/id1239683214?mt=8',
              },
              color: '#73657B',
              style: 'primary',
              height: 'sm',
            },
          ],
        },
      },
    },
    {
      type: 'text',
      text: '熟悉Git版本管控, JavaScript, React, EJS語法與敏捷開發。',
    },
    {
      type: 'flex',
      altText: '獲得全公司票選表現最佳實習生！',
      contents: {
        type: 'bubble',
        direction: 'ltr',
        hero: {
          type: 'image',
          url: 'https://i.imgur.com/xdTKW4Zh.jpg',
          size: 'full',
          aspectRatio: '1.51:1',
          aspectMode: 'fit',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '獲得全公司票選表現最佳實習生！',
              align: 'start',
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

stateMethod.taiwanCloud = (event) => {
  fsm.taiwanCloud();
  client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: '\u{100077} 使用 HTML, CSS, jQuery, C# .NET MVC 5 參與雲端ERP系統開發。',
    },
    {
      type: 'text',
      text: '\u{100077} 熟悉 C# .NET MVC 5 與 jQuery。',
    },
  ]);
};

stateMethod.leaveAdvantech = (event) => {
  fsm.leaveAdvantech(); // change state
  mainMenu(event);
};

stateMethod.advantechBackToWorkExperience = (event) => {
  fsm.advantechBackToWorkExperience(); // change state
  workExperienceMenu(event);
};

stateMethod.leaveTrunkStudio = (event) => {
  fsm.leaveTrunkStudio(); // change state
  mainMenu(event);
};

stateMethod.trunkStudioBackToWorkExperience = (event) => {
  fsm.trunkStudioBackToWorkExperience(); // change state
  workExperienceMenu(event);
};

stateMethod.skills = (event) => {
  fsm.skills();
  client.replyMessage(event.replyToken, {
    type: 'flex',
    altText: '專長＆技能樹',
    contents: {
      type: 'carousel',
      contents: [
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '網頁前端',
                margin: 'none',
                align: 'start',
                weight: 'bold',
              },
              {
                type: 'separator',
                margin: 'xxl',
              },
            ],
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'none',
            margin: 'none',
            contents: [
              {
                type: 'text',
                text: '📌 JavaScript',
                align: 'start',
                color: '#858484',
                wrap: true,
              },
              {
                type: 'text',
                text: '📌 React.js',
                color: '#858484',
              },
              {
                type: 'text',
                text: '📌 Redux',
                color: '#858484',
              },
              {
                type: 'text',
                text: '📌 jQuery',
                color: '#858484',
              },
              {
                type: 'text',
                color: '#858484',
                text: '📌 Vue.js',
              },
              {
                type: 'text',
                text: '📌 Webpack',
                color: '#858484',
              },
              {
                type: 'text',
                text: '📌 HTML',
                color: '#858484',
              },
              {
                type: 'text',
                text: '📌 CSS / SCSS',
                color: '#858484',
              },
              {
                type: 'text',
                text: '📌 Bootstrap',
                color: '#858484',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '後端',
                margin: 'none',
                align: 'start',
                weight: 'bold',
              },
              {
                type: 'separator',
                margin: 'xxl',
              },
            ],
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'none',
            margin: 'none',
            contents: [
              {
                type: 'text',
                text: '☕ Node.js',
                color: '#858484',
                align: 'start',
                wrap: true,
              },
              {
                type: 'text',
                color: '#858484',
                text: '☕ Express.js',
              },
              {
                type: 'text',
                color: '#858484',
                text: '☕ Socket.io',
              },
              {
                type: 'text',
                color: '#858484',
                text: '☕ C# .NET MVC 5',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '資料庫',
                margin: 'none',
                align: 'start',
                weight: 'bold',
              },
              {
                type: 'separator',
                margin: 'xxl',
              },
            ],
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'none',
            margin: 'none',
            contents: [
              {
                type: 'text',
                text: '📦  MS SQL Server',
                color: '#858484',
                align: 'start',
                wrap: true,
              },
              {
                type: 'text',
                color: '#858484',
                text: '📦  MySQL',
              },
            ],
          },
        },
        {
          type: 'bubble',
          direction: 'ltr',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '其他',
                margin: 'none',
                align: 'start',
                weight: 'bold',
              },
              {
                type: 'separator',
                margin: 'xxl',
              },
            ],
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'none',
            margin: 'none',
            contents: [
              {
                type: 'text',
                text: '🏆  Git',
                align: 'start',
                color: '#858484',
                wrap: true,
              },
              {
                type: 'text',
                text: '🏆  Selenium',
                color: '#858484',
              },
              {
                type: 'text',
                text: '🏆  Jest',
                color: '#858484',
              },
              {
                type: 'text',
                text: '🏆  Enzyme',
                color: '#858484',
              },
            ],
          },
        },
      ],
    },
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
