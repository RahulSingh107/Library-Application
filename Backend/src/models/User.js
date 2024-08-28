//creating the user schema
/*The user Schema Contains various things like NAME, EMAIL, PASSWORD,
ALSO IT CONTAINS USER TYPE AND THE TIME STAMPS*/
const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");
const { encryptPassword, checkPassword } = require("../bcrypt");
const { generateToken, verifyToken } = require("../jwt");

const userSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
        type: String, unique: true,
        lowercase: true,
        required: true,
        validate: {
            validator(email) {
                return isEmail(email);
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate: {
            validator(pass) {
                if (
                    pass.includes(" ") ||
                    pass.includes("\n") ||
                    pass.includes("\t")
                ) {
                    throw new Error
                        (
                            "Password cannot contain spaces, new lines or tabs."
                        );
                }
                if (pass.toLowerCase().includes("password")) {
                    throw new Error
                        (
                            "Password cannot contain the word 'password'."
                        );
                }
                return true;

            },
        },
    },
    type: {
        type: String,
        enum: ["STUDENT", "LIBRARIAN"],
        default: "STUDENT",
    },
    tokens: { type: [{ token: String }] },

},
    { timestamps: true }
);

// this is middle ware function that will run every time a user is added to the system
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.modifiedPaths().includes("password")) {
        user.password = await encryptPassword(user.password);
    }
    next();
});
userSchema.statics.findByEmailAndPasswordForAuth = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await checkPassword(password, user.password);
        if (!isMatch) {
            throw new Error("Wrong Password");
        }
        console.log(`Login Successful`);
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

userSchema.methods.generateToken = function () {
    const user = this;
    const token = generateToken(user);
    user.tokens.push({ token });
    user.save();
    return token;
};
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.tokens;
    return user;
};


const User = model("User", userSchema);
module.exports = User;
