import {Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  standalone: true,
  styleUrls: ['./image-upload.component.scss'],
  imports: [CommonModule]
})
export class ImageUploadComponent {

  currentYear = new Date().getFullYear();


  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  capturedImage: string | null = null;
  cameraOpen: boolean = false;
  showToast1: boolean = false;
  showToast2: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  async startCamera() {
    this.cameraOpen = true;
    setTimeout(()=>{}, 1000)
    await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Erro ao acessar a câmera: ', err);
      });

    setTimeout( ()=>{
      this.showToast1 = true
    }, 700)
    setTimeout( ()=>{
      this.showToast1 = false;
      setTimeout( ()=>{
        this.showToast2 = true;
      }, 200)
    }, 4000)

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
