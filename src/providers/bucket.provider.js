import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

class Bucket {
  constructor(folder) {
    this.accessKey = process.env.S3_ACCESS_KEY_ID;
    this.keySecret = process.env.S3_ACCESS_KEY_SECRET;
    this.bucket = process.env.S3_BUCKET;
    this.region = process.env.S3_REGION;

    this.folder = folder;

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.keySecret,
      },
    });
  }

  async uploadImage(file, name) {
    const keyFile = `${this.folder}/${name}.jpg`;

    const urlFile = `https://${this.bucket}.s3.amazonaws.com/${keyFile}`;

    const objectFile = {
      Bucket: this.bucket,
      Key: keyFile,
      Body: file.data,
      ACL: "public-read",
    };
    await this.client.send(new PutObjectCommand(objectFile));
    return urlFile;
  }
}

export default Bucket;
