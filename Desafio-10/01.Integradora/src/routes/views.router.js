import {Router} from "express";
import Users from "../dao/dbManager/userManager.js";
import Courses from "../dao/dbManager/coursesManager.js";

const usersManager = new Users();
const coursesManager = new Courses();

const router = Router();

router.get('/', async (req,res)=>{
    let users = await usersManager.getAll();
    res.render('users',{users});
})

router.get('/courses', async (req,res)=>{
    let courses = await coursesManager.getAll();
    res.render('courses',{courses});
})

export default router;