import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})
export class CadastrarAtualizarClientesComponent {

  clienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    endereco: new FormGroup({
      rua: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      cep: new FormControl('', Validators.required),
    }),
    rendimentoMensal: new FormControl(0, Validators.required),
  })

  constructor(private clientesService: ClientesService, private route: ActivatedRoute) {}
  clienteCPF: string = '';

  ngOnInit( ){
    this.clienteCPF = String(this.route.snapshot.paramMap.get('cpf'));
    if(this.isStringOnlyNumbers(this.clienteCPF)){
      this.clientesService.buscarClientePorCPF(this.clienteCPF).subscribe((cliente: ICliente) => {
        this.clienteForm.setValue({
          nome: cliente.nome,
          cpf: cliente.cpf,
          telefone: cliente.telefone,
          endereco: {
            rua: cliente.endereco.rua,
            numero: cliente.endereco.numero,
            cep: cliente.endereco.cep,
          },
          rendimentoMensal: cliente.rendimentoMensal,
        });
      })
    } else if (!this.isStringOnlyNumbers(this.clienteCPF) && this.clienteCPF != 'null') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CPF não encontrado',
      })
    }
  }

  isStringOnlyNumbers(str: string): boolean {
    const numbersArray = str.split('');
    for (let i = 0; i < numbersArray.length; i++) {
      if (isNaN(numbersArray[i] as any)) {
        return false;
      }
    }
    return true;
  }

  cadastrarEditar() {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    if (this.clienteCPF == 'null') {
      this.clientesService.cadastrarCliente(cliente).subscribe(result => {
        Swal.fire(
          'Parabéns!!!',
          'Cliente cadastrado com sucesso',
          'success'
        )
      }, error => {
        console.error(error);
      })
    } else {
      this.clientesService.editarCliente(cliente, this.clienteCPF).subscribe(result => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente atualizado com sucesso!!!',
          showConfirmButton: false,
          timer: 1500
        })
      }, error => {
        console.error(error);
      });
    }
  }
}
