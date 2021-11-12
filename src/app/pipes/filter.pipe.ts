import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3){
      return value;
    }
    const resultReservas = [];
    for(const reserva of value){
      if(reserva.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultReservas.push(reserva);
      }
    }
    return resultReservas;
  }

}
