const basicRoutes = [
  {
    path: '/atividades',
    name: 'Atividades',
    icon: 'fas fa-book-open',
  },
  {
    path: '/consulta',
    name: 'Consultas',
    icon: 'fa fa-calendar-alt',
  },
  {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'fa fa-chart-pie',
  },
  {
    path: '/paciente',
    name: 'Pacientes',
    icon: 'fa fa-assistive-listening-systems',
  },
  {
    path: '/responsavel',
    name: 'Responsáveis',
    icon: 'fa fa-user-shield',
  },
];

const routesAdmin = (tipoPerfil) => {
  if (tipoPerfil) {
    if (tipoPerfil === 'adm') {
      return (basicRoutes);
    }
  }
  return (basicRoutes);
};
export default routesAdmin;
