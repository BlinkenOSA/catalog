import React from 'react';
import style from "./CollectionPage.module.scss";
import useSWR from 'swr'
import {fetcher} from "../../utils/fetcher";
import Loader from "./parts/loader/Loader";
import {useState} from "react";
import TreeNode from "./parts/treeNode/TreeNode";
import ArchivalUnitDrawer from "./parts/archivalUnitDrawer/ArchivalUnitDrawer";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const CollectionPage = () => {
    const [openNodes, setOpenNodes] = useState([]);
    const { data, error } = useSWR('archival_units', fetcher);

    const [selectedArchivalUnit, setSelectedArchivalUnit] = useState(0)

    const onSelectArchivalUnit = (key) => {
        setSelectedArchivalUnit(selectedArchivalUnit === key ? 0 : key)
    }

    /**
     * Handling the open/close event.
     *
     * @param {String} key The key of the element should be opened/closed
     */
    const onOpenClose = (key) => {
        if (openNodes.includes(key)) {
            const nodes = [...openNodes];
            nodes.splice(openNodes.indexOf(key), 1);
            setOpenNodes(nodes);
        } else {
            setOpenNodes(oldArray => [...oldArray, key]);
        }
    }

    /**
     *
     * @param {Object} archivalUnit Object of the Archival Unit data
     * @param {boolean} fondsLast Is Fonds the last one in the hierarchy?
     * @param {boolean} subfondsLast Is Subfonds the last one in the hierarchy?
     * @param {boolean} seriesLast Is Series the last one in the hierarchy?
     */
    const getLeaves = (archivalUnit, fondsLast=false, subfondsLast=false, seriesLast=false) => {
        /**
         * Detects if the actual node should be visible in the tree.
         *
         * @returns {boolean} Node is visible or not?
         */
        const detectVisible = () => {
            let fondsKey, subfondsKey;
            const key = archivalUnit['key'];
            switch (archivalUnit['level']) {
                case 'F':
                    return true;
                case 'SF':
                    fondsKey = key.slice(0, key.indexOf('-'))
                    return openNodes.includes(fondsKey);
                case 'S':
                    if (archivalUnit['subfonds']) {
                        fondsKey = key.slice(0, key.indexOf('-'))
                        subfondsKey = key.slice(0, key.lastIndexOf('-'))
                        return openNodes.includes(fondsKey) && openNodes.includes(subfondsKey);
                    } else {
                        fondsKey = key.slice(0, key.indexOf('-'))
                        return openNodes.includes(fondsKey);
                    }
            }
        }

        /**
         * Selects the className according to the nodes place in the hierarchy.
         * A node can be last in the list, a subfonds can exists or not, etc.
         *
         * @returns {string} Name of the class
         */
        const getClassType = () => {
            switch (archivalUnit['level']) {
                case 'F':
                    return fondsLast ? 'FondsLast' : 'Fonds'
                case 'SF':
                    if (fondsLast) {
                        return subfondsLast ? 'FondsLastSubfondsLast' : 'FondsLastSubfonds'
                    } else {
                        return subfondsLast ? 'FondsSubfondsLast' : 'FondsSubfonds'
                    }
                case 'S':
                    if (fondsLast) {
                        // Subfonds exists
                        if (archivalUnit['subfonds']) {
                            if (subfondsLast) {
                                return seriesLast ? 'FondsLastSubfondsLastSeriesLast' : 'FondsLastSubfondsLastSeries'
                            } else {
                                return seriesLast ? 'FondsLastSubfondsSeriesLast' : 'FondsLastSubfondsSeries'
                            }
                        // Subfonds doesn't exist
                        } else {
                            return subfondsLast ? 'FondsLastSeriesLast' : 'FondsLastSeries'
                        }
                    } else {
                        // Subfonds exists
                        if (archivalUnit['subfonds']) {
                            if (subfondsLast) {
                                return seriesLast ? 'FondsSubfondsLastSeriesLast' : 'FondsSubfondsLastSeries'
                            } else {
                                return seriesLast ? 'FondsSubfondsSeriesLast' : 'FondsSubfondsSeries'
                            }
                        // Subfonds doesn't exist
                        } else {
                            return subfondsLast ? 'FondsSeriesLast' : 'FondsSeries'
                        }
                    }
            }
        }

        if (detectVisible()) {
            return (
                <TreeNode
                    archivalUnit={archivalUnit}
                    classType={getClassType()}
                    selected={archivalUnit['id'] === selectedArchivalUnit}
                    open={openNodes.includes(archivalUnit['key'])}
                    onOpenClose={onOpenClose}
                    onTreeNodeClick={onSelectArchivalUnit}
                    hasChildren={archivalUnit.hasOwnProperty('children')}
                />
            )
        } else {
            return ''
        }
    }

    /**
     * Renders the tree from the data from the API.
     *
     * @returns {[]} The array containing the Tree Nodes.
     */
    const renderTree = () => {
        const treeData = [];

        data.forEach((fonds, index) => {
            treeData.push(
                getLeaves(fonds, index === data.length - 1)
            )
            if (fonds.hasOwnProperty('children')) {
                fonds['children'].forEach((subfonds, index2) => {
                    treeData.push(
                        getLeaves(subfonds, index === data.length - 1, index2 === fonds['children'].length - 1)
                    )
                    if (subfonds.hasOwnProperty('children')) {
                        subfonds['children'].forEach((series, index3) => {
                            treeData.push(
                                getLeaves(
                                    series,
                                    index === data.length - 1,
                                    index2 === fonds['children'].length - 1,
                                    index3 === subfonds['children'].length - 1,
                                )
                            )
                        })
                    }
                })
            }
        });

        return treeData;
    }

    if (data) {
        return (
            <div style={{display: 'flex'}}>
                <div className={selectedArchivalUnit !== 0 ? style.TreeOpen : style.Tree}>
                    {renderTree()}
                </div>
                <ArchivalUnitDrawer
                    archivalUnitID={selectedArchivalUnit}
                    open={selectedArchivalUnit !== 0}
                    onClose={onSelectArchivalUnit}
                />
            </div>
        )
    } else {
        return <Loader/>
    }
}

export default CollectionPage
