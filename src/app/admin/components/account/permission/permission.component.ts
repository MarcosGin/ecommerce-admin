import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styles: []
})
export class PermissionComponent implements OnInit {

  public permissions: any = {
    users_edit: true,
    users_delete: false,
    products_edit_add: true,
    products_delete: false,
    mistakes_edit_add: true,
    mistakes_delete: true
  };

  constructor() { }

  ngOnInit() {
  }

}
