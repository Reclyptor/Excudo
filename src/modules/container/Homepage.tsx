import React, { ChangeEvent, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import AnnotationIcon from "@material-ui/icons/Label";
import AnnotationNode from "../node/AnnotationNode";
import AnnotatorIcon from "@material-ui/icons/Gesture";
import AnnotatorNode from "../node/AnnotatorNode";
import CategoryIcon from "@material-ui/icons/Category";
import CategoryNode from "../node/CategoryNode";
import DatasetIcon from "@material-ui/icons/Description";
import DatasetNode from "../node/DatasetNode";
import Divider from "@material-ui/core/Divider";
import Drawer from "../navigation/Drawer";
import ImageIcon from "@material-ui/icons/Image";
import ImageNode from "../node/ImageNode";
import ImportDatasetIcon from "@material-ui/icons/Publish";
import InfoIcon from "@material-ui/icons/Info";
import InfoNode from "../node/InfoNode";
import LicenseIcon from "@material-ui/icons/Copyright";
import LicenseNode from "../node/LicenseNode";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {State} from "../../redux/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setDataset} from "../../redux/action/Dataset";
import {Dataset} from "../../types/dataset/Dataset";

type Node = "Annotator" | "Datasets" | "Info" | "Licenses" | "Images" | "Categories" | "Annotations"

type HomepageProps = {
    submitDataset(_: Dataset): void;
};

const ConnectedHomepage = (props: HomepageProps) => {
    const [node, setNode] = useState<Node>();
    const inputRef = useRef<HTMLInputElement>(null);

    const selectNode = () => {
        switch (node) {
            case "Annotator": return <AnnotatorNode />;
            case "Datasets": return <DatasetNode />;
            case "Info": return <InfoNode />;
            case "Licenses": return <LicenseNode />;
            case "Images": return <ImageNode />;
            case "Categories": return <CategoryNode />;
            case "Annotations": return <AnnotationNode />;
            default: return <AnnotatorNode />;
        }
    }

    const importDataset = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            const file: File = e.target.files[0];
            file.text()
                .then(JSON.parse)
                .then(props.submitDataset)
                .finally(() => e.target.value = "");
        }
    };

    return (
        <Drawer heading={"Excudo"} content={selectNode()}>
            <List>
                <ListItem button key={uuidv4()} onClick={() => setNode("Annotator")}>
                    <ListItemIcon><AnnotatorIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Annotator"} />
                </ListItem>
                <Divider/>
                <ListItem button key={uuidv4()} onClick={() => inputRef.current?.click()}>
                    <ListItemIcon><ImportDatasetIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Import Dataset"} />
                    <input ref={inputRef} onInput={importDataset} id="input" type="file" accept="application/json" name="files" hidden />
                </ListItem>
                <Divider/>
                <ListItem button key={uuidv4()} onClick={() => setNode("Datasets")}>
                    <ListItemIcon><DatasetIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Datasets"} />
                </ListItem>
                <ListItem button key={uuidv4()} onClick={() => setNode("Info")}>
                    <ListItemIcon><InfoIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Info"} />
                </ListItem>
                <ListItem button key={uuidv4()} onClick={() => setNode("Licenses")}>
                    <ListItemIcon><LicenseIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Licenses"} />
                </ListItem>
                <ListItem button key={uuidv4()} onClick={() => setNode("Images")}>
                    <ListItemIcon><ImageIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Images"} />
                </ListItem>
                <ListItem button key={uuidv4()} onClick={() => setNode("Categories")}>
                    <ListItemIcon><CategoryIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Categories"} />
                </ListItem>
                <ListItem button key={uuidv4()} onClick={() => setNode("Annotations")}>
                    <ListItemIcon><AnnotationIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Annotations"} />
                </ListItem>
            </List>
        </Drawer>
    );
};

const mapStateToProps = (_: State) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        submitDataset: (dataset: Dataset) => dispatch(setDataset(dataset))
    }
};

const Homepage = connect(mapStateToProps, mapDispatchToProps)(ConnectedHomepage);
export default Homepage;