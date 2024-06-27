

const {z} = require("zod");
const  User  = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");

const userInput = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string()
});

const signup = async(req, res) => {
        const input = userInput.safeParse(req.body);
        console.log("input: ", input);

        if(!input.success){
            res.status(400).json({
                error: input.error.issues
            })
            return;
        }

        //check for existing user
        const username = input.data.username;
        const existingUser = await User.findOne({
            username
        });

        if(existingUser){
            res.status(400).json({
                msg: "user already registerd with email or username"
            });
            return;
        }


        //hasing password
        const saltRound = 10;
        let hashedPassword = await bcrypt.hash(input.data.password, saltRound);

        // await bcrypt.hash(input.data.password, saltRound, function(err,hash){
        //     console.log(hash);
        //     hashedPassword = hash;
        // })

        //creating user
        const user = await User.create({
            username: input.data.username,
            firstname: input.data.firstname,
            lastname: input.data.lastname,
            password: hashedPassword
        });

        const initialBalace = 100;

        //assigning balace to newly created account

        const account =  new Account({
            userId: user._id,
            balance: initialBalace
        });

        await account.save();

        //token creation
        const userId = user._id;
        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET);
        
        res.json({
            msg: "user created successfully",
            user,
            token
        });

        
};

const inputSignin = z.object({
    username: z.string().email(),
    password: z.string(),
});

const signin = async(req, res) =>{
   const input = inputSignin.safeParse(req.body);
//    console.log(req.body);
   if(!input.success){
    res.status(400).json({
        msg: "invalid input credentials"
    })
    return;
   }

   //finding user
   const username = input.data.username;
   const user = await User.findOne({
    username
   });

   if(!user){
    res.status(400).json({
        msg: "invalid username",
    });
    return;
   }



   const hashedPassword = await bcrypt.compare(input.data.password, user.password);

   if(!hashedPassword){
    res.status(400).json({
        error: "invalid password"
    });
    return;
   }

   //generating token
   const userId = user._id;
   const token =jwt.sign({
    userId
   }, process.env.JWT_SECRET);


   res.status(200).json({
    msg: "user login successfully",
    user,
    token
   });


}

const updateUser = async(req, res) => {
        const {username, firstname, lastname} = req.body;

        if (!username && !firstname && !lastname){
            res.status(400).json({
                msg: "must have atleast one field to chnage"
            });
            return;
        }

        const userId = req.userId;
        console.log("userId: ", userId);

        const user = await User.findByIdAndUpdate(
            userId,
           {
            $set: {
                    username,
                    firstname,
                    lastname
                }
           },
           {
            new: true
           }
        );
        res.status(200).json({
            msg: "updated successfully",
            user
        })

};

const passwordInput = z.object({
    username: z.string(),
    newPassword: z.string()
})

const changePassword = async(req, res) => {
        const input = passwordInput.safeParse(req.body);

        if(!input.success){
            return res.status(400).json({
                msg: "password is not valid"
            });
        };

        const username = input.data.username;

        const user =  await User.findOne({username});

        //
        if(!user){
            return res.status(400).json({
                msg: "cannot find user with given username"
            })
        }

        //hashing password
        const hashedPassword = bcrypt.hash(input.data.newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set: {
                password: hashedPassword
            }
            },
            {
                new: true
            }
    );

    return res.status(200).json({
        msg: "password updated successfully",
        user: updatedUser
    })

};

const queryInput = z.object({
    name: z.string()
})
const bulkUser = async(req, res)=> {
    const input = queryInput.safeParse(req.query);
    // console.log(req.query);
    if(!input.success){
        return res.status(400).json({
            msg: "invalid query parameter"
        });
    };

    const {name} = input.data;
    

    const user =  await User.find({firstname: name}).select("-password");


    return res.status(200).json({
        msg: "user find successfully",
        user
    })
    

}


module.exports = {
    signup,
    signin,
    updateUser,
    changePassword,
    bulkUser
}