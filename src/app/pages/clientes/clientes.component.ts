import { Component } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ICliente } from 'src/app/interfaces/cliente';
import Swal from 'sweetalert2';

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

  deletarCliente(cpf: string) {
    this.clienteService.deletar(cpf).subscribe(result => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente deletado com sucesso!!!',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        location.reload();
      })
    }, error => {
      console.error(error);
    });
  }
}
