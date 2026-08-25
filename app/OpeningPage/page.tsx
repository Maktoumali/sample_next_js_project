import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function OpeningPage() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/blog");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-[#333] selection:text-white pb-20">
      {/* Header */}
      <header className="border-b border-[#222] px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-[#333] rounded-sm flex items-center justify-center">
             <div className="w-2 h-2 bg-black rounded-sm"></div>
          </div>
          <span className="font-mono text-sm tracking-wider font-semibold">TECH_MONO</span>
        </div>
        <Link 
          href="/login" 
          className="border border-[#333] hover:border-[#666] transition-colors text-xs font-mono px-4 py-2 rounded-sm tracking-widest"
        >
          LOG IN
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-16">
        {/* Hero Section */}
        <section className="mb-24">
          <p className="font-mono text-xs tracking-widest text-[#888] mb-6 uppercase">
            Featured Dispatch // 2024.10.24
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            The Future of Edge Computing<br />is Here.
          </h1>
          <div className="h-[1px] w-full bg-[#222] mb-12"></div>
          
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#111] overflow-hidden rounded-sm group border border-[#222]">
            <Image 
              src="/images/hero.jpg" 
              alt="Edge Computing Visualization" 
              fill 
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
              priority
            />
            {/* Overlay Gradient for Text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Decentralizing the Cloud: Why the Edge is Winning
              </h2>
              <p className="text-[#aaa] md:text-lg mb-8 leading-relaxed max-w-2xl">
                Latency is the new bottleneck. As AI models move closer to the user, traditional cloud architectures are being challenged by highly distributed, autonomous edge networks.
              </p>
              <Link 
                href="/blog" 
                className="font-mono text-xs tracking-widest uppercase border-b border-[#555] hover:border-white pb-1 transition-colors flex w-fit items-center gap-2"
              >
                Read Full Dispatch <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Dispatches Grid */}
        <section className="mb-32">
          <div className="flex justify-between items-end border-b border-[#222] pb-4 mb-8">
            <h2 className="text-2xl font-bold">Latest Dispatches</h2>
            <Link href="/blog" className="font-mono text-xs tracking-widest text-[#888] hover:text-white transition-colors uppercase">
              View Archive
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Post 1 */}
            <article className="group cursor-pointer">
              <div className="relative aspect-[16/9] mb-4 overflow-hidden border border-[#222] rounded-sm">
                <Image src="/images/post1.jpg" alt="Quantum Computing" fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <p className="font-mono text-[10px] text-[#777] mb-3 uppercase tracking-widest">
                2024.10.22 | Quantum
              </p>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ccc] transition-colors">
                Qubits in the Wild: Stabilizing Quantum States
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Error correction remains the holy grail. We analyze the latest approaches to surface codes and what it means for practical...
              </p>
            </article>

            {/* Post 2 */}
            <article className="group cursor-pointer">
              <div className="relative aspect-[16/9] mb-4 overflow-hidden border border-[#222] rounded-sm">
                <Image src="/images/post2.jpg" alt="Infrastructure" fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <p className="font-mono text-[10px] text-[#777] mb-3 uppercase tracking-widest">
                2024.10.18 | Infrastructure
              </p>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ccc] transition-colors">
                The Death of the Monolith: Microservices at Scale
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                When decoupling goes wrong. A post-mortem on architectural complexity and the resurgence of the majestic monolith in modern...
              </p>
            </article>

            {/* Post 3 */}
            <article className="group cursor-pointer">
              <div className="relative aspect-[16/9] mb-4 overflow-hidden border border-[#222] rounded-sm">
                <Image src="/images/post3.jpg" alt="Security" fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <p className="font-mono text-[10px] text-[#777] mb-3 uppercase tracking-widest">
                2024.10.15 | Security
              </p>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ccc] transition-colors">
                Zero Trust: Beyond the Buzzword
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Implementing true zero-trust architecture requires a fundamental shift in identity management. Here is the technical blueprint.
              </p>
            </article>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-[#111] border border-[#222] rounded-sm p-12 md:p-20 flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
          <div className="w-8 h-8 border-2 border-[#444] rounded-sm flex items-center justify-center mb-8">
            <div className="w-4 h-[2px] bg-[#666]"></div>
          </div>
          <h2 className="text-3xl font-bold mb-4">The Command Line Newsletter</h2>
          <p className="text-[#888] mb-10 max-w-xl text-sm leading-relaxed">
            Weekly technical deep dives, architectural patterns, and industry analysis. No fluff, just signal.
          </p>
          
          <form className="flex w-full max-w-md gap-2 flex-col sm:flex-row">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-[#0a0a0a] border border-[#333] text-[#ddd] px-4 py-3 font-mono text-xs tracking-widest flex-1 focus:outline-none focus:border-[#666] transition-colors rounded-sm"
              required
            />
            <button 
              type="button"
              className="bg-[#ededed] text-black font-mono text-xs font-bold tracking-widest px-8 py-3 hover:bg-white transition-colors rounded-sm sm:w-auto w-full"
            >
              SUBSCRIBE
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222] pt-8 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-xs font-bold tracking-widest">
            TECH_MONO
          </div>
          <div className="flex gap-6 font-mono text-[10px] text-[#777] tracking-widest uppercase">
            <Link href="#" className="hover:text-white transition-colors">Archive</Link>
            <Link href="#" className="hover:text-white transition-colors">Newsletter</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="font-mono text-[10px] text-[#666] tracking-widest uppercase">
            © 2024 TECH_MONO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
