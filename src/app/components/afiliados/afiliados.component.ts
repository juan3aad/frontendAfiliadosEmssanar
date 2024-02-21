import { Component, OnInit, ViewChild } from '@angular/core';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Afiliado } from 'src/app/models/afiliado';
import { CommonListarComponent } from '../common-listar.component';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent 
extends CommonListarComponent<Afiliado, AfiliadoService> implements OnInit {

  baseEndpoint = BASE_ENDPOINT + '/afiliados';
  
  constructor(service: AfiliadoService) {
    super(service);
    this.titulo = 'Listado de Afiliados';
    this.nombreModel = Afiliado.name;
  }


}
