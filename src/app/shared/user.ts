import { Perfil } from './perfil';
import { Menu } from './menu';

export interface User {
    Rut: number;
    Dv: string;
    PrimerNombre: string;
    Nombres: string;
    Apellidos: string;
    Perfil: Perfil;
    Menus: Menu[];
}
