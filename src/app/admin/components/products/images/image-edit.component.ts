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
              this.images = data.response;
              console.log(this.images);
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
      const formData: FormData = new FormData();
      for (const file of this.filesToUpload) {
        formData.append('uploads[]', file, file.name);
      }
      this._productsService.addImages(this.id, formData)
        .subscribe(res => {
          console.log(res);
        });
    } else {
      console.log('no upload');
      return false;
    }
  }

}
