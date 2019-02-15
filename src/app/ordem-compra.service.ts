import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Pedido } from './shared/pedido.model';

import { URL_API } from './app.api';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class OrdemCompraService {

    constructor(
        private http: HttpClient
    ) {  }

    public efetivarCompra(pedido: Pedido): Observable<any> {
        // console.log(pedido);
        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            { headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }) }
        ).pipe(
            map((resposta: HttpResponseBase) => {
                console.log(resposta);
            })
        );
    }
}
