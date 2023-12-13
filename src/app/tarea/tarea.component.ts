// tarea.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Tarea } from '../models/tarea-model'; 
import { Usuario } from '../models/usuario-model'; 

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  @Input() tarea!: Tarea;

  constructor() { }

  ngOnInit(): void {
  }

  tareaVencida(): boolean {
    if (this.tarea.fechaFin) {
      const fechaVencimiento = new Date(this.tarea.fechaFin);
      const hoy = new Date();
      return fechaVencimiento < hoy;
    }
    return false;
  }

proximVenciment(): boolean {
  if (this.tarea.fechaFin) {
    const fechaVencimiento = new Date(this.tarea.fechaFin);
    const hoy = new Date();
    const diferenciaDias = Math.floor((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
    
    if (diferenciaDias < 0 && this.tarea.lista !== 'Finalizadas') {
      // Fecha ha pasado y no está en la lista de Finalizadas (Rojo)
      return false;
    } else if (diferenciaDias < 0 && this.tarea.lista === 'Finalizadas') {
      // Fecha ha pasado y está en la lista de Finalizadas (Verde)
      return true;
    } else if (diferenciaDias <= 1) {
      // Falta 1 día o menos para vencer (Naranja)
      return true;
    } else {
      // Resto de los casos (Gris)
      return false;
    }
  }
  return false;
}

  tareaFinalizada(): boolean {
    return this.tarea.lista === 'Finalizadas';
  }
}
