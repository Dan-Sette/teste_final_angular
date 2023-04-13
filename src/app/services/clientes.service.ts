import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http'
import { ICliente } from 'src/app/interfaces/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  endpoint = 'clientes';
  api = environment.api;
  constructor(private http: HttpClient) { }

  buscarTodosOsClientes(){
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  cadastrarCliente(cliente: ICliente) {
    return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }

  buscarClientePorCPF(cpf: string){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  editarCliente(cliente: ICliente, cpf: string){
    return this.http.put(`${this.api}/${this.endpoint}/${cpf}`, cliente);
  }

  deletar(cpf: string) {
    return this.http.delete(`${this.api}/${this.endpoint}/${cpf}`);
  }
}
