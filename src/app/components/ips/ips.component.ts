import { Component, OnInit } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { Afiliado } from 'src/app/models/curso';
import { AfiliadoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-Afiliados',
  templateUrl: './Afiliados.component.html',
  styleUrls: ['./Afiliados.component.css']
})
export class AfiliadosComponent extends CommonListarComponent<Afiliado, AfiliadoService> implements OnInit {

  constructor(service: AfiliadoService) {
    super(service);
    this.titulo = 'listado de Afiliados';
    this.nombreModel = Afiliado.name;
   }

}
