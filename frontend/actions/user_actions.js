export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_CHANNEL_USERS = 'RECEIVE_CHANNEL_USERS';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}

export const receiveChannelUsers = (users) => {
  return {
    type: RECEIVE_CHANNEL_USERS,
    users
  }
}