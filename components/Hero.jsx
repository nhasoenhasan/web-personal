import { profile } from '../data/resume'
import Reveal from './Reveal'

const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
]

function Hero() {
  return (
    <section
      id="home"
      className="mx-auto max-w-[1120px] px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-40"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            {/* Tanda draf: garis menggantung, tidak mengurung apa pun */}
            <div className="flex items-start gap-4">
              <span aria-hidden className="tick mt-0.5 h-9" />
              <p className="t-label text-on-surface-variant">{profile.location}</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="t-display mt-10 text-on-surface">{profile.name}</h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="t-h1 mt-3 text-secondary">{profile.title}</p>
          </Reveal>

          <Reveal delay={220}>
            <p className="t-body measure mt-10 text-on-surface-variant">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                  className="group t-small inline-flex items-center gap-1.5 text-on-surface"
                >
                  <span className="border-b border-outline-variant pb-0.5 transition-colors group-hover:border-secondary">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-on-surface-variant transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Satu-satunya peristiwa kromatik di halaman.
            Mobile: pita lebar (bukan kotak kecil) supaya saat muncul di
            lipatan ia terbaca sebagai bidang, bukan noda terpotong. */}
        <Reveal delay={200} className="lg:col-span-5">
          <div
            aria-hidden
            className="field field-soft h-36 w-full lg:ml-auto lg:h-auto lg:w-full lg:max-w-[440px] lg:aspect-square"
          />
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
