import userService from "../services/userService.js";

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.userid)
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.json(users)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
} 

