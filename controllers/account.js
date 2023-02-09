'use strict';

const sendResponse = require('../libs/response');
const sendError = require('../libs/error');

const { ObjectId } = require('mongoose').Types;

/** models */
const Accounts = require('../mongo/models/accounts');

class AccountController {
  create = async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!(name && password)) return sendResponse(res, 'Invalid params');

      Accounts
        .create({
          name: name,
          password: password,
        })
        .then((result) => {
          sendResponse(res, result._id.toString());
        })
        .catch((error) => {
          if (error.code && error.code === 11000) { // duplicate error handling
            return sendError(res, 'Account with this name already exists.');
          }

          sendError(res, 'Internal server error.', error);
        });

    } catch (error) {
      sendError(res, 'Internal server error.', error);
    }
  };

  safeDelete = async (req, res) => {
    try {
      const { account_id } = req.query;
      if (!ObjectId.isValid(account_id)) return sendResponse(res, 'Invalid params');

      Accounts
        .updateOne(
          { _id: ObjectId(account_id) },
          { deleted: true }
        )
        .then((result) => sendResponse(res, result.modifiedCount))
        .catch((error) => sendError(res, 'Internal server error.', error));

    } catch (error) {
      sendError(res, 'Internal server error.', error);
    }
  };

  changePassword = async (req, res) => {
    try {
      const { account_id, old_password, new_password } = req.body;
      if ( !(ObjectId.isValid(account_id) && old_password && new_password) ) {
        return sendResponse(res, 'Invalid params');
      }

      Accounts
        .updateOne(
          { _id: ObjectId(account_id), password: old_password },
          { password: new_password }
        )
        .then((result) => sendResponse(res, result.modifiedCount))
        .catch((error) => sendError(res, 'Internal server error.', error));

    } catch (error) {
      sendError(res, 'Internal server error.', error);
    }
  };

  changeName = async (req, res) => {
    try {
      const { account_id, new_name } = req.query;
      if ( !(ObjectId.isValid(account_id) && new_name) ) {
        return sendResponse(res, 'Invalid params');
      }

      Accounts
        .updateOne(
          { _id: ObjectId(account_id) },
          { name: new_name }
        )
        .then((result) => sendResponse(res, result.modifiedCount))
        .catch((error) => {
          if (error.code && error.code === 11000) { // duplicate error handling
            return sendError(res, 'Account with this name already exists.');
          }

          sendError(res, 'Internal server error.', error);
        });

    } catch (error) {
      sendError(res, 'Internal server error.', error);
    }
  };

  get = async (req, res) => {
    try {
      const { account_id } = req.query;
      if (!ObjectId.isValid(account_id)) return sendResponse(res, 'Invalid params');

      Accounts
        .findById(ObjectId(account_id))
        .select({ updatedAt: 0, __v: 0 })
        .lean()
        .then((result) => sendResponse(res, result))
        .catch((error) => sendError(res, 'Internal server error.', error));

    } catch (error) {
      sendError(res, 'Internal server error.', error);
    }
  };
}
module.exports = new AccountController();