export interface Ronda {
    id: number;
    fecha_inicial: string;
    fecha_final: string;
    activa: boolean;
}

export interface Receta {
    nombre: string;
    activo: boolean;
    categoria: string;
    ingredientes: string;
}