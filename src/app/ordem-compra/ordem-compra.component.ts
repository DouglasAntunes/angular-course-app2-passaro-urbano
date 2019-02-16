import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OrdemCompraService } from '../ordem-compra.service';

import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [
    OrdemCompraService
  ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm;
  public idPedidoCompra: number;
  constructor(
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit() {
  }

  public confirmarCompra(): void {
    // console.log(this.formulario.value);
    const pedido: Pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento
    );
    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe(
        (idPedido: number) => {
          // console.log(idPedido);
          this.idPedidoCompra = idPedido;
        }
      );
  }

}
