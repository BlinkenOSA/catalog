import style from "./Welcome.module.scss";

const Welcome = ({isMobile}) => {
  return (
    <div className={style.WelcomeWrapper}>
      <div className={style.Content}>
        <h1>Welcome to the archival catalog of the Blinken OSA Archivum</h1>
        <p>The catalog of Blinken OSA Archivum offers an integrated search function built on three major datasets:
          archival item / folder level descriptions along with rich contextual descriptions
          (ISADG, ISAAR etc.), standard bibliographic library records and
          film library bibliographic records.</p>
        <p>
          <strong>Need help about the available functions and about the records?</strong><br/>
          Check our help page or contact us about your research or technical questions.</p>
        <p><strong>Don't know where to start?</strong><br/>
          Use the filters on the left side, enter a search term on the top, or check our latest additions below or browse the
          complete list of our archival holdings <a href={'/archival-collections'}>here</a>.
        </p>
      </div>
    </div>
  )
}

export default Welcome;