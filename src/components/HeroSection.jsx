import Image from 'next/image'
import EmailForm from './EmailForm'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-60" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(215,131,16,0.22),_transparent_55%)]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 pb-18 pt-8 sm:px-6 sm:pb-22 sm:pt-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] lg:items-center lg:gap-16 lg:px-8 lg:pb-30 lg:pt-12">
        <div className="max-w-2xl">
          <Image
            src="/logo.svg"
            alt="GateFlux"
            width={176}
            height={44}
            priority
          />
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">
            Launching soon
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Stop chasing payments and approvals across your society.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-200 text-balance sm:text-xl">
            Track collections, approvals, and resident issues in one place. Reduce delays. Cut manual follow ups. Keep operations predictable.
          </p>
          <p className="mt-6 max-w-xl text-sm font-medium uppercase tracking-[0.12em] text-primary-300">
            If you are still tracking payments in spreadsheets or WhatsApp, this is for you.
          </p>
        </div>

        <div className="mt-12 lg:mt-0">
          <EmailForm />
        </div>
      </div>
    </section>
  )
}