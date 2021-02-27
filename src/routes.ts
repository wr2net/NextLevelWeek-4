import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";
import {SendMailController} from "./controllers/SendMailController";
import {AnswerController} from "./controllers/AnswerController";
import {NpsController} from "./controllers/NpsController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();
const answareController = new AnswerController();
const npsControler = new NpsController()

router.post("/users", userController.create);
router.get("/users", userController.show);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);
router.get("/answers/:value", answareController.execute);

router.get("/nps/:survey_id", npsControler.execute);

export {router};