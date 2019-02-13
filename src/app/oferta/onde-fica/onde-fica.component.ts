import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [
    OfertasService
  ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    // snapshot
    // let id = this.route.parent.snapshot.params['id'];
    // // console.log('rota fica ' + id);
    // this.ofertasService.getOndeFicaOfertaPorId(id)
    //   .then((descricao: string) => {
    //     this.ondeFica = descricao;
    // });
    // subscribe
    this.route.parent.params.subscribe((params: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(params.id)
        .then((descricao: string) => {
          this.ondeFica = descricao;
      });
    });
  }

}
