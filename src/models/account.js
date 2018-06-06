import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Account = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
});

Account.plugin(passportLocalMongoose);

export default mongoose.model('Account', Account);
