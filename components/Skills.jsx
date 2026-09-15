import { skills } from '../data/resume'
import Reveal from './Reveal'

// Ikon dan pil dibuang. Kategori jadi label ber-tracking, isinya daftar teks
// biasa — hierarki dari ukuran dan ruang, bukan dari kotak.
function Skills() {
  return (
    <section
      id="skills"
      className="rule mx-auto max-w-[1120px] border-t px-5 py-24 md:px-8 md:py-32"
    >
      <Reveal>
        <div className="flex items-start gap-4">
          <span aria-hidden className="tick mt-2 h-7" />
          <div>
            <h2 className="t-h2 text-on-surface">Technical skills</h2>
            <p className="t-small mt-2 text-on-surface-variant">
              Technologies and tools I work with.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, idx) => (
          <Reveal key={skill.category} delay={idx * 70}>
            <div className="rule border-t pt-5">
              <h3 className="t-label text-on-surface">{skill.category}</h3>
              <ul className="mt-5 space-y-1.5">
                {skill.tags.map((tag) => (
                  <li key={tag} className="t-small text-on-surface-variant">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Skills
