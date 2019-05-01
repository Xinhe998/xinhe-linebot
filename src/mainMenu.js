import { client } from './botClient';

export default (event) => {
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
