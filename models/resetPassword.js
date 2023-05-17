const mongoose= require('mongoose');

const ResetPasswordSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        //comment belong to a User
        accessToken:
        {
            type: String,
            required: true
        },
        isValid:
        {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);

module.exports = ResetPassword;