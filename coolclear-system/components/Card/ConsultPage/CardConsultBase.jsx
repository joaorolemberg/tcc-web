import React from 'react';
import { Card, Row } from 'reactstrap';

function CardConsultBase({ children }) {
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>
        {children}

      </Row>
    </Card>

  );
}

export default CardConsultBase;
