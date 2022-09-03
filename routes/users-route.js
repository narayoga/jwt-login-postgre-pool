import express from 'express'
import pool from '../db.js'
import bcrypt from 'bcrypt'
import { authenticateToken } from '../middleware/authorization.js'

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({ users: users.rows })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.user_password, 10)
        const createUser = await pool.query(
            `INSERT INTO users (user_name, user_role, user_password) VALUES ($1, $2, $3) RETURNING *`,
            [req.body.user_name, req.body.user_role, hashedPassword]
        )
        res.status(200).json({ users: createUser.rows })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router;