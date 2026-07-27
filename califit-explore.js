(function instalarModuloExplorarCalifit(){
'use strict';

function padraoBibliotecaLabel(pad){
  const mapa={puxarV:'puxar vertical',puxarH:'puxar horizontal',empurrar:'empurrar',agachar:'agachar',dobrarQ:'dobrar quadril',hinge:'dobrar quadril',core:'core',mob:'mobilidade',mobilidade:'mobilidade',ombro:'ombro/manguito',metabolico:'metabólico',carregado:'carga externa',unilateral:'unilateral',isometria:'isometria'};
  return mapa[pad]||String(pad||'geral').replace(/_/g,' ');
}
function nivelBibliotecaLabel(nivel){
  return ({init:'iniciante',inter:'intermediário',avanc:'avançado'}[nivel]||String(nivel||'não definido'));
}
const CATEGORIAS_BIBLIOTECA_CALIFIT=['Empurrar','Puxar','Pernas','Core','Mobilidade','Condicionamento','Ombro/prevenção'];
const ALIASES_BIBLIOTECA_CALIFIT={
  'Australian pull-up':['Australian Pull-up','Remada australiana','Remada invertida','Body row'],
  'Remada Invertida':['Australian Pull-up','Remada australiana','Body row'],
  'Flexão no Solo':['Flexão','Push-up','Pushup'],
  'Flexão inclinada':['Incline push-up','Flexão na parede'],
  'Pike push-up':['Flexão pike'],
  'Flexões nas Paralelas':['Paralelas','Dips'],
  'Barra Fixa Pronada':['Pull-up','Barra fixa'],
  'Barra Fixa Supinada':['Chin-up','Chinup'],
  'Scapular Pull-ups':['Scapular pull-up','Ativação escapular na barra'],
  'Agachamento':['Squat'],
  'Agachamento Búlgaro':['Bulgarian split squat','Split squat'],
  'Avanço Alternado':['Lunge','Avanço'],
  'Hollow Body Hold':['Hollow hold','Hollow'],
  'Prancha Lateral':['Side plank'],
  'External Rotation':['Rotação externa com elástico'],
  'Face Pull':['Face pull com elástico'],
  'RDL KB':['Levantamento terra romeno com kettlebell','Romanian deadlift KB']
};
function aliasesBibliotecaCalifit(nome,canon){
  const n=normTxt(nome), c=normTxt(canon||nome);
  const aliases=[];
  Object.entries(ALIASES_META_EXERCICIOS||{}).forEach(([alias,dest])=>{
    if(normTxt(dest)===n||normTxt(dest)===c) aliases.push(alias);
  });
  [nome,canon].filter(Boolean).forEach(k=>arr(ALIASES_BIBLIOTECA_CALIFIT[k]).forEach(a=>aliases.push(a)));
  return [...new Set(aliases.filter(a=>a&&normTxt(a)!==n&&normTxt(a)!==c))];
}
function categoriaBibliotecaCalifit(nome,padroes=[]){
  const texto=normTxt([nome,arr(padroes).join(' ')].join(' '));
  if(/empurrar|flex|push|dip|paralela|pike|handstand|desenvolvimento/.test(texto)) return 'Empurrar';
  if(/puxar|remada|barra|pull|chin|face pull/.test(texto)) return 'Puxar';
  if(/agachar|agach|squat|avan|lunge|step|pistol|panturrilha|ponte|gluteo|glúteo|rdl|hinge|swing|terra/.test(texto)) return 'Pernas';
  if(/core|prancha|hollow|dead bug|bird dog|abdominal|sit-up|v-up|leg raise|roda/.test(texto)) return 'Core';
  if(/metabolico|metabólico|condicionamento|corda|burpee|polichinelo|corrida|crawl|jack|marcha|caminhada/.test(texto)) return 'Condicionamento';
  if(/ombro|manguito|external rotation|rotacao externa|rotação externa|wall slide|scapular|retracao|retração|face pull/.test(texto)) return 'Ombro/prevenção';
  if(/mobilidade|alongamento|cat-cow|open book|pass through|circulos|círculos|toracica|torácica|quadril|tornozelo/.test(texto)) return 'Mobilidade';
  return 'Mobilidade';
}
function textoPraticoBiblioteca(txt,fallback){
  const bruto=String(txt||'').trim();
  const ruim=/^(execute o movimento com controle|faça o exercício corretamente|use boa técnica|trabalha o corpo todo|sem descrição)\.?$/i.test(bruto);
  return (!bruto||ruim)?fallback:bruto;
}
function segurancaBibliotecaCalifit(nome,item={}){
  const t=normTxt([nome,item.categoria,item.padraoLabel,arr(item.regioes).join(' '),item.musculos].join(' '));
  if(/flex|paralela|dip|empurrar/.test(t)) return 'Se houver dor no punho ou ombro, use apoio neutro, reduza a amplitude ou escolha uma variação inclinada.';
  if(/barra|remada|pull|puxar|face pull/.test(t)) return 'Se ombro, cotovelo ou pegada incomodarem, reduza volume, use assistência ou escolha uma puxada mais leve.';
  if(/prancha|hollow|dead bug|bird dog|core|abdominal|roda/.test(t)) return 'Mantenha a lombar confortável; reduza tempo ou amplitude se perder controle.';
  if(/agach|avan|step|pistol|pernas|panturrilha/.test(t)) return 'Use amplitude confortável e mantenha joelho alinhado ao pé; reduza impacto se houver dor.';
  if(/rdl|swing|terra|hinge|kettlebell/.test(t)) return 'Priorize dobrar o quadril com coluna neutra; pare se a lombar assumir o movimento.';
  if(/pike|handstand|overhead|ombro\/prevenção/.test(t)) return 'Evite forçar ombro, punho ou cervical; reduza amplitude e carga se houver desconforto.';
  return '';
}
function equipamentoBibliotecaLabel(meta={},nome=''){
  const mapa={barra:'Barra fixa',barra_fixa:'Barra fixa',paralelas:'Barras paralelas',argolas:'Argolas',trx:'TRX/Suspensão',kettlebell:'Kettlebell',halteres:'Halteres',colete:'Colete com peso',cinto_carga:'Cinto de carga',cinto:'Cinto de carga',mochila:'Mochila lastrada',medicine_ball:'Medicine Ball',tornozeleira:'Pesos de tornozelo',elastico:'Elásticos/faixas de resistência',roda_abdominal:'Roda abdominal',banco:'Banco/Cadeira',step:'Step/Degrau',corda:'Corda de pular',bosu:'Bosu',handgrip:'Handgrip'};
  const lista=arr(meta.exige||meta.equipamentos||meta.equipamentosNecessarios).map(e=>mapa[e]||e).filter(Boolean);
  const n=normTxt(nome);
  if(!lista.length){
    if(/barra|pull-up|pullup/.test(n)) lista.push('Barra fixa');
    else if(/elastico|face pull|external rotation|rotacao externa|remada com elastico/.test(n)) lista.push('Elásticos/faixas de resistência');
    else if(/argola/.test(n)) lista.push('Argolas');
    else if(/trx|suspensao/.test(n)) lista.push('TRX/Suspensão');
    else if(/kettlebell|\bkb\b|goblet|swing/.test(n)) lista.push('Kettlebell');
    else if(/halter/.test(n)) lista.push('Halteres');
    else if(/colete/.test(n)) lista.push('Colete com peso');
    else if(/mochila/.test(n)) lista.push('Mochila lastrada');
    else if(/medicine|bola medicinal/.test(n)) lista.push('Medicine Ball');
    else if(/tornozelo|tornozeleira/.test(n)) lista.push('Pesos de tornozelo');
    else if(/step|bulgaro|búlgaro|banco|cadeira|inclinada/.test(n)) lista.push('Banco/Cadeira');
    else if(/roda/.test(n)) lista.push('Roda abdominal');
    else if(/corda/.test(n)) lista.push('Corda de pular');
    else lista.push('Peso corporal');
  }
  return [...new Set(lista)];
}
function labelsBibliotecaCalifit(valor){
  const mapa={
    'tornozelo pe':['Tornozelo/pé'],
    pe:['pé'],
    tornozelo:['tornozelo'],
    joelho:['joelho'],
    quadril:['quadril'],
    'panturrilha aquiles':['panturrilha','tendão de Aquiles'],
    aquiles:['tendão de Aquiles'],
    panturrilha:['panturrilha'],
    triceps:['tríceps'],
    biceps:['bíceps'],
    quadriceps:['quadríceps'],
    gluteos:['glúteos'],
    gluteo:['glúteo'],
    'lombar quadril':['lombar','quadril'],
    'costas ombros':['costas','ombros'],
    'punho mao':['punho/mão'],
    'punho antebraco':['punho','antebraço'],
    antebraco:['antebraço'],
    'posterior coxa':['posterior de coxa'],
    'posterior de coxa':['posterior de coxa'],
    'peitoral ombro triceps':['peitoral','ombro','tríceps'],
    peitoral:['peitoral'],
    ombro:['ombro'],
    ombros:['ombros'],
    punho:['punho'],
    punhos:['punhos'],
    costas:['costas'],
    core:['Core'],
    'abdomen core':['Core'],
    abdomen:['abdômen'],
    abdomem:['abdômen'],
    lombar:['lombar'],
    'lombar coluna':['lombar/coluna'],
    'toracica cervical':['torácica/cervical'],
    cervical:['cervical'],
    cotovelo:['cotovelo'],
    cotovelos:['cotovelos'],
    'corpo inteiro':['corpo inteiro']
  };
  const bruto=String(valor||'').replace(/_/g,' ').replace(/\s+/g,' ').trim();
  if(!bruto) return [];
  const partes=bruto.split(/\s*,\s*|\s+e\s+/i).filter(Boolean);
  const saida=[];
  partes.forEach(parte=>{
    const n=normTxt(parte).replace(/[_/]+/g,' ').replace(/\s+/g,' ').trim();
    if(!n) return;
    if(mapa[n]){saida.push(...mapa[n]);return;}
    if(/tornozelo.*\bpe\b|\bpe\b.*tornozelo/.test(n)){saida.push('Tornozelo/pé');return;}
    if(/panturrilha.*aquiles|aquiles.*panturrilha/.test(n)){saida.push('panturrilha','tendão de Aquiles');return;}
    if(/punho.*mao|mao.*punho/.test(n)){saida.push('punho/mão');return;}
    if(/punho.*antebraco|antebraco.*punho/.test(n)){saida.push('punho','antebraço');return;}
    if(/posterior.*coxa/.test(n)){saida.push('posterior de coxa');return;}
    if(/gluteo/.test(n)){saida.push('glúteos');return;}
    if(/peitoral.*ombro.*triceps/.test(n)){saida.push('peitoral','ombro','tríceps');return;}
    if(/lombar.*quadril/.test(n)){saida.push('lombar','quadril');return;}
    if(/costas.*ombro/.test(n)){saida.push('costas','ombros');return;}
    saida.push(parte.trim().replace(/^./,c=>c.toUpperCase()));
  });
  return [...new Set(saida.filter(Boolean))];
}
function formatarLabelsBibliotecaCalifit(lista){
  return [...new Set(arr(lista).flatMap(labelsBibliotecaCalifit).filter(Boolean))];
}
function regioesBiblioteca(meta={},exd={}){
  const deMeta=[...arr(meta.regioes),...arr(meta.regioesPrimarias),...arr(meta.regioesSecundarias)].map(v=>String(v||'').replace(/_/g,' ').trim());
  const deExd=String(exd.m||'').split(/,| e /).map(v=>v.trim());
  return formatarLabelsBibliotecaCalifit([...deMeta,...deExd].filter(Boolean));
}
function normalizarChaveFiltroBibliotecaCalifit(campo,valor){
  const n=normTxt(valor||'').replace(/[_/]+/g,' ').replace(/\s+/g,' ').trim();
  if(!n) return '';
  if(campo==='padrao'){
    if(/ombro|manguito|prevencao|prevenção/.test(n)) return 'ombro-prevencao';
    if(/overhead/.test(n)) return 'ombro-prevencao';
    if(/puxar vertical|puxarv/.test(n)) return 'puxar-vertical';
    if(/puxar horizontal|puxarh/.test(n)) return 'puxar-horizontal';
    if(/dobrar quadril|hinge/.test(n)) return 'dobrar-quadril';
    if(/carga externa|carregado|carregada/.test(n)) return 'carga-externa';
    if(/condicionamento|metabolico|metabólico|impacto|salto/.test(n)) return 'condicionamento';
    if(/empurrar/.test(n)) return 'empurrar';
    if(/puxar/.test(n)) return 'puxar';
    if(/pernas|agachar|agachamento|squat|panturrilha/.test(n)) return n.includes('agachar')?'agachar':'pernas';
    if(/core|abdomen|abdômen|abdomem/.test(n)) return 'core';
    if(/mobilidade|controle motor|recuperacao|recuperação|respiracao|respiração|instabilidade/.test(n)) return 'mobilidade';
    if(/unilateral/.test(n)) return 'unilateral';
    if(/isometria/.test(n)) return 'isometria';
  }
  if(campo==='regiao'){
    if(/abdomen|abdômen|abdomem|core/.test(n)) return 'core';
    if(/peitoral|peito/.test(n)) return 'peitoral';
    if(/costas|dorsal|dorsais|romboide|grande dorsal/.test(n)) return 'costas';
    if(/ombro|delt|escapula|escápula|manguito|serratil|serrátil/.test(n)) return 'ombros';
    if(/triceps|tríceps/.test(n)) return 'triceps';
    if(/biceps|bíceps/.test(n)) return 'biceps';
    if(/quadriceps|quadríceps/.test(n)) return 'quadriceps';
    if(/posterior|isquio/.test(n)) return 'posterior-coxa';
    if(/gluteo|glúteo/.test(n)) return 'gluteos';
    if(/quadril|adutor|capsula|cápsula|flexor/.test(n)) return 'quadril';
    if(/panturrilha|aquiles/.test(n)) return 'panturrilhas';
    if(/lombar|coluna/.test(n)) return 'lombar';
    if(/cervical|toracica|torácica/.test(n)) return 'cervical';
    if(/cotovelo/.test(n)) return 'cotovelos';
    if(/tornozelo|pe|pé/.test(n)) return 'tornozelo';
    if(/punho|mao|mão/.test(n)) return 'punhos';
    if(/corpo todo|corpo inteiro|full body|condicionamento|controle|coordenacao|coordenação|estabilizador|postura/.test(n)) return 'corpo-todo';
  }
  if(campo==='equipamento'){
    if(/barra fixa|barra/.test(n)) return 'barra';
    if(/elasticos|elásticos|elastico|elástico|faixas de resistencia|faixas de resistência/.test(n)) return 'elasticos';
    if(/paralela/.test(n)) return 'paralelas';
    return n;
  }
  if(campo==='nivel'){
    if(/inic/.test(n)) return 'iniciante';
    if(/inter/.test(n)) return 'intermediario';
    if(/avanc|avanç/.test(n)) return 'avancado';
  }
  return n;
}
function rotuloFiltroBibliotecaCalifit(campo,valor){
  const k=normalizarChaveFiltroBibliotecaCalifit(campo,valor);
  const padrao={empurrar:'Empurrar',puxar:'Puxar','puxar-vertical':'Puxar vertical','puxar-horizontal':'Puxar horizontal',pernas:'Pernas',agachar:'Agachar','dobrar-quadril':'Dobrar quadril',core:'Core',mobilidade:'Mobilidade',condicionamento:'Condicionamento','ombro-prevencao':'Ombro/prevenção','carga-externa':'Carga externa',unilateral:'Unilateral',isometria:'Isometria'};
  const regiao={core:'Core',peitoral:'Peitoral',costas:'Costas',ombros:'Ombros',triceps:'Tríceps',biceps:'Bíceps',quadriceps:'Quadríceps','posterior-coxa':'Posterior de coxa',gluteos:'Glúteos',panturrilhas:'Panturrilhas',lombar:'Lombar',quadril:'Quadril',tornozelo:'Tornozelo',punhos:'Punhos',cervical:'Cervical',cotovelos:'Cotovelos','corpo-todo':'Corpo todo'};
  const nivel={iniciante:'iniciante',intermediario:'intermediário',avancado:'avançado'};
  const tituloFallback=v=>String(v||'').trim().replace(/\s+/g,' ').replace(/^./,c=>c.toUpperCase());
  if(campo==='padrao') return padrao[k]||tituloFallback(valor);
  if(campo==='regiao') return regiao[k]||tituloFallback(valor);
  if(campo==='nivel') return nivel[k]||String(valor||'').trim();
  if(campo==='equipamento'){
    const rot={elasticos:'Elásticos/faixas de resistência',paralelas:'Barras paralelas'};
    return rot[k]||String(valor||'').trim();
  }
  return String(valor||'').trim();
}
function chavesItemFiltroBibliotecaCalifit(campo,item){
  const vals=[];
  if(campo==='padrao') vals.push(item.categoria,item.padraoLabel,...arr(item.padroes).map(padraoBibliotecaLabel));
  if(campo==='regiao') vals.push(item.categoria,item.padraoLabel,item.musculos,...arr(item.regioes));
  if(campo==='equipamento') vals.push(...arr(item.equipamentos));
  if(campo==='nivel') vals.push(item.nivelLabel,item.dificuldade);
  return [...new Set(vals.map(v=>normalizarChaveFiltroBibliotecaCalifit(campo,v)).filter(Boolean))];
}
function nomesExerciciosBiblioteca(){
  const unicos=new Map();
  [...Object.keys(EXD||{}),...Object.keys(META_EXERCICIOS||{}),...Object.keys(EX_INFO||{})].forEach(nome=>{
    const chave=normTxt(nome);
    if(chave&&!unicos.has(chave)) unicos.set(chave,nome);
  });
  return [...unicos.values()].sort((a,b)=>a.localeCompare(b,'pt-BR'));
}
function itemExercicioBiblioteca(nome){
  const canon=nomeCanonicoMetaExercicio(nome)||nome;
  const exd=EXD[nome]||EXD[canon]||{};
  const meta=metaExercicioPorNome(nome)||metaExercicioPorNome(canon)||{};
  const info=EX_INFO[nome]||EX_INFO[canon]||{};
  const padroes=[...new Set([exd.pad,...arr(meta.padroes||meta.padrao)].filter(Boolean))];
  const regioes=regioesBiblioteca(meta,exd);
  const equipamentos=equipamentoBibliotecaLabel(meta,nome);
  const categoria=categoriaBibliotecaCalifit(nome,padroes);
  const aliases=aliasesBibliotecaCalifit(nome,canon);
  const nivel=meta.nivelMinimo||'init';
  const descricao=textoPraticoBiblioteca(info.sub||info.objetivo||exd.d,`Exercício de ${categoria.toLowerCase()} usado no CaliFit com execução controlada e progressão gradual.`);
  const passos=arr(info.passos).length?arr(info.passos):(exd.d?exd.d.split('.').map(s=>textoLeigo(s.trim())).filter(Boolean).slice(0,3):[]);
  const musculosFmt=formatarLabelsBibliotecaCalifit(String(exd.m||'').split(/,| e /).map(v=>v.trim())).join(', ');
  const itemBase={
    nome:info.titulo||nome,
    nomeTecnico:canon||nome,
    aliases,
    categoria,
    padrao:padroes[0]||'geral',
    padroes,
    padraoLabel:padroes.map(padraoBibliotecaLabel).join(', ')||categoria.toLowerCase(),
    musculos:musculosFmt||regioes.join(', '),
    regioes,
    equipamentos,
    nivel,
    nivelLabel:nivelBibliotecaLabel(nivel),
    dificuldade:meta.agressividade||'',
    progressao:textoPraticoBiblioteca(exd.prog||info.progressao,'Aumente repetições, amplitude, tempo ou dificuldade apenas quando completar com técnica boa, esforço percebido até 8 e sem dor.'),
    descricao,
    passos,
    dica:info.dica||'Mantenha controle e pare se houver dor.',
    erroComum:textoPraticoBiblioteca(info.erro||info.erroComum,'Fazer rápido demais, perder alinhamento ou compensar com outra região.'),
    regressao:textoPraticoBiblioteca(info.reg||info.regressao||info.alternativa||arr(meta.alternativas)[0],'Reduza amplitude, tempo, carga ou use uma variação mais simples.'),
    alternativas:arr(meta.alternativas)
  };
  itemBase.seguranca=info.seguranca||segurancaBibliotecaCalifit(nome,itemBase);
  return {
    ...itemBase
  };
}
function listarExerciciosBibliotecaCalifit(){
  return nomesExerciciosBiblioteca().map(itemExercicioBiblioteca);
}
function filtrarExerciciosBibliotecaCalifit(filtros={}){
  const busca=normTxt(filtros.busca||filtros.q||'');
  const padrao=normalizarChaveFiltroBibliotecaCalifit('padrao',filtros.padrao||filtros.movimento||'');
  const equipamento=normalizarChaveFiltroBibliotecaCalifit('equipamento',filtros.equipamento||'');
  const regiao=normalizarChaveFiltroBibliotecaCalifit('regiao',filtros.regiao||filtros.musculo||'');
  const nivel=normalizarChaveFiltroBibliotecaCalifit('nivel',filtros.nivel||filtros.dificuldade||'');
  return listarExerciciosBibliotecaCalifit().filter(item=>{
    const texto=normTxt([item.nome,item.nomeTecnico,item.aliases.join(' '),item.categoria,item.descricao,item.musculos,item.progressao,item.padraoLabel,item.equipamentos.join(' '),item.regioes.join(' '),item.nivelLabel,item.dificuldade].join(' '));
    return (!busca||texto.includes(busca))
      &&(!padrao||chavesItemFiltroBibliotecaCalifit('padrao',item).includes(padrao))
      &&(!equipamento||chavesItemFiltroBibliotecaCalifit('equipamento',item).includes(equipamento))
      &&(!regiao||chavesItemFiltroBibliotecaCalifit('regiao',item).includes(regiao))
      &&(!nivel||chavesItemFiltroBibliotecaCalifit('nivel',item).includes(nivel));
  });
}
function detalheExercicioBibliotecaCalifit(nome){
  const alvo=normTxt(nome);
  const canon=nomeCanonicoMetaExercicio(nome);
  const alvoCanon=normTxt(canon||'');
  const itens=listarExerciciosBibliotecaCalifit();
  return itens.find(item=>normTxt(item.nome)===alvo||normTxt(item.nomeTecnico)===alvo||normTxt(item.nome)===alvoCanon||normTxt(item.nomeTecnico)===alvoCanon||arr(item.aliases).some(a=>normTxt(a)===alvo||normTxt(a)===alvoCanon))
    ||filtrarExerciciosBibliotecaCalifit({busca:nome})[0]
    ||null;
}
function opcoesFiltroBiblioteca(campo){
  const itens=listarExerciciosBibliotecaCalifit();
  const mapa=new Map();
  itens.forEach(item=>{
    let valores=[];
    if(campo==='padrao') valores=[item.categoria,...item.padroes.map(padraoBibliotecaLabel)];
    if(campo==='equipamento') valores=item.equipamentos;
    if(campo==='regiao') valores=[...item.regioes,item.musculos,item.categoria];
    if(campo==='nivel'&&item.nivelLabel) valores=[item.nivelLabel];
    valores.forEach(v=>{
      const chave=normalizarChaveFiltroBibliotecaCalifit(campo,v);
      if(chave&&!mapa.has(chave)) mapa.set(chave,rotuloFiltroBibliotecaCalifit(campo,v));
    });
  });
  const vals=[...mapa.values()].filter(Boolean);
  return vals.sort((a,b)=>a.localeCompare(b,'pt-BR',{sensitivity:'base'}));
}
function estadoBibliotecaAtualCalifit(){
  return {
    busca:$('bib-busca')?.value||'',
    padrao:$('bib-padrao')?.value||'',
    equipamento:$('bib-eq')?.value||'',
    regiao:$('bib-regiao')?.value||'',
    nivel:$('bib-nivel')?.value||''
  };
}
function htmlCardExercicioBibliotecaCalifit(item,i){
  const chips=[item.categoria,item.nivelLabel,item.regioes[0]].filter(Boolean).slice(0,3);
  return `<div class="info ib bib-card">
    <div class="bib-main">
      <div class="bib-title">${escHtml(item.nome)}</div>
      <div class="bib-line">${escHtml(item.categoria)} · ${escHtml(item.equipamentos.join(', '))}</div>
      <div class="bib-desc">${escHtml(item.descricao)}</div>
      ${chips.length?`<div class="bib-chips">${chips.map(c=>`<span class="bib-chip">${escHtml(c)}</span>`).join('')}</div>`:''}
      <div class="bib-demo-row">${htmlSeloCoberturaDiagramaCalifit(item.nome,true)}</div>
    </div>
    <button class="btn btn-s bib-ver" data-bib-det="${i}" type="button">Ver</button>
  </div>`;
}
function htmlDetalheExercicioBiblioteca(item){
  const skillRefs=localizarSkillTreePorExercicioCalifit(item.nomeTecnico||item.nome);
  const skillHtml=skillRefs.length?`<div class="h3">${tituloIcone('skill','Aparece na Skill Tree')}</div><div class="info ig">${skillRefs.slice(0,3).map(ref=>`${escHtml(ref.trilha)}: ${escHtml(ref.nome)}`).join('<br>')}</div><button class="btn btn-s" id="bib-ver-skill" data-skill-no="${escHtml(skillRefs[0].id)}" type="button">${iconeCalifit('skill')} Ver na Skill Tree</button>`:'';
  const iconeBloco={
    Resumo:'detalhe',
    Equipamento:'equipamento',
    Músculos:'musculos',
    'Como fazer':'atividade',
    Dica:'alerta',
    'Erros comuns':'alerta',
    Regressão:'regressao',
    Progressão:'progressao',
    Segurança:'seguranca'
  };
  const bloco=(titulo,html,cls='ib')=>`<div class="bib-block"><div class="h3">${tituloIcone(iconeBloco[titulo]||'detalhe',titulo)}</div><div class="info ${cls}">${html}</div></div>`;
  return `<div class="bib-detail-head">
      <div class="mt2">${escHtml(item.nome)}</div>
      <div class="ms">${escHtml(item.descricao)}</div>
      <div class="bib-demo-row">${htmlSeloCoberturaDiagramaCalifit(item.nome,false)}</div>
      ${item.aliases.length?`<div class="bib-alias"><strong>Também conhecido como:</strong> ${escHtml(item.aliases.slice(0,6).join(', '))}</div>`:''}
    </div>
    ${bloco('Resumo',`<strong>Nome técnico:</strong> ${escHtml(item.nomeTecnico)}<br><strong>Categoria:</strong> ${escHtml(item.categoria)}<br><strong>Padrão:</strong> ${escHtml(item.padraoLabel)}<br><strong>Nível:</strong> ${escHtml(item.nivelLabel)}${item.dificuldade?` · ${escHtml(item.dificuldade)}`:''}`)}
    ${bloco('Equipamento',escHtml(item.equipamentos.join(', ')||'Peso corporal'))}
    ${bloco('Músculos',escHtml(item.regioes.join(', ')||item.musculos||'Não informado'))}
    ${item.passos.length?`<div class="bib-block"><div class="h3">${tituloIcone('atividade','Como fazer')}</div>${htmlDiagramaExercicioCalifit(item.nome,true)}<ol class="bib-steps">${item.passos.map(p=>`<li>${escHtml(p)}</li>`).join('')}</ol></div>`:bloco('Como fazer','Siga a execução indicada no plano e mantenha controle do movimento.')}
    ${item.dica?bloco('Dica',escHtml(item.dica)):''}
    ${bloco('Erros comuns',escHtml(item.erroComum),'io')}
    ${bloco('Regressão',escHtml(item.regressao),'ig')}
    ${bloco('Progressão',escHtml(item.progressao))}
    ${item.seguranca?bloco('Segurança',escHtml(item.seguranca),'io'):''}
    ${skillHtml}`;
}
function ligarDetalheBibliotecaSkillTree(voltar){
  const btn=$('bib-ver-skill');
  btn?.addEventListener('click',()=>abrirDetalheSkillTreeCalifit(btn.dataset.skillNo,()=>typeof voltar==='function'?voltar():abrirSkillTreeCalifit()));
}
function abrirDetalheExercicioBiblioteca(nome,voltar){
  const item=detalheExercicioBibliotecaCalifit(nome);
  if(!item){showToast('Exercício não encontrado.');return;}
  const raiz=$('bib-root');
  if(raiz){
    raiz.innerHTML=`${htmlDetalheExercicioBiblioteca(item)}<button class="btn btn-s" id="bib-back" type="button">Voltar para biblioteca</button>`;
    $('bib-back')?.addEventListener('click',()=>typeof voltar==='function'?voltar():abrirBibliotecaExercicios());
    ligarDetalheBibliotecaSkillTree(voltar);
    return;
  }
  mOpen('m2',`<div id="bib-root">${htmlDetalheExercicioBiblioteca(item)}<button class="btn btn-s" id="bib-back" type="button">Voltar para biblioteca</button></div>`);
  $('bib-back')?.addEventListener('click',()=>typeof voltar==='function'?voltar():abrirBibliotecaExercicios());
  ligarDetalheBibliotecaSkillTree(voltar);
}
function abrirBibliotecaExercicios(){
  const selects=(id,label,opcoes)=>`<label class="fl">${label}</label><select class="fi" id="${id}"><option value="">Todos</option>${opcoes.map(v=>`<option value="${escHtml(v)}">${escHtml(v)}</option>`).join('')}</select>`;
  const listaHtml=(estado={})=>`<div class="mt2">${tituloIcone('biblioteca','Biblioteca de exercícios')}</div>
    <div class="ms">Consulte execução, músculos, equipamentos, regressões e progressões. Esta biblioteca não altera seu plano.</div>
    <div class="bib-top-actions">
      <button class="btn btn-s" id="bib-skilltree" type="button">${iconeCalifit('skill')} Ver Skill Tree</button>
      <button class="btn btn-s" id="bib-clear" type="button">${iconeCalifit('filtro')} Limpar filtros</button>
    </div>
    <div class="bib-filter-panel">
      <label class="fl">Buscar exercício</label><input class="fi" id="bib-busca" placeholder="Ex.: flexão, barra, core" value="${escHtml(estado.busca||'')}">
      <div class="bib-filter-grid">${selects('bib-padrao','Padrão',opcoesFiltroBiblioteca('padrao'))}${selects('bib-eq','Equipamento',opcoesFiltroBiblioteca('equipamento'))}</div>
      <div class="bib-filter-grid">${selects('bib-regiao','Região/músculo',opcoesFiltroBiblioteca('regiao'))}${selects('bib-nivel','Nível',opcoesFiltroBiblioteca('nivel'))}</div>
    </div>
    <div id="bib-res" class="bib-results"></div>
    <button class="btn btn-s" id="bib-close" type="button">Fechar</button>`;
  mOpen('m2',`<div id="bib-root">${listaHtml()}</div>`);
  const render=()=>{
    if(!$('bib-res')) return;
    const estado=estadoBibliotecaAtualCalifit();
    const res=filtrarExerciciosBibliotecaCalifit(estado);
    const alvo=$('bib-res');if(!alvo) return;
    if(!res.length){alvo.innerHTML='<div class="info io">Nenhum exercício encontrado com esses filtros. Use “Limpar filtros” ou tente outro termo de busca.</div>';return;}
    alvo.innerHTML=`<div class="bib-result-head"><div class="bib-result-count">${res.length} encontrado${res.length===1?'':'s'}</div><div class="bib-result-help">Toque em “Ver” para execução e progressões.</div></div>`+res.slice(0,80).map(htmlCardExercicioBibliotecaCalifit).join('');
    alvo.querySelectorAll('[data-bib-det]').forEach(btn=>btn.addEventListener('click',()=>abrirDetalheExercicioBiblioteca(res[+btn.dataset.bibDet].nomeTecnico,()=>{const raiz=$('bib-root');if(raiz)raiz.innerHTML=listaHtml(estado);ligarBiblioteca(estado);})));
  };
  const aplicarEstado=estado=>{
    if(!estado) return;
    if($('bib-padrao')) $('bib-padrao').value=estado.padrao||'';
    if($('bib-eq')) $('bib-eq').value=estado.equipamento||'';
    if($('bib-regiao')) $('bib-regiao').value=estado.regiao||'';
    if($('bib-nivel')) $('bib-nivel').value=estado.nivel||'';
  };
  const ligarBiblioteca=(estado=null)=>{
    aplicarEstado(estado);
    ['bib-busca','bib-padrao','bib-eq','bib-regiao','bib-nivel'].forEach(id=>$(id)?.addEventListener(id==='bib-busca'?'input':'change',render));
    $('bib-skilltree')?.addEventListener('click',abrirSkillTreeCalifit);
    $('bib-clear')?.addEventListener('click',()=>{['bib-busca','bib-padrao','bib-eq','bib-regiao','bib-nivel'].forEach(id=>{const el=$(id);if(el)el.value='';});render();});
    $('bib-close')?.addEventListener('click',()=>mClose('m2'));
    render();
  };
  ligarBiblioteca();
}


const SKILL_TREE_CALIFIT=[{"id":"empurrar","nome":"Empurrar","descricao":"Progressões de flexão, paralelas, argolas e empurrar vertical.","nos":[{"id":"push-incline","nome":"Flexão inclinada","exercicio":"Flexão inclinada","nivel":"iniciante","descricao":"Aprende alinhamento e cotovelos com menos carga.","pre":[],"prox":["push-knees","push-floor"],"tags":["empurrar","base","peso corporal"],"criterio":"Séries confortáveis, corpo alinhado e sem dor no punho/ombro.","evitar":"Cautela com dor no punho, ombro ou cirurgia abdominal recente.","equip":"banco, parede ou apoio firme"},{"id":"push-knees","nome":"Flexão com joelhos","exercicio":"Flexão com joelhos","nivel":"iniciante","descricao":"Ponte entre inclinação e flexão completa.","pre":["push-incline"],"prox":["push-floor"],"tags":["empurrar","base"],"criterio":"Controle a descida e mantenha quadril alinhado.","evitar":"Evite se houver dor no punho/ombro.","equip":"chão/tapete"},{"id":"push-floor","nome":"Flexão no solo","exercicio":"Flexão no Solo","nivel":"iniciante","descricao":"Base de empurrar horizontal com corpo alinhado.","pre":["push-incline","push-knees"],"prox":["push-diamond","push-decline","push-dips"],"tags":["empurrar","peitoral","core"],"criterio":"Complete séries com técnica estável antes de buscar variações difíceis.","evitar":"Cautela com dor no punho, ombro ou abdômen.","equip":"peso corporal"},{"id":"push-diamond","nome":"Flexão diamante","exercicio":"Flexão Diamante","nivel":"intermediário","descricao":"Mais demanda para tríceps e controle de punho.","pre":["push-floor"],"prox":["push-rings"],"tags":["empurrar","tríceps"],"criterio":"Use apenas quando a flexão comum estiver sólida.","evitar":"Evite com dor no punho ou cotovelo.","equip":"peso corporal"},{"id":"push-decline","nome":"Flexão declinada","exercicio":"Flexão no Solo","nivel":"intermediário","descricao":"Aumenta carga em ombros e parte superior do peitoral.","pre":["push-floor"],"prox":["push-pike"],"tags":["empurrar","ombro"],"criterio":"Mantenha escápulas controladas e sem compensar lombar.","evitar":"Cautela com ombro e lombar.","equip":"banco/degrau"},{"id":"push-dips","nome":"Paralelas / dips","exercicio":"Flexões nas Paralelas","nivel":"intermediário","descricao":"Empurrar vertical com foco em peitoral, tríceps e ombro.","pre":["push-floor"],"prox":["push-rings","push-weighted"],"tags":["empurrar","paralelas","tríceps"],"criterio":"Amplitude confortável, ombros sem dor e controle na descida.","evitar":"Evite com dor anterior no ombro.","equip":"barras paralelas ou estação"},{"id":"push-pike","nome":"Pike push-up","exercicio":"Pike push-up","nivel":"intermediário","descricao":"Progressão de empurrar acima da cabeça.","pre":["push-decline"],"prox":["push-handstand"],"tags":["empurrar","ombro","skill futura"],"criterio":"Controle de ombro e core antes de aumentar amplitude.","evitar":"Cautela com dor no ombro, cervical ou pressão na cabeça.","equip":"peso corporal"},{"id":"push-rings","nome":"Flexão em argola","exercicio":"Flexão em Argola","nivel":"avançado","descricao":"Instabilidade exige controle de ombro, escápula e core.","pre":["push-diamond","push-dips"],"prox":["push-weighted"],"tags":["empurrar","argolas","instabilidade"],"criterio":"Use amplitude menor no início e evolua sem tremor excessivo.","evitar":"Evite com dor no ombro, punho ou baixa estabilidade.","equip":"argolas"},{"id":"push-weighted","nome":"Empurrar com carga","exercicio":"Paralelas com carga","nivel":"avançado","descricao":"Carga adicional em paralelas com cinto, depois de uma base livre sólida.","pre":["push-dips","push-rings"],"prox":["push-handstand"],"tags":["empurrar","carga","avançado"],"criterio":"Use carga apenas com paralelas livres técnicas e submáximas.","evitar":"Evite com dor no ombro, cotovelo, punho ou recuperação recente.","equip":"barras paralelas e cinto de carga"},{"id":"push-handstand","nome":"Handstand push-up","exercicio":"Handstand push-up","nivel":"futuro","descricao":"Meta avançada de empurrar vertical invertido.","pre":["push-pike","push-weighted"],"prox":[],"tags":["empurrar","ombro","skill futura"],"criterio":"Requer mobilidade de ombro, core e progressão específica.","evitar":"Não praticar com dor cervical/ombro ou sem domínio técnico.","equip":"parede e progressões específicas"}]},{"id":"puxar","nome":"Puxar","descricao":"Progressões de remadas, escápula, barra assistida e barra fixa.","nos":[{"id":"pull-band-row","nome":"Remada com elástico","exercicio":"Remada com Elástico","nivel":"iniciante","descricao":"Base de puxada com resistência controlável.","pre":[],"prox":["pull-inverted-high","pull-trx-row"],"tags":["puxar","costas","elástico"],"criterio":"Sinta escápulas retraindo sem elevar ombros.","evitar":"Cautela com dor no ombro/cotovelo.","equip":"elástico/faixa"},{"id":"pull-inverted-high","nome":"Remada invertida alta","exercicio":"Remada Invertida","nivel":"iniciante","descricao":"Puxar o corpo inclinado, com carga ajustável.","pre":["pull-band-row"],"prox":["pull-inverted-row","pull-scapular"],"tags":["puxar","remada","peso corporal"],"criterio":"Corpo alinhado e peito indo ao apoio sem perder controle.","evitar":"Cautela com dor no ombro ou lombar.","equip":"barra baixa, mesa firme, TRX ou argolas"},{"id":"pull-trx-row","nome":"Remada TRX/suspensão","exercicio":"Remada TRX","nivel":"iniciante","descricao":"Remada ajustável por inclinação usando suspensão.","pre":["pull-band-row"],"prox":["pull-inverted-row"],"tags":["puxar","suspensão","costas"],"criterio":"Controle a descida e não encolha os ombros.","evitar":"Cautela com dor no ombro/cotovelo.","equip":"TRX/suspensão"},{"id":"pull-inverted-row","nome":"Remada invertida","exercicio":"Remada Invertida","nivel":"intermediário","descricao":"Puxar o corpo mais horizontal com escápulas ativas.","pre":["pull-inverted-high","pull-trx-row"],"prox":["pull-feet-elevated","pull-scapular","pull-negative"],"tags":["puxar","costas","peso corporal"],"criterio":"Mantenha corpo rígido e controle excêntrico.","evitar":"Cautela com dor lombar ou ombro.","equip":"barra, argolas ou TRX"},{"id":"pull-feet-elevated","nome":"Remada com pés elevados","exercicio":"Remada Invertida","nivel":"intermediário","descricao":"Aumenta a carga da remada horizontal.","pre":["pull-inverted-row"],"prox":["pull-ring-row","pull-full"],"tags":["puxar","remada","avançando"],"criterio":"Suba sem quebrar o quadril e sem impulso.","evitar":"Evite se a remada comum ainda não estiver sólida.","equip":"barra/argolas + apoio para pés"},{"id":"pull-scapular","nome":"Ativação escapular na barra","exercicio":"Scapular Pull-ups","nivel":"iniciante","descricao":"Controle dos ombros antes de puxadas verticais fortes.","pre":["pull-inverted-high"],"prox":["pull-negative","pull-assisted"],"tags":["puxar","barra","escápula"],"criterio":"Suba/desça só com escápulas, braços estendidos.","evitar":"Evite com dor no ombro ou sem barra segura.","equip":"barra fixa"},{"id":"pull-negative","nome":"Barra negativa controlada","exercicio":"Barra negativa assistida","nivel":"intermediário","descricao":"Treina a descida da barra com controle.","pre":["pull-scapular","pull-inverted-row"],"prox":["pull-assisted","pull-full"],"tags":["puxar","barra","excêntrica"],"criterio":"Desça em 3–5 segundos sem perder escápulas.","evitar":"Cautela com cotovelo, ombro e recuperação geral.","equip":"barra fixa e apoio"},{"id":"pull-assisted","nome":"Barra assistida","exercicio":"Barra Assistida","nivel":"intermediário","descricao":"Reduz assistência até chegar na barra completa.","pre":["pull-scapular","pull-negative"],"prox":["pull-full"],"tags":["puxar","barra","assistida"],"criterio":"Menos ajuda ao longo das semanas mantendo amplitude.","evitar":"Não force falhas com dor no cotovelo/ombro.","equip":"barra + elástico ou apoio"},{"id":"pull-full","nome":"Barra fixa","exercicio":"Barra Fixa Pronada","nivel":"avançado","descricao":"Puxada vertical completa com controle.","pre":["pull-assisted","pull-negative"],"prox":["pull-supinated","pull-tempo","pull-ring-row"],"tags":["puxar","barra","costas"],"criterio":"Repetições limpas, sem chutar ou perder amplitude.","evitar":"Evite volume alto com dor no cotovelo/ombro.","equip":"barra fixa"},{"id":"pull-supinated","nome":"Barra supinada","exercicio":"Barra Fixa Supinada","nivel":"avançado","descricao":"Variação com mais participação de bíceps.","pre":["pull-full"],"prox":["pull-tempo"],"tags":["puxar","barra","bíceps"],"criterio":"Use quando a barra pronada estiver controlada.","evitar":"Cautela com cotovelo e bíceps.","equip":"barra fixa"},{"id":"pull-ring-row","nome":"Remada em argola avançada","exercicio":"Remada em Argola","nivel":"avançado","descricao":"Remada com mais instabilidade e amplitude.","pre":["pull-feet-elevated","pull-full"],"prox":["pull-muscle-up-base"],"tags":["puxar","argolas","instabilidade"],"criterio":"Controle de escápula e tronco sem perder alinhamento.","evitar":"Cautela com ombro instável.","equip":"argolas"},{"id":"pull-tempo","nome":"Barra com pausa/tempo","exercicio":"Barra Fixa Pronada","nivel":"avançado","descricao":"Aumenta exigência por pausa, excêntrica lenta ou amplitude.","pre":["pull-full","pull-supinated"],"prox":["pull-weighted"],"tags":["puxar","tempo","força"],"criterio":"Pausas sem perder escápula ativa.","evitar":"Evite se já estiver perto da falha todo treino.","equip":"barra fixa"},{"id":"pull-weighted","nome":"Barra com carga","exercicio":"Barra Fixa com carga","nivel":"avançado","descricao":"Carga adicional na barra com cinto, mantendo técnica estável e repetições submáximas.","pre":["pull-tempo"],"prox":["pull-muscle-up-base"],"tags":["puxar","carga","avançado"],"criterio":"Adicionar carga apenas com barras livres sólidas e sem falha.","evitar":"Evite se houver dor, falha recorrente ou baixa recuperação.","equip":"barra fixa e cinto de carga"},{"id":"pull-muscle-up-base","nome":"Base para muscle-up","exercicio":"","conceitual":true,"nivel":"futuro","descricao":"Combina puxada alta, transição e empurrar. Apenas referência futura.","pre":["pull-ring-row","pull-weighted"],"prox":[],"tags":["puxar","skill futura","transição"],"criterio":"Exige força de barra, dip e técnica específica.","evitar":"Não tentar sem progressão segura e ombros saudáveis.","equip":"barra ou argolas"}]},{"id":"pernas","nome":"Pernas","descricao":"Progressões de agachar, avanço, unilateralidade, equilíbrio e amplitude.","nos":[{"id":"legs-squat","nome":"Agachamento","exercicio":"Agachamento","nivel":"iniciante","descricao":"Base de sentar e levantar com controle.","pre":[],"prox":["legs-step-up","legs-lunge","legs-goblet"],"tags":["pernas","agachar","base"],"criterio":"Amplitude confortável, joelhos alinhados e tronco estável.","evitar":"Cautela com dor no joelho, quadril ou tornozelo.","equip":"peso corporal"},{"id":"legs-step-up","nome":"Step-up","exercicio":"Step-up","nivel":"iniciante","descricao":"Subida em degrau para força unilateral simples.","pre":["legs-squat"],"prox":["legs-bulgarian","legs-step-up-weighted"],"tags":["pernas","unilateral"],"criterio":"Suba sem impulso da perna de baixo.","evitar":"Cautela com dor no joelho ou equilíbrio ruim.","equip":"degrau/banco firme"},{"id":"legs-lunge","nome":"Avanço","exercicio":"Avanço Alternado","nivel":"iniciante","descricao":"Unilateral básico com controle de joelho e quadril.","pre":["legs-squat"],"prox":["legs-bulgarian"],"tags":["pernas","unilateral","avanço"],"criterio":"Passo confortável e joelho alinhado.","evitar":"Cautela com dor no joelho ou tornozelo.","equip":"peso corporal"},{"id":"legs-goblet","nome":"Agachamento goblet","exercicio":"Agachamento Goblet","nivel":"intermediário","descricao":"Agachamento com carga frontal para força e postura.","pre":["legs-squat"],"prox":["legs-weighted-squat","legs-bulgarian"],"tags":["pernas","carga","agachar"],"criterio":"Carga sem perder amplitude ou controle.","evitar":"Evite carga se houver dor ou técnica instável.","equip":"kettlebell ou halter"},{"id":"legs-weighted-squat","nome":"Agachamento com carga","exercicio":"Agachamento com colete","nivel":"intermediário","descricao":"Progressão de carga no padrão de agachar.","pre":["legs-goblet"],"prox":["legs-bulgarian-weighted"],"tags":["pernas","carga"],"criterio":"Carga progressiva sem perder técnica.","evitar":"Evite com dor lombar ou cirurgia recente sem liberação.","equip":"colete, mochila, halter ou kettlebell"},{"id":"legs-bulgarian","nome":"Agachamento búlgaro","exercicio":"Agachamento Búlgaro","nivel":"intermediário","descricao":"Unilateral mais exigente, com apoio atrás.","pre":["legs-step-up","legs-lunge"],"prox":["legs-pistol-assisted","legs-bulgarian-weighted"],"tags":["pernas","unilateral","glúteos"],"criterio":"Controle joelho e tronco sem cair para frente.","evitar":"Cautela com dor no joelho/quadril.","equip":"banco/cadeira"},{"id":"legs-step-up-weighted","nome":"Step-up com carga","exercicio":"Step-up com colete","nivel":"intermediário","descricao":"Aumenta demanda unilateral com carga controlada.","pre":["legs-step-up"],"prox":["legs-bulgarian-weighted"],"tags":["pernas","carga","unilateral"],"criterio":"Só adicionar carga se degrau sem carga estiver limpo.","evitar":"Evite carga com dor no joelho/tornozelo.","equip":"colete, halter ou mochila"},{"id":"legs-bulgarian-weighted","nome":"Búlgaro com carga","exercicio":"Agachamento Búlgaro","nivel":"avançado","descricao":"Unilateral avançado para força de perna e glúteo.","pre":["legs-bulgarian","legs-step-up-weighted"],"prox":["legs-pistol-assisted"],"tags":["pernas","unilateral","carga"],"criterio":"Controle total antes de aumentar carga.","evitar":"Cautela com joelho, quadril e equilíbrio.","equip":"halter, kettlebell, mochila ou colete"},{"id":"legs-pistol-assisted","nome":"Pistol assistido","exercicio":"Pistol Assistido","nivel":"avançado","descricao":"Progressão para agachamento de uma perna com apoio.","pre":["legs-bulgarian","legs-bulgarian-weighted"],"prox":["legs-pistol"],"tags":["pernas","equilíbrio","skill"],"criterio":"Descer com controle usando apoio apenas para equilíbrio.","evitar":"Evite com dor no joelho/tornozelo ou amplitude forçada.","equip":"apoio firme, barra, argolas ou TRX"},{"id":"legs-pistol","nome":"Pistol squat","exercicio":"","conceitual":true,"nivel":"futuro","descricao":"Meta futura: agachamento de uma perna com mínima assistência.","pre":["legs-pistol-assisted"],"prox":[],"tags":["pernas","skill futura"],"criterio":"Requer mobilidade, equilíbrio e controle de joelho.","evitar":"Não perseguir se houver dor articular.","equip":"peso corporal e progressões"}]},{"id":"gluteos-posterior","nome":"Glúteos e posterior","descricao":"Progressões de ponte, hinge, RDL e potência de quadril.","nos":[{"id":"glute-bridge","nome":"Ponte de glúteo","exercicio":"Ponte de Glúteo","nivel":"iniciante","descricao":"Base de extensão de quadril e ativação de glúteos.","pre":[],"prox":["glute-bridge-support","glute-single"],"tags":["glúteos","posterior","base"],"criterio":"Sentir glúteos no topo sem arquear lombar.","evitar":"Cautela com dor lombar ou cirurgia abdominal recente.","equip":"chão/tapete"},{"id":"glute-bridge-support","nome":"Ponte com apoio","exercicio":"Ponte de Glúteo com apoio","nivel":"iniciante","descricao":"Maior amplitude de quadril com apoio das costas.","pre":["glute-bridge"],"prox":["glute-single","glute-loaded"],"tags":["glúteos","amplitude"],"criterio":"Subir sem compensar com lombar.","evitar":"Cautela com desconforto lombar.","equip":"banco/cadeira"},{"id":"glute-single","nome":"Ponte unilateral","exercicio":"Ponte Unilateral","nivel":"intermediário","descricao":"Glúteo unilateral com controle de pelve.","pre":["glute-bridge","glute-bridge-support"],"prox":["glute-loaded","hinge-rdl"],"tags":["glúteos","unilateral"],"criterio":"Quadril sobe alinhado, sem rotação.","evitar":"Evite se houver câimbra/dor lombar.","equip":"chão/tapete"},{"id":"glute-loaded","nome":"Ponte com carga","exercicio":"Ponte de glúteo com mochila","nivel":"intermediário","descricao":"Aumenta tensão de glúteos com carga segura.","pre":["glute-bridge-support","glute-single"],"prox":["hinge-rdl","hinge-db-rdl"],"tags":["glúteos","carga"],"criterio":"Carga estável e subida controlada.","evitar":"Evite carga em cirurgia abdominal recente sem liberação.","equip":"mochila/halter/anilha"},{"id":"hinge-rdl","nome":"RDL / dobrar quadril","exercicio":"Levantamento terra romeno com kettlebell","nivel":"intermediário","descricao":"Padrão de dobrar o quadril para posterior e glúteos.","pre":["glute-single"],"prox":["hinge-db-rdl","hinge-single"],"tags":["posterior","hinge","glúteos"],"criterio":"Coluna neutra e peso próximo ao corpo.","evitar":"Cautela com lombar ou posterior de coxa sensível.","equip":"kettlebell ou carga"},{"id":"hinge-db-rdl","nome":"RDL com halteres","exercicio":"Levantamento terra romeno com halteres","nivel":"intermediário","descricao":"Variação com halteres para controle de carga.","pre":["hinge-rdl","glute-loaded"],"prox":["hinge-single","swing-base"],"tags":["posterior","halteres","carga"],"criterio":"Controle excêntrico, sem arredondar lombar.","evitar":"Evite se lombar ou posterior estiverem irritados.","equip":"halteres"},{"id":"hinge-single","nome":"Hinge unilateral","exercicio":"Ponte Unilateral","nivel":"avançado","descricao":"Controle unilateral de quadril e equilíbrio.","pre":["hinge-rdl","hinge-db-rdl"],"prox":["swing-base"],"tags":["posterior","unilateral","equilíbrio"],"criterio":"Pelve alinhada e controle do pé de apoio antes de usar carga.","evitar":"Cautela com equilíbrio, tornozelo e lombar.","equip":"peso corporal ou carga leve"},{"id":"swing-base","nome":"Kettlebell swing","exercicio":"Kettlebell Swing","nivel":"avançado","descricao":"Potência de quadril com braços passivos e core firme.","pre":["hinge-db-rdl"],"prox":[],"tags":["glúteos","posterior","potência"],"criterio":"Só usar se o RDL estiver técnico e sem dor.","evitar":"Evite em cirurgia recente, dor lombar ou sem técnica de hinge.","equip":"kettlebell"}]},{"id":"core","nome":"Core","descricao":"Progressões de estabilidade, anti-extensão, anti-rotação e compressão.","nos":[{"id":"core-dead-bug","nome":"Dead Bug","exercicio":"Dead Bug","nivel":"iniciante","descricao":"Controle lombar no chão alternando braços e pernas.","pre":[],"prox":["core-bird-dog","core-plank"],"tags":["core","controle","base"],"criterio":"Lombar controlada e respiração fluida.","evitar":"Cautela com cirurgia abdominal recente.","equip":"chão/tapete"},{"id":"core-bird-dog","nome":"Bird Dog","exercicio":"Bird Dog","nivel":"iniciante","descricao":"Estabilidade em quatro apoios com lados alternados.","pre":["core-dead-bug"],"prox":["core-side-plank"],"tags":["core","lombar","controle"],"criterio":"Não girar quadril ao estender braços/pernas.","evitar":"Cautela com punho ou joelho sensível.","equip":"chão/tapete"},{"id":"core-plank","nome":"Prancha","exercicio":"Prancha","nivel":"iniciante","descricao":"Isometria básica de tronco sem perder alinhamento.","pre":["core-dead-bug"],"prox":["core-side-plank","core-hollow","core-body-saw"],"tags":["core","isometria"],"criterio":"Segurar com respiração e sem lombar cair.","evitar":"Evite em cirurgia abdominal recente sem liberação.","equip":"chão/tapete"},{"id":"core-side-plank","nome":"Prancha lateral","exercicio":"Prancha Lateral","nivel":"intermediário","descricao":"Estabilidade lateral de tronco e ombro.","pre":["core-plank","core-bird-dog"],"prox":["core-hollow","core-lsit-base"],"tags":["core","lateral","ombro"],"criterio":"Quadril alinhado e ombro confortável.","evitar":"Cautela com ombro e dor lateral de tronco.","equip":"chão/tapete"},{"id":"core-hollow","nome":"Hollow body hold","exercicio":"Hollow Body Hold","nivel":"intermediário","descricao":"Anti-extensão mais exigente, base para skills futuras.","pre":["core-plank"],"prox":["core-fallout","core-lsit-base"],"tags":["core","anti-extensão"],"criterio":"Lombar no chão durante todo o tempo.","evitar":"Evite se houver desconforto abdominal/lombar.","equip":"chão/tapete"},{"id":"core-fallout","nome":"TRX fallout","exercicio":"TRX Fallout","nivel":"intermediário","descricao":"Anti-extensão com alavanca progressiva.","pre":["core-hollow","core-plank"],"prox":["core-ab-wheel"],"tags":["core","TRX","anti-extensão"],"criterio":"Amplitude curta e controle de costelas.","evitar":"Cautela com ombro, lombar e abdômen.","equip":"TRX/suspensão"},{"id":"core-body-saw","nome":"Body saw TRX","exercicio":"Body Saw TRX","nivel":"intermediário","descricao":"Prancha dinâmica com pés suspensos.","pre":["core-plank"],"prox":["core-fallout"],"tags":["core","TRX","prancha"],"criterio":"Deslocamento curto sem perder coluna neutra.","evitar":"Cautela com ombro e lombar.","equip":"TRX/suspensão"},{"id":"core-ab-wheel","nome":"Roda abdominal","exercicio":"Roda Abdominal","nivel":"avançado","descricao":"Anti-extensão avançada com alta exigência abdominal.","pre":["core-fallout","core-hollow"],"prox":["core-lsit-base"],"tags":["core","anti-extensão","avançado"],"criterio":"Comece curto e pare antes de perder lombar neutra.","evitar":"Evite em recuperação abdominal, lombar sensível ou sem base.","equip":"roda abdominal"},{"id":"core-lsit-base","nome":"Base para L-sit","exercicio":"Hollow Body Hold","nivel":"avançado","descricao":"Compressão e sustentação preparando L-sit.","pre":["core-hollow","core-side-plank"],"prox":["core-lsit"],"tags":["core","compressão","skill"],"criterio":"Hollow e prancha lateral sólidos antes de sustentar em apoio.","evitar":"Cautela com punho, ombro e flexores do quadril.","equip":"paralelas, blocos ou chão"},{"id":"core-lsit","nome":"L-sit / sustentação em L","exercicio":"","conceitual":true,"nivel":"futuro","descricao":"Meta futura de compressão e sustentação com braços.","pre":["core-lsit-base"],"prox":[],"tags":["core","skill futura"],"criterio":"Requer compressão, ombros deprimidos e braços fortes.","evitar":"Evite com dor no punho/ombro ou cirurgia abdominal recente.","equip":"paralelas, argolas ou chão"}]},{"id":"mobilidade-controle","nome":"Mobilidade e controle","descricao":"Mobilidade de coluna, quadril, ombro e controle escapular.","nos":[{"id":"mob-cat-cow","nome":"Cat-Cow","exercicio":"Cat-Cow","nivel":"iniciante","descricao":"Mobilidade suave de coluna e consciência corporal.","pre":[],"prox":["mob-thoracic","mob-hip"],"tags":["mobilidade","coluna","aquecimento"],"criterio":"Movimento lento e sem dor.","evitar":"Evite amplitude forçada se houver dor aguda.","equip":"chão/tapete"},{"id":"mob-thoracic","nome":"Mobilidade torácica","exercicio":"Mobilidade Torácica","nivel":"iniciante","descricao":"Rotações e extensão torácica para ombros e postura.","pre":["mob-cat-cow"],"prox":["mob-open-book","mob-shoulder-pass"],"tags":["mobilidade","torácica"],"criterio":"Respire e aumente amplitude aos poucos.","evitar":"Não forçar cervical ou lombar.","equip":"chão/tapete"},{"id":"mob-open-book","nome":"Open Book","exercicio":"Open Book","nivel":"iniciante","descricao":"Rotação torácica deitada com controle.","pre":["mob-thoracic"],"prox":["mob-shoulder-pass"],"tags":["mobilidade","torácica","ombro"],"criterio":"Joelhos apoiados e rotação sem dor.","evitar":"Cautela com dor aguda no ombro/costas.","equip":"chão/tapete"},{"id":"mob-hip","nome":"Mobilidade de quadril","exercicio":"Mobilidade Quadril","nivel":"iniciante","descricao":"Controle de quadril para agachar, correr e estabilizar.","pre":["mob-cat-cow"],"prox":["mob-cossack-base","legs-squat"],"tags":["mobilidade","quadril"],"criterio":"Amplitude confortável e controle do joelho.","evitar":"Evite dor anterior forte no quadril.","equip":"peso corporal"},{"id":"mob-shoulder-pass","nome":"Shoulder pass through","exercicio":"Shoulder Pass Through","nivel":"iniciante","descricao":"Mobilidade de ombro com bastão ou elástico.","pre":["mob-thoracic","mob-open-book"],"prox":["mob-scapular-wall","mob-scapular-pull"],"tags":["mobilidade","ombro"],"criterio":"Pegada larga no início e sem pinçamento.","evitar":"Evite se houver dor no ombro.","equip":"bastão ou elástico"},{"id":"mob-scapular-wall","nome":"Retração/protração escapular","exercicio":"Retração Escapular no Solo/Parede","nivel":"iniciante","descricao":"Controle escapular em parede ou solo.","pre":["mob-shoulder-pass"],"prox":["mob-scapular-pull","pull-scapular"],"tags":["escápula","controle","ombro"],"criterio":"Mover escápulas sem dobrar cotovelos demais.","evitar":"Cautela com dor no ombro/punho.","equip":"parede ou chão"},{"id":"mob-scapular-pull","nome":"Scapular pull-up","exercicio":"Scapular Pull-ups","nivel":"intermediário","descricao":"Controle escapular pendurado na barra.","pre":["mob-scapular-wall"],"prox":["pull-negative","pull-assisted"],"tags":["escápula","barra","puxar"],"criterio":"Braços estendidos e movimento curto controlado.","evitar":"Exige barra segura; evitar com dor no ombro.","equip":"barra fixa"},{"id":"mob-external-rotation","nome":"Rotação externa","exercicio":"External Rotation","nivel":"intermediário","descricao":"Fortalecimento leve de manguito rotador.","pre":["mob-shoulder-pass"],"prox":["mob-face-pull"],"tags":["ombro","manguito","prevenção"],"criterio":"Carga leve, amplitude curta e sem dor.","evitar":"Não usar para forçar dor no ombro.","equip":"elástico"},{"id":"mob-face-pull","nome":"Face pull","exercicio":"Face Pull","nivel":"intermediário","descricao":"Controle escapular e manguito com elástico.","pre":["mob-external-rotation","mob-scapular-wall"],"prox":["push-rings","pull-ring-row"],"tags":["ombro","escápula","elástico"],"criterio":"Cotovelo alto, final com rotação externa leve.","evitar":"Cautela com dor anterior no ombro.","equip":"elástico"},{"id":"mob-cossack-base","nome":"Base para Cossack squat","exercicio":"Mobilidade Quadril","nivel":"futuro","descricao":"Meta de mobilidade lateral de quadril e tornozelo.","pre":["mob-hip","legs-squat"],"prox":[],"tags":["mobilidade","pernas","skill futura"],"criterio":"Amplitude lateral sem colapsar joelho.","evitar":"Cautela com joelho, quadril e tornozelo.","equip":"peso corporal"}]}];
const SKILL_STATUS_CALIFIT={
  base:{label:'Base',classe:'base'},
  em_progresso:{label:'Em progresso',classe:'em_progresso'},
  pronto:{label:'Pronto para avançar',classe:'pronto'},
  conquistado:{label:'Conquistado',classe:'conquistado'},
  bloqueado:{label:'Bloqueado temporariamente',classe:'bloqueado'}
};
const SKILL_EVIDENCIAS_CALIFIT={
  'push-incline':['Flexão inclinada','Wall push-up'],
  'push-knees':['Flexão com joelhos'],
  'push-floor':['Flexão no Solo','Flexão no solo'],
  'push-decline':['Flexão declinada','Decline push-up'],
  'push-weighted':['Flexão com carga','Flexão no Solo com carga','Paralelas com carga'],
  'push-pike':['Pike push-up'],
  'push-handstand':['Handstand push-up'],
  'pull-inverted-high':['Remada invertida alta','Australian pull-up alto'],
  'pull-inverted-row':['Remada Invertida','Australian pull-up'],
  'pull-feet-elevated':['Remada com pés elevados','Remada invertida com pés elevados'],
  'pull-scapular':['Scapular Pull-ups','Scapular pull-up'],
  'mob-scapular-pull':['Scapular Pull-ups','Scapular pull-up'],
  'pull-full':['Barra Fixa Pronada','Barra fixa'],
  'pull-tempo':['Barra com pausa','Barra com tempo','Barra Fixa Pronada com pausa'],
  'pull-weighted':['Barra com carga','Barra fixa com carga'],
  'pull-muscle-up-base':['Transição de muscle-up','Muscle-up assistido'],
  'legs-bulgarian':['Agachamento Búlgaro'],
  'legs-bulgarian-weighted':['Agachamento Búlgaro com carga','Búlgaro com carga'],
  'legs-pistol-assisted':['Pistol Assistido'],
  'legs-pistol':['Pistol squat','Pistol','Agachamento unilateral sem apoio'],
  'glute-single':['Ponte Unilateral'],
  'hinge-single':['Peso morto unilateral','RDL unilateral','Hinge unilateral'],
  'core-hollow':['Hollow Body Hold'],
  'core-lsit-base':['Tuck L-sit','Base para L-sit','Compressão para L-sit'],
  'core-lsit':['L-sit','L sit','Sustentação em L'],
  'mob-hip':['Mobilidade Quadril'],
  'mob-cossack-base':['Cossack squat','Base para Cossack squat','Mobilidade lateral de quadril']
};
const SKILL_MARCAS_REGRAS_CALIFIT={
  'push-incline':{chave:'flexoes',conquistado:1,rotulo:'flexões limpas'},
  'push-knees':{chave:'flexoes',conquistado:1,rotulo:'flexões limpas'},
  'push-floor':{chave:'flexoes',progresso:1,pronto:8,conquistado:15,rotulo:'flexões limpas'},
  'push-dips':{chave:'dips',progresso:1,pronto:5,conquistado:10,rotulo:'paralelas'},
  'pull-scapular':{chave:'barras',conquistado:1,rotulo:'barras completas'},
  'pull-negative':{chave:'barras',conquistado:1,rotulo:'barras completas'},
  'pull-assisted':{chave:'barras',conquistado:1,rotulo:'barras completas'},
  'pull-full':{chave:'barras',progresso:1,pronto:3,conquistado:5,rotulo:'barras completas'},
  'legs-squat':{chave:'agachamentoUnilateral',conquistado:1,rotulo:'agachamentos unilaterais por perna'},
  'legs-pistol-assisted':{chave:'agachamentoUnilateral',progresso:1,pronto:5,conquistado:8,rotulo:'agachamentos unilaterais por perna'},
  'legs-pistol':{chave:'agachamentoUnilateral',progresso:1,pronto:3,conquistado:5,rotulo:'agachamentos unilaterais por perna'},
  'core-plank':{chave:'prancha',progresso:15,pronto:40,conquistado:60,rotulo:'segundos de prancha'},
  'core-hollow':{chave:'lSit',pronto:1,conquistado:8,rotulo:'segundos de L-sit'},
  'core-lsit-base':{chave:'lSit',progresso:1,pronto:5,conquistado:10,rotulo:'segundos de L-sit'},
  'core-lsit':{chave:'lSit',progresso:1,pronto:8,conquistado:15,rotulo:'segundos de L-sit'}
};
function listarSkillTreeCalifit(opcoes={}){
  const comBiblioteca=!!opcoes.comBiblioteca;
  return cloneObj(SKILL_TREE_CALIFIT).map(trilha=>({...trilha,nos:trilha.nos.map(no=>comBiblioteca?{...no,biblioteca:no.exercicio?detalheExercicioBibliotecaCalifit(no.exercicio):null}:{...no})}));
}
function todosNosSkillTreeCalifit(){
  return cloneObj(SKILL_TREE_CALIFIT).flatMap(trilha=>trilha.nos.map(no=>({...no,trilhaId:trilha.id,trilha:trilha.nome})));
}
function detalheSkillTreeNoCalifit(id){
  const alvo=normTxt(id);
  return todosNosSkillTreeCalifit().find(no=>normTxt(no.id)===alvo||normTxt(no.nome)===alvo)||null;
}
function caminhoSkillTreeCalifit(id){
  const vistos=new Set(),saida=[];
  const visitar=noId=>{
    if(vistos.has(noId)) return;
    vistos.add(noId);
    const no=detalheSkillTreeNoCalifit(noId);
    if(!no) return;
    arr(no.pre).forEach(visitar);
    saida.push(no);
  };
  visitar(id);
  return saida;
}
function filtrarSkillTreeCalifit(filtros={}){
  const trilha=normTxt(filtros.trilha||'');
  const nivel=normTxt(filtros.nivel||'');
  const busca=normTxt(filtros.busca||filtros.q||'');
  return todosNosSkillTreeCalifit().filter(no=>{
    const texto=normTxt([no.id,no.nome,no.exercicio,no.trilha,no.nivel,no.descricao,arr(no.tags).join(' ')].join(' '));
    return (!trilha||normTxt(no.trilhaId+' '+no.trilha).includes(trilha))
      &&(!nivel||normTxt(no.nivel).includes(nivel))
      &&(!busca||texto.includes(busca));
  });
}
function localizarSkillTreePorExercicioCalifit(nome){
  const alvo=normTxt(nome);
  if(!alvo) return [];
  return todosNosSkillTreeCalifit().filter(no=>registroCombinaNoSkillTreeCalifit({nome},no));
}
function nomeRegistroSkillTreeCalifit(ex={}){
  return ex?.nome||ex?.n||ex?.exercicioRealizado||ex?.substituidoPor||ex?.exercicioId||ex?.nomeOriginal||'';
}
function historicoSkillTreeCalifit(){
  return coletarHistoricoTreinos().flatMap(item=>{
    const exs=arr(item?.treino?.exercicios).length?arr(item.treino.exercicios):arr(item?.registro?.exercicios);
    return exs.map(ex=>{
      const log=ex?.log||ex||{};
      const data=item.data||item.registro?.data||item.treino?.data||'';
      const rpe=rpeLog(log);
      const dor=analisarDorRegistro(log);
      const tecnica=normTxt(ex?.tecnica||log?.tecnica||log?.tec||'');
      const feito=normTxt(log?.feito||ex?.feito||'');
      const completo=feito==='sim'||feito==='feito'||feito==='completo';
      const feedbackCompleto=treinoContaParaProgressao(item.registro);
      const tecnicaBoa=tecnica==='boa'||(!tecnica&&feedbackCompleto&&!tecnicaRuimLog(log));
      const qualidade=completo&&!dor.temDor&&!tecnicaRuimLog(log)&&(!rpe||rpe<=8)&&tecnicaBoa;
      return{
        nome:nomeRegistroSkillTreeCalifit(ex),data,semanaId:item.semanaId,semanaNum:item.semanaNum,
        ex,log,registro:item.registro,feito,completo,qualidade,dor:dor.temDor,dorInfo:dor,
        tecnica,tecnicaRuim:tecnicaRuimLog(log),rpe:rpe||0,
        valor:Math.max(repsFeitasLog(log),numMeta(log?.reps),numMeta(ex?.prescricao)),
        carga:cargaRegistradaExercicio(ex,log)||0
      };
    });
  });
}
function aliasesNoSkillTreeCalifit(no={}){
  return [...new Set([no.nome,no.exercicio,...arr(SKILL_EVIDENCIAS_CALIFIT[no.id])].map(normTxt).filter(Boolean))];
}
function registroCombinaNoSkillTreeCalifit(registro,no={}){
  const nome=normTxt(registro?.nome||nomeRegistroSkillTreeCalifit(registro?.ex||registro||{}));
  if(!nome) return false;
  const aliases=aliasesNoSkillTreeCalifit(no);
  if(aliases.some(alias=>nome===alias||(alias.length>=8&&(nome.includes(alias)||alias.includes(nome))))) return true;
  if(!no.exercicio||SKILL_EVIDENCIAS_CALIFIT[no.id]) return false;
  const canRegistro=nomeCanonicoMetaExercicio(registro?.nome||nomeRegistroSkillTreeCalifit(registro?.ex||registro||{}));
  const canNo=nomeCanonicoMetaExercicio(no.exercicio);
  return !!canRegistro&&!!canNo&&normTxt(canRegistro)===normTxt(canNo);
}
function evidenciasNoSkillTreeCalifit(no,historico=historicoSkillTreeCalifit()){
  const registros=historico.filter(reg=>registroCombinaNoSkillTreeCalifit(reg,no));
  const porSessao=lista=>{
    const mapa=new Map();
    lista.forEach(reg=>{
      const chave=chaveDia(reg.data)||String(reg.data||reg.semanaId||Math.random());
      const anterior=mapa.get(chave);
      if(!anterior||(+reg.qualidade>+anterior.qualidade)) mapa.set(chave,reg);
    });
    return [...mapa.values()];
  };
  const sessoes=porSessao(registros.filter(r=>r.completo||r.feito==='parcial'));
  const boas=porSessao(registros.filter(r=>r.qualidade));
  const limiteRecente=Date.now()-(60*24*60*60*1000);
  const recentes=registros.filter(r=>{
    const t=new Date(r.data||0).getTime();
    return Number.isFinite(t)&&t>=limiteRecente;
  });
  const dorRecente=recentes.some(r=>r.dor);
  const tecnicaRuimRecente=recentes.some(r=>r.tecnicaRuim);
  const rpeAltoRecente=recentes.some(r=>r.rpe>=9);
  const melhorValor=registros.reduce((m,r)=>Math.max(m,+r.valor||0),0);
  const maiorCarga=registros.reduce((m,r)=>Math.max(m,+r.carga||0),0);
  return{registros,sessoes,boas,praticas:sessoes.length,boasQtd:boas.length,dorRecente,tecnicaRuimRecente,rpeAltoRecente,melhorValor,maiorCarga};
}
function progressoMarcaSkillTreeCalifit(no,perfil=ST.perfil){
  const regra=SKILL_MARCAS_REGRAS_CALIFIT[no?.id];
  if(!regra) return{status:'',valor:0,regra:null,texto:''};
  const valor=+perfil?.marcas?.[regra.chave]||0;
  let status='';
  if(regra.conquistado!=null&&valor>=regra.conquistado) status='conquistado';
  else if(regra.pronto!=null&&valor>=regra.pronto) status='pronto';
  else if(regra.progresso!=null&&valor>=regra.progresso) status='em_progresso';
  return{status,valor,regra,texto:valor?`${valor} ${regra.rotulo||'na marca atual'}`:''};
}
function disponibilidadeEquipamentoSkillTreeCalifit(no,perfil=ST.perfil){
  if(no?.exercicio){
    const req=requisitosEquipamentoExercicio(no.exercicio,perfil);
    if(!req.disponivel) return{ok:false,motivo:`Equipamento necessário: ${fraseListaHumana(req.usados)||no.equip||'não disponível no perfil'}.`,usados:req.usados||[]};
  }
  const txt=normTxt(no?.equip||'');
  if(!txt||/peso corporal|chao|parede|tapete/.test(txt)) return{ok:true,motivo:'',usados:[]};
  const eq=equipamentoSet(perfilComEquipamentosValidos(perfil));
  const opcoes=[];
  if(/barra/.test(txt)) opcoes.push(['Barra fixa','Estação de barra']);
  if(/argola/.test(txt)) opcoes.push(['Argolas']);
  if(/trx|suspens/.test(txt)) opcoes.push(['TRX/Suspensão']);
  if(/elastico|faixa/.test(txt)) opcoes.push(['Elásticos/faixas de resistência']);
  if(/paralela/.test(txt)) opcoes.push(['Barras paralelas','Paralela de chão']);
  if(/roda abdominal/.test(txt)) opcoes.push(['Roda abdominal']);
  if(/banco|degrau|step/.test(txt)) opcoes.push(['Banco/Cadeira','Step/Degrau']);
  if(/halter/.test(txt)) opcoes.push(['Halteres']);
  if(/kettlebell/.test(txt)) opcoes.push(['Kettlebell']);
  if(/colete/.test(txt)) opcoes.push(['Colete com peso']);
  if(/cinto/.test(txt)) opcoes.push(['Cinto de carga']);
  if(/mochila/.test(txt)) opcoes.push(['Mochila lastrada']);
  if(!opcoes.length||/apoio firme/.test(txt)) return{ok:true,motivo:'',usados:[]};
  const disponiveis=[...new Set(opcoes.flat().filter(nome=>eq.has(nome)))];
  if(disponiveis.length) return{ok:true,motivo:'',usados:disponiveis};
  return{ok:false,motivo:`Falta equipamento compatível: ${no.equip}.`,usados:[]};
}
function statusSkillTreeLabelCalifit(status){return SKILL_STATUS_CALIFIT[status]?.label||SKILL_STATUS_CALIFIT.base.label;}
function statusSkillTreeNivelCalifit(status){return({base:0,em_progresso:1,pronto:2,conquistado:3,bloqueado:-1})[status]??0;}
function avaliarProgressoSkillTreeBrutoCalifit(no,historico=historicoSkillTreeCalifit(),perfil=ST.perfil){
  const evidencias=evidenciasNoSkillTreeCalifit(no,historico);
  const marca=progressoMarcaSkillTreeCalifit(no,perfil);
  let status='base';
  if(evidencias.boasQtd>=3) status='conquistado';
  else if(evidencias.boasQtd>=2) status='pronto';
  else if(evidencias.praticas>=1) status='em_progresso';
  if(marca.status&&statusSkillTreeNivelCalifit(marca.status)>statusSkillTreeNivelCalifit(status)) status=marca.status;
  const equipamento=disponibilidadeEquipamentoSkillTreeCalifit(no,perfil);
  const seguranca=avaliarSegurancaExercicioRegional(no.exercicio||{n:no.nome},perfil,{});
  const bloqueios=[];
  if(!equipamento.ok) bloqueios.push(equipamento.motivo);
  if(seguranca.bloqueado) bloqueios.push(seguranca.motivos[0]||'Limitação de saúde ativa para este movimento.');
  if(evidencias.dorRecente) bloqueios.push('Dor recente registrada neste exercício ou variação.');
  const cautelas=[];
  if(seguranca.cautela&&!seguranca.bloqueado) cautelas.push(seguranca.motivos[0]||'Execute com cautela pela condição atual.');
  if(evidencias.tecnicaRuimRecente) cautelas.push('Técnica ruim recente: consolide o movimento antes de avançar.');
  if(evidencias.rpeAltoRecente) cautelas.push(`${rotuloRpeUsuario()} alto recente: mantenha a dificuldade atual.`);
  const conquistaPreservada=status==='conquistado'&&bloqueios.length>0;
  if(bloqueios.length&&!conquistaPreservada) status='bloqueado';
  return{no,status,label:statusSkillTreeLabelCalifit(status),evidencias,marca,equipamento,seguranca,bloqueios,cautelas,conquistaPreservada,prePendentes:[],preStatus:[]};
}
function mapaProgressoSkillTreeCalifit(perfil=ST.perfil){
  const historico=historicoSkillTreeCalifit();
  const nos=todosNosSkillTreeCalifit();
  const mapa=Object.fromEntries(nos.map(no=>[no.id,avaliarProgressoSkillTreeBrutoCalifit(no,historico,perfil)]));
  nos.forEach(no=>{
    const item=mapa[no.id];
    item.preStatus=arr(no.pre).map(id=>mapa[id]).filter(Boolean);
    item.prePendentes=item.preStatus.filter(p=>!['pronto','conquistado'].includes(p.status)).map(p=>p.no.nome);
    let motivo='';
    if(item.status==='bloqueado') motivo=item.bloqueios[0]||'Condição temporária impede avançar agora.';
    else if(item.status==='conquistado') motivo=item.conquistaPreservada?'Conquista preservada. A condição atual pede cautela antes de repetir ou avançar.':'Há evidência consistente de domínio deste passo.';
    else if(item.status==='pronto') motivo='Há pelo menos dois registros consistentes ou uma marca compatível para considerar o próximo passo.';
    else if(item.status==='em_progresso') motivo='O movimento já foi praticado, mas ainda precisa de mais consistência para avançar.';
    else if(item.prePendentes.length) motivo=`Consolide primeiro ${fraseListaHumana(item.prePendentes.slice(0,3))}.`;
    else motivo='Ainda não há execução registrada para este passo.';
    const partes=[];
    if(item.evidencias.praticas) partes.push(`${item.evidencias.praticas} sessão${item.evidencias.praticas===1?'':'ões'} registrada${item.evidencias.praticas===1?'':'s'}`);
    if(item.evidencias.boasQtd) partes.push(`${item.evidencias.boasQtd} consistente${item.evidencias.boasQtd===1?'':'s'}`);
    if(item.marca.texto) partes.push(`marca: ${item.marca.texto}`);
    if(item.evidencias.maiorCarga) partes.push(`melhor carga: ${fmtKg(item.evidencias.maiorCarga)}`);
    item.motivo=motivo;
    item.resumoEvidencias=partes.length?partes.join(' · '):'Sem histórico específico no app.';
    if(item.status==='bloqueado') item.proximaAcao='Resolva a limitação indicada ou atualize equipamentos e perfil antes de tentar este passo.';
    else if(item.status==='conquistado') item.proximaAcao=item.conquistaPreservada?'Não perca a conquista: retome apenas quando a condição atual estiver confortável e segura.':'Mantenha a qualidade e consulte o próximo nó; a árvore não altera o plano automaticamente.';
    else if(item.status==='pronto') item.proximaAcao='Você pode testar a próxima progressão de forma conservadora, sem dor e sem aumentar várias variáveis ao mesmo tempo.';
    else if(item.status==='em_progresso') item.proximaAcao=item.evidencias.boasQtd?'Busque mais um ou dois registros completos, com técnica boa, sem dor e esforço até 8.':'Registre execução, técnica, dor e esforço para o app avaliar consistência.';
    else item.proximaAcao=item.prePendentes.length?`Trabalhe primeiro em ${fraseListaHumana(item.prePendentes.slice(0,2))}.`:'Pratique uma variação compatível e registre o resultado no treino.';
  });
  return mapa;
}
function avaliarProgressoSkillTreeCalifit(idOuNo,perfil=ST.perfil){
  const no=typeof idOuNo==='string'?detalheSkillTreeNoCalifit(idOuNo):idOuNo;
  if(!no) return null;
  return mapaProgressoSkillTreeCalifit(perfil)[no.id]||null;
}
function resumoProgressoSkillTreeCalifit(perfil=ST.perfil){
  const mapa=mapaProgressoSkillTreeCalifit(perfil);
  const itens=Object.values(mapa);
  const contagem=itens.reduce((acc,item)=>{acc[item.status]=(acc[item.status]||0)+1;return acc;},{});
  const trilhas=listarSkillTreeCalifit().map(trilha=>{
    const estados=trilha.nos.map(no=>mapa[no.id]).filter(Boolean);
    return{id:trilha.id,nome:trilha.nome,total:estados.length,conquistados:estados.filter(e=>e.status==='conquistado').length,prontos:estados.filter(e=>e.status==='pronto').length,emProgresso:estados.filter(e=>e.status==='em_progresso').length,bloqueados:estados.filter(e=>e.status==='bloqueado').length};
  });
  return{mapa,total:itens.length,contagem,trilhas};
}
function alvoSkillTreeMensagemCalifit(mensagem=''){
  const msg=normTxt(mensagem);
  const mapa=[
    [/barra fixa|pull-?up|\bbarra\b/,'pull-full'],
    [/pistol|agachamento de uma perna/,'legs-pistol'],
    [/flexao|flexão|push-?up/,'push-floor'],
    [/paralela|dips?/,'push-dips'],
    [/hollow/,'core-hollow'],
    [/l-?sit|sustentacao em l|sustentação em l/,'core-lsit'],
    [/prancha lateral/,'core-side-plank'],
    [/prancha/,'core-plank'],
    [/remada/,'pull-inverted-row'],
    [/agachamento bulgaro|agachamento búlgaro/,'legs-bulgarian'],
    [/ponte de gluteo|ponte de glúteo|gluteo|glúteo/,'glute-bridge'],
    [/rdl|terra romeno|levantamento terra romeno|posterior/,'hinge-rdl'],
    [/mobilidade.*ombro|ombro.*mobilidade|rotacao externa|rotação externa|face pull/,'mob-external-rotation'],
    [/mobilidade.*quadril|quadril.*mobilidade/,'mob-hip'],
    [/toracica|torácica|open book/,'mob-thoracic'],
    [/handstand|pike/,'push-pike'],
    [/muscle.?up/,'pull-muscle-up-base'],
    [/agachamento/,'legs-squat']
  ];
  const achado=mapa.find(([rx])=>rx.test(msg));
  if(achado) return detalheSkillTreeNoCalifit(achado[1]);
  return filtrarSkillTreeCalifit({busca:msg})[0]||null;
}
function responderSkillTreeTreinadorCalifit(mensagem,contexto={}){
  const no=alvoSkillTreeMensagemCalifit(mensagem);
  if(!no) return 'Posso orientar pela Skill Tree se você citar uma habilidade, como barra fixa, flexão, paralelas, pistol, ponte de glúteo, RDL, hollow, L-sit, prancha ou mobilidade de ombro/quadril. Isso é apenas consulta e não altera seu plano automaticamente.';
  const progresso=avaliarProgressoSkillTreeCalifit(no);
  const caminho=caminhoSkillTreeCalifit(no.id);
  const nomesCaminho=caminho.map(n=>n.nome).filter(Boolean);
  const pre=arr(no.pre).map(id=>detalheSkillTreeNoCalifit(id)?.nome||id).filter(Boolean);
  const prox=arr(no.prox).map(id=>detalheSkillTreeNoCalifit(id)?.nome||id).filter(Boolean);
  const trilha=no.trilha?`Trilha ${no.trilha}. `:'';
  const estado=progresso?`Seu estado atual em ${no.nome}: ${progresso.label}. ${progresso.motivo} `:'';
  const evidencia=progresso&&progresso.resumoEvidencias?`Evidências: ${progresso.resumoEvidencias}. `:'';
  const caminhoTxt=nomesCaminho.length?`Caminho resumido: ${nomesCaminho.join(' → ')}.`:`Caminho resumido: ${no.nome}.`;
  const preTxt=pre.length?` Pré-requisitos: ${fraseListaHumana(pre)}.`:' Pré-requisitos: consolide a base sem dor e com técnica boa.';
  const proxTxt=prox.length?` Depois vem: ${fraseListaHumana(prox)}.`:' Este é um ponto alto da trilha visual atual.';
  const acao=progresso?.proximaAcao||`Fortaleça ${pre[0]||'a base técnica'} com controle, esforço percebido até 8 e sem dor.`;
  return `${trilha}${estado}${evidencia}${caminhoTxt}${preTxt} Próximo passo: ${acao}${proxTxt} Isso é orientação da Skill Tree; seu plano não muda automaticamente.`;
}
function htmlSkillStatusPillCalifit(status){
  const cfg=SKILL_STATUS_CALIFIT[status]||SKILL_STATUS_CALIFIT.base;
  return `<span class="skill-status-pill skill-status-${escHtml(cfg.classe)}">${escHtml(cfg.label)}</span>`;
}
function htmlSkillNodeCalifit(no,i,progresso=null,total=0){
  const nivel=no.nivel||'';
  const ex=no.exercicio||'skill futura';
  const p=progresso||avaliarProgressoSkillTreeCalifit(no);
  return `<div class="info ib skill-node" data-skill-status="${escHtml(p?.status||'base')}">
    <div class="skill-node-main">
      <div class="skill-node-title-row"><div class="skill-node-title">${escHtml(no.nome)}</div><span class="skill-node-level">${escHtml(nivel)}</span></div>
      <div class="skill-node-status-row">${htmlSkillStatusPillCalifit(p?.status||'base')}</div>
      <div class="bib-line">${escHtml(ex)}${no.equip?` · ${escHtml(no.equip)}`:''}</div>
      <div class="bib-desc">${escHtml(no.descricao)}</div>
      <div class="skill-node-evidence">${escHtml(p?.resumoEvidencias||'Sem histórico específico no app.')}</div>
      ${p?.cautelas?.length?`<div class="skill-node-caution">${escHtml(p.cautelas[0])}</div>`:''}
      <div>${arr(no.tags).slice(0,4).map(t=>`<span class="skill-tag">${escHtml(t)}</span>`).join('')}</div>
    </div>
    <button class="btn btn-s bib-ver" data-skill-no="${escHtml(no.id)}" type="button">Ver</button>
  </div>${i<Math.max(0,total-1)?'<div class="skill-arrow" aria-hidden="true">↓</div>':''}`;
}
function nosSkillTreePorFiltroCalifit(trilha,mapa,filtro='foco'){
  const nos=arr(trilha?.nos);
  if(filtro==='todos') return nos;
  const statusAlvo={pronto:['pronto'],conquistado:['conquistado'],bloqueado:['bloqueado']}[filtro];
  if(statusAlvo) return nos.filter(no=>statusAlvo.includes(mapa?.[no.id]?.status));
  const ativos=nos.filter(no=>['em_progresso','pronto'].includes(mapa?.[no.id]?.status));
  if(ativos.length) return ativos;
  const primeiroBase=nos.find(no=>mapa?.[no.id]?.status==='base');
  return primeiroBase?[primeiroBase]:[];
}
function focoResumoTrilhaSkillTreeCalifit(trilha,mapa){
  const nos=arr(trilha?.nos);
  const atual=nos.find(no=>mapa?.[no.id]?.status==='em_progresso')
    ||nos.find(no=>mapa?.[no.id]?.status==='pronto')
    ||nos.find(no=>mapa?.[no.id]?.status==='base')
    ||nos.find(no=>mapa?.[no.id]?.status==='conquistado')
    ||nos[0]||null;
  const indice=Math.max(0,nos.findIndex(no=>no?.id===atual?.id));
  const proximo=atual?nos.slice(indice+1).find(no=>mapa?.[no.id]?.status!=='conquistado')||null:null;
  return{atual,proximo};
}
function htmlTrilhaSkillTreeCalifit(trilha,resumo,filtro='foco',abrir=false){
  const visiveis=nosSkillTreePorFiltroCalifit(trilha,resumo.mapa,filtro);
  if(!visiveis.length) return'';
  const resumoTrilha=resumo.trilhas.find(t=>t.id===trilha.id)||{};
  const foco=focoResumoTrilhaSkillTreeCalifit(trilha,resumo.mapa);
  const atualTxt=foco.atual?.nome||'Base ainda não iniciada';
  const proxTxt=foco.proximo?.nome||'Fim da trilha atual';
  return `<details class="card skill-track-card skill-track-details"${abrir?' open':''}>
    <summary class="skill-track-toggle">
      <div class="skill-track-toggle-main">
        <div class="skill-track-toggle-title"><span>${escHtml(trilha.nome)}</span><span class="skill-count-pill">${resumoTrilha.conquistados||0}/${arr(trilha.nos).length}</span></div>
        <div class="skill-track-focus"><strong>Atual:</strong> ${escHtml(atualTxt)}<br><strong>Próximo:</strong> ${escHtml(proxTxt)}</div>
      </div>
      <span class="skill-track-action">Ver progressão</span>
    </summary>
    <div class="skill-track-body">
      <div class="ms">${escHtml(trilha.descricao)}</div>
      <div class="skill-track-summary">${resumoTrilha.emProgresso||0} em progresso · ${resumoTrilha.prontos||0} prontos · ${resumoTrilha.conquistados||0} conquistados${resumoTrilha.bloqueados?` · ${resumoTrilha.bloqueados} bloqueados`:''}</div>
      <div class="skill-track">${visiveis.map((no,i)=>htmlSkillNodeCalifit({...no,trilha:trilha.nome,trilhaId:trilha.id},i,resumo.mapa[no.id],visiveis.length)).join('')}</div>
    </div>
  </details>`;
}
function abrirDetalheSkillTreeCalifit(id,voltar=abrirSkillTreeCalifit){
  const no=detalheSkillTreeNoCalifit(id);
  if(!no){showToast('Nó da Skill Tree não encontrado.');return;}
  const biblioteca=no.exercicio?detalheExercicioBibliotecaCalifit(no.exercicio):null;
  const progresso=avaliarProgressoSkillTreeCalifit(no);
  const pre=arr(no.pre).map(pid=>detalheSkillTreeNoCalifit(pid)?.nome||pid);
  const prox=arr(no.prox).map(pid=>detalheSkillTreeNoCalifit(pid)?.nome||pid);
  const caminho=caminhoSkillTreeCalifit(id).map(n=>n.nome).join(' → ');
  const tags=arr(no.tags).slice(0,6);
  mOpen('m2',`<div id="skill-root">
    <div class="mt2">${escHtml(no.nome)}</div>
    <div class="ms">${escHtml(no.descricao)}</div>
    <div class="skill-progress-card">
      <div class="skill-progress-title"><strong>Seu progresso</strong>${htmlSkillStatusPillCalifit(progresso?.status||'base')}</div>
      <div class="skill-progress-reason">${escHtml(progresso?.motivo||'Ainda não há dados suficientes.')}</div>
      <div class="skill-progress-evidence">${escHtml(progresso?.resumoEvidencias||'Sem histórico específico no app.')}</div>
      ${progresso?.bloqueios?.length&&progresso?.conquistaPreservada?`<div class="info io" style="margin:8px 0 0">Conquista preservada. ${escHtml(progresso.bloqueios.join(' '))}</div>`:''}
      ${progresso?.cautelas?.length?`<div class="info io" style="margin:8px 0 0">${escHtml(progresso.cautelas.join(' '))}</div>`:''}
      <div class="skill-progress-next"><strong>Próximo passo:</strong> ${escHtml(progresso?.proximaAcao||'Continue registrando seus treinos.')}</div>
    </div>
    <div class="skill-detail-tags">${tags.map(t=>`<span class="skill-tag">${escHtml(t)}</span>`).join('')}</div>
    <div class="skill-detail-grid">
      <div class="info ib"><strong>Trilha:</strong> ${escHtml(no.trilha)}<br><strong>Nível:</strong> ${escHtml(no.nivel)}${no.equip?`<br><strong>Equipamento:</strong> ${escHtml(no.equip)}`:''}<br><strong>Caminho:</strong> ${escHtml(caminho)}</div>
      <div><div class="h3">Pré-requisitos</div><div class="info ib">${pre.length?escHtml(pre.join(', ')):'Sem pré-requisito.'}</div></div>
      <div><div class="h3">Critério para avançar</div><div class="info ig">${escHtml(no.criterio||'Avance apenas quando fizer com controle, sem dor e sem compensar técnica.')}</div></div>
      <div><div class="h3">Próximos passos</div><div class="info ib">${prox.length?escHtml(prox.join(', ')):'Fim da trilha visual atual.'}</div></div>
      ${no.evitar?`<div><div class="h3">Quando ter cautela</div><div class="info skill-caution">${escHtml(no.evitar)}</div></div>`:''}
    </div>
    ${no.exercicio&&biblioteca?`<div class="h3">Exercício associado</div><div class="info ig">${escHtml(no.exercicio)}</div><button class="btn btn-s" id="skill-ver-ex" type="button">${iconeCalifit('biblioteca')} Ver exercício na Biblioteca</button>`:''}
    <button class="btn btn-s" id="skill-back" type="button">Voltar para Skill Tree</button>
  </div>`);
  $('skill-ver-ex')?.addEventListener('click',()=>abrirDetalheExercicioBiblioteca(no.exercicio,()=>abrirDetalheSkillTreeCalifit(no.id,voltar)));
  $('skill-back')?.addEventListener('click',voltar);
}
function abrirSkillTreeCalifit(filtro='foco'){
  const filtrosValidos=['foco','pronto','conquistado','bloqueado','todos'];
  if(!filtrosValidos.includes(filtro)) filtro='foco';
  const trilhas=listarSkillTreeCalifit();
  const resumo=resumoProgressoSkillTreeCalifit();
  const bloqueados=resumo.contagem.bloqueado||0;
  let primeiraAberta=false;
  const trilhasHtml=trilhas.map(trilha=>{
    const visiveis=nosSkillTreePorFiltroCalifit(trilha,resumo.mapa,filtro);
    if(!visiveis.length) return'';
    const abrir=!primeiraAberta;
    primeiraAberta=true;
    return htmlTrilhaSkillTreeCalifit(trilha,resumo,filtro,abrir);
  }).filter(Boolean).join('');
  const filtros=[
    ['foco','Meu foco'],['pronto','Prontos'],['conquistado','Conquistados'],['bloqueado','Bloqueados'],['todos','Árvore completa']
  ];
  const ajuda={
    foco:'Mostra o que está em progresso, pronto para avançar ou a primeira base útil de cada trilha.',
    pronto:'Mostra somente habilidades com evidência suficiente para testar o próximo passo.',
    conquistado:'Mostra habilidades já consolidadas no histórico ou nas marcas atuais.',
    bloqueado:'Mostra bloqueios temporários por dor, limitação ou equipamento.',
    todos:'Mostra todos os passos, inclusive bases ainda não iniciadas.'
  }[filtro];
  mOpen('m2',`<div id="skill-root">
    <div class="mt2">Skill Tree CaliFit</div>
    <div class="skill-intro">A árvore usa marcas e registros reais para mostrar seu progresso. Ela é consultiva e não altera o plano automaticamente.${bloqueados?` Há ${bloqueados} passo${bloqueados===1?'':'s'} temporariamente bloqueado${bloqueados===1?'':'s'} por segurança ou equipamento.`:''}</div>
    <div class="skill-stats skill-stats-progress">
      <div class="skill-stat"><strong>${trilhas.length}</strong><span>trilhas</span></div>
      <div class="skill-stat"><strong>${resumo.contagem.conquistado||0}</strong><span>conquistados</span></div>
      <div class="skill-stat"><strong>${resumo.contagem.em_progresso||0}</strong><span>em progresso</span></div>
      <div class="skill-stat"><strong>${resumo.contagem.pronto||0}</strong><span>prontos</span></div>
    </div>
    <div class="skill-filter-title">O que mostrar</div>
    <div class="skill-filter-row">${filtros.map(([id,label])=>`<button class="skill-filter-btn${filtro===id?' on':''}" type="button" data-skill-filter="${id}">${escHtml(label)}</button>`).join('')}</div>
    <div class="skill-filter-help">${escHtml(ajuda)}</div>
    <details class="skill-legend-details"><summary>Entenda os estados</summary><div class="skill-progress-legend">${['base','em_progresso','pronto','conquistado','bloqueado'].map(htmlSkillStatusPillCalifit).join('')}</div></details>
    ${trilhasHtml||'<div class="skill-track-empty">Nenhum item aparece neste filtro. Use “Meu foco” ou “Árvore completa” para continuar.</div>'}
    <button class="btn btn-s" id="skill-close" type="button">Fechar</button>
  </div>`);
  document.querySelectorAll('[data-skill-filter]').forEach(btn=>btn.addEventListener('click',()=>abrirSkillTreeCalifit(btn.dataset.skillFilter)));
  document.querySelectorAll('[data-skill-no]').forEach(btn=>btn.addEventListener('click',()=>abrirDetalheSkillTreeCalifit(btn.dataset.skillNo,()=>abrirSkillTreeCalifit(filtro))));
  $('skill-close')?.addEventListener('click',()=>mClose('m2'));
}


EX_INFO['Prancha']={sub:'isometria frontal para estabilizar tronco, glúteos e cintura escapular pelo tempo indicado',equip:'chão/tapete',carga:'peso corporal',passos:['Apoie antebraços abaixo dos ombros e estenda as pernas.','Mantenha cabeça, tronco e quadril em uma linha confortável.','Segure pelo tempo indicado respirando sem deixar a lombar ceder.'],dica:'Contraia levemente glúteos e abdômen sem prender a respiração.',erro:'Elevar demais o quadril ou deixar a lombar afundar.',reg:'Prancha curta ou Dead Bug.',progressao:'Aumente o tempo aos poucos antes de usar variações dinâmicas.',seguranca:'Pare se houver dor lombar ou no ombro; reduza o tempo ou use uma regressão.'};
EX_INFO['Ponte de Glúteo']={sub:'elevação de quadril no chão',equip:'chão/tapete',carga:'peso corporal',passos:['Deite com os pés no chão.','Eleve o quadril contraindo glúteos.','Desça devagar sem arquear a lombar.'],dica:'Empurre o chão com os calcanhares.',erro:'Subir usando a lombar.',reg:'Faça menor ou com pausa curta.'};
EX_INFO['Step-up']={sub:'subida em degrau ou banco',equip:'step, degrau ou banco firme',carga:'peso corporal',passos:['Apoie um pé no degrau.','Suba empurrando o pé de cima.','Desça devagar e faça as repetições de uma perna e depois da outra, ou alternadas se indicado.'],dica:'Use altura baixa no início.',erro:'Impulsionar demais com a perna de baixo.',reg:'Degrau mais baixo ou agachamento parcial.'};
EX_INFO['Rack Hold']={sub:'segurar kettlebell junto ao ombro',equip:'kettlebell',carga:'kettlebell',passos:['Segure o kettlebell na posição de rack.','Mantenha punho neutro e tronco firme.','Respire sem perder o controle do ombro.'],dica:'Use carga leve e sem dor.',erro:'Dobrar o punho ou encolher o ombro.',reg:'Sem kettlebell, faça mobilidade de ombro sem carga.'};
EX_INFO['Agachamento Goblet com halter']={sub:'agachamento segurando um halter no peito',equip:'halter',carga:'halter',passos:['Segure o halter junto ao peito.','Agache com joelhos alinhados aos pés.','Suba mantendo o tronco firme.'],dica:'Comece com carga confortável.',erro:'Deixar os joelhos caírem para dentro.',reg:'Agachamento sem carga ou assistido.'};
EX_INFO['Levantamento terra romeno com halteres']={sub:'dobrar o quadril com halteres',equip:'halteres',carga:'halteres',passos:['Segure os halteres ao lado das pernas.','Leve o quadril para trás com coluna neutra.','Suba contraindo os glúteos.'],dica:'Mantenha os pesos perto do corpo.',erro:'Arredondar a lombar ou agachar demais.',reg:'Ponte de glúteo sem carga.'};
EX_INFO['Remada unilateral com halter']={sub:'puxada de um braço com apoio',equip:'halter e apoio firme',carga:'halter',passos:['Apoie uma mão e mantenha a coluna neutra.','Puxe o halter em direção ao quadril.','Desça com controle e repita a série para o outro braço.'],dica:'Mantenha o ombro longe da orelha.',erro:'Girar o tronco para levantar a carga.',reg:'Remada com elástico ou menor carga.'};
EX_INFO['Desenvolvimento com halteres']={sub:'empurrar halteres acima da cabeça',equip:'halteres',carga:'halteres',passos:['Segure os halteres junto aos ombros.','Empurre acima da cabeça sem arquear a lombar.','Desça com controle.'],dica:'Use apenas se estiver sem dor no ombro.',erro:'Encolher os ombros ou compensar com a lombar.',reg:'Elevação sem carga ou flexão inclinada.'};
EX_INFO['Farmer Hold com halteres']={sub:'segurar halteres ao lado do corpo',equip:'halteres',carga:'halteres',passos:['Fique em pé segurando os halteres.','Mantenha postura alta e abdômen firme.','Respire sem inclinar o corpo.'],dica:'Carga deve permitir postura estável.',erro:'Encolher os ombros ou inclinar o tronco.',reg:'Use menor carga ou faça sem peso.'};
EX_INFO['Agachamento com mochila']={sub:'agachamento segurando mochila carregada',equip:'mochila firme',carga:'mochila com carga',passos:['Segure a mochila junto ao tronco.','Agache com controle e joelhos alinhados.','Suba sem perder a postura.'],dica:'Distribua bem o conteúdo da mochila.',erro:'Usar mochila solta ou instável.',reg:'Agachamento sem carga.'};
EX_INFO['Avanço com mochila']={sub:'passada segurando mochila carregada',equip:'mochila firme',carga:'mochila com carga',passos:['Segure a mochila firme.','Dê um passo confortável e desça controlando o joelho.','Volte sem impulso e repita por perna.'],dica:'Comece com passo curto.',erro:'Perder equilíbrio ou deixar o joelho cair para dentro.',reg:'Avanço sem carga ou agachamento assistido.'};
EX_INFO['Ponte de glúteo com mochila']={sub:'elevação de quadril com mochila',equip:'mochila firme e tapete',carga:'mochila com carga',passos:['Apoie a mochila sobre o quadril.','Eleve o quadril apertando os glúteos.','Desça devagar.'],dica:'Segure a mochila para não deslizar.',erro:'Arquear a lombar.',reg:'Ponte de glúteo sem carga.'};
EX_INFO['Remada curvada com mochila']={sub:'puxada inclinada usando mochila',equip:'mochila firme',carga:'mochila com carga',passos:['Segure a mochila pelas alças.','Incline o tronco com coluna neutra.','Puxe a mochila ao abdômen e desça devagar.'],dica:'Mantenha o peso próximo do corpo.',erro:'Arredondar a lombar.',reg:'Remada com elástico ou Bird Dog.'};
EX_INFO['Agachamento com colete']={sub:'agachamento usando colete de carga',equip:'colete de carga',carga:'colete',passos:['Ajuste o colete ao corpo.','Agache com amplitude confortável.','Suba mantendo joelhos alinhados.'],dica:'A carga deve permitir controle total.',erro:'Usar carga excessiva ou colete solto.',reg:'Agachamento sem carga.'};
EX_INFO['Step-up com colete']={sub:'subida em degrau usando colete',equip:'colete e degrau firme',carga:'colete',passos:['Ajuste o colete e apoie um pé no degrau.','Suba controlando o joelho.','Desça devagar e repita por perna.'],dica:'Use degrau baixo.',erro:'Impulsionar com a perna de baixo.',reg:'Step-up sem carga.'};
EX_INFO['Barra Fixa com carga']={sub:'barra fixa com carga adicional pendurada no cinto',equip:'barra fixa segura e cinto de carga',carga:'cinto com carga cadastrada',passos:['Prenda a carga de forma estável e teste o balanço antes de iniciar.','Faça a barra sem impulso e mantenha o tronco firme.','Desça controlando e encerre antes da falha.'],dica:'Comece com a menor carga disponível.',erro:'Usar carga antes de ter barras livres sólidas ou balançar a anilha.',reg:'Barra Fixa Pronada sem carga.'};
EX_INFO['Paralelas com carga']={sub:'paralelas com carga adicional pendurada no cinto',equip:'barras paralelas seguras e cinto de carga',carga:'cinto com carga cadastrada',passos:['Prenda a carga e estabilize o corpo antes de descer.','Use amplitude confortável para o ombro.','Suba sem impulso e pare antes da falha.'],dica:'A menor carga já é uma progressão relevante.',erro:'Descer profundo demais ou deixar a carga balançar.',reg:'Flexões nas Paralelas sem carga.'};
// 163D2 · Fichas completas para alternativas que antes dependiam de texto genérico.
Object.assign(EX_INFO,{
  'Prancha curta':{sub:'prancha de duração curta e com apoio ajustável',equip:'chão/tapete',carga:'peso corporal',passos:['Apoie os antebraços no chão e escolha joelhos ou pés como apoio.','Alinhe ombros, quadril e joelhos/pés sem arquear a lombar.','Contraia levemente abdômen e glúteos, respire normalmente e segure apenas o tempo indicado.'],dica:'Comece com os joelhos apoiados se não conseguir manter a lombar neutra.',erro:'Prender a respiração, deixar o quadril cair ou tentar prolongar além da técnica.',reg:'Dead Bug ou prancha com joelhos por menos tempo.',progressao:'Aumente 5 segundos por vez antes de retirar o apoio dos joelhos.',seguranca:'Pare se houver dor lombar, no ombro ou pressão desconfortável; reduza o tempo ou escolha Dead Bug.'},
  'Prancha alta curta':{sub:'prancha curta apoiada nas mãos',equip:'chão/tapete',carga:'peso corporal',passos:['Apoie as mãos abaixo dos ombros e use joelhos ou pés como base.','Empurre o chão suavemente, mantendo peito afastado e corpo alinhado.','Segure pelo tempo indicado respirando sem deixar a lombar arquear.'],dica:'Punhos desconfortáveis podem usar apoio elevado ou posição sobre os joelhos.',erro:'Afundar entre os ombros ou jogar todo o peso nos punhos.',reg:'Prancha nos antebraços, apoio na parede ou Dead Bug.',progressao:'Aumente o tempo curto antes de passar para uma prancha alta completa.',seguranca:'Evite apoio nas mãos se houver dor no punho ou ombro.'},
  'Prancha lateral curta':{sub:'prancha lateral com apoio do joelho e duração curta',equip:'chão/tapete',carga:'peso corporal',passos:['Deite de lado e apoie o antebraço abaixo do ombro.','Mantenha o joelho de baixo apoiado e eleve o quadril até alinhar tronco e coxa.','Segure o tempo indicado, respire e repita do outro lado.'],dica:'Empurre o antebraço contra o chão e mantenha o pescoço relaxado.',erro:'Afundar o quadril, girar o tronco ou apoiar o cotovelo longe do ombro.',reg:'Dead Bug, Bird Dog ou tempo ainda menor com joelho apoiado.',progressao:'Aumente o tempo e só depois estenda as duas pernas.',seguranca:'Reduza ou troque se houver dor no ombro, cotovelo ou lombar.'},
  'Prancha lateral alta':{sub:'prancha lateral apoiada na mão',equip:'chão/tapete',carga:'peso corporal',passos:['Apoie uma mão diretamente abaixo do ombro e posicione os pés ou um joelho no chão.','Eleve o quadril e mantenha cabeça, tronco e pernas em uma linha confortável.','Segure o tempo indicado respirando e repita do outro lado.'],dica:'Use o joelho de baixo no chão para diminuir a carga no ombro e no punho.',erro:'Deixar o ombro colapsar, afundar o quadril ou girar o peito para o chão.',reg:'Prancha lateral no antebraço com joelho apoiado ou Bird Dog.',progressao:'Passe do joelho apoiado para os pés e aumente tempo somente com estabilidade.',seguranca:'Evite esta versão se houver dor no punho ou ombro; prefira o antebraço.'},
  'Agachamento assistido TRX':{sub:'agachamento com apoio das alças',equip:'TRX ou fita de suspensão bem fixada',carga:'peso corporal com assistência',passos:['Segure as alças e fique com os pés na largura confortável.','Leve o quadril para trás e dobre os joelhos, usando as mãos apenas para equilíbrio.','Suba empurrando os pés contra o chão e mantendo os joelhos alinhados.'],dica:'Quanto menos você puxar as alças, mais as pernas trabalham.',erro:'Pendurar todo o peso nos braços ou deixar os joelhos caírem para dentro.',reg:'Agachamento para banco ou sentar e levantar com apoio.',progressao:'Use menos ajuda das mãos antes de aumentar amplitude ou repetições.',seguranca:'Confirme que o ponto de fixação está firme e pare se houver dor no joelho.'},
  'Agachamento para banco':{sub:'sentar e levantar com controle',equip:'banco ou cadeira firme',carga:'peso corporal',passos:['Fique à frente do banco com os pés firmes.','Leve o quadril para trás até tocar o banco suavemente.','Levante empurrando o chão sem usar impulso das mãos.'],dica:'Escolha um banco mais alto para facilitar.',erro:'Cair sobre o banco ou juntar os joelhos ao levantar.',reg:'Banco mais alto ou apoio das mãos em superfície firme.',progressao:'Reduza a altura do banco e depois avance para agachamento livre.',seguranca:'Use cadeira estável e sem rodinhas.'},
  'Avanço Alternado':{sub:'passada alternando as pernas',equip:'nenhum ou apoio próximo',carga:'peso corporal',passos:['Dê um passo confortável à frente ou para trás.','Desça com o tronco alto e os dois joelhos alinhados.','Volte ao centro e alterne as pernas.'],dica:'Passo um pouco mais longo costuma deixar o joelho dianteiro mais confortável.',erro:'Perder equilíbrio, bater o joelho no chão ou deixar o joelho cair para dentro.',reg:'Avanço assistido, agachamento para banco ou amplitude menor.',progressao:'Aumente amplitude, repetições ou carga somente após dominar os dois lados.',seguranca:'Use apoio se houver instabilidade e pare se houver dor no joelho.'},
  'Avanço Assistido':{sub:'passada com apoio para equilíbrio',equip:'parede, cadeira firme ou barra de apoio',carga:'peso corporal',passos:['Segure levemente um apoio firme.','Dê um passo confortável e desça apenas até onde mantém o alinhamento.','Empurre o chão para voltar e repita dos dois lados.'],dica:'O apoio serve para equilíbrio, não para puxar o corpo para cima.',erro:'Dar passo curto demais ou girar o joelho para dentro.',reg:'Agachamento para banco ou avanço com amplitude menor.',progressao:'Use menos apoio e aumente amplitude antes de retirar a assistência.',seguranca:'Escolha apoio estável e interrompa se houver dor no joelho ou quadril.'},
  'Hollow Body Hold leve':{sub:'hollow hold com joelhos dobrados',equip:'chão/tapete',carga:'peso corporal',passos:['Deite de costas e pressione a lombar suavemente contra o chão.','Mantenha os joelhos dobrados e eleve levemente cabeça e ombros.','Segure pelo tempo indicado respirando sem perder o contato da lombar.'],dica:'Aproxime os joelhos do peito para facilitar.',erro:'Arquear a lombar ou prender a respiração.',reg:'Dead Bug ou apenas ativação abdominal com pés no chão.',progressao:'Afaste um pé por vez antes de estender as duas pernas.',seguranca:'Se a lombar sair do chão, reduza a alavanca ou troque por Dead Bug.'},
  'Retração Escapular no Solo/Parede':{sub:'aproximar as escápulas sem carga',equip:'parede ou chão/tapete',carga:'sem carga',passos:['Fique encostado na parede ou deite com os braços confortáveis.','Aproxime suavemente as escápulas sem encolher os ombros.','Segure por 1–2 segundos e relaxe com controle.'],dica:'Pense em aproximar os ombros para trás e para baixo.',erro:'Forçar o pescoço, arquear a lombar ou mover os braços com impulso.',reg:'Círculos de ombro ou mobilidade torácica suave.',progressao:'Aumente o controle e depois avance para remada leve ou Scapular Pull-up.',seguranca:'O movimento deve ser pequeno e sem dor no ombro.'},
  'Scapular push-up':{sub:'movimento das escápulas em apoio sem dobrar os cotovelos',equip:'parede, banco ou chão/tapete',carga:'peso corporal ajustável pelo apoio',passos:['Entre em apoio na parede, banco, joelhos ou prancha alta.','Mantenha os cotovelos estendidos e deixe o peito descer um pouco entre os ombros.','Empurre o apoio afastando as escápulas, sem arredondar a lombar.'],dica:'Comece na parede para aprender o movimento.',erro:'Dobrar os cotovelos ou encolher os ombros em direção às orelhas.',reg:'Retração escapular na parede ou Wall slide.',progressao:'Parede → banco → joelhos → prancha alta.',seguranca:'Evite apoio no chão se punhos ou ombros estiverem doloridos.'},
  'Step jack':{sub:'polichinelo sem salto',equip:'nenhum',carga:'peso corporal',passos:['Dê um passo para o lado enquanto eleva os braços.','Volte ao centro e repita para o outro lado.','Mantenha ritmo contínuo sem saltar e sem bater os pés.'],dica:'Use amplitude menor dos braços se o ombro estiver cansado.',erro:'Acelerar e perder coordenação ou bater os pés com força.',reg:'Marcha no lugar ou caminhada leve.',progressao:'Aumente o tempo ou ritmo antes de usar polichinelo com salto.',seguranca:'Mantenha baixo impacto se joelho, tornozelo ou pé estiverem sensíveis.'},
  'Marcha no lugar':{sub:'caminhada parada de baixo impacto',equip:'nenhum ou apoio para equilíbrio',carga:'peso corporal',passos:['Fique alto e caminhe no mesmo lugar.','Eleve um joelho por vez em altura confortável.','Movimente os braços e mantenha respiração fácil.'],dica:'Use uma parede ou cadeira para equilíbrio, se necessário.',erro:'Inclinar o tronco para trás ou bater os pés no chão.',reg:'Caminhada leve ou movimentos de tornozelo sentado.',progressao:'Aumente tempo, ritmo ou altura dos joelhos gradualmente.',seguranca:'Reduza a elevação do joelho se houver dor no quadril ou joelho.'},
  'Caminhada leve':{sub:'atividade aeróbica confortável de recuperação',equip:'calçado confortável e local seguro',carga:'peso corporal',passos:['Caminhe em ritmo em que ainda consegue conversar.','Mantenha passos confortáveis e postura relaxada.','Finalize sem buscar cansaço alto.'],dica:'A caminhada deve ajudar na recuperação, não virar treino intenso.',erro:'Acelerar até ficar ofegante ou insistir com dor.',reg:'Marcha no lugar ou mobilidade leve.',progressao:'Aumente primeiro a duração e só depois o ritmo.',seguranca:'Interrompa se houver dor no peito, tontura ou piora de dor articular.'}
});



window.__CALIFIT_EXPLORE_MODULE__={
  normalizarChaveFiltroBibliotecaCalifit,
  listarExerciciosBibliotecaCalifit,
  filtrarExerciciosBibliotecaCalifit,
  detalheExercicioBibliotecaCalifit,
  opcoesFiltroBiblioteca,
  abrirBibliotecaExercicios,
  listarSkillTreeCalifit,
  detalheSkillTreeNoCalifit,
  caminhoSkillTreeCalifit,
  filtrarSkillTreeCalifit,
  localizarSkillTreePorExercicioCalifit,
  historicoSkillTreeCalifit,
  evidenciasNoSkillTreeCalifit,
  mapaProgressoSkillTreeCalifit,
  avaliarProgressoSkillTreeCalifit,
  resumoProgressoSkillTreeCalifit,
  responderSkillTreeTreinadorCalifit,
  abrirDetalheSkillTreeCalifit,
  abrirSkillTreeCalifit
};
window.dispatchEvent(new CustomEvent('califit:explore-ready'));
})();
