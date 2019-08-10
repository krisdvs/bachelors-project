import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import style from './styles.scss';

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.container}>
      <Row className={style.row} center="xs sm md lg">
        <Col className={style.col} xs={12} sm={12} md={12} lg={12}>
          <p>Copyright &copy; 2019 | AppTheme</p>
        </Col>
      </Row>
    </div>
  </footer>
);

export default Footer;