import { experience } from '../data/resume'
import Reveal from './Reveal'

function BulletList({ items, className = '' }) {
  if (!items?.length) return null
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="t-small flex gap-3 text-on-surface-variant">
          <span aria-hidden className="shrink-0 text-outline">
            —
          </span>
          {/* measure: batas 62ch. Tanpa ini, di kolom lebar barisnya
              mencapai ~95 karakter — di atas batas nyaman baca (45–75). */}
          <span className="measure">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Experience() {
  return (
    <section
      id="experience"
      className="rule mx-auto max-w-[1120px] border-t px-5 py-24 md:px-8 md:py-32"
    >
      <Reveal>
        <div className="flex items-start gap-4">
          <span aria-hidden className="tick mt-2 h-7" />
          <div>
            <h2 className="t-h2 text-on-surface">Professional experience</h2>
            <p className="t-small mt-2 text-on-surface-variant">
              Career history and key achievements.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-16">
        {experience.map((job, idx) => (
          <Reveal key={job.company} delay={idx * 80}>
            <article className="rule grid gap-8 border-t py-12 md:grid-cols-12 md:gap-10 md:py-14">
              {/* Kolom kiri: identitas jabatan.
                  sticky + self-start supaya identitas perusahaan tetap
                  terbaca saat entri panjang (8 bullet) di-scroll — kalau
                  tidak, kolom ini kosong di dua pertiga bawah tiap entri. */}
              <header className="md:sticky md:top-24 md:col-span-4 md:self-start">
                <h3 className="t-h3 text-on-surface">{job.company}</h3>
                <p className="t-small mt-1.5 text-on-surface-variant">
                  {job.role}
                </p>
                {job.meta && (
                  <p className="t-meta mt-4 text-outline">{job.meta}</p>
                )}
                <p className="t-label tabular mt-3 text-outline">
                  {job.period}
                </p>
              </header>

              {/* Kolom kanan: isi */}
              <div className="md:col-span-8">
                {job.projects?.map((project) => (
                  <div
                    key={project.name}
                    className="rule mb-8 border-l pl-5 last:mb-0"
                  >
                    <p className="t-small text-on-surface">
                      <span className="font-medium">{project.name}</span>
                      {project.subtitle && (
                        <span className="text-on-surface-variant">
                          {' — '}
                          {project.subtitle}
                        </span>
                      )}
                    </p>
                    {project.period && (
                      <p className="t-label tabular mt-1.5 text-outline">
                        {project.period}
                      </p>
                    )}
                    <BulletList items={project.items} className="mt-4" />
                  </div>
                ))}

                <BulletList items={job.items} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Experience
