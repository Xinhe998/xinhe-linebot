import { fsm } from '../fsm';
import { client } from '../botClient';
import mainMenu from '../mainMenu';
import { dispatchUserState, mapUserStateInFsm } from '../store';

export const projects = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.projects();
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const ghowa = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.ghowa(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const ghowaRole = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.ghowaRole(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToGhowa();
};

export const ghowaLang = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.ghowaLang(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToGhowa();
};

export const ghowaScreen = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.ghowaScreen(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToGhowa();
};

export const meracle = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.meracle(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const meracleRole = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.meracleRole(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToMeracle();
};

export const meracleLang = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.meracleLang(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToMeracle();
};

export const meracleScreen = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.meracleScreen(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToMeracle();
};

export const here = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.here(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const hereRole = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.hereRole(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const hereLang = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.hereLang(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const hereScreen = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.hereScreen(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToHERE();
};

export const bonERP = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.bonERP(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const bonERPRole = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.bonERPRole(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const bonERPLang = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.bonERPLang(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const bonERPScreen = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.bonERPScreen(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
  mapUserStateInFsm(event.source.userId);
  fsm.backToBonERP();
};

export const leaveProjects = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.leaveProjects(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
  mainMenu(event);
};
