import { fsm } from '../fsm';
import { client } from '../botClient';
import { dispatchUserState, mapUserStateInFsm } from '../store';


export default (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.skills();
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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
