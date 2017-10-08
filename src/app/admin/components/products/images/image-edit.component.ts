import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styles: []
})
export class ImageEditComponent implements OnInit {
  public id: number;
  filesToUpload: Array<File>;
  cantImages: number;
  preview;
  constructor( private router: ActivatedRoute,
               private _productsService: ProductsService) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params['id'];
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
          const image = new Image();
          image.height = 100;
          image.title = file.name;
          image.src = this.result;
          preview.appendChild( image );
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
      this._productsService.updateImages(this.id, formData)
        .subscribe(res => {
          console.log(res);
        });
    } else {
      console.log('no upload');
      return false;
    }
  }

}
