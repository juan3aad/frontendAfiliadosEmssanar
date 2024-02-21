import { Component, OnInit, ViewChild } from '@angular/core';
import { Ips } from 'src/app/models/ips';
import { ActivatedRoute } from '@angular/router';
import { IpsService } from 'src/app/services/ips.service';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Afiliado } from 'src/app/models/afiliado';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-asignar-afiliados',
  templateUrl: './asignar-afiliados.component.html',
  styleUrls: ['./asignar-afiliados.component.css']
})
export class AsignarAfiliadosComponent implements OnInit {

  ips: Ips;
  afiliadosAsignar: Afiliado[] = [];
  afiliados: Afiliado[] = [];

  dataSource: MatTableDataSource<Afiliado>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;

  mostrarColumnas: string[] = ['nombre', 'apellido', 'seleccion'];
  mostrarColumnasAfiliados: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];

  seleccion: SelectionModel<Afiliado> = new SelectionModel<Afiliado>(true, []);

  constructor(private route: ActivatedRoute,
    private ipsService: IpsService,
    private afiliadoService: AfiliadoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.ipsService.ver(id).subscribe(c => {
        this.ips = c;
        this.afiliados = this.ips.afiliados;
        this.iniciarPaginador();

      });
    });
  }

  private iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Afiliado>(this.afiliados);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
  }

  filtrar(nombre: string):void {
    nombre = nombre !== undefined? nombre.trim(): '';
    if(nombre !== ''){
      this.afiliadoService.filtrarPorNombre(nombre)
      .subscribe(afiliados => this.afiliadosAsignar = afiliados.filter(a => {
        let filtrar = true;
        this.afiliados.forEach(ca => {
          if(a.id === ca.id){
            filtrar = false;
          }
        });
        return filtrar;
      }));
    }
  }

  estanTodosSeleccionados(): boolean {
    const seleccionados = this.seleccion.selected.length;
    const numAfiliados = this.afiliadosAsignar.length;
    return (seleccionados === numAfiliados);
  }

  seleccionarDesSeleccionarTodos(): void {
    this.estanTodosSeleccionados()?
    this.seleccion.clear(): 
    this.afiliadosAsignar.forEach(a => this.seleccion.select(a));
  }

  asignar(): void {
    console.log(this.seleccion.selected);
    this.ipsService.asignarAfiliados(this.ips, this.seleccion.selected)
    .subscribe(c => {
      this.tabIndex = 2;
      Swal.fire(
        'Asignados:',
        `Afiliados Asignados con éxito al ips ${this.ips.nombre}`,
        'success'
      );
      this.afiliados = this.afiliados.concat(this.seleccion.selected);
      this.iniciarPaginador();
      this.afiliadosAsignar = [];
      this.seleccion.clear();
    },
    e => {
       
      if(e.status === 500){
        const mensaje = e.error.message as string;
        if(mensaje.indexOf('ConstraintViolationException') > -1){
          Swal.fire(
            'Cuidado:',
            'No se puede asignar el afiliado ya está asociado a otro ips.',
            'error'
          );
        }
      }
    });
  }

  eliminarAfiliado(afiliado: Afiliado): void {

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${afiliado.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.ipsService.eliminarAfiliado(this.ips, afiliado)
        .subscribe(ips => {
          this.afiliados = this.afiliados.filter(a => a.id !== afiliado.id);
          this.iniciarPaginador();
          Swal.fire(
            'Eliminado:',
            `Afiliado ${afiliado.nombre} eliminado con éxito del ips ${ips.nombre}.`,
            'success'
          );
        });    

      }
    });


  }

}
