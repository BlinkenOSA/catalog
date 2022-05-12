import React from 'react';
import style from "./TreeNode.module.scss";

const TreeNode = ({open, archivalUnit, onOpenClose, classType, hasChildren=false}) => {
    const key = archivalUnit['key'];

    const openCloseImage = () => {
        if (open) {
            if (classType.endsWith('Last')) {
                return <img alt="closeIcon" src={'/icons/TreeMinusLast.svg'} style={{display: 'block'}}/>
            } else {
                return <img alt="closeIcon" src={'/icons/TreeMinus.svg'} style={{display: 'block'}}/>
            }
        } else {
            if (classType.endsWith('Last')) {
                return <img alt="openIcon" src={'/icons/TreePlusLast.svg'} style={{display: 'block'}}/>
            } else {
                return <img alt="openIcon" src={'/icons/TreePlus.svg'} style={{display: 'block'}}/>
            }
        }
    }

    const renderOpenClosePart = () => {
        if (hasChildren) {
            return (
                <div className={style.Opener} onClick={() => onOpenClose(key)}>
                    {openCloseImage()}
                </div>
            )
        } else {
            if (classType.endsWith('Last')) {
                return (
                    <div className={style.Line}>
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
        if (archivalUnit['level'] === 'S') {
            return <div className={style.SeriesIcon} />
        } else {
            return <div className={open ? style.IconOpen : style.IconClosed} />
        }
    }

    return (
        <div key={archivalUnit['key']} className={style[classType]}>
            <div className={style.Spacer} />
            {renderOpenClosePart()}
            {renderIcon()}
            <div className={style.ReferenceCode}>{archivalUnit['reference_code']}</div>
            <div className={style.Title}>{archivalUnit['title']}</div>
        </div>
    )
}

export default TreeNode;