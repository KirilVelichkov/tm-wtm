import React from 'react';
import { connect } from 'react-redux';
import { getAllImages, setSelectedAvatar } from '../../actions/imagesAction';
import SelectableImage from './SelectableImage';

class ImagesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedImage: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(getAllImages());
    }

    setSelectedImage = (imageSrc) => {
        this.setState({ selectedImage: imageSrc });
    }

    handleCancelClick = () => {
        this.setState({ selectedImage: '' });
        this.props.dispatch(setSelectedAvatar(''));
    }

    handleOkClick = () => {
        this.props.dispatch(setSelectedAvatar(this.state.selectedImage));
    }

    renderImages = (images) => {
        return images.map(imageUrl => {
            return <SelectableImage
                setSelectedImage={this.setSelectedImage}
                selectedImage={this.state.selectedImage}
                src={imageUrl}
                key={imageUrl} />;
        });
    }

    render() {
        return (
            <div>
                <h1>IMAGES! {this.props.images && this.renderImages(this.props.images)}</h1>
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleOkClick}>OK</button>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        images: state.images.all
    };
}

export default connect(mapStateToProps)(ImagesList);