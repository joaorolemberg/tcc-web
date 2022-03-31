// eslint-disable-next-line import/prefer-default-export
export const mocks = {
  responsavelList: [
    {
      id: 1,
      nome: 'Responsavel X',
      email: 'resp@savel.com',
    },
    {
      id: 2,
      nome: 'Responsavel X',
      email: 'resp@savel.com',
    },
    {
      id: 3,
      nome: 'Responsavel X',
      email: 'resp@savel.com',
    },
    {
      id: 4,
      nome: 'Responsavel X',
      email: 'resp@savel.com',
    },
    {
      id: 5,
      nome: 'Responsavel X',
      email: 'resp@savel.com',
    },
    {
      id: 6,
      nome: 'Responsavel X',
      email: 'resp@savel.com',
    },
  ],
  consultaList: [
    {
      id: 1,
      paciente: { nome: 'Joao', sexo: 'M' },
      responsavel: { nome: 'Pedro' },
      tipo: 1,
      status: 1,
      data: '2022-01-10T00:00',
    },
    {
      id: 2,
      paciente: { nome: 'Pedro', sexo: 'M' },
      responsavel: { nome: 'Joao' },
      tipo: 2,
      status: 2,
      data: '2022-10-10T14:00',
    },
    {
      id: 3,
      paciente: { nome: 'Maria', sexo: 'F' },
      responsavel: { nome: 'Joao' },
      tipo: 3,
      status: 3,
      data: '2023-12-21T12:00',
    },
  ],
  pacientData: {
    nome: 'João',
    prontuario: '1255430',
    dataNascimento: '1999-01-08',
    sexo: 'M',
    idade: 23,
    responsavel: { nome: 'Teste' },
  },
  pacientList: [
    {
      nome: 'João',
      prontuario: '1255430',
      dataNascimento: '1999-01-08T00:00',
      sexo: 'M',
      idade: 23,
      id: 1,
      responsavel: { nome: 'Teste' },
    },
    {
      nome: 'Pedro',
      prontuario: '646845654',
      dataNascimento: '1999-01-08T00:00',
      sexo: 'M',
      idade: 23,
      id: 2,
      responsavel: { nome: 'Teste 2' },
    },
    {
      nome: 'Maria',
      prontuario: '77854659',
      dataNascimento: '1999-01-08T00:00',
      sexo: 'F',
      idade: 10,
      id: 3,
      responsavel: { nome: 'Teste 3' },
    },
  ],
};
