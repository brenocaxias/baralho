import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-ester-dark p-6">
      <Link href="/cartas">
        <div className="group relative bg-white/5 p-12 rounded-3xl border border-ester-gold/20 hover:border-ester-gold/50 transition-all cursor-pointer text-center max-w-sm shadow-[0_0_50px_rgba(47,56,75,0.5)] backdrop-blur-md">
          
          {/* Detalhes em Ouro Velho */}
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-ester-gold opacity-40 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-ester-gold opacity-40 group-hover:opacity-100 transition-opacity"></div>
          
          <h1 className="text-4xl font-cinzel font-bold text-ester-gold mb-6 uppercase tracking-[0.2em] leading-tight">
            Aprender Baralho Cigano
          </h1>
          
          <p className="text-ester-blue-light mb-10 font-cormorant text-xl italic leading-relaxed">
            "Onde os caminhos se cruzam e o destino se revela."
          </p>
          
          <div className="inline-block bg-ester-gold text-ester-dark px-10 py-4 rounded-full font-cinzel font-black uppercase text-xs tracking-[0.3em] shadow-xl group-hover:bg-ester-accent group-hover:text-white transition-all transform group-hover:scale-105 active:scale-95">
            Entrar no Templo
          </div>
        </div>
      </Link>
    </main>
  );
}