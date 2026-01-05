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
        required:true,
        minlength: 6,
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