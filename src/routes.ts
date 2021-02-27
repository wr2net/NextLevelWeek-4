import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";
import {SendMailController} from "./controllers/SendMailController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);
router.get("/users", userController.show);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);

export {router};