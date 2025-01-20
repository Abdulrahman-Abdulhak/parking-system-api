export const isLoggedIn = (req) => {
  return req.session.userID == null;
};

export const setUserID = (req, id) => {
  req.session.userID = id;
};

export const getUserID = (req) => {
  return req.session.userID;
};
