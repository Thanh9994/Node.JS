import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        email: {type: String, require: [true, "vui lòng nhập email"], unique: true},
        password: {type: String, require: [true, "Vui lòng nhập password"], minlength: [6, "password tối thiểu 6 số và ký tự"]},
        role: {type: String, enum:["admin", "user"], default:"user"}
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;