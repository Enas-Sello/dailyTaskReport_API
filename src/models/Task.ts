import mongoose, { Document, Schema } from "mongoose"

export interface ITask extends Document {
  description: string
  from: Date
  to: Date
  employee: mongoose.Schema.Types.ObjectId
}

const taskSchema: Schema = new mongoose.Schema({
  description: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
})

const Task = mongoose.model<ITask>("Task", taskSchema)
export default Task

