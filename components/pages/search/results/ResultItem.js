import style from "./ResultItem.module.scss";
import Subtitle from "./parts/metadata/Subtitle";
import Title from "./parts/metadata/Title";
import RecordType from "./parts/metadata/RecordType";
import Publisher from "./parts/metadata/Publisher";
import ParentUnits from "./parts/metadata/ParentUnits";
import CallNumber from "./parts/metadata/CallNumber";
import AvailabilityButton from "./parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../parts/PrimaryTypeButton";
import CartButton from "../../../cart/CartButton";
import { useCart } from "react-use-cart";
import SearchHighglights from "./parts/SearchHighglights";
import AccessRightsButton from "../parts/AccessRightsButton";
import ResultThumbnail from "../parts/ResultThumbnail";

const ResultItem = ({result, highlights, limit, offset, index, isMobile}) => {
    const { inCart } = useCart();

    const renderAvailabilityButton = () => {
        if (result['primary_type'] !== 'Archival Unit') {
            return <AvailabilityButton record={result} />
        } else {
            return ''
        }
    }

    const renderAccessRightsButton = () => {
        if (result['description_level'] === 'Folder' || result['description_level'] === 'Item') {
            return <AccessRightsButton record={result}/>
        }
    }

    const renderCartButton = () => {
        if (result['record_origin'] === 'Digital Repository') {
            return ''
        }

        if (result['primary_type'] === 'Archival Unit') {
            return ''
        }

        if (result['digital_version_online']) {
            return ''
        }

        return (
            <CartButton
                inCart={inCart(result['id'])}
                name={result['id']}
                record={result}
            />
        )
    }

    const renderSearchHighlights = () => {
        return <SearchHighglights result={result} highlights={highlights}/>
    }

    const renderDividerButton = () => {
        if (result['primary_type'] !== 'Archival Unit') {
            return <div className={style.Divider} />
        }
    }

    return (
        <div className={style.ResultItemWrapper}>
            <div className={style.ResultItemInfo}>
                <div className={style.Sequence}>
                    {offset + index + 1}.
                </div>
                <div className={style.Title}>
                    <a href={`/catalog/${result['id']}`}>
                        <Title result={result} highlights={highlights} />
                    </a>
                </div>
                <div className={style.Subtitle}>
                    <Subtitle result={result} />
                </div>
                <div className={style.DescriptionWrap} >
                    <CallNumber label={'Call Number'} result={result} />
                    <ParentUnits label={'Part of the Series'} result={result} />
                    <Publisher label={'Publisher'} result={result} />
                </div>
                {renderSearchHighlights()}
                <div className={style.Buttons} >
                    <div className={style.ActionButtons}>
                        {renderCartButton()}
                        {renderAvailabilityButton()}
                        {renderAccessRightsButton()}
                        {renderDividerButton()}
                    </div>
                    <div>
                        <PrimaryTypeButton
                          origin={result['record_origin']}
                          descriptionLevel={result['description_level']}
                          primaryType={result['primary_type']}
                        />
                    </div>
                </div>
            </div>
            <ResultThumbnail record={result} isMobile={isMobile} />
        </div>
    )
}

export default ResultItem;
