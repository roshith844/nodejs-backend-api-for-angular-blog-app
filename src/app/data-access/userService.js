const mongoose = require("mongoose");
const USER_MODEL = require("../models/userSchema");

async function getUserDataFromEmail(email) {
  return await USER_MODEL.findOne(
    { email: email },
    { _id: 1, role: 1, status: 1, email: 1, password: 1 }
  );
}

async function getAdminDataFromId(adminId) {
  return await USER_MODEL.findOne({ _id: adminId });
}

async function getUserDataFromId(userId) {
  return await USER_MODEL.findOne({ _id: userId });
}

async function getAdminDataFromId(adminId) {
  return await USER_MODEL.findOne({ _id: adminId });
}

async function saveUserData(data) {
  await USER_MODEL.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
  });
}

async function isEmailExists(email) {
  return await USER_MODEL.exists({ email: email });
}

async function updateRole(userId, role) {
  const USER_ID_AS_OBJECT_ID = mongoose.Types.ObjectId(userId);
  const DATABASE_RESPONSE = await USER_MODEL.updateOne(
    { _id: USER_ID_AS_OBJECT_ID },
    { role: role }
  );
  if (DATABASE_RESPONSE.acknowledged == true) {
    return true;
  } else {
    return false;
  }
}

async function editProfileOnDataBase(userId, name, email, phone) {
  return await USER_MODEL.updateOne(
    { _id: userId },
    { name: name, email: email, phone: phone }
  );
}

async function getUserRoleAndStatusFromDatabase(userId) {
  return await USER_MODEL.aggregate([
    {
      $match: { _id: userId },
    },
    {
      $project: { _id: 0, role: 1, status: 1, email: 1 },
    },
  ]);
}

async function getUserAuthDetails(email) {
  return await USER_MODEL.aggregate([
    {
      $match: { email },
    },
    {
      $project: { _id: 1, role: 1, status: 1, email: 1 },
    },
  ]);
}

async function getUserAuthDetailsbyId(userId){
  return await USER_MODEL.aggregate([
    {
      $match: { _id: userId},
    },
    {
      $project: { _id: 1, role: 1, status: 1, email: 1 },
    },
  ]);
}
module.exports = {
  getUserDataFromEmail,
  getUserDataFromId,
  saveUserData,
  isEmailExists,
  updateRole,
  editProfileOnDataBase,
  getAdminDataFromId,
  getUserRoleAndStatusFromDatabase,
  getUserAuthDetails,
  getUserAuthDetailsbyId
};
