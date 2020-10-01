export interface UsuarioInterface {
    id: number,
    nombre: string,
    pass: string,
    super: boolean,
    salt: string,
    token: string,
    equipo: {
        id: number,
        fecha: string
    }
}