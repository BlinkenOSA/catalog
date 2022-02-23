import React from "react";
import style from "./FacetHelper.module.scss";

/**
 * Displaying the helper text upon facet selection
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup
 */
const FacetHelper = ({selectedFacetGroup}) => {

    return (
        <div className={style.FacetHelper}>
            <p className={style.Title}>
                {selectedFacetGroup}
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo libero, eleifend vel convallis ac, mollis non sapien. Quisque tincidunt vel tortor id pulvinar. Etiam rutrum, mi nec blandit fringilla, nunc neque tincidunt urna, ut dictum arcu augue et enim. Sed a aliquam augue, vel viverra elit. Morbi maximus fermentum est eu rhoncus. Integer ac tortor eget diam ultrices porta et in erat. Aenean interdum metus et fermentum lobortis. Nunc consequat consequat ante nec volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin fringilla cursus lacinia. Integer id ligula vulputate, viverra dui quis, interdum metus. Ut in tortor gravida, fermentum purus vitae, ultricies felis. Ut ullamcorper purus id posuere blandit. Integer ornare sem mi, in sodales risus dignissim eget. Donec lorem nisi, sollicitudin at orci vitae, malesuada varius sem. Vivamus quis lorem aliquet, sollicitudin nisl sed, dignissim mi.
            </p>
            <p>
                Duis tristique lorem ac fermentum gravida. Pellentesque nec eros accumsan, posuere nunc ut, cursus quam. Phasellus accumsan nulla quam. Integer blandit turpis at tortor iaculis, eget lacinia leo hendrerit. Nam eu orci a turpis pellentesque lobortis. Vestibulum vestibulum lacinia dolor, et auctor sem accumsan vitae. Duis ultrices metus quis ex viverra porta. Sed vulputate semper urna. Aenean cursus vel lorem quis ullamcorper. Etiam eros ex, mollis a aliquam ac, ultrices ut justo. Proin mauris purus, rutrum eu lorem sit amet, malesuada tristique mauris. Mauris efficitur ipsum odio, nec malesuada ipsum pharetra eget. Aenean efficitur euismod congue. Duis quis dui quis quam dignissim tristique. Nulla posuere nisl eu lobortis gravida.
            </p>
            <p>
                Curabitur augue justo, ultrices sed lectus sit amet, ornare tincidunt elit. Donec ullamcorper mi turpis, eu faucibus nisi malesuada a. Curabitur ut urna est. Ut vel vestibulum diam. Donec convallis ut massa a auctor. Aliquam pretium ante id nunc bibendum vestibulum. Aenean tincidunt arcu ut elit euismod pulvinar. Ut vitae hendrerit nisl. Praesent eu hendrerit purus, at faucibus metus. Nullam molestie congue felis, vitae luctus odio maximus eget. Mauris finibus justo libero. Ut nunc orci, euismod dapibus dictum ut, scelerisque at ipsum.
            </p>
            <p>
                Integer hendrerit et mauris sit amet blandit. Nullam vehicula eu magna eget porttitor. Sed in arcu placerat, mattis velit non, pellentesque libero. Ut purus lorem, semper sit amet eleifend sed, sollicitudin in sapien. Donec facilisis facilisis vestibulum. Phasellus varius posuere ipsum vitae dictum. Mauris sed posuere odio, sit amet tristique justo.
            </p>
            <p>
                Quisque pharetra, justo sed dignissim porttitor, quam nunc feugiat justo, venenatis mollis magna nibh sit amet ipsum. Vestibulum commodo laoreet rhoncus. Nam quis rhoncus leo. Cras scelerisque tempor urna non semper. Mauris at euismod ex. Vivamus faucibus, neque ac ultrices tempus, diam augue volutpat dolor, quis elementum quam turpis et lacus. Quisque cursus arcu in est sagittis, quis euismod justo lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus libero eget tempor sodales.
            </p>
        </div>
    )
}

export default FacetHelper;
