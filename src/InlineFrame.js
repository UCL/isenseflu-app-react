/*
 * i-sense flu app: Frontend module of the i-sense flu application
 *
 * Copyright (c) 2019, UCL <https://www.ucl.ac.uk/>
 *
 * This file is part of i-sense flu app
 *
 * i-sense flu app is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * i-sense flu app is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with i-sense flu app.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

const InlineFrameComponent = (props) => {
  const {
    height,
    width,
    src,
    title,
  } = props;

  return (
    <div>
      <iframe
        title={title}
        src={src}
        height={height}
        width={width}
      />
    </div>
  );
};

InlineFrameComponent.propTypes = {
  /** @type {string} Height of the frame in pixels, with px suffix */
  height: PropTypes.string.isRequired,

  /** @type {string} Width of the frame in pixels, with px suffix */
  width: PropTypes.string.isRequired,

  /** @type {string} The URL of the page to display in the iframe */
  src: PropTypes.string.isRequired,

  /** @type {string} The title for the iframe */
  title: PropTypes.string.isRequired,
};

const InlineFrame = styled(InlineFrameComponent)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .iframe': {
    border: 'none',
  },
}));

export { InlineFrame as default };
