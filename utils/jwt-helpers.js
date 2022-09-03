import jwt from 'jsonwebtoken'

function jwtToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m', noTimestamp: true})
}

function jwtTokenNested(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

function refreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15m', noTimestamp: true})
}

function refreshTokenNested(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
}

export {jwtToken, refreshToken, jwtTokenNested, refreshTokenNested}

//     const user = user_name ;
//     const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
//     const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});