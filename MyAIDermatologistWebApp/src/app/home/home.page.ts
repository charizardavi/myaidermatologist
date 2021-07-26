import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  predictionResult: any;
  constructor(public photoService: PhotoService, private router: Router) { }

  takepic() {
    this.photoService.addNewToGallery();
    let intervalCount = 0;
    let intervalID = setInterval(() => {
      if (document.querySelector("pwa-camera-modal-instance")) {
        const video = document
          .querySelector("pwa-camera-modal-instance")
          .shadowRoot.querySelector("pwa-camera")
          .shadowRoot.querySelector(".camera-wrapper .camera-video video") as HTMLElement;
        if (video)
          video.style.transform = null;
      }
      // if(++intervalCount >= 5){
      //   window.clearInterval(intervalID);
      // }
      // console.log('video tranformation interval');
    }, 500);

    this.photoService.prediction$.subscribe(result => {
      this.predictionResult = result
      console.log('home page', this.predictionResult);
    });

  }

  showRemedies() {
    this.router.navigate(['/remedies', this.predictionResult]);
  }

}
