import React from 'react';
import Canvas from "../component/Canvas";
import { State } from "../../redux/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Image } from "../../types/dataset/Image";

type AnnotatorNodeProps = {
    images: Image[];
};

const ConnectedAnnotatorNode = (props: AnnotatorNodeProps) => {
    return <Canvas images={props.images} />;
};

const mapStateToProps = (state: State) => {
    return {
        images: state.dataset?.images || []
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

const AnnotatorNode = connect(mapStateToProps, mapDispatchToProps)(ConnectedAnnotatorNode);
export default AnnotatorNode;