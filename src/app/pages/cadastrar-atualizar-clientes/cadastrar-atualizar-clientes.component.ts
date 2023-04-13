import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})
export class CadastrarAtualizarClientesComponent {
  constructor() {}
  clienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl(0, Validators.required),
    telefone: new FormControl('', Validators.required),
    endereco: new FormGroup({
          rua: new FormControl('', Validators.required),
          numero: new FormControl(0, Validators.required),
          cep: new FormControl(0, Validators.required),
      }),
    rendimentoMensal: new FormControl(0, Validators.required),
  })
  cadastrar() {
    console.log(this.clienteForm)
  }
}
