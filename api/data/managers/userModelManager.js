const UserModel = require('../models/userModel')


module.exports.createUser = (user) => {
    user = new UserModel(user);
    return user.save()
}
module.exports.getUser = (query) => {
    return UserModel.findOne(query);
}

module.exports.getAllUsers = () => {
    return UserModel.find();
}
module.exports.updateUser = (query,body) => {
    return UserModel.findOneAndUpdate(query,body,{new:true});
}
module.exports.deleteUser = (id) => {
    return UserModel.findByIdAndDelete(id);
}