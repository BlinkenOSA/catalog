import style from './AvailabilityButton.module.scss';
import Button from "../../../parts/Button";

const AvailabilityButton = ({record}) => {
    const renderDigitalVersionButton = () => (
        <div className={style.DigitalVersion}>
            <span className={style.Label}>Available digitally</span>
            <span className={style.Barcode}>{record['digital_version_barcode']}</span>
        </div>
    )

    const renderText = () => {
        switch (record['record_origin']) {
            case 'Library':
                return 'In Research Room'
            case 'Film Library':
                if (record['digital_version_exists']) {
                    return renderDigitalVersionButton()
                } else {
                    return 'In Research Room'
                }
            case 'Archives':
                if (record['digital_version_online']) {
                    return 'Online'
                } else {
                    if (record['digital_version_exists']) {
                        return renderDigitalVersionButton()
                    } else {
                        return 'In Research Room'
                    }
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
