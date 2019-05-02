import { fsm, eventFromStateAndMessageText } from './fsm';

const userState = [];

export const addUserState = (userId, state) => {
  userState.push({
    user: userId,
    state,
    history: ['gotStart'],
  });
};

export const getUserState = (userId) => {
  let stateResult;
  if (userState.length > 0) {
    userState.map((item, index) => {
      if (userState[index].user === userId) {
        stateResult = userState[index].state;
      }
      return stateResult || 'start';
    });
  }
  return stateResult || 'start';
};

export const mapUserStateInFsm = (userId) => {
  let historyResult;
  userState.map((item, index) => {
    if (userState[index].user === userId) {
      historyResult = userState[index].history;
    }
    return historyResult;
  });
  historyResult.map(item => fsm[item]());
};

export const updateUserState = (userId, newState, msg) => {
  const action = eventFromStateAndMessageText(getUserState(userId), msg);
  console.log(userId, action);
  if (userState.length < 1) {
    addUserState(userId, newState);
  } else {
    userState.map((item, index) => {
      if (userState[index].user === userId) {
        userState[index].state = newState;
        if (action !== 'gotStart') {
          userState[index].history.push(action);
        } else {
          userState[index].history = ['gotStart'];
        }
      }
      return userState;
    });
  }
};

export const dispatchUserState = (userId, state, msg) => {
  if (getUserState(userId) === 'start') {
    addUserState(userId, state);
  } else {
    updateUserState(userId, state, msg);
  }
};
