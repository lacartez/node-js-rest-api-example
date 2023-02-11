'use strict';

const sendError = require('../libs/error');

module.exports = async (app) => {
  const accountController = require('../controllers/account');
  app.route('/method/account.create').post(accountController.create);
  app.route('/method/account.safeDelete').get(accountController.safeDelete);
  app.route('/method/account.changePassword').post(accountController.changePassword);
  app.route('/method/account.changeName').get(accountController.changeName);
  app.route('/method/account.get').get(accountController.get);

  app.route('*').all((_req, res) => sendError(res,'Unknown method passed.'));

  app.use((error, req, res, next) => {
    if (error) {
      sendError(res, 'Internal server error.', error)
    }
  });
};