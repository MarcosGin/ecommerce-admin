import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['../products.component.css']
})
export class ImageEditComponent implements OnInit {
  public title: string;
  public image = 'http://www.sitechecker.eu/img/not-available.png';
  public images: any;
  public id: number;
  filesToUpload: Array<File>;
  loadingUpload = false;
  loadingDelete = false;
  public notImages =  false;
  cantImages: number;
  preview;
  constructor( private router: ActivatedRoute,
               private _productsService: ProductsService,
               private _notifications: NotificationsService) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'];
      this._productsService.getProduct(this.id)
        .subscribe( data => {
          this.title = data.response.title;
          this.image = data.response.image ? data.response.image : this.image;
        }, err => {}, () => {
          this._productsService.getImages( this.id )
            .subscribe( data => {
              if (data.status === true) {
                this.images = data.response;
              } else {
                this.images = [];
                this.notImages = true;
              }
            });
        });
      this.preview = document.querySelector('#preview');
    });
  }

  fileChangeEvent(fileInput: any) {
    const preview = this.preview;
    preview.innerHTML = '';
    this.filesToUpload = [];
    let cont = 0;
    for (const file of fileInput.target.files){
      if ( /\.(jpe?g|png)$/i.test(file.name) ) {
        this.filesToUpload[cont] = file;
        cont++;
      }
    }
    this.cantImages = this.filesToUpload.length;
    if (this.cantImages) {
      [].forEach.call(this.filesToUpload, readAndPreview);
    }
    function readAndPreview(file) {
      if ( /\.(jpe?g|png)$/i.test(file.name) ) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
          const div = document.createElement('div');
          div.className = ' image';
          div.style.backgroundImage = 'url(' + this.result + ')';
          preview.appendChild(div);
        }, false);
        reader.readAsDataURL(file);
      }
    }
  }

  upload() {
    if (this.cantImages) {
      if (this.cantImages <= 20) {
        this.preview.innerHTML = '';
        this.loadingUpload = true;
        const formData: FormData = new FormData();
        for (const file of this.filesToUpload) {
          formData.append('uploads[]', file, file.name);
        }

        this._productsService.addImages(this.id, formData)
          .subscribe(res => {
            this.loadingUpload = false;
            this.cantImages = 0;
            this.filesToUpload = [];
            if (res.status === true) {
              this._notifications.success('Upload images', res.response.message);
              for (const image of res.response.data.images) {
                this.images.push({name: image.name, url: image.url});
              }
              this.notImages = false;
            } else {
              this._notifications.error('Upload images', res.response.message);
            }
          });
      } else {
        this._notifications.error('Upload images', 'Only 20 images can be uploaded at a time.');
        this.filesToUpload = [];
        this.cantImages = 0;
        this.preview.innerHTML = '';
        return false;
      }
    } else {
      return false;
    }
  }

  delete (name: string) {
    if (this.loadingDelete === true) {
      return false;
    }
    this.loadingDelete = true;
    this._productsService.deleteImage(this.id, name)
      .subscribe(res => {
        if (res.status === true) {
          this._notifications.success('Delete image', res.response.message);
        } else {
          this._notifications.error('Delete image', res.response.message);
        }
        if ((res.response.data).length) {
          this.images = res.response.data;
        } else {
          this.images = [];
          this.notImages = true;
        }
        this.loadingDelete = false;
      });
  }
}
