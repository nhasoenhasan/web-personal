import { education, profile } from '../data/resume'
import Reveal from './Reveal'

function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1120px] border-t border-outline-variant/30 px-5 py-32 md:px-8"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="mb-4 font-display text-2xl font-medium text-primary">
              Education
            </h2>
          <div className="rounded-lg border border-surface-variant bg-surface-container-lowest p-4 ambient-shadow">
            <h3 className="text-lg font-semibold text-primary">
              {education.school}
            </h3>
            <p className="mt-1 text-base text-on-surface-variant">
              {education.degree}
            </p>
            <p className="mt-2 font-mono text-sm text-secondary">
              {education.period}
            </p>
          </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h2 className="mb-4 font-display text-2xl font-medium text-primary">
              Connect
            </h2>
          <div className="flex flex-col gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-outline-variant p-4 transition-all hover:border-secondary hover:bg-surface-container"
            >
              <svg
                className="h-5 w-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <div>
                <h3 className="text-base font-semibold text-primary">
                  LinkedIn
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Let's connect professionally
                </p>
              </div>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-outline-variant p-4 transition-all hover:border-secondary hover:bg-surface-container"
            >
              <svg
                className="h-5 w-5 text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
              <div>
                <h3 className="text-base font-semibold text-primary">GitHub</h3>
                <p className="text-xs text-on-surface-variant">
                  View my open source work
                </p>
              </div>
            </a>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
