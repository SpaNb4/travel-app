import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { PropTypes } from 'prop-types';

export default function Video({ videoUrl }) {
	return <ReactPlayer url={videoUrl} controls={true} width="768px" />;
}
Video.propTypes = {
	videoUrl: PropTypes.string.isRequired,
};
