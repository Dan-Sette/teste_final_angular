import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http'
import { ICliente } from 'src/app/interfaces/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  endpoit = 'clientes';
  api = environment.api;
  constructor(private http: HttpClient) { }

  buscarTodosOsClientes(){
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoit}`);
  }
}
