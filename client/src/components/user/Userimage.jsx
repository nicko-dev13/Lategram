import React from 'react';

function Userimage(props) {
	const newStyle = {
		width: props.width,
		height: props.width
	};
	return (
		<div className="user-image" style={newStyle}>
			<img src={require('./chacmage.png')} alt="userimage" />
		</div>
	);
}

export default Userimage;
