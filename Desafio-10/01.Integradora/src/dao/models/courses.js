import mongoose from "mongoose";

const courseCollection = "Courses";

const coursesSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    teacher:{
        type:String,
        require:true
    },
    students:{
        type:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Users'
            }
        ],
        default:[]
    }
});

const courseModel = mongoose.model(courseCollection,coursesSchema);

export default courseModel;