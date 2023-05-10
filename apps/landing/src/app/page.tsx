import KYCButton from '_@landing/components/KYCButton'

export default function Home() {
  return (
    <main className="relative before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[url('/images/background-footer-light.png')] before:bg-top before:bg-repeat before:opacity-20 before:mix-blend-overlay">
      <KYCButton />
    </main>
  )
}
