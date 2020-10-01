export interface Ronda {
    id: number;
    fecha_inicio: string;
    fecha_final: string;
    hora_de_generacion: string;
    activa: boolean;
}

export interface Receta {
    nombre: string;
    activo: boolean;
    categoria: string;
    ingredientes: string;
}