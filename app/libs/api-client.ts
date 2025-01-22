import { env } from "@/configs/env";
import { ApiCode, type GenericApiResponse } from "@/types/api-types";
import ky, { HTTPError } from "ky";
import toast from "react-hot-toast";
import { logger } from "./logger";

export const requestor = ky.create({
  hooks: {
    beforeRequest: [
      (request) => {
        logger.info(
          {
            method: request.method,
            url: request.url,
          },
          "API request",
        );
      },
    ],
    afterResponse: [
      (request, options, response) => {
        logger.info(
          {
            method: request.method,
            url: request.url,
            status: response.status,
          },
          "API response",
        );
        return response;
      },
    ],
    beforeError: [
      (error) => {
        logger.error(
          {
            method: error.request.method,
            url: error.request.url,
            status: error.response.status,
            message: error.response.statusText,
          },
          "API error",
        );
        toast(error.message, { className: "bg-red-action" });
        return error;
      },
    ],
  },
});

export const api = requestor.extend({
  prefixUrl: env.API_URL,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const responseJson = await response.json<GenericApiResponse>();
        if (responseJson.ok && responseJson.code === ApiCode.SUCCESS) {
          return;
        }

        throw new HTTPError(response, request, options);
      },
    ],
  },
});
