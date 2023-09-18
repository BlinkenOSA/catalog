import style from "./CartList.module.scss";
import {useCart} from "react-use-cart";
import React, {useState} from 'react';
import CartButton from "../cart/CartButton";
import { FiMeh } from 'react-icons/fi';
import {Field, FieldArray} from "formik";
import InputField from "../form/InputField";

const CartList = ({isMobile=false}) => {
    const { removeItem, inCart, items } = useCart();
    const [demoButtonChecked, setDemoButtonChecked] = useState(false);

    const renderTitle = (item, index) => {
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
                    <span>
                        <a href={`/catalog/${item['id']}`} target={"_blank"}>{item['title']}</a>
                    </span>
                    <div>{item['type']}</div>
                </div>
            )
        }
    }

    const renderItems = (items) => (
        <FieldArray name="items" render={ arrayHelpers => (
            items.map((item, index) => (
            <div className={isMobile ? `${style.CartItem} ${style.Mobile}` : style.CartItem} key={index}>
                <div className={style.CartButton}>
                    <CartButton
                        inCart={inCart(item['id'])}
                        name={item['id']}
                        onCheckedChange={() => removeItem(item['id'])}
                    />
                </div>
                {
                    isMobile ?
                    <div>
                        <div className={style.CallNumber}>{item['call_number']}</div>
                        {renderTitle(item, index)}
                    </div> :
                    <>
                        <div className={style.CallNumber}>{item['call_number']}</div>
                        <div style={{flex: 1}}>
                            {renderTitle(item, index)}
                            {
                                item['origin'] === 'Library' && item['type'].includes('Continuing Resource') &&
                                <div style={{display: 'block'}}>
                                    <Field
                                        style={{maxWidth: '350px'}}
                                        name={`items[${index}].volume`}
                                        placeholder={'Please indicate the requested volumes'}
                                        component={InputField}
                                    />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
            ))
        )}/>
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
