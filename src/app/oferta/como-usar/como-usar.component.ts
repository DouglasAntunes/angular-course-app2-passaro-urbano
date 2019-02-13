import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [
    OfertasService
  ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    // snapshot
    // let id = this.route.parent.snapshot.params['id'];
    // // console.log('rota usar ' + id);
    // this.ofertasService.getComoUsarOfertaPorId(id)
    //   .then((descricao: string) => {
    //     this.comoUsar = descricao;
    //     // console.log(this.comoUsar);
    // });
    // subscribe
    this.route.parent.params.subscribe((params: Params) => {
      this.ofertasService.getComoUsarOfertaPorId(params.id)
        .then((descricao: string) => {
          this.comoUsar = descricao;
          // console.log(this.comoUsar);
      });
    });
  }

}
