const jwt = require("jsonwebtoken");
const CS_LIB_APP_SIGN = "CS_LIB-AppSign";
const generateToken = ({ _id, type }) => {
    const token = jwn.sign({ _id, type }, LPU_SIGNATURE);
    return token;
};

const verifyToken = async (token) => {
    try {
        const payload = jwt.verify(token, LPU_SIGNATURE);
        return { status: true, payload };
    }
    catch (error) {
        return { status: false, payload: undefined };
    }
};

module.exports = { generateToken, verifyToken };