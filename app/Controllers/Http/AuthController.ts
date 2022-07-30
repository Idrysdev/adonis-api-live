// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Schema from "@ioc:Adonis/Lucid/Schema";
import {schema , rules} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import { HttpContext, Response } from "@adonisjs/core/build/standalone";

export default class RegistersController {
    public async register({request , response}){
      const validations = await schema.create({
        email: schema.string({}, [
            rules.email(),
            rules.unique({table: 'users' , column: 'email'})
        ]),
        password: schema.string({} , [
            rules.confirmed()
        ])
      })
      const data = await request.validate({schema:validations})
      const user = await User.create(data) 
      return response.created(user)
    }


    public async login({auth , request }:HttpContext){
       const email    = request.input('email')
       const password = request.input('password')
       const token  = await auth.attempt(email , password)
       return token.toJSON()
       
    }
} 
