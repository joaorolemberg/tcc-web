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
const routeAdmin = [
  {
    path: '/fonoaudiologo',
    name: 'Fonoaudiolólogos',
    icon: 'fas fa-doctor',
  },
];

const routesAdmin = (isAdmin) => {
  if (isAdmin) {
    return (routeAdmin);
  }
  return (basicRoutes);
};
export default routesAdmin;
