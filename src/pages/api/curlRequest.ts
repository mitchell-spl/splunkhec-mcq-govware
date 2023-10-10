// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "GET") {
    res.status(200).json({ name: "John Doe" });
  } else if (req.method == "POST") {
    try {
      const { user, question, answer } = req.body;

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      );

      const response = await axios.post(
        process.env?.NEXT_PUBLIC_HTTP_URL!,
        `{"event":"“user”:${user}, “type”: ${process?.env?.NEXT_PUBLIC_TYPE},“Answer”:${answer}"}`,
        {
          headers: {
            Authorization: `Splunk ${process?.env?.NEXT_PUBLIC_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": null,
            "X-Requested-With": null,
            Accept: "",
          },
        }
      );

      // 69c2cfd8-697e-4f2e-bf28-861d90961a4b

      console.log(response.data, "data");

      res.status(200).json({
        data: response.data,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        data: "issue",
      });
    }
  }
}
