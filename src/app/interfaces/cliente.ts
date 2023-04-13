export interface ICliente {
  nome: string;
  cpf: number;
  telefone: string;
  endereco: {
        rua: string,
        numero: number,
        cep: number
    },
  rendimentoMensal: number;
}
