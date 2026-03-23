const icon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default function FeatureList({ features, title, eyebrow }) {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-500">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="surface-panel border-primary-100 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-accent-600">
                {icon}
              </div>
              <p className="mt-5 text-lg font-semibold text-primary-950">{feature.title}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}