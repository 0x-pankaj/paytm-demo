const mongoose = require("mongoose");
const Account = require("../models/account.model");
const zod = require("zod");

const fundTransferFunction = async(fromAccountId, toAccountId, amount) => {
    try {
        //decrement from account
        await Account.findByIdAndUpdate(fromAccountId, {
            $inc: {
                balance: -amount
            }
        },
            {
                new: true
            }
    );

    //increment to receivalble account

    await Account.findByIdAndUpdate(toAccountId, {
        $inc: {
            balance: amount
        }
    },{
        new: true
    });

    return true;

    } catch (error) {
        console.log("error: ", error);
        return false;
    }
};


const getFund = async(req,res) => {
    try {
        // const {id} = req.params;
        const { userId: id } = req.params;

        console.log("givenId: ", id);
        console.log("userId: ", req.userId);

        if( id != req.userId){
            res.status(403).json({
                msg: "id not matching with user"
            });
        };

        // const balance =  await Account.findOne({userId: id});
        const balance = await Account.findOne({userId: new mongoose.Types.ObjectId(id)});

        res.status(200).json({
            msg: "balace fetched successfully",
            balance: balance.balance
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed",
            error
        })
    }
};

const inputFundTransfer = zod.object({
    to: zod.string(),
    amount: zod.number()
})
const fundTransfer = async(req,res) => {
        const input = inputFundTransfer.safeParse(req.body);
        if(!input.success){
            return res.status(400).json({
                msg: "input invalid",
                error: input.error
            })
        };

        const to = input.data.to;
        const amount = input.data.number;
        const id = req.userId;


      const success =  await fundTransferFunction(id, to, amount);

      if(!success){
        return res.status(400).json({
            msg: "insufficient balance"
        })
      }

        res.status(200).json({
            msg: "transfered successfully"
        })


}


module.exports = {
    getFund,
    fundTransfer
}