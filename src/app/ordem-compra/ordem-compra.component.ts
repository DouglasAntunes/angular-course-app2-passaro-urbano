import { Component, OnInit } from '@angular/core';

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

  public pedido: Pedido = new Pedido('', '', '', '');
  public idPedidoCompra: number;

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  // atributos de controle de validação dos campos
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  // atributos para estados primitivos dos campos (pristine state)
  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;

  // controle botão confirmar compra
  public formEstado: string = 'disabled';

  constructor(
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit() {
  }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco;
    // console.log(this.endereco);

    this.enderecoEstadoPrimitivo = false;

    // se a string for maior q 3
    if(this.endereco.length > 3) {
      this.enderecoValido = true;
    } else {
      this.enderecoValido = false;
    }
    this.habilitaForm();
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero;
    // console.log(this.numero);

    this.numeroEstadoPrimitivo = false;

    if(numero.length > 0) {
      this.numeroValido = true;
    } else {
      this.numeroValido = false;
    }
    this.habilitaForm();
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento;
    // console.log(this.complemento);

    this.complementoEstadoPrimitivo = false;

    if(complemento.length > 0) {
      this.complementoValido = true;
    } else {
      this.complementoValido = false;
    }
    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento;
    // console.log(this.formaPagamento);

    this.formaPagamentoEstadoPrimitivo = false;

    if(formaPagamento.length > 0) {
      this.formaPagamentoValido = true;
    } else {
      this.formaPagamentoValido = false;
    }
    this.habilitaForm();
  }

  public habilitaForm(): void {
    if(this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValido === true) {
      this.formEstado = '';
    } else {
      this.formEstado = 'disabled';
    }
  }

  public confirmarCompra(): void {
    this.pedido.endereco = this.endereco;
    this.pedido.numero = this.numero;
    this.pedido.complemento = this.complemento;
    this.pedido.formaPagamento = this.formaPagamento;

    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe(
        (resposta: any) => {
          // console.log(resposta);
          this.idPedidoCompra = resposta;
        }
      );
  }

}
