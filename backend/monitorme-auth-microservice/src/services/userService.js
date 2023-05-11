import User from "../models/User.js";

const getUserById = async (id) => {
    const user = await User.findOne({ _id: id })
    if (!user) throw new Error("User not found")
    return user
}


const getUsers = async () => {
    const users = await User.find({})
    if (!users) return null;
    return users;
}

export default { getUserById, getUsers }