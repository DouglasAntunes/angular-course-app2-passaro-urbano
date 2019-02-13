import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

    transform(texto: string, truncarEm: number, iniciaEm: number): string {
        if(texto.length > truncarEm) {
            return texto.substr(iniciaEm, truncarEm).concat('... ');
        }
        return texto;
    }

}
