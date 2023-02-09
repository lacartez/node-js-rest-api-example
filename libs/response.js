'use strict';

/**
 * Send message to user.
 *
 * @param {Object} res
 * @param {Object} response
 */
module.exports = async (res, response) => {
  res
    .status(200)
    .json({
      response: response,
    })
    .end();

  return 0;
};