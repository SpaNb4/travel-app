import React from 'react';
import ReactPlayer from 'react-player';
import { PropTypes } from 'prop-types';

export default function Video({ videoUrl }) {
	return <ReactPlayer url={videoUrl} controls={true} />;
}
Video.propTypes = {
	videoUrl: PropTypes.string.isRequired,
};
