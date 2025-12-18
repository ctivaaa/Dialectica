import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    nombre: {
        type: String
    },
    
    correo: {
        type: String
    },
    contrasena: {
        type: String
    },
    admin: {
        type: Boolean
    }

},{versionKey:false, timestamps: true}
)

export default model ("user", userSchema)