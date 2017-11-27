import React from 'react';
import { IMAGES_URL } from '../Util/Constants';

class SelectableImage extends React.Component {

    handleClick = () => {
        this.props.setSelectedImage(this.props.src);
    }

    render() {
        const image = this.props.src === this.props.selectedImage ?
            <img src={IMAGES_URL + this.props.src} style={{ width: 150, border:"5px solid green" }} onClick={this.setSelectedImage} alt="" />
            :
            <img src={IMAGES_URL + this.props.src} style={{ width: 150 }} onClick={this.handleClick} alt="" />;
       
        return image;
    }
}



export default SelectableImage;