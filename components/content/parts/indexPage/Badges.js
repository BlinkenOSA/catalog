import style from "./Badges.module.scss";

const badgeText = [
    'CPG', 'Lenin', 'Szabad Európa Rádió', 'Srebrenica', 'EU',
    'Emigré', 'Bős-nagymarosi vízlépcső', 'Перестройка',
    'USSR', 'CIA'
]

const Badges = () => {
    const renderBadge = (badgeText, key) => {
        return (
            <div
                style={{
                    fontSize: 120 - (badgeText.length * 2.5)
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
