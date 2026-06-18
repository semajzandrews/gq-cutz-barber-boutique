import SmoothScroll from "./_components/SmoothScroll";
import Reveal from "./_components/Reveal";
import Nav from "./_components/Nav";
import CoverHero from "./_components/CoverHero";
import { Services, Proof, Visit, Footer } from "./_components/LowerSections";
import { BIZ, RITUALS, LOOKBOOK } from "./_components/data";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Reveal />
      <Nav />

      <main>
        <CoverHero />

        {/* THE RITUAL — boutique add-ons as an editorial sequence */}
        <section className="section" id="ritual">
          <div className="wrap">
            <div className="sec-head rise">
              <span className="eyebrow">The House Ritual</span>
              <h2>
                Anyone can cut hair. <span className="serif-italic">This</span>{" "}
                is the difference.
              </h2>
              <p>
                The boutique is in the extras. Four steps you can add to any
                chair, the ones that turn a haircut into the reason you booked.
              </p>
            </div>

            <div className="ritual">
              {RITUALS.map((r, i) => (
                <article
                  key={r.n}
                  className={`rit${i % 2 === 1 ? " flip" : ""}`}
                >
                  <div className="rit-media ph rise">
                    <span className="num">{r.n}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.img} alt={r.alt} loading="lazy" />
                  </div>
                  <div className="rit-body rise">
                    <span className="kk">{r.kicker}</span>
                    <h3>{r.name}</h3>
                    <p>{r.copy}</p>
                    <div className="rit-meta">
                      <a
                        className="rit-add"
                        href={BIZ.book}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {r.add} →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PULL QUOTE */}
        <section className="pullquote">
          <div className="wrap">
            <q className="rise">
              I always leave <em>feeling beautiful</em>.
            </q>
            <p className="pq-by rise">Carol, on her chair at GQ Cutz</p>
          </div>
        </section>

        {/* THE WORK — lookbook */}
        <section className="section" id="work">
          <div className="wrap">
            <div className="sec-head rise">
              <span className="eyebrow">The Work</span>
              <h2>The chair, the craft, the finish.</h2>
              <p>
                Every cut is mapped to the head in front of {BIZ.barber}, never
                a stencil. Kids in their first chair, gentlemen keeping a sharp
                line for decades, and everyone in between.
              </p>
            </div>
            <div className="lookbook">
              {LOOKBOOK.map((l) => (
                <figure key={l.n} className={`look ${l.cls} rise`}>
                  <div className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.img} alt={l.alt} loading="lazy" />
                  </div>
                  <figcaption className="cap">
                    <span className="t">{l.t}</span>
                    <span className="n">{l.n}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <Services />
        <Proof />
        <Visit />
      </main>

      <Footer />

      {/* fixed mobile book pill */}
      <a
        className="book-pill"
        href={BIZ.book}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book on Booksy · {BIZ.rating} ★
      </a>
    </>
  );
}
