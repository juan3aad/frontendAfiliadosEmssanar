import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-afiliados-form',
  templateUrl: './afiliados-form.component.html',
  styleUrls: ['./afiliados-form.component.css']
})
export class AlumnosFormComponent
  extends CommonFormComponent<Afiliado, AfiliadoService> implements OnInit {

    private fotoSeleccionada: File;

  constructor(service: AfiliadoService,
    router: Router,
    route: ActivatedRoute) {
      
    super(service, router, route);
    this.titulo = 'Crear Afiliados';
    this.model = new Afiliado();
    this.redirect = '/afiliados';
    this.nombreModel = Afiliado.name;
  }

  public seleccionarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
      Swal.fire(
        'Error al seleccionar la foto:', 
        'El archivo debe ser del tipo imagen',
        'error');
    }
  }

  public crear(): void {
    if(!this.fotoSeleccionada){
      super.crear();
    } else {
      this.service.crearConFoto(this.model, this.fotoSeleccionada)
      .subscribe(afiliado => {
        console.log(afiliado);
        Swal.fire('Nuevo:', `${this.nombreModel} ${afiliado.nombre} creado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }

  public editar(): void {
    if(!this.fotoSeleccionada){
      super.editar();
    } else {
      this.service.editarConFoto(this.model, this.fotoSeleccionada)
      .subscribe(afiliado => {
        console.log(afiliado);
        Swal.fire('Modificado:', `${this.nombreModel} ${afiliado.nombre} actualizado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }
}
