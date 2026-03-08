const authMiddleware = (req, res, next) => {
  const accessToken = req.header('x-auth-token');
  if (!accessToken) {
    return res.status(401).send({ status: 401, message: 'Unauthorized!' });
  }

  next();
}

module.exports = authMiddleware;
