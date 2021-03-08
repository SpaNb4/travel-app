import React from 'react';
import Gallery from 'react-image-gallery';

const images = [
	{
		original: 'https://picsum.photos/id/1018/1000/600/',
		thumbnail: 'https://picsum.photos/id/1018/250/150/',
		description: 'First image',
	},
	{
		original: 'https://picsum.photos/id/1015/1000/600/',
		thumbnail: 'https://picsum.photos/id/1015/250/150/',
		description: 'Second image',
	},
	{
		original: 'https://picsum.photos/id/1019/1000/600/',
		thumbnail: 'https://picsum.photos/id/1019/250/150/',
		description: 'Third image',
	},
];

export default function ImageGallery() {
	return <Gallery items={images} />;
}
