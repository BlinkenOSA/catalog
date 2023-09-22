import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import style from "./Loader.module.css"

/**
 * Displays a loading spinner while loading.
 */
const Loader = ({height, color='#000000'}) => {
    const override = css`
      display: block;
      margin: auto;
    `;

    return (
        <div className={style.LoaderWrapper} style={{minHeight: height}}>
            <div/>
            <ClockLoader color={color} size={40} loading={true} css={override}/>
            <div/>
        </div>
    )
};

export default Loader;
