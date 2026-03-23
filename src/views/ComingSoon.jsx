import FeatureList from '../components/FeatureList'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import EmailForm from '../components/EmailForm'

export default function ComingSoon() {
  const problemBlocks = [
    {
      title: 'Missed or delayed payments',
      description: 'Manual follow ups. No clear tracking. Collections slip.',
    },
    {
      title: 'Approval bottlenecks',
      description: 'Requests sit in chats. No ownership. No visibility.',
    },
    {
      title: 'Resident communication chaos',
      description: 'Notices get lost across WhatsApp groups and calls.',
    },
    {
      title: 'Admin overload',
      description: 'Everything depends on a few people managing everything manually.',
    },
  ]

  const solutionBlocks = [
    {
      title: 'Collections tracking',
      description: 'Know who paid, who did not, and what is pending without follow ups.',
    },
    {
      title: 'Structured approvals',
      description: 'Track every request with status and ownership.',
    },
    {
      title: 'Central communication',
      description: 'One place for notices and updates.',
    },
    {
      title: 'Controlled access',
      description: 'Assign roles. Reduce dependency on single admins.',
    },
  ]

  const trustPoints = [
    'Designed for apartment associations handling 50 to 500+ units',
    'Handles recurring maintenance billing and collection tracking',
    'Role based access for committee members and admins',
    'Works with real approval flows used in Indian societies',
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <HeroSection />
        <section className="border-b border-primary-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-500">
                Built for real society operations in India
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl">
                For apartment association admins who handle billing, approvals, and resident communication.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustPoints.map((point) => (
                <div key={point} className="surface-panel border-primary-100 bg-neutral-50 p-6">
                  <p className="text-sm font-medium leading-6 text-neutral-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureList
          eyebrow="Where time and money gets lost today"
          title="The work breaks down long before anyone calls it a system problem."
          features={problemBlocks}
        />

        <FeatureList
          eyebrow="What changes with GateFlux"
          title="Replace scattered society workflows with one operational system."
          features={solutionBlocks}
        />

        <section className="border-y border-primary-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-500">
              Early access focused on societies with active billing and approval workflows
            </p>
          </div>
        </section>

        <section className="section-padding bg-primary-950 text-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">
                Request early access
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                If collections and approvals still run through spreadsheets, chats, and follow ups, start here.
              </h2>
              <p className="mt-5 text-lg leading-8 text-primary-200">
                Join the first societies using GateFlux to run collections, approvals, and resident coordination with less manual overhead.
              </p>
            </div>

            <EmailForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
