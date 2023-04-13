import { Component } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ICliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: ICliente[] = [];
  constructor(private clienteService: ClientesService) {}

  ngOnInit() {
    this.clienteService.buscarTodosOsClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    })
  }
}
