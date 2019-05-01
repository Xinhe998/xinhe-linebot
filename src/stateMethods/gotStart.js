import { fsm } from '../fsm';
import mainMenu from '../mainMenu';

export default (event) => {
  fsm.gotStart(); // change state
  mainMenu(event);
};
