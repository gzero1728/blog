import jwt from "jsonwebtoken";
import config from "../config/index";

const { JWT_SECRET } = config;

const auth = (req, res, next) => {
    // 브라우저 헤더에서 token값을 가져옴
    const token = req.header("x-auth-token")

    if (!token) {
        return res.status(401).json({ msg: "토큰 없음. 인증이 거부됨!" })
    }
    try {
        // token과 서버 인증값인 secret값을 함께 넣어서 token을 해석한 값
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (e) {
        console.log(e)
        res.status(400).json({ msg: "토큰이 유효하지 않습니다" })
    }
}

export default auth;