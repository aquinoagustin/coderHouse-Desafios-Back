import courseModel from "../models/courses.js";

export default class Courses{
    constructor(){
        console.log(`Manager de Cursos con Mongo`);
    }
    getAll = async () =>{
        let courses = await courseModel.find().lean().populate('students');
        return courses;
    }
    getById = async (id) => {
        let course = await courseModel.findOne({_id:id}).populate('students');
        return course;
    }
    saveCourse = async (course) => {
        let result = await courseModel.create(course);
        return result;
    }
    updateCourse = async (id,course) => {
        delete course._id;
        let result = await courseModel.updateOne({_id:id},{$set:course})
        return result
    }
}