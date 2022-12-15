import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const response = await openai.createImage({
      prompt:req.body.prompt,
      n:1,
      size:"256x256"
    })

    const imgUrl = response.data.data[0].url
    res.status(200).json({ url: imgUrl})
  }