import {makeStyles} from "tss-react/mui";
import {AnimatePresence, motion} from "framer-motion";
import Overlay from "./Overlay";
import {Portal} from "@mui/base";
import {ReactNode, useEffect} from "react";
import {useMediaQuery} from "@mui/material";
import theme from "../superstructure/theme";
import MenuButton from "./MenuButton";
import useIsMacOs from "../hooks/useIsMacOs";

const useStyles = makeStyles<TssThemeProps>()(
    (theme, {offsetTop}) => ({
            sidePopover: {
                display: 'grid',
                zIndex: theme.zIndex.appBar,
                marginTop: offsetTop - 1,
                position: 'fixed',
                top: 0,
                right: 0,
                minHeight: '-webkit-fill-available',
                height: '-webkit-fill-available',
                overflowY: 'scroll',
                backgroundColor: theme.palette.secondary.main,
            },
            menuButtonWrapper: {
                ...theme.flexbox.centered,
                justifyContent: 'flex-end',
                height: theme.navbarHeight.mobile,
                paddingRight: 16,
                [theme.mediaQueries.up.md]: {
                    // compensate scrollbar width to avoid layout shift
                    paddingRight: 33,
                    height: theme.navbarHeight.desktop * 2,
                }
            }
        }
    )
);

const SidePopover = ({isOpen, onClose, offsetTop, className, children}: Props) => {
    const isMobile = useMediaQuery(theme.mediaQueries.down.md);
    const isMacos = useIsMacOs();


    useEffect(() => {
        if (isOpen && !isMobile) {
            document.body.style.paddingRight = isMacos ? `${theme.scrollbarWidth.macOs}px` : `${theme.scrollbarWidth.windows}px`;
        }
        if (!isOpen && !isMobile) {
            setTimeout(() => {
                document.body.style.paddingRight = "unset"
            }, 150)
        }
    }, [isOpen, isMobile, isMacos])

    const {cx, classes} = useStyles({offsetTop});
    return (
        <AnimatePresence>
            {isOpen &&
                <Portal>
                    <Overlay offsetTop={offsetTop} callback={onClose}>
                        <motion.div
                            initial={{translateX: '100%'}}
                            animate={{translateX: 0}}
                            exit={{translateX: '100%'}}
                            transition={{duration: 0.3}}
                            className={cx(classes.sidePopover, className)}
                        >
                            {!offsetTop &&
                                <div className={classes.menuButtonWrapper}>
                                    <MenuButton
                                        isOpen={isOpen}
                                        onClick={onClose}
                                    />
                                </div>
                            }
                            {children}
                        </motion.div>
                    </Overlay>
                </Portal>
            }
        </AnimatePresence>
    )

}

export default SidePopover

interface Props {
    children: ReactNode;
    offsetTop?: number;
    isOpen: boolean,
    onClose: () => void,
    className?: string
    lockBodyScroll?: boolean
}