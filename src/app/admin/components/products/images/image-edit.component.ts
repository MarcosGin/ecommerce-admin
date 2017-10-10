import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['../products.component.css']
})
export class ImageEditComponent implements OnInit {
  public title: string;
  public image: string;
  public images: any;
  public id: number;
  filesToUpload: Array<File>;
  loadingUpload = false;
  public notImages =  false;
  cantImages: number;
  preview;
  constructor( private router: ActivatedRoute,
               private _productsService: ProductsService) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'];
      this._productsService.getProduct(this.id)
        .subscribe( data => {
          this.title = data.response.title;
          this.image = data.response.image ? data.response.image : 'http://www.sitechecker.eu/img/not-available.png';
        }, err => {}, () => {
          this._productsService.getImages( this.id )
            .subscribe( data => {
              if(data.status === true){
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
          div.className = 'col-md-3';
          div.innerHTML = '<div class="img" style=" width:100%;"><img src="' + this.result + '" title ="' + file.name + '" style="max-width: 100%;"/></div>';
          preview.appendChild(div);
        }, false);
        reader.readAsDataURL(file);
      }
    }
  }

  upload() {
    if (this.cantImages) {
      this.loadingUpload = true;
      const formData: FormData = new FormData();
      for (const file of this.filesToUpload) {
        formData.append('uploads[]', file, file.name);
      }
      this._productsService.addImages(this.id, formData)
        .subscribe(res => {
          this.loadingUpload = false;
          this.filesToUpload = [];
          this.cantImages = 0;
          this.preview.innerHTML = '';
          for (const image of res.response.data.images){
             this.images.push({ id: image.name, url: image.url});
          }
          this.notImages = false;
        });
    } else {
      console.log('no upload');
      return false;
    }
  }

}
