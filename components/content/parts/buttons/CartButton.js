import React, {useEffect, useState} from 'react';
import style from './CartButton.module.scss';

const CartButton = ({name, disabled, inCart, onCheckedChange}) => {
    const onChange = (checked) => {
        onCheckedChange(checked)
    }

    return (
        <label className={disabled ? style.SwitchDisabled : style.Switch} htmlFor={name}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={inCart}
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
