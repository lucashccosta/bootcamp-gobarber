import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {

    private client: S3;

    constructor() {
        this.client = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalPath);

        const contentType = mime.getType(originalPath);
        if(!contentType) {
            throw new Error('File not found.');
        }

        await this.client.putObject({
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: file,
            ACL: 'public-read',
            ContentType: contentType,
            Body: fileContent
        }).promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: file,
        }).promise();
    }
}

export default S3StorageProvider;