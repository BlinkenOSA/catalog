import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import style from "./Loader.module.css"

const Loader = () => {
    const override = css`
      display: block;
      margin: auto;
    `;

    return (
        <div className={style.LoaderWrapper}>
            <div/>
            <ClockLoader color={"#000000"} size={40} loading={true} css={override}/>
            <div/>
        </div>
    )
};

export default Loader;
