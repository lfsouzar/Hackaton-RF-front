import {Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hackaton-RF-front';

  currentYear = new Date().getFullYear();


  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  capturedImage: string | null = null;
  cameraOpen: boolean = false;
  showToast1: boolean = false;
  showToast2: boolean = false;
  vapeDetected: string = '';
  vapeModel: string = 'Caneta Descartável';
  vapeCounter: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  async startCamera() {
    this.cameraOpen = true;
    this.vapeDetected = "BLVK Disposable - Ello";
    setTimeout(()=>{}, 1000)
    await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Erro ao acessar a câmera: ', err);
      });

    setTimeout( ()=>{
      this.showToast1 = true;
      setTimeout( ()=>{
        this.showToast1 = false;
        setTimeout( ()=>{
          this.showToast2 = true;
          setTimeout(()=>{
            this.showToast1 = false;
            this.showToast2 = false;
          }, 4500);
        }, 200)
      }, 2000);
    }, 700)




  }

  scanAgain() {
    this.showToast1 = false;
    this.showToast2 = false;
    this.vapeCounter += 1;

    if (this.vapeCounter % 2 === 0) {
      this.vapeDetected = "BLVK Disposable - Ello";
    } else {
      this.vapeDetected = "BalMY MAX";
    }

    // setTimeout( ()=>{
    //
    // }, 1000);

    setTimeout( ()=>{
      this.showToast1 = true;
      setTimeout( ()=>{
        this.showToast1 = false;
        setTimeout( ()=>{
          this.showToast2 = true;
          setTimeout(()=>{
            this.showToast1 = false;
            this.showToast2 = false;
          }, 4500);
        }, 200)
      }, 2000);
    }, 700)

  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }


}
