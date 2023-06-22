//we are defining our animation styles here and adding this styles just by spreding the names
export const buttonClick = {
  whileTap: {
    scale: 0.95,
  },
};

export const faseInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideTop = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};
