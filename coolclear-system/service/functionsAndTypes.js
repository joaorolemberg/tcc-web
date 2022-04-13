/* eslint-disable no-var */
/* eslint-disable no-redeclare */
/* eslint-disable camelcase */
export const tiposConsulta = ['', 'Primeira', 'Retorno'];
export const tiposStatus = { Agendada: 'warning', Concluida: 'success', Cancelada: 'danger' };
export function idade(dataNascimento) {
  const nascimento = new Date(dataNascimento);

  const d = new Date();
  const ano_atual = d.getFullYear();
  const mes_atual = d.getMonth() + 1;
  const dia_atual = d.getDate();

  const ano_aniversario = +nascimento.getFullYear();
  const mes_aniversario = +nascimento.getMonth();
  const dia_aniversario = +nascimento.getDay();

  let quantos_anos = ano_atual - ano_aniversario;

  if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
    // eslint-disable-next-line no-plusplus
    quantos_anos--;
  }

  return quantos_anos < 0 ? 0 : quantos_anos;
}
