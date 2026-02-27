import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

function formatarConteudo(texto: string) {
  if (!texto) return "";

  const subtitulos = [
    "30 dias", "60 dias", "90 dias",
    "Janela de Tempo", "Gatilho Temporal",
    "Para Solteiros", "Relacionamento Novo", "Relacionamento Sério", 
    "Ex / Sem Contato", "Terceira Pessoa", "Compromisso",
    "Sentimentos:", "Intenções:", "Próxima Ação:",
    "Trabalho em Equipe:", "Parcerias:", "Ofertas e Negociações:", "Ficar ou Sair:",
    "Gastos:", "Dinheiro Compartilhado:", "Riscos Financeiros:",
    "Passado:", "Presente:", "Futuro:", "Conselho:"
  ];

  let textoFinal = texto;

  subtitulos.forEach(titulo => {
    const regex = new RegExp(`${titulo}(?::)?\\s*`, 'gi');
    textoFinal = textoFinal.replace(regex, `<br/><strong style="color: #c4b383; font-family: var(--font-cinzel); display: block; margin-top: 1.5rem; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; border-bottom: 1px solid rgba(196, 179, 131, 0.2); width: fit-content;">${titulo}</strong>`);
  });

  return textoFinal.replace(/^(<br\/>)+/, "");
}

export default async function DetalheCarta({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentId = parseInt(id);

  const prevId = currentId > 1 ? currentId - 1 : 36;
  const nextId = currentId < 36 ? currentId + 1 : 1;
  
  const { data: carta, error } = await supabase
    .from('baralho_cigano')
    .select('*')
    .eq('id', currentId)
    .single();

  if (error || !carta) {
    return (
      <div className="min-h-screen bg-[#2f384b] flex items-center justify-center font-cinzel text-[#c4b383]">
        <p className="animate-pulse">Consultando o Oráculo de Ester...</p>
      </div>
    );
  }

  const sections = [
    { title: "Caminhos do Amor", content: carta.amor, color: "text-[#74b3cf]" },
    { title: "Prosperidade & Carreira", content: carta.carreira, color: "text-[#4884be]" },
    { title: "Saúde & Vitalidade", content: carta.saude, color: "text-[#74b3cf]" },
    { title: "Conselho de Ester", content: carta.conselho, color: "text-[#c4b383]" },
    { title: "O Tempo", content: carta["tempo "] || carta.tempo, color: "text-[#c4b383]" },
    { title: "Tendências", content: carta.tendencia || carta.tendencias, color: "text-[#c4b383]" },
    { title: "Posição de Leitura", content: carta.posicao_leitura, color: "text-[#c4b383]" },
  ];

  return (
    <main className="min-h-screen bg-[#2f384b] text-slate-100 pb-20 font-cormorant">
      {/* Header com Navegação Lateral */}
      <div className="w-full bg-black/20 p-6 mb-8 border-b border-[#c4b383]/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/cartas" className="text-[#74b3cf] hover:text-[#c4b383] transition-colors uppercase tracking-widest text-xs font-cinzel">
            ← Voltar ao Deck
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <Link href={`/cartas/${prevId}`} className="group flex items-center gap-2 text-[#c4b383] hover:text-white transition-all font-cinzel text-[10px] uppercase tracking-widest">
              <span className="text-xl group-hover:-translate-x-1 transition-transform">‹</span> Anterior
            </Link>
            
            <div className="text-center font-cinzel text-[#c4b383] border-x border-[#c4b383]/20 px-4 md:px-8">
              <span className="block text-[10px] uppercase opacity-70 leading-none mb-1">Carta</span>
              <span className="text-xl font-bold leading-none">#{carta.id}</span>
            </div>

            <Link href={`/cartas/${nextId}`} className="group flex items-center gap-2 text-[#c4b383] hover:text-white transition-all font-cinzel text-[10px] uppercase tracking-widest">
              Próxima <span className="text-xl group-hover:translate-x-1 transition-transform">›</span>
            </Link>
          </div>

          <div className="hidden md:block text-right font-cinzel text-[#c4b383]">
              <span className="text-[10px] uppercase opacity-70 tracking-tighter">Oráculo de Ester</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-[#c4b383] mb-6 uppercase leading-none tracking-tight">
            {carta.nome_carta}
          </h1>
          <p className="text-xl md:text-2xl italic text-[#74b3cf] max-w-3xl mx-auto leading-relaxed">
            "{carta.resumo}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Esquerdo: Imagem da Carta (CORRIGIDO PARA ADAPTAÇÃO) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col items-center">
            <div className="relative w-fit group"> 
              {/* Brilho de fundo que segue o tamanho do card */}
              <div className="absolute -inset-1 bg-[#c4b383]/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative w-fit bg-[#2f384b] rounded-2xl border-[3px] border-[#c4b383] overflow-hidden shadow-2xl">
                <Image 
                  src={`/cartas/${carta.id}.png`} 
                  alt={carta.nome_carta}
                  width={320} // Largura base, mas o card se adaptará se a imagem for diferente
                  height={480}
                  className="block object-contain transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                
                {/* Gradiente para leitura do nome na base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                
                <h2 className="absolute bottom-8 left-0 right-0 text-[#c4b383] text-2xl font-cinzel uppercase tracking-[0.2em] text-center px-4 drop-shadow-md">
                  {carta.nome_carta}
                </h2>
              </div>
            </div>
            
            {/* Infos Adicionais */}
            <div className="mt-8 text-center space-y-2 font-cinzel">
               <p className="text-[#c4b383] uppercase text-[10px] tracking-[0.4em] font-bold">{carta.astrologia}</p>
               <div className="h-px w-12 bg-[#c4b383]/30 mx-auto"></div>
               <p className="text-[#4884be] italic text-lg">{carta.planeta} • {carta.naipe}</p>
            </div>
          </div>

          {/* Lado Direito: Conteúdo Masonry */}
          <div className="lg:col-span-8">
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              
              <section className="break-inside-avoid p-8 bg-white/5 rounded-3xl border border-[#c4b383]/10 border-l-4 border-l-[#c4b383] shadow-xl">
                <h3 className="font-cinzel text-[10px] uppercase tracking-widest text-[#c4b383] mb-4">O Mistério da Carta</h3>
                <p className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">
                  {carta.descricao_geral}
                </p>
              </section>

              {sections.map((item, idx) => (
                item.content && (
                  <div key={idx} className="break-inside-avoid p-6 rounded-2xl bg-black/20 border border-white/5 shadow-lg hover:bg-white/5 transition-all">
                    <h4 className={`font-cinzel text-xs uppercase tracking-widest font-bold mb-4 ${item.color} border-b border-white/5 pb-2`}>
                      {item.title}
                    </h4>
                    <div 
                      className="text-slate-300 text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatarConteudo(item.content) }}
                    />
                  </div>
                )
              ))}
            </div>

            <div className="mt-12">
              <Link href={`/cartas/${id}/combinacoes`} className="block group">
                <button className="w-full py-6 rounded-full bg-[#c4b383] text-[#2f384b] font-cinzel font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-[#4884be] hover:text-white transition-all transform active:scale-95 cursor-pointer">
                  Revelar Combinações de Ester →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}