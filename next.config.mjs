/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` menghasilkan folder out/ berisi HTML per route,
  // sama seperti dist/ di Vite — jadi deploy rsync ke VPS tetap jalan.
  output: 'export',

  // out/notes/slug/index.html (bukan out/notes/slug.html) — lebih ramah nginx.
  trailingSlash: true,

  // next/image butuh server optimizer; di static export harus dimatikan.
  images: { unoptimized: true },
}

export default nextConfig
