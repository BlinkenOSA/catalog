import React, {useState} from 'react';
import style from "./TreeNode.module.scss";

/**
 * @param {Object} params
 * @param {boolean} params.open TreeNode should be open or not
 * @param {boolean} params.selected TreeNode is selected or not
 * @param {Object} params.data Data object
 * @param {function} params.onOpenClose Function to be called when open/close action is clicked
 * @param {function} params.onTreeNodeClick Function to be called when TreeNode is clicked
 * @param {string} params.classType The type of class should be used to display
 * @param {boolean} params.hasChildren Node has children?
 */
const TreeNode = ({open, selected=false, data, onOpenClose, onTreeNodeClick, classType, hasChildren=false}) => {
    const key = data['key'];

    /**
     * Selects the proper image file for open/close action.
     */
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

    /**
     * Renders the open/close part.
     */
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

    /**
     * Renders the icon for the Archival Unit.
     */
    const renderIcon = () => {
        switch (data['level']) {
            case 'F':
                return <div className={open ? style.IconOpen : style.IconClosed} />
            case 'SF':
                return <div className={open ? style.IconOpen : style.IconClosed} />
            case 'S':
                return <div className={open ? style.SeriesIconOpen : style.SeriesIcon} />
            case 'container':
                return <div className={style.SeriesIconOpen} />
            case 'folder':
                return <div className={style.FolderIcon} />
        }
    }

    const renderNode = () => {
        switch (data['level']) {
            case 'container':
                return (
                    <div className={style.Title}>
                        <span className={style.ReferenceCode}>{data['reference_code']}</span>
                        <span className={style.ArchivalUnitTitle}>{data['carrier_type']} #{data['container_no']}</span>
                    </div>
                )
            default:
                return (
                    <div className={style.Title} onClick={selected ?  undefined : () => onTreeNodeClick(data['catalog_id'])}>
                        <span className={style.ReferenceCode}>{data['reference_code']}</span>
                        <span className={style.ArchivalUnitTitle}>{data['title']}</span>
                    </div>
                )
        }
    }

    return (
        <React.Fragment>
            <div key={data['key']} className={selected ? `${style[classType]} ${style.Selected}` : style[classType]}>
                <div className={style.Spacer} />
                {renderOpenClosePart()}
                {renderIcon()}
                {renderNode()}
            </div>
        </React.Fragment>
    )
}

export default TreeNode;
