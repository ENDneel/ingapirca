export class ReservaAdministrador {
    
    constructor(dia=new Date(), horario="", cantidad=0, ocupados = 0){
        this.horario = horario;
        this.dia = dia;
        this.cantidad=cantidad;
        this.ocupados = ocupados;
    }
    
    _id!: string;
    horario!: string;
    dia!: Date;
    cantidad!: number;
    ocupados!: number;
}
