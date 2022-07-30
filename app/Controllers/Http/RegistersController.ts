// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Schema from "@ioc:Adonis/Lucid/Schema";
import {schema , rules} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import { Response } from "@adonisjs/core/build/standalone";

export default class RegistersController {
    public async index({request , response}){
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
} 
