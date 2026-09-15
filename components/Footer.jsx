import { profile } from '../data/resume'

const links = [
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'Email', href: `mailto:${profile.email}` },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="rule w-full border-t py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="t-small text-on-surface">{profile.name}</p>

        <div className="flex flex-wrap gap-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
              className="t-small text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="t-label text-outline">
          © {year} — Built with architectural precision
        </p>
      </div>
    </footer>
  )
}

export default Footer
