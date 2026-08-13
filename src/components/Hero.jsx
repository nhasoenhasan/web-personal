import { profile } from '../data/resume'
import Reveal from './Reveal'

function Hero() {
  return (
    <section
      id="home"
      className="mx-auto max-w-[1120px] px-5 pb-32 pt-40 md:px-8"
    >
      <div className="max-w-3xl">
        <Reveal>
          <h1 className="font-display text-5xl font-bold tracking-tight text-primary md:text-[72px] md:leading-[80px]">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-secondary md:text-5xl">
            {profile.title}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            {profile.summary}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center rounded bg-primary px-6 py-3 font-mono text-sm text-on-primary transition-colors hover:bg-primary/90"
          >
            Contact Me
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded border border-outline bg-transparent px-6 py-3 font-mono text-sm text-primary transition-colors hover:bg-surface-container"
          >
            GitHub Profile
          </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
