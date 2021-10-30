
import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-ver-proveedor',
  templateUrl: './ver-proveedor.component.html',
  styleUrls: ['./ver-proveedor.component.css']
})
export class VerProveedorComponent implements OnInit {
  public proveedor : any;

  constructor(private serProveedor : ProveedoresService) { }

  ngOnInit(): void {

      this.proveedor = this.serProveedor.getProveedor();
  }

}
