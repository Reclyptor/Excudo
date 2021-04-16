import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { v4 as uuidv4 } from "uuid";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";
import RectangleToolButton from "@material-ui/icons/CropLandscape";
import CircleToolButton from "@material-ui/icons/RadioButtonUnchecked";

type Tool = "Rectangle" | "Circle";

type SplitButtonProps = {
    addRectangle(): void;
    addCircle(): void;
    deleteObjects(): void;
    zoomIn(): void;
    zoomOut(): void;
};

const CanvasButtons = (props: SplitButtonProps) => {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const [tool, setTool] = React.useState<Tool>("Rectangle");

    const addShape = () => {
        switch (tool) {
            case "Rectangle": props.addRectangle(); break;
            case "Circle": props.addCircle(); break;
            default: props.addRectangle(); break;
        }
    };

    const renderToolButton = () => {
        switch (tool) {
            case "Rectangle": return <RectangleToolButton/>;
            case "Circle": return <CircleToolButton/>;
            default: return <RectangleToolButton/>;
        }
    };

    const selectTool = (tool: Tool) => {
        setTool(tool);
        setOpen(false);
    };

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant="contained" color="primary" ref={anchorRef}>
                    <Button color={"primary"} variant={"contained"}><ArrowLeftIcon/></Button>
                    <Button color={"primary"} variant={"contained"} onClick={addShape}>{renderToolButton()}</Button>
                    <Button color={"primary"} variant={"contained"} onClick={handleToggle} size={"small"}><ArrowDropDownIcon/></Button>
                    <Button color={"primary"} variant={"contained"} onClick={props.deleteObjects}><DeleteIcon/></Button>
                    <Button color={"primary"} variant={"contained"}><ArrowRightIcon/></Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                                <MenuItem key={uuidv4()} selected={tool === "Rectangle"} onClick={() => selectTool("Rectangle")}><RectangleToolButton/></MenuItem>
                                <MenuItem key={uuidv4()} selected={tool === "Circle"} onClick={() => selectTool("Circle")}><CircleToolButton/></MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </Grid>
        </Grid>
    );
};

export default CanvasButtons;