module.exports = (isAuth) => {
  if (!isAuth) {
    throw new Error('Unauthenticated');
  }
};
