import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import style from './styles.scss';

const Showcase = () => (
  <section className={style.showcase}>
    <div className={style.container}>
      <Row className={style.row} center="xs sm md lg" middle="xs sm md lg">
        <Col xs={10} sm={10} md={10} lg={7} className={style.showcaseContent}>
          <h1>Welcome to <span className={style.primaryText}>AppTheme</span></h1>
          <p>bachelors project</p>
        </Col>
      </Row>
    </div>
  </section>
);

export default Showcase;