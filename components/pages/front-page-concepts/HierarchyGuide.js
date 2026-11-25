import React from "react";
import style from "./FrontPageConcepts.module.scss";

const hierarchy = [
    {
        level: 'Fonds',
        description: 'Records created by one person or organization',
        icon: '/icons/HierarchyBox.svg',
    },
    {
        level: 'Subfonds',
        description: 'A major division, used when the records need it',
        icon: '/icons/HierarchyBox.svg',
    },
    {
        level: 'Series',
        description: 'Records grouped by activity, format, or subject',
        icon: '/icons/HierarchyFolder.svg',
    },
    {
        level: 'Container',
        description: 'The box or other housing used to hold materials',
        icon: '/icons/HierarchyFolder.svg',
    },
    {
        level: 'Folder / item',
        description: 'The smallest archival unit',
        icon: '/icons/HierarchyFolder.svg',
    },
];

const HierarchyGuide = ({compact = false}) => (
    <div className={`${style.HierarchyGuide} ${compact ? style.HierarchyCompact : ''}`}>
        {hierarchy.map((item) => (
            <div className={style.HierarchyLevel} key={item.level}>
                <span className={style.HierarchyMarker}>
                    <img src={item.icon} alt="" width={30} height={30} />
                </span>
                <div>
                    <strong>{item.level}</strong>
                    <span>{item.description}</span>
                </div>
            </div>
        ))}
    </div>
);

export default HierarchyGuide;
