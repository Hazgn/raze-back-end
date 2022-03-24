const model = require("../models/index");
const  response  = require("../helper/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const { sendForgotPass } = require("../helper/sendForgotPass");
const { sendContactUs } = require("../helper/sendContactUs");
// const dayjs = require("dayjs");
// const { sendForgotPass } = require("../helper/sendForgotPass");

const register = async (req, res) => {
    const { email, password } = req.body;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email))
        return response(res, {
            status: 400,
            message: "Format Email Invalid",
        });

    try {
        const result = await model.users.findOne({
            where: {
                email,
            },
        });
        if (result !== null)
            return response(res, {
                status: 400,
                message: "email sudah terdaftar",
            });
        const body = req.body;
        console.log(body);
        body.password = await bcrypt.hash(password, 10);
        await model.users.create(body);
        return response(res, {
            // data: data,
            status: 200,
            message: "Register Success",
        });
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
        });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await model.users.findOne({
            where: {
                email,
            },
        });
        console.log(email, password);
        const isValid = await bcrypt.compare(password, result.password);
        console.log(isValid);
        if (!isValid)
            return response(res, {
                status: 401,
                message: "email atau password salah",
            });
        const payload = {
            id: result.id,
            email: result.email,
            role: result.role,
        };
        const jwtOptions = {
            expiresIn: "10h",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, jwtOptions);
        console.log(token);
        //   return response({user:payload, token},200, "login success")

        return response(res, {
            data: token,
            status: 200,
            message: "login success",
        });
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Password atau Email Salah",
            error,
        });
    }
}

const logout = async (req, res) => {
    const token = req.header("x-access-token");
    try {
        const result = await model.white_list_tokens.create({token})
        return response(res, {
            data: result,
            status: 200,
            message: "loggout success",
        });
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Password atau Email Salah",
            error,
        });
    }
}

const forgotPassword = async (req, res) =>{
    const {email,linkUrl} = req.body;

    try {
        const data = await model.users.findOne({
            where: { email },
        });
        if (data === null) {
            return response(res, {
                status: 404,
                message: "Email tidak ada",
            });
        }
        const generatePass = dayjs().format('YYmmssDD');
        // const password = await bcrypt.hash(generatePass, 10);
        const update = await data.update({ key_reset_pass:generatePass });
        // {display_name:"trisumanzaya"}
        
        await sendForgotPass(email, {username:update.username,linkUrl, generatePass})
        // kirim new password ke email
        return response(res, {
            status: 200,
            message: "email send",
        });
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
        });
    }
}
const contactUs = async (req, res) =>{
    const body = req.body;
    console.log(body);

    try {
        
        await sendContactUs(body)
        // kirim new password ke email
        return response(res, {
            status: 200,
            message: "email send",
            // body
        });
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
        });
    }
}

const resetPassword = async (req, res) =>{
    const {key_reset_pass,newPassword,confirmPassword}= req.body
    console.log(key_reset_pass);
    try {
        const data = await model.users.findOne({
            where: { key_reset_pass },
        });
        if (data === null) {
            return response(res, {
                status: 404,
                message: "please reapet step forgot password",
            });
        }
        if(newPassword!==confirmPassword){return response(res,{status:400,message:"password tidak sama"})}
        const password = await bcrypt.hash(newPassword, 10);
        // const password = await bcrypt.hash(generatePass, 10);
        const update = await data.update({ password, key_reset_pass:null });
        return response(res, {
            data: update,
            status: 200,
            message: "reset password succes",
        });
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
        });
    }
}

module.exports = { register, login,logout,forgotPassword,resetPassword,contactUs}