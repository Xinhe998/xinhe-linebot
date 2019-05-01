import express from 'express';
import * as line from '@line/bot-sdk';
import { fsm, eventFromStateAndMessageText } from './src/fsm';
import { config } from './src/botClient';
import stateMethod from './src/stateMethods';

const app = express();

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
