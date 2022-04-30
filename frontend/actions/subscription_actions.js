export const RECEIVE_SUBSCRIPTIONS = "RECEIVE_SUBSCRIPTIONS";
export const RECEIVE_SUBSCRIPTION = "RECEIVE_SUBSCRIPTION";
export const REMOVE_SUBSCRIPTION = "REMOVE_SUBSCRIPTION";

export const receiveSubscriptions = (subscriptions) => {
  return {
    type: RECEIVE_SUBSCRIPTIONS,
    subscriptions
  }
}

export const receiveSubscription = (subscription) => {
  return {
    type: RECEIVE_SUBSCRIPTION,
    subscription
  }
}

export const removeSubscription = (subscriptionId) => {
  return {
    type: REMOVE_SUBSCRIPTION,
    subscriptionId
  }
}