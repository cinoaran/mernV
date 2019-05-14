const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    method: {
        type:String,
        enum: ['local', 'google', 'facebook'],
        require: true
    },
    local: {
        email: {
            type: String,             
            lowerCase: true 
            
        },
        password: {
            type: String, 
            
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowerCase: true
        }

    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowerCase: true
        }

    }

    
});

userSchema.pre('save', async function(next){
    try {

        if(this.method !== 'local'){
            next();
        }
        // Generate a salt
       const salt = await bcrypt.genSalt(10);
       const passwordHash = await bcrypt.hash(this.local.password,salt);
    
       this.local.password = passwordHash;
       next();

    }catch(error){
        next(error);
    }
});

userSchema.methods.IsValidPassword = async function(newPassword) {

    try{
        return await bcrypt.compare(newPassword, this.local.password);
    }catch(error){
        throw new Error(error)
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;