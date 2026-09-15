import { education, profile } from '../data/resume'
import Reveal from './Reveal'

const connect = [
  {
    title: 'LinkedIn',
    href: profile.linkedin,
    description: "Let's connect professionally",
  },
  {
    title: 'GitHub',
    href: profile.github,
    description: 'View my open source work',
  },
  {
    title: 'Email',
    href: `mailto:${profile.email}`,
    description: profile.email,
  },
]

function Contact() {
  return (
    <section
      id="contact"
      className="rule mx-auto max-w-[1120px] border-t px-5 py-24 md:px-8 md:py-32"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <div className="flex items-start gap-4">
            <span aria-hidden className="tick mt-2 h-7" />
            <div className="w-full">
              <h2 className="t-h2 text-on-surface">Education</h2>
              <div className="rule mt-6 border-t pt-6">
                <h3 className="t-h3 text-on-surface">{education.school}</h3>
                <p className="t-small mt-1.5 text-on-surface-variant">
                  {education.degree}
                </p>
                <p className="t-label tabular mt-5 text-outline">
                  {education.period}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="md:col-span-7">
          <div className="flex items-start gap-4">
            <span aria-hidden className="tick mt-2 h-7" />
            <div className="w-full">
              <h2 className="t-h2 text-on-surface">Contact</h2>
              <div className="mt-6">
                {connect.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    {...(item.href.startsWith('mailto:')
                      ? {}
                      : { target: '_blank', rel: 'noreferrer' })}
                    className="rule group flex items-center justify-between gap-6 border-t py-5"
                  >
                    <div>
                      <h3 className="t-h3 text-on-surface">{item.title}</h3>
                      <p className="t-small mt-1 text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
