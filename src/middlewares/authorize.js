const { response } = require("../helper/response");

const checkRoleAdmin = (req, res, next) => {
    const { role } = req.userInfo
    // console.log(req.userInfo);
    if (role !== 'admin') return response(res, { status: 401, message: "Can't Access" });
    next();
};

module.exports = { checkRoleAdmin };