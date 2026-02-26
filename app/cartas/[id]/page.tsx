import { supabase } from '@/lib/supabase';
import Link from 'next/link';

function formatarConteudo(texto: string) {
  if (!texto) return "";

  const subtitulos = [
    "Para Solteiros", "Relacionamento Novo", "Relacionamento Sério", 
    "Ex / Sem Contato", "Terceira Pessoa", "Compromisso",
    "Sentimentos", "Intenções", "Próxima Ação",
    "Trabalho em Equipe", "Parcerias", "Ofertas e Negociações", "Ficar ou Sair",
    "Gastos", "Dinheiro Compartilhado", "Riscos Financeiros",
    "Janela de Tempo", "Gatilho Temporal"
  ];

  let textoFinal = texto;

  subtitulos.forEach(titulo => {
    const regex = new RegExp(`(${titulo})`, 'g');
    // Usando #be976f para os sub-títulos dentro do texto
    textoFinal = textoFinal.replace(regex, `<br/><strong style="color: #be976f" class="block mt-4 border-b border-[#704e3d]/30 w-fit uppercase text-[10px] tracking-widest font-serif">${titulo}</strong>`);
  });

  return textoFinal;
}

export default async function DetalheCarta({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: carta, error } = await supabase
    .from('baralho_cigano')
    .select('*')
    .eq('id', parseInt(id))
    .single();

  if (error || !carta) {
    return (
      <div className="min-h-screen bg-[#201c20] flex items-center justify-center font-serif text-[#be976f]">
        <p className="animate-pulse">Consultando o Oráculo...</p>
      </div>
    );
  }

  const sections = [
    { title: "Caminhos do Amor", content: carta.amor, color: "text-[#669cc1]", border: "border-[#446fa2]/30" },
    { title: "Prosperidade & Carreira", content: carta.carreira, color: "text-[#669cc1]", border: "border-[#446fa2]/30" },
    { title: "Vitalidade & Saúde", content: carta.saude, color: "text-[#669cc1]", border: "border-[#446fa2]/30" },
    { title: "Aconselhamento", content: carta.conselho, color: "text-[#be976f]", border: "border-[#be976f]/30" },
    { title: "Tempo", content: carta["tempo "], color: "text-[#be976f]", border: "border-[#be976f]/30" },
  ];

  return (
    <main className="min-h-screen bg-[#201c20] text-slate-200 pb-20">
      {/* Header com Azul e Dourado */}
      <div className="w-full bg-[#704e3d]/10 p-6 mb-8 border-b border-[#be976f]/20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/cartas" className="text-[#669cc1] hover:text-[#be976f] transition-all uppercase tracking-widest text-xs font-serif">
            ← Voltar ao Baralho
          </Link>
          <div className="text-right font-serif">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-[#be976f]/70">Carta Número</span>
            <span className="text-2xl font-bold text-[#be976f]">#{carta.id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Título com a cor Dourada (#be976f) */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#be976f] mb-6 drop-shadow-sm uppercase tracking-wider">
            {carta.nome_carta}
          </h1>
          <p className="font-body text-xl italic text-[#669cc1] max-w-2xl mx-auto leading-relaxed">
            "{carta.resumo}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna Esquerda: Moldura Dourada e Marrom */}
          <div className="lg:col-span-4 space-y-6 font-serif">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#be976f]/20 rounded-2xl blur opacity-25"></div>
              <div className="relative aspect-[2/3] bg-[#201c20] rounded-2xl border-2 border-[#be976f] flex items-center justify-center overflow-hidden">
                <span className="text-[#704e3d] italic text-sm">Arte da Cigana Ester</span>
              </div>
            </div>
            
            <div className="p-6 bg-[#704e3d]/10 rounded-2xl border border-[#be976f]/20 text-center">
               <p className="text-[10px] uppercase tracking-widest text-[#be976f] mb-2 font-bold font-serif">Energia Astral</p>
               <div className="h-px bg-[#be976f]/30 mb-4 mx-auto w-1/2"></div>
               <p className="text-lg text-slate-200">{carta.astrologia} • {carta.planeta}</p>
               <p className="text-xs text-[#446fa2] mt-2 font-mono uppercase tracking-widest font-bold">{carta.naipe}</p>
            </div>
          </div>

          {/* Coluna Direita: Conteúdo com tons de Azul e Ouro */}
          <div className="lg:col-span-8 space-y-10">
            <section className="relative p-8 bg-[#704e3d]/5 rounded-3xl border border-[#be976f]/10 shadow-xl border-l-4 border-l-[#be976f]">
              <h3 className="font-serif text-[10px] uppercase tracking-[0.2em] text-[#be976f] font-bold mb-4">O Mistério da Carta</h3>
              <p className="font-body text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                {carta.descricao_geral}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl bg-[#704e3d]/5 border ${item.border} hover:bg-[#704e3d]/10 transition-all duration-300`}>
                  <h4 className={`font-serif text-xs uppercase tracking-widest font-bold mb-3 ${item.color} border-b border-[#be976f]/10 pb-2`}>
                    {item.title}
                  </h4>
                  
                  <div 
                    className="font-body text-base text-slate-300 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: formatarConteudo(item.content) }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botão de Combinações usando Azul e Dourado */}
        <div className="mt-20 flex justify-center">
          <Link href={`/cartas/${id}/combinacoes`} className="relative inline-flex group font-serif">
            <div className="absolute -inset-1 bg-[#446fa2] rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
            <button className="relative px-12 py-5 bg-[#be976f] text-[#201c20] rounded-full leading-none flex items-center font-bold uppercase tracking-widest hover:bg-[#669cc1] hover:text-white transition-all">
              Ver Combinações de Ester →
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}