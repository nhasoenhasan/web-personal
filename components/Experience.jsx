import { experience } from '../data/resume'
import Reveal from './Reveal'

function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1120px] border-t border-outline-variant/30 px-5 py-32 md:px-8"
    >
      <Reveal>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-medium text-primary">
            Professional Experience
          </h2>
          <p className="mt-1 text-base text-on-surface-variant">
            Career history and key achievements.
          </p>
        </div>
      </Reveal>

      <div className="relative pl-6 md:pl-10">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-[10px] top-0 z-0 w-px bg-surface-variant" />

        {experience.map((job, idx) => (
          <Reveal
            key={job.company}
            delay={idx * 100}
            className={idx === experience.length - 1 ? '' : 'mb-12'}
          >
            <div className="group relative">
            {/* Timeline node */}
            <div className="absolute left-0 top-3 z-10 h-5 w-5 rounded-full border-2 border-surface-variant bg-surface transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:shadow-[0_0_10px_rgba(0,102,138,0.3)]" />

            <div className="ml-10 rounded-lg border border-surface-variant bg-surface-container-lowest p-8 ambient-shadow md:ml-14">
              <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-medium text-primary">
                    {job.company}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-secondary">
                    {job.role}
                  </p>
                </div>
                <span className="mt-2 font-mono text-sm text-on-surface-variant md:mt-0">
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-base text-on-surface-variant"
                  >
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-secondary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Experience
