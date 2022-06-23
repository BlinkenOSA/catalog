import React, {useEffect, useState} from "react";
import style from "./FacetHelper.module.scss";
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Brush} from "recharts";

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {Object} params.facetValues The selected facet values.
 * */
const DateCreated = ({facetValues}) => {
    const [brushValues, setBrushValues] = useState({
        startIndex: 0,
        endIndex: 0
    })
    const [data, setData] = useState([])

    useEffect(() => {
        let d = [];
        facetValues.map((value, index) => {
            if (index > 0) {
                if (index % 2 === 0) {
                    d.push({x: value, y: facetValues[index+1]})
                }
            }
        })
        setData(d);
    }, [facetValues])

    const handleBrushChange = (newIndex) => {
        setBrushValues(newIndex)
    }

    const getLabel = (labelValue) => {
        return `Year: ${labelValue}`
    }

    return (
        <div className={style.FacetHelperText}>
            <div className={style.FacetGroup}>
                <h2>Date Created</h2>
                <p>
                    Please select the date range on the left side.
                    You can see how many records per year exist in the repository on the rights side.
                </p>
            </div>
            <div className={style.FacetExplanation}>
                <ResponsiveContainer width={'100%'} height={300}>
                    <BarChart width={300} height={300} data={data} margin={{top: 10, right: 35}}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="x" stroke={'#FFF'} />
                        <YAxis stroke={'#FFF'} />
                        <Tooltip cursor={{ fill: '#FFEB42' }} contentStyle={{backgroundColor: '#000'}} labelFormatter={getLabel} />
                        <Brush startIndex={brushValues['startIndex']} endIndex={brushValues['endIndex']} dataKey="x" height={40} stroke="#FFF" fill={"#000"} onChange={handleBrushChange}/>
                        <Bar dataKey="y" fill="#FFF" name={'Number of records'} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DateCreated
