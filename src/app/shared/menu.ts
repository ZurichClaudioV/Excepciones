export interface Menu {
    Id: number;
    Nombre: string;
    Orden: number;
    Url: string;
    SubMenus: Menu[];
}
