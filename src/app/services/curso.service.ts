import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Ips } from '../models/curso';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Afiliado } from '../models/afiliado';
import { Observable } from 'rxjs';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class IpsService extends CommonService<Ips>{

  protected baseEndpoint = BASE_ENDPOINT + '/ips';

  constructor(http: HttpClient) { 
    super(http);
  }

  asignarAfiliados(curso: Ips, afiliados: Afiliado[]): Observable<Ips>{
    return this.http.put<Ips>(`${this.baseEndpoint}/${curso.id}/asignar-afiliados`,
     afiliados,
     {headers: this.cabeceras});
  }

  eliminarAfiliado(curso: Ips, afiliado: Afiliado): Observable<Ips> {
    return this.http.put<Ips>(`${this.baseEndpoint}/${curso.id}/eliminar-afiliado`,
    afiliado,
    {headers: this.cabeceras});
  }

  

  obtenerIpsPorAfiliadoId(afiliado: Afiliado): Observable<Ips> {
    return this.http.get<Ips>(`${this.baseEndpoint}/afiliado/${afiliado.id}`);
  }
}
