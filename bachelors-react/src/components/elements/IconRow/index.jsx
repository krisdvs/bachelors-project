
import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';
import Icon from '../Icon';

const IconRow = ({ icons }) => (
  <Row center="xs sm md lg">
    { icons.map(({ heading, text, icon }) => <Icon heading={heading} text={text} icon={icon} />) }
  </Row>
);

IconRow.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

export default IconRow;
