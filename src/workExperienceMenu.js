import { client } from './botClient';

export default (event) => {
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
