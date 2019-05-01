import { fsm } from '../fsm';
import { client } from '../botClient';
import mainMenu from '../mainMenu';
import workExperienceMenu from '../workExperienceMenu';

export const workExperience = (event) => {
  fsm.workExperience();
  workExperienceMenu(event);
};

export const leaveWorkExperience = (event) => {
  fsm.leaveWorkExperience(); // change state
  mainMenu(event);
};

export const advantech = (event) => {
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

export const trunkStudio = (event) => {
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

export const taiwanCloud = (event) => {
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

export const leaveAdvantech = (event) => {
  fsm.leaveAdvantech(); // change state
  mainMenu(event);
};

export const advantechBackToWorkExperience = (event) => {
  fsm.advantechBackToWorkExperience(); // change state
  workExperienceMenu(event);
};

export const leaveTrunkStudio = (event) => {
  fsm.leaveTrunkStudio(); // change state
  mainMenu(event);
};

export const trunkStudioBackToWorkExperience = (event) => {
  fsm.trunkStudioBackToWorkExperience(); // change state
  workExperienceMenu(event);
};
