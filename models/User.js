import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const { hash, compare } = bcrypt;


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
    }
    next();
    }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
}

// Generate a signed token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};


export const User = model("User", UserSchema);
