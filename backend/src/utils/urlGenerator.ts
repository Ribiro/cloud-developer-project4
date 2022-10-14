import { getSingleTodo } from "../data_access/getSingleTodo";
import { enableTracing } from "./tracing";

export const generateUrl = async (id: string, imageType: string) => {

    const s3 = new enableTracing.S3({ region: 'us-east-1' });
    const tod = `${id}`;
    const url = s3.getSignedUrl('putObject', {
        Bucket: 'ribiroattachementseou7xk8j16a4',
        Key: tod,
        Expires: 3600,
        ContentType: imageType,
        ACL: 'public-read',
    });
    let fileUrl: string = "https://ribiroattachementseou7xk8j16a4.s3.amazonaws.com/" + id;
    let item = await getSingleTodo(id);
    return { item, fileUrl, url };
}
