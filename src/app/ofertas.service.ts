import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { Oferta } from './shared/oferta.model';

import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

    constructor(
        private http: HttpClient
    ) {}

    public getOfertas(): Promise<Oferta[]> {
        // efetuar requisição http
        // retornar promisse Oferta[]
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta);
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta);
    }

    public getOfertasPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta.shift());
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: string[]) => resposta.shift()['descricao']);
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: string[]) => resposta.shift()['descricao']);
    }

    // Stackoverflow fix
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(
                retry(10)
        );
    }

    // public getOfertas2(): Promise<Oferta[]> {
    //     return new Promise((resolve, reject) => {
    //         let deuCerto = true;
    //         if(deuCerto) {
    //             setTimeout( () => resolve(this.ofertas), 3000);
    //         } else {
    //             reject({
    //                 'codigo_erro': '404',
    //                 'mensagem_erro': 'Servidor não encontrado'
    //             });
    //         }
    //     })
    //     .then( (ofertas: Oferta[]) => {
    //         console.log('primeiro then');
    //         return ofertas;
    //     })
    //     .then( (ofertas: Oferta[]) => {
    //         // fazer alguma tratativa
    //         console.log('segundo then');
    //         return new Promise((resolve2, reject2) => {
    //             setTimeout( () => resolve2(ofertas), 3000);
    //         });
    //     })
    //     .then((ofertas: Oferta[]) => {
    //         console.log('terceiro then executado após 3 segundos');
    //         return ofertas;
    //     });
    // }
}
