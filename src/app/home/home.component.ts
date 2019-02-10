import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../ofertas.service';

import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  providers: [
    OfertasService
  ]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    // this.ofertas = this.ofertasService.getOfertas();
    // console.log(this.ofertas);
    // this.ofertasService.getOfertas2().then(
    //   (ofertas: Oferta[]) => {
    //     this.ofertas = ofertas;
    //   },
    //   (erro: any) => {
    //     console.log(erro);
    // });
    this.ofertasService.getOfertas().then( (ofertas: Oferta[]) => {
      // console.log('A função resolve() foi resolvida depois de 3 segundos');
      this.ofertas = ofertas;
    }).catch( (erro: any) => {
      // console.log(erro);
  });
  }

}
