import React from "react";
import style from "./IndexPage.module.scss";
import SearchBar from "./parts/SearchBar";
import Head from "next/head";
import {motion} from 'framer-motion';
import RotatingText from "./parts/RotatingText";

/**
 * Page responsible for displaying the index splash page.
 */
const IndexPage = () => {
    const menuVariants = {
        visible: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.5
            }
        }
    }

    const menuItemVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: 100, opacity: 0 }
    }

    const logoVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
    }

    const searchBarVariants = {
        visible: { x: 0, opacity: 1 },
        hidden: { x: -1000, opacity: 0 }
    }

    const longTextVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -5, opacity: 0 }
    }

    const placeholderVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -40, opacity: 0 }
    }

    return (
        <React.Fragment>
            <Head>
                <title>Blinken OSA Archivum - Catalog</title>
            </Head>
            <motion.div
              initial={"hidden"}
              animate={"visible"}
              className={style.ContentWrapper}>
                <div className={style.Up}>
                    <div className={style.TopLeft}>
                        <motion.div
                          className={style.Logo}
                          variants={logoVariants}
                          transition={{delay: 0.5}}
                        >
                            <img src={"/images/osa-logo-old.svg"} alt={"Blinken OSA Archivum"}/>
                        </motion.div>
                    </div>
                    <div className={style.TopRight}>
                        <motion.ul variants={menuVariants} className={style.Badges}>
                            <a href={'/archival-collections'} >
                                <motion.li
                                  variants={menuItemVariants}
                                  className={style.Badge}>
                                    Archival Collections
                                </motion.li>
                            </a>
                            <a href={'/registration'}>
                                <motion.li
                                  variants={menuItemVariants}
                                  className={style.Badge}>
                                    Researcher Registration
                                </motion.li>
                            </a>
                            <a href={'/researchers-guide'}>
                                <motion.li
                                    variants={menuItemVariants}
                                    className={style.Badge}>
                                    Researcher's Guide
                                </motion.li>
                            </a>
                            <a href={'privacy-policy'}>
                                <motion.li
                                  variants={menuItemVariants}
                                  className={style.Badge}>
                                    Privacy Policy
                                </motion.li>
                            </a>
                        </motion.ul>
                    </div>
                </div>
                <motion.div className={style.PlaceholderWrapper} variants={menuVariants}>
                    <motion.div
                      className={style.Placeholder}
                      variants={placeholderVariants}
                      style={{zIndex: 2}}
                      transition={{ ease: "linear", duration: 0.5, delay: 1 }}/>
                    <motion.div
                      className={style.Placeholder}
                      variants={placeholderVariants}
                      style={{zIndex: 1}}
                      transition={{ ease: "linear", duration: 0.5, delay: 1.5 }}/>
                </motion.div>
                <div className={style.Down}>
                    <div className={style.BottomLeft}>
                        <motion.p
                          className={style.IntroText}
                          variants={longTextVariants}
                          transition={{ delay: 1 }}>
                            10,000 linear meters, 17,000 hours of audiovisual, and 15 TB of digital records,
                            as well as 150,000 photographs, 6000+ documentary film titles and 19,000 library items on
                            four main areas of interest:
                            <br/><br/>
                            <span>Communism and Cold War, and their Afterlives in Europe</span>&nbsp;
                            <span>Human Rights and Social Justice globally</span>&nbsp;the&nbsp;
                            <span>Central European University in Budapest and Vienna</span>&nbsp;and the&nbsp;
                            <span>Open Society Foundations Network worldwide</span>.
                        </motion.p>
                    </div>
                    <div className={style.BottomRight}>
                        <motion.div className={style.Title} variants={menuItemVariants}>
                            <RotatingText texts={['archival', 'library', 'digital', 'film', 'collections']}/>
                            <span>catalog</span>
                        </motion.div>
                    </div>
                </div>
                <div className={style.Search}>
                    <div className={style.SearchLeft} />
                    <motion.div
                      variants={searchBarVariants}
                      transition={{delay: 2}}>
                        <SearchBar />
                    </motion.div>
                    <div className={style.SearchRight} />
                </div>
            </motion.div>
        </React.Fragment>
    )
}

export default IndexPage;
