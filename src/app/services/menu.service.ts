import { Injectable } from '@angular/core';

export interface IMenu {
  title: string;
  url: string;
  icono: string;
  subMenu?: IMenu[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  listMenu: IMenu[] = [
    {
      title: 'Miembros', url: '/', icono: '/assets/icons/miembros.png',
      subMenu: [
        {title: 'Nuevo Miembro', url: '/registromiembros', icono: '/assets/icons/registromiembro.png'},
        {title: 'Lista de Miembros', url: '/miembros', icono: '/assets/icons/miembros.png'}
      ]
    },
    {
      title: 'Proyectos', url: '/', icono: '/assets/icons/proyectos.png',
      subMenu: [
        {title: 'Lista de Proyectos', url: '/proyectos', icono: '/assets/icons/proyectos.png'},
        {title: 'Nuevo Proyecto', url: '/registroproyectos', icono: '/assets/icons/proyectos.png'},
        {title: 'Nueva Tarea', url: '/registrotareas', icono: '/assets/icons/registroproyectos.png'},
        {title: 'Tareas', url: '/tareas', icono: '/assets/icons/registroproyectos.png'}
      ]
    },
    {
      title: 'Clubs', url: '/', icono: '/assets/icons/reunion.png',
      subMenu: [
        {title: 'Clubs', url: '/clubs-list', icono: '/assets/icons/reunion.png'},
        {title: 'Miembros', url: '/clubs-miembros', icono: '/assets/icons/reunion.png'},
        {title: 'Agregar Club', url: '/clubs', icono: '/assets/icons/agregar-club.png'},
      ]
    },
    {
      title: 'Eventos', url: '/', icono: '/assets/icons/evento.png',
      subMenu: [
        {title: 'Programación', url: '/eventos-generales', icono: '/assets/icons/evento.png'},
        {title: 'Eventos', url: '/eventos', icono: '/assets/icons/evento.png'},
        {title: 'Agregar Eventos', url: '/events', icono: '/assets/icons/agregar-evento.png'},
        {title: 'Competencias', url: '/competitions-list', icono: '/assets/icons/concurso.png'},
        {title: 'Agregar Competiciones', url: '/competitions', icono: '/assets/icons/agregar-concurso.png'},
      ]    
    },
    {
      title: 'Charlas', url: '/', icono: '/assets/icons/charla.png',
      subMenu: [
        {title: 'Temas Ponencias', url: '/talkspeaker-list', icono: '/assets/icons/charla.png'},
        {title: 'Charlas', url: '/talks-list', icono: '/assets/icons/charla.png'},
        {title: 'Agregar Charlas', url: '/talks', icono: '/assets/icons/agregar-charla.png'},
        {title: 'Ponentes', url: '/speakers-list', icono: '/assets/icons/ponente.png'},
        {title: 'Agregar Ponentes', url: '/speakers', icono: '/assets/icons/agregar-ponente.png'}
      ]
    },
    {
      title: 'Participantes', url: '/', icono: '/assets/icons/Usuario.png',
      subMenu: [
        {title: 'Lista de Participantes', url: '/participants-list', icono: '/assets/icons/lista-cliente.png'},
        {title: 'Integrantes', url: '/competition-list', icono: '/assets/icons/diversidad.png'},
        {title: 'Concursos', url: '/group-competition-list', icono: '/assets/icons/concurso1.png'},
        {title: 'Grupos', url: '/group-list', icono: '/assets/icons/grupo.png'},
        {title: 'Agregar Grupo', url: '/group', icono: '/assets/icons/agregar-grupo.png'},
        { title: 'Universidades', url: '/university-list', icono: '/assets/icons/universidad.png' },
        {title: 'Agregar Universidades', url: '/university', icono: '/assets/icons/agregar-universidad.png'}
      ]
    },{
      title: 'Transacciones', url: '/competitions-list', icono: '/assets/icons/transaccion.png',
      subMenu: [
        {title: 'Transacciones', url: '/Transacciones', icono: '/assets/icons/transaccion.png'},
        {title: 'Historial', url: '/Transacciones-history', icono: '/assets/icons/transaccion-history.png'}
      ]
    }
  ];

  constructor() { }

  getMenu(): IMenu[] {
    return [...this.listMenu];
  }
}
