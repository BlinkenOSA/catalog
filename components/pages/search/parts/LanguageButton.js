import React, {useEffect, useState} from 'react';
import style from './LanguageButton.module.scss';

const LanguageButton = ({name='language-selector', selectedLanguage, onLanguageChange, originalLanguage}) => {
    const onChange = (checked) => {
        onLanguageChange(checked ? originalLanguage : 'EN')
    }

    return (
        <label className={style.Switch} htmlFor={name}>
            <input
                type="checkbox"
                id={name}
                checked={!(selectedLanguage === 'EN')}
                onChange={e => onChange(e.target.checked)}
            />
            <span className={`${style.Slider} ${style.Round}`}>
                <div className={style.Label}>
                    <div>EN</div>
                    <div>{originalLanguage}</div>
                </div>
            </span>
        </label>
    )
}

export default LanguageButton;
