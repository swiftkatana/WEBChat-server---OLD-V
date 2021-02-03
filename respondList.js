module.exports.responedList = {
  DBError: { error: "DBError" },
  infoInvalid: { error: "infoInvalid" },
  FaildSave: { error: "FaildSave" },
  loginFaildAlreadyConnect: { error: "loginFaildAlreadyConnect" },
  //error when someone try to register but using a exists email please try diffrent email
  UserIsAlreadyCreated: { error: "UserIsAlreadyCreated" },
  // error when someone try to login but user not exists or wrong info
  usersNotFound: { error: "usersNotFound" },

  // error when someone try to use a fake or not exists email
  emailNotExistsL: { error: "emailIsFake" },
  // error when the DB cant find something
  NotExists: { error: "NotExists" },
};
