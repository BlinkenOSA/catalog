import React from "react";
import style from "./FrontPageConcepts.module.scss";

const hierarchy = [
    {
        level: 'Fonds',
        description: 'Records created by one person or organization',
        marker: '01',
    },
    {
        level: 'Subfonds',
        description: 'A major division, used when the records need it',
        marker: '02',
    },
    {
        level: 'Series',
        description: 'Records grouped by activity, format, or subject',
        marker: '03',
    },
    {
        level: 'Container',
        description: 'The box or other housing used to hold materials',
        marker: '04',
    },
    {
        level: 'Folder / item',
        description: 'The smallest described unit, such as a folder, photograph, film, or file',
        marker: '05',
    },
];

const HierarchyGuide = ({compact = false}) => (
    <div className={`${style.HierarchyGuide} ${compact ? style.HierarchyCompact : ''}`}>
        {hierarchy.map((item, index) => (
            <div className={style.HierarchyLevel} key={item.level}>
                <span className={style.HierarchyMarker}>{item.marker}</span>
                <div>
                    <strong>{item.level}</strong>
                    <span>{item.description}</span>
                </div>
                {index < hierarchy.length - 1 && <span className={style.HierarchyLine} aria-hidden="true" />}
            </div>
        ))}
    </div>
);

export default HierarchyGuide;
