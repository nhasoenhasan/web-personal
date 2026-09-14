import { skills } from '../data/resume'
import Reveal from './Reveal'

const icons = {
  smartphone: (
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
  ),
  web: (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  ),
  dns: (
    <path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  ),
  build: (
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  ),
}

function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1120px] border-t border-outline-variant/30 px-5 py-32 md:px-8"
    >
      <Reveal>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-medium text-primary">
            Technical Skills
          </h2>
          <p className="mt-1 text-base text-on-surface-variant">
            Technologies and tools I work with.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, idx) => (
          <Reveal key={skill.category} delay={idx * 80}>
            <div
              className="rounded-lg border border-surface-variant bg-surface-container-lowest p-4 ambient-shadow"
            >
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {icons[skill.icon]}
              </svg>
              <h3 className="font-mono text-sm font-bold text-primary">
                {skill.category}
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-container px-3 py-1 font-mono text-xs text-on-surface"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Skills
