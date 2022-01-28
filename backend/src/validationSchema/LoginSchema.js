import {check} from "express-validator";

export const LoginSchema =[

    check('adminUserName','adminUserName is required').exists()
    .isAlpha().withMessage('admin User Name should be letters only')
    .trim().isLength({min:6,max:32}),

    check('adminPassword','adminPassword is required').isLength({min:6,max:100}).trim(),

   
]