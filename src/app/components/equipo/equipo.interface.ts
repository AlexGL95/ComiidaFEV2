export interface EquipoInterface {
    "nombre": string,
    "integrantes_nombres": string[],
    "recetas_nombres": string[]
}

export interface UpdateDateDto {
    id: number,
    fechaNueva: string
}
