import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource, CameraDirection
} from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private prediction = new BehaviorSubject<string | null>(null);
  public prediction$ = this.prediction.asObservable();
  public photos: Photo[] = [];
  public singlePhoto: Photo;

  constructor(private httpClient: HttpClient) { }

  public async addNewToGallery() {
    // Take a photo
    try {
      this.prediction.next('')
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift(savedImageFile);
      this.singlePhoto = savedImageFile;
    }
    catch (error) {
      console.log('errorrrr', error);
    }
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
    var base64img = base64Data.replace("data:image/png;base64,", "")
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory

    let result = '';
    this.uploadFile(base64img).subscribe((response: any) => {
      result = response.result
      this.prediction.next(result);
    })

    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
      base64: base64Data
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private async readAsBlob(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return blob;
  }
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('name', 'Hello');
      formData.append('file', imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
  uploadFile(base64) {
    let finalImg = { "imgdata": base64 }

    return this.httpClient.post('http://127.0.0.1:5000/getPrediction', finalImg);
  }
}



interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
