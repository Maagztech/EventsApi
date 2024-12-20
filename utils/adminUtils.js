import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../config/generateTokens.js";
import Users from "../models/Admin.js";
const { REFRESH_TOKEN_SECRET } = process.env;
const authCtrl = {
    refreshToken: async (req, res) => {
        try {
            const refresh_token = req.body.refresh_token;
            if (!refresh_token) return res.status(400).json({ msg: "Please login now!" });
            const decoded = (
                jwt.verify(refresh_token, `${REFRESH_TOKEN_SECRET}`)
            );
            if (!decoded.id)
                return res.status(400).json({ msg: "Please login now!" });
            const user = await Users.findById(decoded.id);
            if (!user)
                return res.status(400).json({ msg: "This account does not exist." });
            if (refresh_token !== user.refresh_token)
                return res.status(400).json({ msg: "Please login now!" });
            const access_token = generateAccessToken({ id: user._id });
            const rf_token = generateRefreshToken({ id: user._id });

            await Users.findOneAndUpdate(
                { _id: user._id },
                {
                    refresh_token: rf_token,
                },
                { new: true }
            );

            const client = await Users.aggregate([
                {
                    $match: {
                        _id: user._id,
                    },
                },
                {
                    $project: {
                        password: 0,
                        refresh_token: 0,
                    },
                },
            ]);
            return res.json({
                msg: "Login Success!",
                refresh_token: rf_token,
                access_token,
                user: client[0],
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};
export default authCtrl;