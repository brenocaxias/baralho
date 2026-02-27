import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default async function Listagem() {
  const { data: cartas } = await supabase
    .from('baralho_cigano')
    .select('id, nome_carta')
    .order('id');

  return (
    <div className="min-h-screen bg-ester-dark p-8">
      <header className="mb-16 text-center">
        <h2 className="text-ester-gold text-5xl font-cinzel font-bold uppercase tracking-[0.3em]">
          As 36 Cartas
        </h2>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-ester-blue-light/50 to-transparent mx-auto mt-4"></div>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
        {cartas?.map(carta => (
          <Link key={carta.id} href={`/cartas/${carta.id}`} className="group">
            <div className="aspect-[2/3] relative bg-white/5 border border-ester-gold/20 rounded-2xl overflow-hidden shadow-xl hover:border-ester-blue-light transition-all duration-500">
              
              {/* Imagem da Carta como Miniatura */}
              <Image 
                src={`/cartas/${carta.id}.png`} 
                alt={carta.nome_carta}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              />

              {/* Overlay de Gradiente para legibilidade do texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Conteúdo sobreposto à imagem */}
              <div className="absolute inset-0 p-4 flex flex-col items-center justify-end z-10">
                <span className="text-ester-blue-light text-[10px] mb-1 font-cinzel tracking-widest opacity-80 group-hover:opacity-100">
                  #{carta.id}
                </span>
                
                <h3 className="text-ester-gold text-center font-cinzel text-xs md:text-sm uppercase leading-tight group-hover:text-white transition-colors drop-shadow-lg">
                  {carta.nome_carta}
                </h3>

                {/* Detalhe decorativo */}
                <div className="w-6 h-px bg-ester-gold/40 mt-3 group-hover:w-12 group-hover:bg-ester-gold transition-all duration-500"></div>
              </div>

              {/* Brilho interno no hover */}
              <div className="absolute inset-0 pointer-events-none border border-white/0 group-hover:border-white/10 rounded-2xl transition-all duration-500"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navegação de Rodapé */}
      <footer className="mt-20 text-center pb-10">
        <Link href="/" className="text-ester-blue-light hover:text-ester-gold font-cinzel text-xs uppercase tracking-[0.2em] transition-colors border-b border-ester-blue-light/20 pb-1">
          ← Voltar ao Início
        </Link>
      </footer>
    </div>
  );
}