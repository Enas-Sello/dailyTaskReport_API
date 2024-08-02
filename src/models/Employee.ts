import mongoose, { Document, Schema } from "mongoose"

export interface IEmployee extends Document {
  name: string
  tasks: mongoose.Schema.Types.ObjectId[]
}

const employeeSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
})

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema)
export default Employee
