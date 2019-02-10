import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { Observable, interval, Observer, Subscription } from 'rxjs';

import { OfertasService } from '../ofertas.service';

import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [
    OfertasService
  ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscription: Subscription;
  // private meuObservableTesteSubscription: Subscription;

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    // snapshot
    let id = this.route.snapshot.params['id'];
    // console.log(id);
    // subscribe
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id);
    // });
    this.ofertasService.getOfertasPorId(id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
        // console.log(oferta);
    });

    // this.route.params.subscribe(
    //   (parametro: any) => {
    //     console.log(parametro);
    //   },
    //   (erro: any) => {
    //     console.log(`Erro: ${erro}`);
    //   },
    //   () => {
    //     console.log('Processamento foi classificado como concluido');
    // });

    // let tempo = interval(2000);
    // this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo);
    // });

    // // observable (observavel)
    // let meuObservableTeste = Observable.create((observer: Observer<number>) => {
    //   observer.next(1);
    //   observer.next(3);
    //   // observer.error('algum erro foi encontrado na stream de eventos');
    //   observer.next(7);
    //   observer.complete();
    //   observer.next(10);
    // });
    // // observable (observador)
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: number) => {
    //     console.log(resultado + 10);
    //   },
    //   (erro: string) => {
    //     console.log(erro);
    //   },
    //   () => {
    //     console.log('a stream foi concluida');
    //   }
    // );


  }

  ngOnDestroy(): void {
    // this.tempoObservableSubscription.unsubscribe();
    // this.meuObservableTesteSubscription.unsubscribe();
  }

}
