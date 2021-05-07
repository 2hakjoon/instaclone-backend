import AWS from "aws-sdk";

AWS.config.update({
    credentials:{
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
})

export const uploadToS3 = async (file, userId, dir) => {
    const {filename, createReadStream} = await file;
    const readStream = createReadStream();
    const objectName = `${dir}/${userId}-${filename}`;
    const {Location} = await new AWS.S3().upload({
        Bucket : "instaclone-files",
        Key: objectName,
        ACL: "public-read",
        Body: readStream
    }).promise();
    return Location;
}