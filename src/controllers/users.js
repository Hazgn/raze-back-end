const model = require("../models/index");
const response = require("../helper/response");
const bcrypt = require("bcrypt");

const userById = (req, res) => {
  const { id } = req.userInfo;
  model.users
    .findOne({
      where: id,
      attributes: [
        "id",
        "username",
        "email",
        "gender",
        "image",
        "store_name",
        "store_description",
        "createdAt",
        "updatedAt",
      ],
    })
    .then((result) => {
      response(res, {
        status: 200,
        data: result,
        message: "Success Get Profile Detail",
      });
    })
    .catch((err) => {
      response(res, {
        status: 200,
        message: "Error",
        error: err,
      });
    });
};
const editUser = async (req, res) => {
  const { id } = req.userInfo;

  const body = req.body;
  const { email } = req.body;

  if (req.files === []) {
    const image = req.files[0].filename
      ? `${process.env.IMAGE_HOST}${req.files[0].filename}`
      : null;
    body.image = image;
  }
  console.log(req.userInfo);

  if (body.email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(body.email))
      return response(res, {
        status: 400,
        message: "Format Email Invalid",
      });
  }

  try {
    if (body.email) {
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
    }
    await model.users.update(body, {
      where: { id },
    });
    // console.log(result);
    return response(res, {
      status: 200,
      message: "edit profile by id succes",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const editPassword = async (req, res) => {
  const { id } = req.userInfo;
  const body = req.body;
  try {
    const cekPass = await model.users.findOne({ where: id });
    const isValid = await bcrypt.compare(body.oldPassword, cekPass.password);
    if (!isValid)
      return response(res, {
        status: 401,
        message: "password wrong",
      });
    const password = await bcrypt.hash(body.newPassword, 10);
    await model.users.update(
      { password },
      {
        where: { id },
      }
    );
    return response(res, {
      status: 200,
      message: "edit password succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

module.exports = { userById, editUser, editPassword };
