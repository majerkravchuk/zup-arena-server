const jwt = require('jsonwebtoken');
const SteamService = require('../services/Steam');
const User = require('../models/User');

/**
 * @api {post} /api/auth Request User authorization through the steam ticket
 * @apiName GetJWT
 * @apiVersion 0.1.0
 * @apiGroup Auth
 *
 * @apiParam {String} ticket Convert the ticket from GetAuthSessionTicket from binary to hex into
 * an appropriately sized byte character array and pass the result in as this ticket parameter.
 *
 * @apiParamExample {json} Request-Example:
                    { "ticket": "14000000252D6B3A43B98070A3DE8716010010012659DB5B18..." }
*
* @apiSuccess {Boolean} success Successful execution of the request
* @apiSuccess {String} jwt JSON Web Token (JWT)
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     "success": true,
*     "jwt": "xxx.yyy.zzz"
*   }
*/

module.exports.create = (request, response) => {
  if (!request.body.ticket) {
    response.status(401);
    response.json({
      success: false,
      error: 'Ticket not provided',
    });
  } else {
    SteamService.ISteamUserAuth.AuthenticateUserTicket({
      appid: process.env.STEAM_APP_ID,
      ticket: request.body.ticket,
    }).then((data) => {
      const query = { steamId: data.response.params.steamid };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      User.findOneAndUpdate(query, {}, options, (error, result) => {
        const token = jwt.sign({
          steamId: result.steamId,
          id: result.id,
        }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        response.json({
          success: true,
          jwt: token,
        });
      });
    }).catch(() => {
      response.status(401);
      response.json({
        success: false,
        error: 'Invalid ticket',
      });
    });
  }
};

module.exports.testUser = (request, response) => {
  const query = { steamId: '00000000000000000' };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  User.findOneAndUpdate(query, {}, options, (error, result) => {
    const token = jwt.sign({
      steamId: result.steamId,
      id: result.id,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    response.json({ success: true, jwt: token });
  });
};