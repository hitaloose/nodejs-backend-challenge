import { Request, Response } from "express";

import { ICreatePostService } from "@/services/interfaces/posts/ICreatePostService";

import { bodyValidator } from "./bodyValidator";

export class CreatePostController {
  constructor(private readonly createPostService: ICreatePostService) {}

  async handle(request: Request, response: Response) {
    const body = await bodyValidator(request.body);

    const output = await this.createPostService.run(body);

    response.status(201).json(output);
  }
}
