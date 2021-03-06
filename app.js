import express from 'express';
import * as line from '@line/bot-sdk';
import { eventFromStateAndMessageText } from './src/fsm';
import { config } from './src/botClient';
import stateMethod from './src/stateMethods';
import { getUserState } from './src/store';

const app = express();

const respondTo = (event) => {
  let text = '';
  if (event.type === 'message') {
    // eslint-disable-next-line prefer-destructuring
    text = event.message.text;
  } else if (event.type === 'postback') {
    text = event.postback.data;
  }
  const action = eventFromStateAndMessageText(getUserState(event.source.userId), text);
  stateMethod[action](event);
};

function handleEvent(event) {
  switch (event.type) {
  case 'message':
    if (event.type !== 'message') {
      return Promise.resolve(null);
    }
    return respondTo(event);
  case 'follow':
    return respondTo(event);
  case 'postback':
    if (event.type !== 'postback') {
      return Promise.resolve(null);
    }
    break;
  default:
    throw new Error('Unknown message');
  }
  return false;
}

app.post('/linewebhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

app.use('/', express.static('public'));

app.listen(3000, () => {
  console.log('LineBot is running.');
});
