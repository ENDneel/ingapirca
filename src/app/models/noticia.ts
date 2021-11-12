export class Noticia {

    constructor(_id='', titulo='',cuerpo='', link='', fecha=new Date()){
        this._id = _id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.link = link;
        this.fecha = fecha;
    }
    _id!: string;
    titulo!: string;
    cuerpo!: string;
    link!:string;
    fecha!:Date;
}
