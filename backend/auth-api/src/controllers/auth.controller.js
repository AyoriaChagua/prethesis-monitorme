import authService from '../services/authService.js'
import { validationResult } from "express-validator"

export const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 
        const token = await authService.signUp(req.body)
        res.json({token})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

export const signIn = async (req, res) => {
    try {
        const token = await authService.signIn(req.body)
        res.json({token})
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}


