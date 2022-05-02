export const RECEIVE_STATUS = 'RECEIVE_STATUS';

export const receiveStatus = (isLoading) => {
  return {
    type: RECEIVE_STATUS,
    isLoading
  }
}