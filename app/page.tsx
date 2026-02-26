import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#201c20] p-6">
      <Link href="/cartas">
        <div className="group relative bg-[#704e3d]/20 p-12 rounded-lg border border-[#be976f]/30 hover:border-[#be976f] transition-all cursor-pointer text-center max-w-sm shadow-2xl backdrop-blur-sm">
          {/* Detalhes Dourados */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#be976f]"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#be976f]"></div>
          
          <h1 className="text-3xl font-serif font-bold text-[#be976f] mb-4 uppercase tracking-widest">
            Aprender Baralho Cigano
          </h1>
          <p className="text-[#669cc1] mb-8 font-light italic">
            "Onde os caminhos se cruzam e o destino se revela."
          </p>
          <div className="inline-block bg-[#be976f] text-[#201c20] px-8 py-3 rounded-sm font-bold uppercase text-sm tracking-tighter group-hover:bg-[#669cc1] transition-colors">
            Entrar no Templo
          </div>
        </div>
      </Link>
    </main>
  );
}