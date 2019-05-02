import { fsm } from '../fsm';
import mainMenu from '../mainMenu';
import { dispatchUserState } from '../store';

export default (event) => {
  fsm.gotStart(); // change state
  dispatchUserState(event.source.userId, fsm.state, (event.type === 'message' ? event.message.text : ''));
  mainMenu(event);
};
