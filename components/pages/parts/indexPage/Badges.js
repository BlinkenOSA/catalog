import style from "./Badges.module.scss";

const badgeText = [
    'CPG', 'Lenin', 'Szabad Európa Rádió', 'Srebrenica', 'EU',
    'Emigré', 'Bős-nagymarosi vízlépcső', 'Перестройка',
    'USSR', 'CIA'
]

/**
 * Display badges on the front page.
 */
const Badges = ({isMobile = false}) => {
    /**
     *
     * @param {string} badgeText The text that should be displayed
     * @param {string} key Key string
     */
    const renderBadge = (badgeText, key) => {
        return (
            <div
                style={{
                    fontSize: isMobile ? 60 - (badgeText.length * 1.5) : 120 - (badgeText.length * 2.5)
                }}
                key={key}
                className={style.Badge}
            >
                <span>
                    {badgeText}
                </span>
            </div>
        )
    }

    return (
        <div className={style.BadgeWrapper}>
            {
                badgeText.map((badge, index) => (
                    renderBadge(badge, index)
                ))
            }
        </div>
    )
}

export default Badges;
