const  mongoose  = require("mongoose");

const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    balance: {
        type: Number,
        default: 0
    }
});

const Account = mongoose.model("accounts", balanceSchema);

module.exports = Account;