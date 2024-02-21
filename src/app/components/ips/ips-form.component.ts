import { Component, OnInit } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Ips } from 'src/app/models/ips';
import { IpsService } from 'src/app/services/ips.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ips-form',
  templateUrl: './ips-form.component.html',
  styleUrls: ['./ips-form.component.css']
})
export class IpsFormComponent extends CommonFormComponent<Ips, IpsService> implements OnInit {

  constructor(service: IpsService, 
    router: Router,
    route: ActivatedRoute) { 
      super(service, router, route);
      this.titulo = 'Crear Ips';
      this.model = new Ips();
      this.redirect = '/ipss';
      this.nombreModel = Ips.name;
    }

}
