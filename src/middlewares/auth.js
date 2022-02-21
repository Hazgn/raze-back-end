
const jwt = require("jsonwebtoken")
const model = require("../models/index");
const response = require("../helper/response");

const checkToken = async(req, res, next) => {
  const token = req.header('x-access-token')
  console.log('tokenfahrul',token)
  const checkWhiteList= await model.white_list_tokens.findOne({where:{token}})
  if (checkWhiteList) { return response(res, { status: 403, message: "you already logout" }); }
  // const sqlGetBlackList = `SELECT token FROM white_list_token WHERE token = ?`
  // db.query(sqlGetBlackList, [token], (err, result) => {
  //   if (err) return res.status(500).json({ err })
  //   if (result.length > 0) return res.status(500).json({ message: 'You need to login first' })

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return res.status(500).json({ message: 'You need to login first' })
      const { id, email, role } = payload;
      req.userInfo = { id, email, role };
      next();
    });
  // });
}

module.exports = { checkToken }