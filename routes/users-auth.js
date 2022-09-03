import express from 'express'
import pool from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {jwtToken, refreshToken, jwtTokenNested, refreshTokenNested} from '../utils/jwt-helpers.js'

const router = express.Router();

router.post('/login', async (req,res) => {
    try {
        const {user_name, user_password} = req.body;
        const user = await pool.query(
            `SELECT * FROM users WHERE user_name = $1`,
            [user_name]);
        const payload = {
            id: user.rows[0].user_id,
            username : user.rows[0].user_name,
            role: user.rows[0].user_role
        }
        if(user.rows.length === 0) {
            return res.status(401).send("invalid user")
        }

        //PASSWORD CHECK
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).send("invalid password")
        }
        
        //JWT
        let tokens = jwtToken(payload)
        let refresh = refreshToken(payload)
        res.cookie('refresh_token', refresh, {httpOnly:true});
        res.status(401).json({token: tokens, payload: payload})

        //CHECK VALID PASSWORD
        // return res.status(200).json({message:'succes', inputPassword: user_password, databasePassword: user.rows[0].user_password, valid: validPassword})

    } catch (error) {
        res.status(401).json({error:error.message})
        console.log(error)
    }
});

router.get('/refresh', (req, res) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      console.log(req.cookies);
      if (refreshToken === null) return res.sendStatus(401);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({error1:error.message});
        // res.send(user.id)
        let tokens = jwtTokenNested(user);
        let refresh = refreshTokenNested(user)
        res.cookie('refresh_token', refresh, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true});
        return res.json({token1: refreshToken, token2: tokens, });
      });
    } catch (error) {
      res.status(401).json({error2: error.message});
    }
});

export default router;