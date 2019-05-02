import { fsm } from '../fsm';
import { client } from '../botClient';
import mainMenu from '../mainMenu';
import { dispatchUserState, mapUserStateInFsm } from '../store';

export const selfIntro = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.selfIntro(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const school = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.school(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const leaveSchool = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.leaveSchool(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
  mainMenu(event);
};

export const interest = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.interest(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
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

export const leaveInterest = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.leaveInterest(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
  mainMenu(event);
};

export const laeveSelfIntro = (event) => {
  mapUserStateInFsm(event.source.userId);
  fsm.laeveSelfIntro(); // change state
  dispatchUserState(event.source.userId, fsm.state, event.message.text);
  mainMenu(event);
};
