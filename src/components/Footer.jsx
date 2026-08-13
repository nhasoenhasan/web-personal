import { profile } from '../data/resume'

function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface py-8">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-8">
        <div className="font-display text-lg font-bold text-primary">
          {profile.name}
        </div>
        <div className="text-center text-xs text-on-surface-variant md:text-left">
          © 2026 {profile.name}. Built with architectural precision.
        </div>
        <div className="flex gap-4 text-xs">
          <a
            className="text-on-surface-variant transition-all hover:text-primary hover:underline"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-on-surface-variant transition-all hover:text-primary hover:underline"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant transition-all hover:text-primary hover:underline"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
