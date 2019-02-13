import { Component, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { OfertasService } from '../ofertas.service';

import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [
    OfertasService
  ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), // Executa o switchMap após 1s
      distinctUntilChanged(),
      switchMap((termoDaBusca: string) => {
        if(termoDaBusca.trim() === '') {
          // retornar um observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        // console.log('requisição para api');
        return this.ofertasService.pesquisaOfertas(termoDaBusca);
      }),
      catchError((erro: any) => {
        // console.log(erro);
        return of<Oferta[]>([]);
      })
    );
  }

  public pesquisa(termoDaBusca: string): void {
    // console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}
