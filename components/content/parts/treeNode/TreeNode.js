import React from 'react';
import style from "./TreeNode.module.scss";

const TreeNode = ({open, archivalUnit, onOpenClose, hasChildren=false, isLast=false}) => {
    const key = archivalUnit['key'];

    const openCloseImage = () => {
        if (open) {
            if (isLast) {
                return <img alt="closeIcon" src={'/icons/TreeMinusLast.svg'} style={{display: 'block'}}/>
            } else {
                return <img alt="closeIcon" src={'/icons/TreeMinus.svg'} style={{display: 'block'}}/>
            }

        } else {
            if (isLast) {
                return <img alt="openIcon" src={'/icons/TreePlusLast.svg'} style={{display: 'block'}}/>
            } else {
                return <img alt="openIcon" src={'/icons/TreePlus.svg'} style={{display: 'block'}}/>
            }
        }
    }

    const renderOpenClosePart = () => {
        if (hasChildren) {
            if (isLast) {
                return (
                    <div className={style.OpenerLast} onClick={() => onOpenClose(key)}>
                        {openCloseImage()}
                    </div>
                )
            } else {
                return (
                    <div className={style.Opener} onClick={() => onOpenClose(key)}>
                        {openCloseImage()}
                    </div>
                )
            }
        } else {
            if (isLast) {
                return (
                    <div className={style.LineLast}>
                        <img alt="closeIcon" src={'/icons/TreeNotOpenLast.svg'} style={{display: 'block'}}/>
                    </div>
                )
            } else {
                return (
                    <div className={style.Line}>
                        <img alt="closeIcon" src={'/icons/TreeNotOpen.svg'} style={{display: 'block'}}/>
                    </div>
                )
            }
        }
    }

    const renderIcon = () => {
        switch (archivalUnit['level']) {
            case 'F':
                if (isLast) {
                    return <div className={open ? style.FondsIconOpen : style.FondsIconClosed} />
                } else {
                    return <div className={open ? style.FondsIconOpen : style.FondsIconClosed} />
                }
            case 'SF':
                return <div className={open ? style.SubFondsIconOpen : style.SubFondsIconClosed} />
            case 'S':
                return <div className={style.SeriesIcon} />
        }
    }

    const renderSpacer = () => {
        switch (archivalUnit['level']) {
            case 'F':
                break;
            case 'SF':
                return <div className={style.Spacer} style={{width: '30px'}}/>
            case 'S':
                if (archivalUnit['subfonds']) {
                    return <div className={style.Spacer} style={{width: '60px'}}/>
                } else {
                    return <div className={style.Spacer} style={{width: '30px'}}/>
                }

        }
    }

    return (
        <React.Fragment>
            {renderSpacer()}
            {renderOpenClosePart()}
            {renderIcon()}
            <div className={style.ReferenceCode}>{archivalUnit['reference_code']}</div>
            <div className={style.Title}>{archivalUnit['title']}</div>
        </React.Fragment>
    )
}

export default TreeNode;