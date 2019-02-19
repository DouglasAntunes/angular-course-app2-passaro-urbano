import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {
        // console.log('Oferta recebida no serviço: ', oferta);
        const itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );
        // console.log(itemCarrinho);

        // verificar se o item em questão já não exista no this.itens
        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
        if(itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinhoCompras(): number {
        // tslint:disable-next-line:no-inferrable-types
        let total: number = 0;
        this.itens.map((item: ItemCarrinho) => total += item.valor * item.quantidade);
        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        // console.log(itemCarrinho);
        // incrementar quantidade
        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
        if(itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        }
    }

    public subtrairQuantidade(itemCarrinho: ItemCarrinho): void {
        // console.log(itemCarrinho);
        // decrementar quantidade
        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
        if(itemCarrinhoEncontrado) {
            if(itemCarrinhoEncontrado.quantidade > 1) {
                itemCarrinhoEncontrado.quantidade -= 1;
            } else {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

export { CarrinhoService };
