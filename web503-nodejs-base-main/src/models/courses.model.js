import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
    {
        courseName:{trye: String, required},
        views:{type: Number,	default: 0},
        thumbnail:{type: String,	required},
        note: {	type: String,	optional},
        category:{type:	String,	required},
        createdAt:{	Date, default: Date.now},
    },
)

const Courses = mongoose.model("Courses", coursesSchema)
export default Courses;
