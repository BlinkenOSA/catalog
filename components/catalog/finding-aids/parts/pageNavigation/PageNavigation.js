import style from "./PageNavigation.module.scss";
import { AiOutlineHome } from 'react-icons/ai';
import { GrImage, GrDocumentText, GrVideo } from 'react-icons/gr';
import { GiSoundWaves } from 'react-icons/gi';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'

const PageNavigation = ({primaryType, onSelect}) => {
    const getIcon = () => {
        switch (primaryType) {
            case 'Still Image':
                return <GrImage />
            case 'Textual':
                return <GrDocumentText />
            case 'Moving Image':
                return <GrVideo />
            case 'Audio':
                return <GiSoundWaves />
        }
    }

    const getText = () => {
        switch (primaryType) {
            case 'Still Image':
                return 'Image'
            case 'Textual':
                return 'Document'
            case 'Moving Image':
                return 'Video'
            case 'Audio':
                return 'Sound'
        }
    }

    return (
        <div className={style.PageNavigation}>
            <ul>
                <li onClick={() => onSelect('home')}>
                    <div className={style.Icon}><AiOutlineHome/></div>
                    <div className={style.Text}>Top</div>
                </li>
                <li onClick={() => onSelect('digitalContent')}>
                    <div className={style.Icon}>{getIcon()}</div>
                    <div className={style.Text}>{getText()}</div>
                </li>
                <li onClick={() => onSelect('metadata')}>
                    <div className={style.Icon}><BsReverseLayoutTextWindowReverse/></div>
                    <div className={style.Text}>Metadata</div>
                </li>
            </ul>
        </div>
    )
}

export default PageNavigation;
