import {check} from "express-validator";

export const RegisterSchema =[
    check('name').trim().isAlpha()
    .withMessage("name should be Alphabets only"),

    check('username','username is required').exists()
    .isAlphanumeric().withMessage('username should be alpha nuimeric characters only')
    .trim().isLength({min:6,max:32}),

    check('password','password is required').isLength({min:6,max:100}).trim(),

    check('email','email is requiered ').exists().isEmail(),
]