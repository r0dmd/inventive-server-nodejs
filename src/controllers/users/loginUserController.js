import {
    selectUserByUsernameModel,
    selectHashedPassByUserIdModel,
    updateLastAuthUpdateModel,
} from '../../models/users/index.js';
import { userSchema } from '../../schemas/users/index.js';
import { generateErrorUtil, validateSchemaUtil } from '../../utils/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET, TOKEN_EXPIRATION } = process.env;

const loginUserController = async (req, res, next) => {
    try {
        await validateSchemaUtil(userSchema, req.body);
        const { username, password } = req.body;
        const usernameValid = await selectUserByUsernameModel(username);
        if (!usernameValid) generateErrorUtil('User name not found', 404);

        const hashedPass = await selectHashedPassByUserIdModel(
            usernameValid.id,
        );
        console.log(hashedPass);
        const passwordValid = await bcrypt.compare(
            password,
            hashedPass.password,
        );
        if (!passwordValid) generateErrorUtil('Invalid password', 401);

        const tokenInfo = {
            id: usernameValid.id,
            username: usernameValid.username,
            role: usernameValid.role,
        };
        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: TOKEN_EXPIRATION,
        });

        await updateLastAuthUpdateModel(usernameValid.id);
        res.send({
            status: 'ok',
            data: { token },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
