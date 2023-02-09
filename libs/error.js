'use strict';

/**
 * Send error to user.
 *
 * @param {Object} res
 * @param {String} errorMessage
 * @param {Object} error=undefined
 */
module.exports = async (res, errorMessage, error = undefined) => {
  if (error) {
    console.log(error);
  }

  res
    .status(200)
    .json({
      error: errorMessage,
    })
    .end();

  return 0;
};