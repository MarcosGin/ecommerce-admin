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
  public image;
  public images: any;
  public id: number;
  filesToUpload: Array<File>;
  fileToUpload: Array<File>;
  loadingUploadImages = false;
  loadingUploadImage = false;
  loadingDelete = false;
  public notImages =  false;
  cantImages: number;
  cantImage: number;
  preview;
  preview_image;
  constructor( private router: ActivatedRoute,
               private _productsService: ProductsService,
               private _notifications: NotificationsService) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'];
      this._productsService.getProduct(this.id)
        .subscribe( data => {
          this.title = data.response.title;
          this.image = data.response.image.url ? data.response.image.url : null;
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
      this.preview_image = document.querySelector('#preview-image');
    });
  }

  addImages(fileInput: any) {
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
        const reader = new FileReader();
        reader.addEventListener('load', function () {
          const div = document.createElement('div');
          div.className = 'image';
          div.innerHTML = '<img src="' + this.result + '">';
          preview.appendChild(div);
        }, false);
        reader.readAsDataURL(file);
    }
  }
  addImage(fileInput: any) {
    console.log('entro aca');
    const preview_image = this.preview_image;
    this.preview_image.innerHTML = '';
    this.fileToUpload = [];
    let cont = 0;
    for (const file of fileInput.target.files){
      if ( /\.(jpe?g|png)$/i.test(file.name) ) {
        this.fileToUpload[cont] = file;
        cont++;
      }
    }
    this.cantImage = this.fileToUpload.length;
    if (this.cantImage) {
      [].forEach.call(this.fileToUpload, readAndPreview);
    }
    function readAndPreview(file) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        const div = document.createElement('div');
        div.className = 'image';
        div.innerHTML = '<img src="' + this.result + '">';
        preview_image.appendChild(div);
      }, false);
      reader.readAsDataURL(file);
    }
  }
  uploadImages() {
    if (this.cantImages) {
      if (this.cantImages <= 20) {
        this.preview.innerHTML = '';
        this.loadingUploadImages = true;
        const formData: FormData = new FormData();
        for (const file of this.filesToUpload) {
          formData.append('uploads[]', file, file.name);
        }

        this._productsService.addImages(this.id, formData)
          .subscribe(res => {
            this.loadingUploadImages = false;
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

  uploadImage() {
    if (this.cantImage) {
      this.preview_image.innerHTML = '';
      this.loadingUploadImage = true;
      const formData: FormData = new FormData();
      for (const file of this.fileToUpload) {
        formData.append('uploads[]', file, file.name);
      }

      this._productsService.addImage(this.id, formData)
        .subscribe(res => {
          this.loadingUploadImage = false;
          this.cantImage = 0;
          this.fileToUpload = [];
          if (res.status === true) {
            this._notifications.success('Upload image', res.response.message);
            this.image = res.response.data.images[0].url;
          } else {
            this._notifications.error('Upload image', res.response.message);
          }
        });
    }
  }

  remove(name: string) {
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
