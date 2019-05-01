import * as line from '@line/bot-sdk';

require('dotenv').config();

export const config = {
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};
export const client = new line.Client(config);
