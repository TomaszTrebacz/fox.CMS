import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  async uploadImage(file: any): Promise<string> {
    const contentType = file.type;

    const bucket = new S3({
      accessKeyId: environment.aws_access_key_id,
      secretAccessKey: environment.aws_secret_access_key,
      region: environment.aws_region,
    });

    const params = {
      Bucket: environment.aws_bucket,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    return (await bucket.upload(params).promise()).Location;
  }
}
