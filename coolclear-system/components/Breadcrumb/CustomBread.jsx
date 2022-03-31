/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Card } from 'reactstrap';

const CustomBread = function a() {
  const router = useRouter();
  const [array, setArray] = useState([]);
  const breadCrumbName = (splitedPath) => {
    switch (splitedPath) {
      case 'atividades':
        return 'Atividades';

      case 'consulta':
        return 'Consultas';

      case 'dashboard':
        return 'Dashboards';

      case 'paciente':
        return 'Pacientes';

      case 'adicionar':
        return 'Adicionar';

      case 'responsavel':
        return 'Responsáveis';
      case '[consultaDetalhe]':
        return 'Consulta do paciente';
      case '[pacienteDetalhe]':
        return 'Nome do paciente';
      default:
        return splitedPath;
    }
  };
  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      const pathName = router.pathname.split('/');
      // linkPath.shift();
      // pathName.shift();
      const pathArray = [];

      for (let i = 1; i < pathName.length; i++) {
        const nome = breadCrumbName(pathName[i]);
        const link = `/${linkPath.slice(0, i + 1).join('/')}`;
        pathArray.push({ breadcrumb: nome, href: link });
      }
      setArray(pathArray);
    }
  }, [router]);
  return (
    <div className="d-flex justify-content-end mt-3">
      <Card style={{ paddingLeft: '15px', paddingRight: '15px' }}>
        <Breadcrumb listTag="div" className="mt-3 d-flex">
          <BreadcrumbItem>
            <Link href="/">
              <a style={{ color: '#2E7D32' }} href="/">
                Home
              </a>
            </Link>
          </BreadcrumbItem>
          {array.map((item, i) => (
            <BreadcrumbItem active={i === array.length - 1} key={i}>
              {i === array.length - 1 ? (
                <span>
                  {' '}
                  {item.breadcrumb}
                </span>
              ) : (
                <Link href={item.href}>
                  <a style={{ color: '#2E7D32' }} href={item.href}>
                    {item.breadcrumb}
                  </a>
                </Link>
              )}
            </BreadcrumbItem>
          ))}
          <BreadcrumbItem className="d-block d-sm-none">
            XS
          </BreadcrumbItem>
          <BreadcrumbItem className="d-none d-sm-block d-md-none">
            SM
          </BreadcrumbItem>
          <BreadcrumbItem className="d-none d-md-block d-lg-none">
            MD
          </BreadcrumbItem>
          <BreadcrumbItem className="d-none d-lg-block d-xl-none">
            LG
          </BreadcrumbItem>
          <BreadcrumbItem className="d-none d-xl-block">
            XL
          </BreadcrumbItem>
        </Breadcrumb>
      </Card>

    </div>
  );
};

export default CustomBread;
