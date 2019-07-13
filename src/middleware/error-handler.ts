const errorHandler = (err, req, res, next): void => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

export default errorHandler;
