import React from 'react';
import Canvas from "../component/Canvas";
import { State } from "../../redux/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Image } from "../../types/dataset/Image";
import { Annotation } from "../../types/dataset/Annotation";
import { addAnnotation, updateAnnotation } from "../../redux/action/Annotation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        background: 'black'
    }
});

type AnnotatorNodeProps = {
    images: Image[];
    annotations: Annotation[];
    submitAddAnnotation(_: Annotation): void;
    submitUpdateAnnotation(_: Annotation): void;
};

const ConnectedAnnotatorNode = (props: AnnotatorNodeProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Canvas images={props.images} annotations={props.annotations} addAnnotation={props.submitAddAnnotation} updateAnnotation={props.submitUpdateAnnotation}/>
        </div>
    );
};

const mapStateToProps = (state: State) => {
    return {
        images: state.dataset?.images || [],
        annotations: state.dataset?.annotations || []
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        submitAddAnnotation: (annotation: Annotation) => dispatch(addAnnotation(annotation)),
        submitUpdateAnnotation: (annotation: Annotation) => dispatch(updateAnnotation(annotation))
    };
};

const AnnotatorNode = connect(mapStateToProps, mapDispatchToProps)(ConnectedAnnotatorNode);
export default AnnotatorNode;