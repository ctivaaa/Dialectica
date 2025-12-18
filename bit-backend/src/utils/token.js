import jwt from "jsonwebtoken"


// se crea una funcion para obtener el token retornando una promesa
export function getToken (req){
    return new Promise((res, rej)=>{
        jwt.sign(req, "top secret", {expiresIn: "1h"} ,(error, token)=>{    //aca lo primero que debe ir es el payload de la funcion, luego la llave secreta y despues una funcion para la respuesta
          if (error) {
            rej(error)
          } else {
            res(token)
          }  
        })
    })
}