import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afiliado } from '../models/afiliado';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService extends CommonService<Afiliado>{

  protected baseEndpoint = BASE_ENDPOINT + '/afiliados';

  constructor(http: HttpClient) {
    super(http);
   }

   public crearConFoto(afiliado: Afiliado, archivo: File): Observable<Afiliado>{
     const formData = new FormData();
     formData.append('archivo', archivo);
     formData.append('nombre', afiliado.nombre);
     formData.append('apellido', afiliado.apellido);
     formData.append('email', afiliado.email);
     return this.http.post<Afiliado>(this.baseEndpoint + '/crear-con-foto',
      formData);
   }

   public editarConFoto(afiliado: Afiliado, archivo: File): Observable<Afiliado>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', afiliado.nombre);
    formData.append('apellido', afiliado.apellido);
    formData.append('email', afiliado.email);
    return this.http.put<Afiliado>(`${this.baseEndpoint}/editar-con-foto/${afiliado.id}`,
     formData);
  }

  public filtrarPorNombre(nombre: string): Observable<Afiliado[]>{
    return this.http.get<Afiliado[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

}
