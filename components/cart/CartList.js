import style from "./CartList.module.scss";
import {useCart} from "react-use-cart";
import React, {useState} from 'react';
import CartButton from "../cart/CartButton";
import { FiMeh } from 'react-icons/fi';

const CartList = ({isMobile=false}) => {
    const { removeItem, inCart, items } = useCart();
    const [demoButtonChecked, setDemoButtonChecked] = useState(false);

    const renderTitle = (item) => {
        if (item['origin'] === 'Archives') {
            return (
                <div className={style.Title}>
                    <span>{item['title']}</span>
                    <div>{item['series_name']}</div>
                    <div>{item['type']}</div>
                </div>
            )
        } else {
            return (
                <div className={style.Title}>
                    <span>{item['title']}</span>
                    <div>{item['type']}</div>
                </div>
            )
        }
    }

    const renderItems = (items) => (
        items.map((item, index) => (
            <div className={style.CartItem} key={index}>
                <div className={style.CartButton}>
                    <CartButton
                        inCart={inCart(item['id'])}
                        name={item['id']}
                        onCheckedChange={() => removeItem(item['id'])}
                    />
                </div>
                <div className={style.CallNumber}>{item['call_number']}</div>
                {renderTitle(item)}
            </div>
        ))
    )

    const displayItems = (origin) => {
        const i = items.filter(item => item['origin'] === origin)
        let cartItems = [];

        if (origin !== 'Archives') {
            cartItems = i.sort((a,b) => a['title'].localeCompare(b['title']));
        } else {
            cartItems = i.sort((a,b) => a['sorting_code'].localeCompare(b['sorting_code']));
        }

        if (cartItems.length > 0) {
            return (
                <React.Fragment>
                    <div className={style.OriginRow}>
                        <span>{origin}</span>
                    </div>
                    { renderItems(cartItems) }
                </React.Fragment>
            )
        } else {
            return ''
        }
    }

    if (items.length > 0) {
        return (
            <div className={isMobile ? `${style.CartListWrapper} ${style.Mobile}` : style.CartListWrapper}>
                {displayItems('Archives')}
                {displayItems('Library')}
                {displayItems('Film Library')}
            </div>
        )
    } else {
        return (
            <div className={style.CartListEmptyWrapper}>
                <div className={style.IconWrapper}>
                    <div className={style.Content}>
                        <div className={style.Icon}>
                            <FiMeh />
                        </div>
                        <div className={style.MainText}>
                            Nothing to request
                        </div>
                        <div className={style.Text}>
                            You haven't selected any material to request from the archives.<br/>
                            You can use the following icon on your hitlist to add materials for the requests list:
                        </div>
                        <div className={style.CartIcon}>
                            <CartButton
                                inCart={demoButtonChecked}
                                name={'demo'}
                                onCheckedChange={setDemoButtonChecked}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CartList;
