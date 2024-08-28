const jwt = require("jsonwebtoken");
const CS_LIB_APP_SIGN = "CS_LIB-AppSign";
const generateToken = ({ _id, type }) => {
    const token = jwt.sign({ _id, type }, CS_LIB_APP_SIGN);
    return token;
};

const verifyToken = async (token) => {
    try {
        const payload = jwt.verify(token, CS_LIB_APP_SIGN);
        return { status: true, payload };
    }
    catch (error) {
        return { status: false, payload: undefined };
    }
};

module.exports = { generateToken, verifyToken };