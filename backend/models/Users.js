const {Schema,model} = require('mongoose');
const {genSalt,hash} = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        trim:true,
        lowercase:true
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength: [6,'Password must be atleast 6 characters'],
        select:false
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:false
    },
    profilePic:{
        type:String,
        default:""
    }
},
{
    timestamps: true
})

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const saltRounds = await genSalt(10);
  this.password = await hash(this.password, saltRounds);
});

module.exports = model('User',userSchema);