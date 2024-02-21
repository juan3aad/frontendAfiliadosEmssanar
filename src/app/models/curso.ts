import { Afiliado } from './afiliado';

import { Generic } from './generic';

export class Ips implements Generic{
    id: number;
    nit: string;
    nombre: string;
    createAt: string;
    afiliados: Afiliado[] = [];
    
}
