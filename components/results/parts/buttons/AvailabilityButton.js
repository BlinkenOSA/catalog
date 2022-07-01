import style from './AvailabilityButton.module.scss';
import Button from "../../../content/parts/buttons/Button";

const AvailabilityButton = ({result}) => {
    const renderDigitalVersionButton = () => (
        <div className={style.DigitalVersion}>
            <span className={style.Label}>Digital Version Available</span>
            <span className={style.Barcode}>{result['digital_version_barcode']}</span>
        </div>
    )


    const renderText = () => {
        switch (result['record_origin']) {
            case 'Library':
                return 'In Research Room'
            case 'Film Library':
                if (result['digital_version_exists']) {
                    return renderDigitalVersionButton()
                } else {
                    return 'In Research Room'
                }
            case 'Archives':
                if (result['digital_version_exists']) {
                    return renderDigitalVersionButton()
                } else {
                    return 'In Research Room'
                }
            case 'Digital Repository':
                return 'Online'
            default:
                return '';
        }
    }

    return (
        <div className={style.Button}>
            <Button text={renderText()} />
        </div>
    )
}

export default AvailabilityButton;
