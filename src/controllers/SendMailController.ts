import { Request, Response } from "express";
import {getCustomRepository} from "typeorm";
import {UsersRepository} from "../repositories/UsersRepository";
import {SurveyRepository} from "../repositories/SurveyRepository";
import {SurveysUsersRepository} from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import {resolve} from "path";
import {AppError} from "../errors/AppError";

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({email})

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists!"
            })
        }

        const surveyAlreadyExists = await surveysRepository.findOne({
            id: survey_id,
        })

        if (!surveyAlreadyExists) {
            throw new AppError("Survey dos not exists!")
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id, value: null},
            relations: ["user", "survey"],
        })

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            id: "",
            link: process.env.BASE_URL + process.env.RESOURCE_MAIL
        }

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id
            await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath)
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        })

        await surveysUsersRepository.save(surveyUser)

        variables.id = surveyUser.id

        await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath)

        return response.json(surveyUser);
    }
}

export { SendMailController }