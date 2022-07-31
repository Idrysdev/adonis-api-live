import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number 

  @column()
  public title: String

  @column()
  public is_completed: boolean

  @column.dateTime({ 
    autoCreate: true , 
    serialize:(value:DateTime) =>value.toFormat('yyyy LLL dd')
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
