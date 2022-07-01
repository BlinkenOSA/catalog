import React, {useEffect, useState} from 'react';
import style from './CartButton.module.scss';

const CartButton = ({name, inCart, onCheckedChange}) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(inCart)
    }, [inCart])

    const onChange = (checked) => {
        setChecked(checked)
        onCheckedChange(name, checked)
    }

    return (
        <label className={style.Switch} htmlFor={name}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            <span className={`${style.Slider} ${style.Round}`}>
                <div className={style.Label}>
                    <div className={style.MinusButton} />
                    <div className={style.PlusButton} />
                </div>
            </span>
        </label>
    )
}

export default CartButton;
