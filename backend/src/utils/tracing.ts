
import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk-core";

export const enableTracing = AWSXRay.captureAWS(AWS);


