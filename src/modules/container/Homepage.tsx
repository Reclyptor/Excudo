import React, { useState } from 'react';
import Drawer from "../navigation/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AnnotatorIcon from "@material-ui/icons/Gesture";
import DatasetIcon from "@material-ui/icons/Description";
import InfoIcon from "@material-ui/icons/Info";
import LicenseIcon from "@material-ui/icons/Copyright";
import ImageIcon from "@material-ui/icons/Image";
import CategoryIcon from "@material-ui/icons/Category";
import AnnotationIcon from "@material-ui/icons/Label";
import ListItemText from "@material-ui/core/ListItemText";
import { v4 as uuidv4 } from "uuid";
import Divider from "@material-ui/core/Divider";
import AnnotatorNode from "../node/AnnotatorNode";
import DatasetNode from "../node/DatasetNode";
import InfoNode from "../node/InfoNode";
import LicenseNode from "../node/LicenseNode";
import ImageNode from "../node/ImageNode";
import CategoryNode from "../node/CategoryNode";
import AnnotationNode from "../node/AnnotationNode";

type Node = "Annotator" | "Datasets" | "Info" | "Licenses" | "Images" | "Categories" | "Annotations"

type HomepageProps = {

};

const Homepage = (_: HomepageProps) => {
    const [node, setNode] = useState<Node>();

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

    return (
        <Drawer heading={"Excudo"} content={selectNode()}>
            <List>
                <ListItem button key={uuidv4()} onClick={() => setNode("Annotator")}>
                    <ListItemIcon><AnnotatorIcon color={"primary"} /></ListItemIcon>
                    <ListItemText primary={"Annotator"} />
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

export default Homepage;