import { Schema, model } from "mongoose";

const libroSchema = new Schema ({
    titulo: {
        type: String
    },
    autor: {
        type: String
    },
    calcetin: {
        type: String
    },
    valor: {
        type: Number
    }, 
    unidades: {
        type: Number
    },
    _id: {
        type: Number
    }
},{versionKey:false, timestamps: true}
)

export default model ("libro", libroSchema)