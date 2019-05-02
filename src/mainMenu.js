import { client } from './botClient';

export default (event) => {
  client.getProfile(event.source.userId)
    .then((profile) => {
      client.replyMessage(event.replyToken, {
        type: 'flex',
        altText: 'Hi, I am Xinhe.',
        contents: {
          type: 'bubble',
          direction: 'ltr',
          hero: {
            type: 'image',
            url: 'https://i.imgur.com/gopa6mjl.png',
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
                text: `${profile.displayName}, 很高興認識你！`,
                align: 'start',
                weight: 'bold',
              },
              {
                type: 'text',
                text: '想從哪方面開始聊呢？',
                align: 'start',
                margin: 'md',
                size: 'md',
                color: '#787878',
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: 'Xinhe自我介紹一下吧！',
                  text: '自我介紹',
                  data: '自我介紹',
                },
                color: '#72647A',
                style: 'link',
                margin: 'none',
                height: 'sm',
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '實習工作經歷',
                  text: '實習工作經歷',
                  data: '實習工作經歷',
                },
                color: '#72647A',
                style: 'link',
                margin: 'none',
                height: 'sm',
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '專案作品',
                  text: '專案作品',
                  data: '專案作品',
                },
                color: '#72647A',
                style: 'link',
                margin: 'none',
                height: 'sm',
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '專長＆技能樹',
                  text: '專長＆技能樹',
                  data: '專長＆技能樹',
                },
                color: '#72647A',
                style: 'link',
                margin: 'none',
                height: 'sm',
              },
            ],
          },
        },
      });
    });
};
