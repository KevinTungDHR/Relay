export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SHOW_SECONDARY = "SHOW_SECONDARY";
export const HIDE_SECONDARY = "HIDE_SECONDARY";

export const showModal = (modal) => {
  return {
    type: SHOW_MODAL,
    modal
  }
}

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  }
}

export const showSecondary = (secondary) => {
  return {
    type: SHOW_SECONDARY,
    secondary
  }
}

export const hideSecondary = () => {
  return {
    type: HIDE_SECONDARY
  }
}