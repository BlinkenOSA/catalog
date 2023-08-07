import React from 'react';

export const displaySubjectField = (fieldValues, key) => {
    const getLinks = (linkedValues, currentIndex) => {
        let links = [];
        Array(currentIndex+1).fill(0).map((_, i) => links.push(`${fieldValues['link']}=${linkedValues[i]}`))
        return links.join('&')
    }

    const renderValues = () => (
        fieldValues['linkedValue'].map((lv, index) => {
            return (
                <div key={index}>
                    {
                        lv.map((v, idx) => (
                            <span>
                                {idx > 0 && ` -> `}
                                <a href={`/?${getLinks(lv, idx)}`}>
                                    {v}
                                </a>
                            </span>
                        ))
                    }
                </div>
            )
        })
    )

    if (fieldValues['linkedValue'].length > 0) {
        return (
            <div key={key}>
                {renderValues()}
            </div>
        )
    } else {
        return ''
    }
}
