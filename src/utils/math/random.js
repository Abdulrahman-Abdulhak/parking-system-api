export const randomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min, max, exclusiveMax = true) => {
  const allowedMin = Math.ceil(min);
  const allowedMax = Math.floor(max);

  const rounding = exclusiveMax ? Math.floor : Math.round;
  return rounding(Math.random() * (allowedMax - allowedMin) + allowedMin);
};

export const randomItem = (arr) => {
  if (!arr) {
    throw new Error("The array must be defined");
  }

  return arr[randomInt(0, arr.length)];
};

export const genRandomString = (length, allowed) => {
  if (!length) {
    throw new Error("Length must be defined");
  }

  let useAllowed = allowed;
  if (!useAllowed) {
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const ABC = abc.toUpperCase();
    const digits = "0123456789";

    useAllowed = abc + ABC + digits;
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += randomItem(useAllowed);
  }

  return str;
};
