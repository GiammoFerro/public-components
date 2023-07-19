import React from "react";
import {motion, Transition} from "framer-motion";
import {makeStyles} from "tss-react/mui";
import {useTheme} from "@mui/material";

const useStyles = makeStyles()(
    () => ({
            menuButton: {
                cursor: "pointer",
            }
        }
    )
);

const MenuButton = ({
                        isOpen = false,
                        width = 18,
                        height = 12,
                        strokeWidth = 2,
                        color = "primary",
                        transition = {type: "spring", stiffness: 260, damping: 20},
                        lineProps = {strokeLinecap: "round"},
                        className,
                        ...props
                    }: Props) => {
    const theme = useTheme();

    const variant = isOpen ? "opened" : "closed";
    const top = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: 45,
            translateY: 2
        }
    };
    const center = {
        closed: {
            opacity: 1
        },
        opened: {
            opacity: 0
        }
    };
    const bottom = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: -45,
            translateY: -2
        }
    };
    lineProps = {
        stroke: theme.palette[color].main,
        strokeWidth: strokeWidth as number,
        vectorEffect: "non-scaling-stroke",
        initial: "closed",
        animate: variant,
        transition,
        ...lineProps
    };
    const unitHeight = 4;
    const unitWidth = (unitHeight * (width as number)) / (height as number);

    const {cx, classes} = useStyles();
    return (
        <motion.svg
            viewBox={`0 0 ${unitWidth} ${unitHeight}`}
            overflow="visible"
            preserveAspectRatio="none"
            width={width}
            height={height}
            className={cx(classes.menuButton, className)}
            {...props}
        >
            <motion.line
                x1="0"
                x2={unitWidth}
                y1="0"
                y2="0"
                variants={top}
                {...lineProps}
            />
            <motion.line
                x1="0"
                x2={unitWidth}
                y1="2"
                y2="2"
                variants={center}
                {...lineProps}
            />
            <motion.line
                x1="0"
                x2={unitWidth}
                y1="4"
                y2="4"
                variants={bottom}
                {...lineProps}
            />
        </motion.svg>
    );
};

export default MenuButton;

interface Props {
    isOpen?: boolean;
    color?: string;
    strokeWidth?: string | number;
    transition?: Transition | null;
    lineProps?: AnyObject;
    onClick?: () => void;
    width?: string | number;
    height?: string | number;
    className?: string;
}
