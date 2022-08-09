import React, {useEffect, useState} from 'react';
import style from './LanguageButton.module.scss';

const LanguageButton = ({name='english', selectedLanguage='EN', onLanguageChange, originalLanguage='HU'}) => {
    const [checked, setChecked] = useState('EN');

    useEffect(() => {
        setChecked(selectedLanguage)
    }, [selectedLanguage])

    const onChange = (checked) => {
        setChecked(checked ? originalLanguage : 'EN')
        onLanguageChange(checked ? originalLanguage : 'EN')
    }

    return (
        <label className={style.Switch} htmlFor={name}>
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={!(checked === 'EN')}
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
