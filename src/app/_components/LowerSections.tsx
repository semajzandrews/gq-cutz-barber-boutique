import { BIZ, SERVICES, REVIEWS } from "./data";

export function Services() {
  return (
    <section className="section page-cream" id="services">
      <div className="wrap">
        <div className="sec-head rise">
          <span className="eyebrow">The Index</span>
          <h2>Every service, every chair.</h2>
          <p>
            One barber, every texture, every age. Add any part of the house
            ritual to any cut. Prices are honest and posted, the way a boutique
            should be.
          </p>
        </div>

        <div className="svc-list">
          {SERVICES.map((s) => (
            <a
              key={s.name}
              className="svc rise"
              href={BIZ.book}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="svc-name">{s.name}</span>
              <span className="svc-price">{s.price}</span>
              <span className="svc-desc">{s.desc}</span>
            </a>
          ))}
        </div>
        <p className="svc-note rise">
          Tap any service to book it on Booksy. Prices marked &ldquo;from&rdquo;
          vary with length and texture, confirmed in the chair.
        </p>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section className="section" id="proof">
      <div className="wrap">
        <div className="proof-stat rise">
          <span className="big">{BIZ.rating}</span>
          <span className="stars" aria-hidden="true">
            ★★★★★
          </span>
          <span className="sub">
            {BIZ.rating} stars · {BIZ.reviewCount} reviews on Booksy
          </span>
        </div>
        <div className="proof-grid">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="review rise" data-i={i}>
              <blockquote className="rq">&ldquo;{r.q}&rdquo;</blockquote>
              <figcaption className="rby">
                {r.by} · {r.when}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <section className="section" id="visit">
      <div className="wrap">
        <div className="sec-head rise">
          <span className="eyebrow">Visit</span>
          <h2>Find the chair.</h2>
        </div>
        <div className="visit-grid">
          <div className="visit-info rise">
            <dl>
              <div className="vrow">
                <div className="k">Where</div>
                <div className="v">
                  {BIZ.address}
                  <br />
                  {BIZ.city}, {BIZ.state} {BIZ.zip}
                </div>
              </div>
              <div className="vrow">
                <div className="k">Hours</div>
                <div className="v">
                  Tuesday to Saturday, 10am to 6pm
                  <br />
                  Closed Sunday and Monday
                </div>
              </div>
              <div className="vrow">
                <div className="k">Call or text</div>
                <div className="v">
                  <a href={BIZ.phoneTel}>{BIZ.phoneDisplay}</a>
                  <br />
                  Send a picture of the style and we will tell you if it works
                  on your hair before you sit down.
                </div>
              </div>
              <div className="vrow">
                <div className="k">Book</div>
                <div className="v">
                  <a
                    href={BIZ.book}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reserve on Booksy
                  </a>
                </div>
              </div>
            </dl>
            <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                className="btn btn-solid"
                href={BIZ.book}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book your appointment
              </a>
              <a className="btn btn-ghost" href={BIZ.smsHref}>
                Text a photo
              </a>
            </div>
          </div>
          <div className="map-frame rise">
            <iframe
              title="GQ Cutz Barber Boutique location map"
              src={BIZ.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="f-mark">GQ Cutz</div>
            <p className="f-tag">{BIZ.tagline}</p>
          </div>
          <div className="f-links">
            <a href="#ritual">The Ritual</a>
            <a href="#work">The Work</a>
            <a href="#services">The Index</a>
            <a href="#visit">Visit</a>
            <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer">
              {BIZ.instagramHandle}
            </a>
            <a href={BIZ.book} target="_blank" rel="noopener noreferrer">
              Booksy
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            GQ Cutz Barber Boutique · {BIZ.address}, {BIZ.city}, {BIZ.state}{" "}
            {BIZ.zip}
          </span>
          <span>{BIZ.phoneDisplay}</span>
        </div>
      </div>
    </footer>
  );
}
