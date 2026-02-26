import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function Listagem() {
  const { data: cartas } = await supabase.from('baralho_cigano').select('id, nome_carta').order('id');

  return (
    <div className="min-h-screen bg-[#201c20] p-8">
      <header className="mb-12 text-center">
        <h2 className="text-[#be976f] text-4xl font-serif">As 36 Cartas</h2>
        <div className="w-24 h-px bg-[#446fa2] mx-auto mt-2"></div>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {cartas?.map(carta => (
          <Link key={carta.id} href={`/cartas/${carta.id}`}>
            <div className="aspect-[2/3] bg-[#704e3d]/10 border border-[#be976f]/20 rounded-md flex flex-col items-center justify-center p-4 hover:border-[#669cc1] hover:bg-[#704e3d]/20 transition-all group">
              <span className="text-[#446fa2] text-xs mb-2 font-mono">#{carta.id}</span>
              <h3 className="text-[#be976f] text-center font-serif text-sm uppercase group-hover:text-white">
                {carta.nome_carta}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}