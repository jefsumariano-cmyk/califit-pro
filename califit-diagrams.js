(function instalarModuloDiagramasCalifit(){
'use strict';

// 163L2.3 — cobertura inteligente: próprio, compartilhado ou somente texto
const DIAGRAMAS_PROPRIOS_CALIFIT={
  'Hollow Hold com Medicine Ball':'hollow_ball',
  'Abdução de quadril com mini band':'mini_abduction',
  'Caminhada lateral com mini band':'mini_walk',
  'Body Saw TRX':'body_saw',
  'TRX Fallout':'trx_fallout',
  'External Rotation com elástico':'external_rotation',
  'External Rotation':'external_rotation',
  'Scapular pull-up':'scap_pull',
  'Scapular Pull-ups':'scap_pull',
  'Pistol Assistido':'pistol',
  'Bird Dog':'bird_dog',
  'Dead Bug':'dead_bug',
  'Pike push-up':'pike',
  'Face Pull':'face_pull',
  'Flexão em Argola':'ring_push',
  'Kettlebell Swing':'kb_swing',
  'Face pull com elástico':'face_pull',
  'Rotação externa':'external_rotation',
  'Agachamento Búlgaro':'bulgarian',
  'Cossack squat':'cossack',
  'Hanging Leg Raise':'hanging_leg_raise',
  'Wall sit':'wall_sit'
};
const DIAGRAMAS_COMPARTILHADOS_CALIFIT={
  'Hollow Body Hold':'hollow_hold',
  'Hollow Body Hold leve':'hollow_hold_easy',
  'Dead Bug com Medicine Ball':'dead_bug',
  'Ponte de Glúteo com mini band':'glute_bridge',
  'Flexão TRX':'pushup',
  'Agachamento assistido TRX':'squat',
  'Remada TRX':'trx_row',
  'Remada em Suspensão':'trx_row',
  'Remada baixa com elástico':'low_band_row',
  'Remada com Elástico':'band_row_standing',
  'Levantamento terra romeno com halteres':'hinge',
  'Levantamento terra romeno com kettlebell':'hinge',
  'RDL KB':'hinge',
  'Prancha Lateral':'side_plank',
  'Prancha lateral alta':'side_plank',
  'Prancha lateral curta':'side_plank',
  'Remada Invertida':'inverted_row_vis',
  'Barra Fixa Pronada':'pull_up',
  'Barra Fixa Supinada':'pull_up',
  'Australian Pull-up':'australian_row_vis',
  'Remada em Argola':'ring_row_vis',
  'Agachamento':'squat',
  'Agachamento Livre':'squat',
  'Agachamento Goblet':'squat',
  'Agachamento Goblet com halter':'squat',
  'Agachamento c/ Colete':'squat',
  'Agachamento com colete':'squat',
  'Agachamento com mochila':'squat',
  'Agachamento para banco':'squat',
  'Afundo':'lunge',
  'Afundo reverso':'lunge',
  'Avanço Alternado':'lunge',
  'Avanço Assistido':'lunge',
  'Avanço com mochila':'lunge',
  'Ponte de Glúteo':'glute_bridge',
  'Ponte de glúteo com mochila':'glute_bridge',
  'Flexão no Solo':'pushup',
  'Flexão Diamante':'pushup',
  'Alongamento flexor do quadril':'hip_flexor_stretch',
  'Alongamento posterior':'hamstring_stretch',
  'Barra Assistida':'assisted_pullup_vis',
  'Barra negativa assistida':'negative_pullup_vis',
  'Bear crawl':'bear_crawl_vis',
  'Burpee':'burpee_vis',
  'Caminhada leve':'walk_light',
  'Cat-Cow':'cat_cow',
  'Círculos de ombro':'shoulder_circles',
  'Corda de pular':'jump_rope',
  'Corrida estacionária':'stationary_run',
  'Deadlift com mochila':'hinge',
  'Desenvolvimento com halteres':'shoulder_press',
  'Elevação de panturrilha':'calf_raise',
  'Elevação de perna com peso de tornozelo':'hanging_leg_raise',
  'Farmer Hold com halteres':'carry_hold',
  'Flexão com joelhos':'knee_pushup_vis',
  'Flexão declinada':'decline_pushup_vis',
  'Flexão inclinada':'incline_pushup_vis',
  'Flexões nas Paralelas':'dips_vis',
  'Good morning':'hinge',
  'Hamstring walkout':'glute_bridge',
  'Handstand hold':'handstand_hold_vis',
  'Handstand push-up':'handstand_pushup_vis',
  'Hip thrust':'glute_bridge',
  'Hollow Rock':'hollow_rock_vis',
  'Marcha no lugar':'march_place',
  'Mobilidade de tornozelo':'ankle_mobility',
  'Mobilidade Quadril':'hip_mobility',
  'Mobilidade Torácica':'thoracic_mobility',
  'Mountain climber intenso':'mountain_climber_fast',
  'Negativa Barra':'negative_pullup_vis',
  'Open Book':'open_book',
  'Peso morto unilateral':'hinge',
  'Polichinelo':'jumping_jack',
  'Ponte de Glúteo com apoio':'glute_bridge',
  'Ponte Unilateral':'single_leg_bridge_vis',
  'Prancha':'plank_forearm',
  'Prancha alta curta':'plank_high_short',
  'Prancha curta':'plank_short',
  'Rack Hold':'carry_hold',
  'Remada curvada com mochila':'one_arm_row',
  'Remada unilateral com halter':'one_arm_row',
  'Respiração/bracing leve':'breathing',
  'Retração Escapular no Solo/Parede':'scapular_retraction_vis',
  'Roda Abdominal':'ab_wheel_vis',
  'Scapular push-up':'scapular_pushup_vis',
  'Shoulder Pass Through':'shoulder_pass_through',
  'Sit-up':'situp_vis',
  'Step jack':'step_jack_vis',
  'Step-up':'stepup_vis',
  'Step-up com colete':'stepup_weighted_vis',
  'Supino com halteres':'dumbbell_press',
  'Wall slide':'wall_slide_mobility',
  'Mountain climber':'mountain_climber_vis',
  'Paralelas':'dips_vis',
  'V-up':'vup_vis'
};
const EXERCICIOS_SOMENTE_TEXTO_CALIFIT=[];
const DIAGRAMAS_EXERCICIOS_CALIFIT={...DIAGRAMAS_PROPRIOS_CALIFIT,...DIAGRAMAS_COMPARTILHADOS_CALIFIT};
const COBERTURA_DIAGRAMAS_CALIFIT=Object.freeze({
  ...Object.fromEntries(Object.entries(DIAGRAMAS_PROPRIOS_CALIFIT).map(([nome,tipo])=>[nome,{modo:'proprio',tipo,base:nome}])),
  ...Object.fromEntries(Object.entries(DIAGRAMAS_COMPARTILHADOS_CALIFIT).map(([nome,tipo])=>[nome,{modo:'compartilhado',tipo,base:tipo}])),
  ...Object.fromEntries(EXERCICIOS_SOMENTE_TEXTO_CALIFIT.map(nome=>[nome,{modo:'texto',tipo:'',base:''}]))
});
function classificarCoberturaDiagramaCalifit(nome){
  const canon=typeof nomeCanonicoMetaExercicio==='function'?(nomeCanonicoMetaExercicio(nome)||nome):nome;
  const alvos=[nome,canon].map(normTxt).filter(Boolean);
  for(const [chave,info] of Object.entries(COBERTURA_DIAGRAMAS_CALIFIT)){
    if(alvos.includes(normTxt(chave))) return {nome:chave,...info};
  }
  return {nome:String(nome||''),modo:'nao_mapeado',tipo:'',base:''};
}
function tipoDiagramaExercicioCalifit(nome){
  const info=classificarCoberturaDiagramaCalifit(nome);
  return info.modo==='proprio'||info.modo==='compartilhado'?info.tipo:'';
}
function rotuloCoberturaDiagramaCalifit(modo,curto=false){
  if(modo==='proprio') return curto?'Esquema específico':'Demonstração visual específica';
  if(modo==='compartilhado') return curto?'Base visual':'Demonstração do padrão-base';
  if(modo==='texto') return curto?'Texto detalhado':'Orientação completa em texto';
  return curto?'Sem classificação':'Demonstração ainda não classificada';
}
function htmlSeloCoberturaDiagramaCalifit(nome,curto=false){
  const info=classificarCoberturaDiagramaCalifit(nome);
  const modo=['proprio','compartilhado','texto'].includes(info.modo)?info.modo:'texto';
  return `<span class="bib-demo-badge ${modo}" data-demo-modo="${escHtml(modo)}">${escHtml(rotuloCoberturaDiagramaCalifit(modo,curto))}</span>`;
}
function listarCoberturaDiagramasCalifit(){
  const itens=typeof listarExerciciosBibliotecaCalifit==='function'?listarExerciciosBibliotecaCalifit():Object.keys(COBERTURA_DIAGRAMAS_CALIFIT).map(nome=>({nome}));
  return itens.map(item=>{const nome=item.nomeTecnico||item.nome;return {nome,...classificarCoberturaDiagramaCalifit(nome)};});
}
function resumoCoberturaDiagramasCalifit(){
  const lista=listarCoberturaDiagramasCalifit();
  return {total:lista.length,proprios:lista.filter(x=>x.modo==='proprio').length,compartilhados:lista.filter(x=>x.modo==='compartilhado').length,texto:lista.filter(x=>x.modo==='texto').length,naoMapeados:lista.filter(x=>x.modo==='nao_mapeado').length};
}

function dadosDiagramaExercicioCalifit(tipo){
  const mapa={
    hollow:{titulo:'Hollow Body: montar e sustentar',nota:'A amplitude correta termina antes de a lombar perder contato com o chão.',move:'Braços e pernas se afastam do tronco enquanto costelas e pelve permanecem recolhidas.',evite:'Arquear a lombar, prender a respiração ou estender mais do que consegue controlar.'},
    hollow_ball:{titulo:'Hollow com medicine ball',nota:'A bola aumenta a alavanca; use uma amplitude menor se necessário.',move:'Braços e pernas se afastam mantendo o abdômen firme e a lombar apoiada.',evite:'Deixar costelas abrirem ou a lombar levantar do chão.'},
    hinge:{titulo:'RDL: dobradiça de quadril',nota:'O movimento é do quadril para trás, não um agachamento para baixo.',move:'Quadril recua; tronco inclina como bloco; cargas descem próximas às pernas.',evite:'Arredondar a lombar, afastar a carga do corpo ou flexionar demais os joelhos.'},
    side_plank:{titulo:'Prancha lateral: criar uma linha',nota:'Empilhe ombro e cotovelo/mão antes de elevar o quadril.',move:'Quadril sobe até alinhar ombro, quadril e pés; o tronco fica estável.',evite:'Deixar o ombro afundar, girar o peito para o chão ou deixar o quadril cair.'},
    bird_dog:{titulo:'Bird Dog: alcançar sem girar',nota:'O alcance deve ser longo e baixo, sem buscar altura.',move:'Braço e perna opostos se estendem enquanto pelve e tronco permanecem quadrados.',evite:'Girar a pelve, arquear a lombar ou levantar a perna acima do quadril.'},
    dead_bug:{titulo:'Dead Bug: afastar sem perder a lombar',nota:'Reduza a amplitude imediatamente se a lombar começar a levantar.',move:'Braço e perna opostos descem em direção ao chão com o tronco imóvel.',evite:'Acelerar, prender a respiração ou afastar os membros além do controle.'},
    scap_pull:{titulo:'Scapular Pull-up: mover só as escápulas',nota:'Os cotovelos permanecem estendidos durante toda a repetição.',move:'O tórax sobe poucos centímetros quando as escápulas descem e se organizam.',evite:'Dobrar os cotovelos, balançar ou encolher os ombros em direção às orelhas.'},
    band_row:{titulo:'Remada com elástico: puxar às costelas',nota:'Prenda a faixa em um ponto firme e teste a ancoragem antes de começar.',move:'Cotovelos caminham para trás; mãos chegam perto das costelas; escápulas se aproximam.',evite:'Elevar os ombros, inclinar o tronco para ganhar impulso ou deixar a faixa frouxa.'},
    trx_row:{titulo:'Remada TRX: corpo em bloco',nota:'Quanto mais horizontal o corpo, maior a dificuldade.',move:'Peito se aproxima das alças enquanto corpo, quadril e pernas permanecem alinhados.',evite:'Projetar a cabeça, deixar o quadril cair ou puxar somente com as mãos.'},
    body_saw:{titulo:'Body Saw TRX: deslizar o corpo inteiro',nota:'Comece com deslocamento curto; o controle vale mais que a distância.',move:'O corpo desliza para trás e retorna como uma prancha rígida.',evite:'Ceder a lombar, empinar o quadril ou transformar em movimento apenas dos braços.'},
    trx_fallout:{titulo:'TRX Fallout: inclinar e recuperar',nota:'Aumente a inclinação somente quando conseguir manter costelas e pelve alinhadas.',move:'Braços avançam e o corpo inclina como bloco; o core freia e traz de volta.',evite:'Arquear a lombar, dobrar muito os cotovelos ou deixar o quadril para trás.'},
    pike:{titulo:'Pike push-up: cabeça vai à frente',nota:'O triângulo entre cabeça e mãos cria uma base mais estável.',move:'Cotovelos dobram e a cabeça desce à frente das mãos; quadril permanece alto.',evite:'Descer reto entre as mãos, abrir demais os cotovelos ou perder o quadril alto.'},
    pistol:{titulo:'Pistol assistido: sentar para trás',nota:'Use apoio suficiente para manter pé inteiro no chão e joelho alinhado.',move:'Quadril recua e desce sobre uma perna enquanto a outra permanece estendida.',evite:'Puxar-se com os braços, deixar o joelho colapsar para dentro ou perder o calcanhar.'},
    mini_walk:{titulo:'Caminhada lateral com mini band',nota:'Passos curtos preservam a tensão e o alinhamento.',move:'Uma perna abre e a outra acompanha sem os pés se encostarem.',evite:'Arrastar os pés, balançar o tronco ou deixar joelhos caírem para dentro.'},
    mini_abduction:{titulo:'Abdução com mini band',nota:'A pelve deve permanecer estável durante a abertura.',move:'Joelho ou perna se afasta da linha média contra a resistência da faixa.',evite:'Inclinar o tronco, girar o pé para compensar ou perder a tensão da faixa.'},
    external_rotation:{titulo:'Rotação externa com elástico',nota:'Coloque uma toalha entre cotovelo e tronco se isso ajudar a manter o braço estável.',move:'Antebraço gira para fora enquanto o cotovelo permanece colado ao corpo.',evite:'Abrir o cotovelo, girar o tronco ou usar uma resistência que force o ombro.'},
    ab_wheel:{titulo:'Roda abdominal: avançar sem ceder',nota:'A distância termina onde você ainda consegue manter costelas e pelve alinhadas.',move:'O corpo avança a partir dos ombros e quadris e retorna usando o abdômen.',evite:'Deixar a lombar afundar, avançar rápido ou puxar a roda apenas com os braços.'},
    bridge_band:{titulo:'Ponte com mini band',nota:'Mantenha os joelhos levemente afastados durante toda a subida.',move:'Quadril sobe pela contração dos glúteos enquanto a faixa permanece tensionada.',evite:'Arquear a lombar, abrir excessivamente os joelhos ou empurrar apenas com os pés.'},
    trx_push:{titulo:'Flexão TRX: estabilizar as alças',nota:'Quanto mais inclinado o corpo, maior a dificuldade e a instabilidade.',move:'Peito desce entre as alças e retorna com corpo reto.',evite:'Abrir demais os cotovelos, deixar as alças escaparem ou ceder o quadril.'},
    trx_squat:{titulo:'Agachamento assistido no TRX',nota:'As alças servem como apoio leve, não como guincho.',move:'Quadril desce entre os pés e sobe mantendo joelhos alinhados.',evite:'Puxar o corpo com os braços, jogar o peso para trás ou fechar os joelhos.'},
    handstand:{titulo:'Handstand na parede: empurrar o chão',nota:'Use a parede como referência, não como lugar para relaxar o corpo.',move:'O corpo se organiza verticalmente enquanto ombros empurram o chão.',evite:'Relaxar nos ombros, arquear demais a lombar ou aproximar mãos excessivamente da parede.'},
    handstand_push:{titulo:'Handstand push-up: descer em base triangular',nota:'Comece com amplitude parcial e apoio seguro.',move:'Cotovelos dobram e a cabeça desce entre e ligeiramente à frente das mãos.',evite:'Desabar sobre a cabeça, abrir demais os cotovelos ou perder tensão do tronco.'},
    pull_up:{titulo:'Barra fixa: puxar o peito para cima',nota:'Use assistência quando necessário e controle também a descida.',move:'Escápulas descem, cotovelos apontam para baixo e o peito se aproxima da barra.',evite:'Balançar, projetar o queixo ou encurtar a descida sem controle.'},
    inverted_row:{titulo:'Remada invertida: corpo em linha',nota:'Quanto mais horizontal o corpo, maior a dificuldade.',move:'Peito se aproxima do apoio enquanto cotovelos seguem para trás.',evite:'Deixar o quadril cair, encolher os ombros ou puxar somente com os braços.'},
    face_pull:{titulo:'Face Pull: puxar em direção ao rosto',nota:'Use resistência leve o suficiente para manter o ombro organizado.',move:'Cotovelos abrem e mãos chegam próximas às têmporas enquanto escápulas se aproximam.',evite:'Arquear a lombar, elevar os ombros ou puxar a faixa abaixo do peito.'},
    ring_push:{titulo:'Flexão em argolas: estabilizar e empurrar',nota:'Comece com o corpo mais vertical até dominar a instabilidade.',move:'Peito desce entre as argolas e retorna mantendo alças próximas ao corpo.',evite:'Deixar argolas abrirem, perder o quadril ou descer além do controle do ombro.'},
    kb_swing:{titulo:'Kettlebell Swing: potência do quadril',nota:'O peso sobe pelo impulso do quadril, não por elevação dos braços.',move:'Quadril recua e depois estende rapidamente, conduzindo o kettlebell à frente.',evite:'Agachar demais, levantar com os ombros ou hiperestender a lombar no final.'},
    squat:{titulo:'Agachamento: sentar entre os pés',nota:'Use a profundidade em que pés, joelhos e tronco permanecem controlados.',move:'Quadril e joelhos dobram juntos; o corpo desce e sobe sobre o meio dos pés.',evite:'Joelhos colapsarem para dentro, calcanhares levantarem ou lombar perder posição.'},
    lunge:{titulo:'Afundo: descer entre os apoios',nota:'Ajuste o comprimento do passo para manter equilíbrio e controle.',move:'Os dois joelhos dobram enquanto o tronco desce verticalmente entre os pés.',evite:'Passo estreito demais, joelho da frente cair para dentro ou impulso excessivo.'},
    bulgarian:{titulo:'Agachamento búlgaro: apoiar e descer',nota:'O pé traseiro é apoio; a perna da frente realiza a maior parte do trabalho.',move:'Quadril desce sobre a perna da frente enquanto o joelho traseiro se aproxima do chão.',evite:'Ficar em uma linha estreita, empurrar demais com a perna traseira ou perder equilíbrio.'},
    glute_bridge:{titulo:'Ponte de glúteo: elevar pelo quadril',nota:'Termine quando tronco e coxas formarem uma linha, sem arquear a lombar.',move:'Quadril sobe pela contração dos glúteos e retorna com controle.',evite:'Empurrar apenas com a ponta dos pés, abrir as costelas ou hiperestender a lombar.'},
    pushup:{titulo:'Flexão: corpo desce como bloco',nota:'A altura do apoio define a dificuldade; preserve a mesma organização corporal.',move:'Cotovelos dobram e o peito se aproxima do apoio, depois o chão é empurrado.',evite:'Quadril cair, cabeça avançar ou cotovelos abrirem excessivamente.'},
    cossack:{titulo:'Cossack squat: deslocar para um lado',nota:'Use amplitude confortável e mantenha o pé da perna dobrada inteiro no chão.',move:'Quadril se desloca lateralmente sobre uma perna enquanto a outra estende.',evite:'Girar o joelho para dentro, perder o calcanhar ou forçar amplitude sem mobilidade.'},
    hanging_leg_raise:{titulo:'Elevação de pernas na barra: controlar a pelve',nota:'Comece com joelhos dobrados se pernas estendidas exigirem balanço.',move:'Pelve se enrola e pernas sobem sem perder o controle dos ombros.',evite:'Balançar, puxar só com o quadril ou relaxar completamente os ombros.'},
    wall_sit:{titulo:'Wall sit: sustentar o agachamento',nota:'Escolha um ângulo que permita respirar e manter pés firmes.',move:'O corpo desliza pela parede até a posição e permanece estável durante o tempo.',evite:'Joelhos caírem para dentro, pés muito próximos da parede ou prender a respiração.'},
    thoracic_mobility:{titulo:'Mobilidade torácica: girar sem compensar',nota:'A rotação vem do tórax; mantenha quadril e lombar o mais estáveis possível.',move:'Peito e parte alta das costas giram ou estendem levemente enquanto a base fica estável.',evite:'Forçar a lombar, perder o controle da respiração ou transformar o movimento em balanço do corpo.'},
    open_book:{titulo:'Open Book: abrir o peito',nota:'A perna apoiada e o quadril ajudam a estabilizar para a rotação acontecer acima.',move:'O braço de cima se abre e o tórax acompanha, girando para o lado.',evite:'Levar só o braço, levantar o joelho de apoio ou compensar pela lombar.'},
    shoulder_circles:{titulo:'Círculos de ombro: girar sem tensão',nota:'Use círculos pequenos no início e aumente a amplitude sem perder suavidade.',move:'Os braços e ombros desenham círculos contínuos enquanto o tronco permanece estável.',evite:'Arquear a lombar, acelerar demais ou encolher os ombros em direção às orelhas.'},
    shoulder_pass_through:{titulo:'Shoulder Pass Through: passar acima da cabeça',nota:'Segure um bastão ou elástico com pegada larga e só reduza a largura se houver controle.',move:'Os braços sobem à frente, passam acima da cabeça e seguem para trás dentro da amplitude confortável.',evite:'Dobrar demais os cotovelos, forçar pinçamento no ombro ou compensar arqueando a lombar.'},
    wall_slide_mobility:{titulo:'Wall Slide: deslizar braços na parede',nota:'Mantenha costelas controladas e busque contato suave com parede e antebraços.',move:'Os braços sobem e descem deslizando na parede enquanto escápulas giram para cima com controle.',evite:'Perder o contato cedo, arquear a lombar ou elevar os ombros sem controle.'},
    shoulder_mobility:{titulo:'Mobilidade de ombros: elevar e girar com controle',nota:'A mobilidade deve ser suave; reduza a amplitude se houver pinçamento ou dor.',move:'Braços se elevam ou circulam enquanto ombros e caixa torácica permanecem organizados.',evite:'Arquear a lombar, encolher os ombros ou forçar amplitude sem controle.'},
    cat_cow:{titulo:'Cat-Cow: arredondar e estender a coluna',nota:'Pense em distribuir o movimento pela coluna inteira, não só no pescoço ou lombar.',move:'A coluna arredonda e depois estende de forma gradual, acompanhando a respiração.',evite:'Mover rápido demais, travar quadril/ombros ou forçar fim de amplitude.'},
    breathing:{titulo:'Bracing: respirar e organizar o tronco',nota:'Use respiração tranquila; o objetivo é expandir e sustentar sem tensionar o pescoço.',move:'Costelas e abdômen expandem com a inspiração; o tronco ganha pressão sem perder alinhamento.',evite:'Elevar só o peito, prender o ar por tensão ou exagerar na contração.'},
    ankle_mobility:{titulo:'Mobilidade de tornozelo: avançar o joelho',nota:'Mantenha o calcanhar no chão durante a mobilização.',move:'O joelho avança sobre o pé enquanto o tornozelo dobra e o calcanhar permanece apoiado.',evite:'Deixar o pé colapsar, tirar o calcanhar do chão ou empurrar com dor.'},
    dumbbell_press:{titulo:'Supino com halteres: descer e empurrar',nota:'As cargas devem descer com controle e subir sem bater os halteres.',move:'Cotovelos dobram enquanto os halteres descem ao lado do tronco; depois os braços empurram para cima.',evite:'Abrir demais os cotovelos, perder punhos neutros ou encurtar a amplitude.'},
    shoulder_press:{titulo:'Desenvolvimento: empurrar acima da cabeça',nota:'Use costelas controladas para não transformar o gesto em compensação lombar.',move:'Os halteres sobem acima da cabeça e retornam com controle ao nível dos ombros.',evite:'Arquear a lombar, avançar a cabeça cedo demais ou perder o alinhamento dos punhos.'},
    one_arm_row:{titulo:'Remada com carga livre: puxar ao tronco',nota:'Apoie-se bem para manter coluna neutra durante a puxada.',move:'O cotovelo sobe para trás e a carga se aproxima da lateral do tronco.',evite:'Rodar o tronco, encolher o ombro ou puxar só com a mão.'},
    carry_hold:{titulo:'Sustentação de carga: empilhar e manter',nota:'A postura é o objetivo principal; pense em crescer contra a carga.',move:'O corpo permanece alto e estável enquanto a carga é sustentada.',evite:'Inclinar o tronco, prender o pescoço ou relaxar completamente o abdômen.'},
    calf_raise:{titulo:'Panturrilha: subir e descer com controle',nota:'A amplitude pode ser menor no início, desde que o movimento seja contínuo e estável.',move:'Os calcanhares sobem e descem verticalmente enquanto o corpo permanece alinhado.',evite:'Balançar o tronco, deixar tornozelos colapsarem ou quicar na descida.'},
    hip_flexor_stretch:{titulo:'Alongamento do flexor do quadril: abrir a frente do quadril',nota:'Use uma base estável e mantenha o tronco alto; o alongamento deve ser confortável.',move:'O quadril avança levemente à frente enquanto a perna de trás permanece estendida ou ajoelhada.',evite:'Arquear demais a lombar, inclinar o tronco para frente ou forçar o joelho.'},
    hamstring_stretch:{titulo:'Alongamento posterior: inclinar pelo quadril',nota:'Pense em dobrar o quadril mantendo a coluna longa, sem desabar.',move:'O quadril dobra à frente enquanto a parte de trás da coxa alonga gradualmente.',evite:'Arredondar a lombar, prender a respiração ou forçar amplitude com dor.'},
    hip_mobility:{titulo:'Mobilidade de quadril: abrir espaço e controlar',nota:'Explore a amplitude devagar, com joelho e pé acompanhando a direção do movimento.',move:'O quadril se desloca lateralmente ou gira, enquanto o tronco se mantém organizado.',evite:'Colapsar o joelho para dentro, perder o apoio do pé ou compensar pela lombar.'},
    walk_light:{titulo:'Caminhada leve: passos suaves e contínuos',nota:'Mantenha ritmo fácil, postura confortável e braços soltos.',move:'Os pés alternam passos contínuos com balanço natural dos braços.',evite:'Passos pesados, rigidez exagerada nos ombros ou prender a respiração.'},
    march_place:{titulo:'Marcha no lugar: alternar joelhos com controle',nota:'Suba os joelhos apenas até uma altura confortável e mantenha o tronco estável.',move:'Um joelho sobe enquanto o outro pé sustenta, alternando de forma contínua.',evite:'Inclinar o tronco para trás, bater os pés no chão ou acelerar sem controle.'},
    jumping_jack:{titulo:'Polichinelo: abrir e fechar com ritmo',nota:'Coordene braços e pernas sem precisar buscar muita velocidade.',move:'Pernas abrem e fecham enquanto os braços sobem e descem em sincronia.',evite:'Cair duro no chão, perder o ritmo ou tensionar demais o pescoço.'},
    stationary_run:{titulo:'Corrida estacionária: correr sem sair do lugar',nota:'Use passos rápidos e leves, com braços acompanhando o ritmo.',move:'Os pés alternam apoio em ritmo de corrida enquanto os joelhos sobem de forma natural.',evite:'Saltitar em excesso, bater o calcanhar com força ou travar os ombros.'},
    jump_rope:{titulo:'Corda: saltos curtos e regulares',nota:'Mesmo sem corda real, imagine giros pequenos do punho e saltos baixos.',move:'Os punhos giram e os pés fazem pequenos saltos repetidos.',evite:'Saltar alto demais, aterrissar pesado ou usar os ombros para girar a corda.'},
    step_jack_vis:{titulo:'Step jack: abrir alternando um passo por vez',nota:'É uma versão de menor impacto do polichinelo, feita com passo lateral.',move:'Uma perna abre lateralmente enquanto os braços sobem; depois retorna e alterna o lado.',evite:'Cruzar os pés, perder o ritmo ou jogar o peso de forma brusca.'},
    hollow_hold:{titulo:'Hollow Hold: segurar em concha',nota:'Mantenha a lombar no chão e reduza a alavanca se perder o controle.',move:'Cabeça, ombros, braços e pernas se afastam do centro sem a lombar arquear.',evite:'Arredondar o pescoço em excesso, prender a respiração ou tirar a lombar do chão.'},
    hollow_hold_easy:{titulo:'Hollow Hold leve: base do hollow',nota:'Comece com joelhos dobrados para aprender a pressão abdominal sem desconforto.',move:'Cabeça e ombros sobem levemente enquanto o abdômen mantém a lombar apoiada.',evite:'Estender demais as pernas cedo, prender a respiração ou empurrar o queixo no peito.'},
    hollow_rock_vis:{titulo:'Hollow Rock: balançar sem perder a forma',nota:'O balanço vem do corpo inteiro em bloco, não de chutar as pernas.',move:'O corpo oscila para frente e para trás mantendo a posição de hollow.',evite:'Abrir costelas, dobrar demais o quadril ou usar impulso descontrolado.'},
    plank_forearm:{titulo:'Prancha: alinhar e sustentar',nota:'Crie uma linha longa dos ombros aos calcanhares e respire curto pelo abdômen.',move:'O corpo fica estável enquanto ombros e quadril se mantêm alinhados.',evite:'Deixar a lombar ceder, elevar demais o quadril ou prender a respiração.'},
    plank_short:{titulo:'Prancha curta: versão básica e curta',nota:'Pode ser feita com joelhos apoiados ou com menor tempo para consolidar o padrão.',move:'Antebraços empurram o chão enquanto tronco e quadril ficam firmes por pouco tempo.',evite:'Forçar muito tempo, deixar o abdômen relaxar ou carregar tensão no pescoço.'},
    plank_high_short:{titulo:'Prancha alta curta: sustentar com braços estendidos',nota:'Empurre o chão e mantenha ombros ativos sem afundar entre as escápulas.',move:'Braços estendidos sustentam o corpo em linha enquanto o core estabiliza.',evite:'Desabar o peito, travar cotovelos com tensão ou perder o alinhamento do quadril.'},
    situp_vis:{titulo:'Sit-up: subir e descer com controle',nota:'Use amplitude confortável e pense em enrolar o tronco sem jogar o corpo.',move:'O tronco sobe do chão em direção às pernas e retorna com controle.',evite:'Puxar o pescoço, bater as costas no chão ou usar embalo excessivo.'},
    vup_vis:{titulo:'V-up: braços e pernas se encontram',nota:'Busque coordenação e compressão; reduza a amplitude se perder o hollow.',move:'Braços e pernas sobem juntos para aproximar mãos e pés no centro.',evite:'Arquear a lombar na volta, dobrar tudo por falta de controle ou chutar sem ritmo.'},
    mountain_climber_vis:{titulo:'Mountain Climber: alternar joelhos em prancha',nota:'Mantenha os ombros firmes sobre as mãos e use ritmo controlado.',move:'Os joelhos avançam alternadamente em direção ao peito enquanto os braços estabilizam.',evite:'Saltar com o quadril alto, afundar a lombar ou deixar o peso todo nos punhos.'},
    mountain_climber_fast:{titulo:'Mountain Climber intenso: ritmo mais rápido',nota:'A técnica vem antes da velocidade; acelere sem perder apoio e alinhamento.',move:'Os joelhos alternam rápido em direção ao peito mantendo a base de prancha.',evite:'Virar corrida desorganizada, quicar os ombros ou perder completamente o core.'},
    low_band_row:{titulo:'Remada baixa com elástico: puxar na linha do umbigo',nota:'Sente ou fixe o elástico à frente e puxe trazendo os cotovelos para trás.',move:'As mãos se aproximam do tronco enquanto escápulas retraem e peito abre levemente.',evite:'Encolher ombros, dobrar punhos ou puxar usando balanço do tronco.'},
    band_row_standing:{titulo:'Remada com elástico: puxar com postura estável',nota:'Firme o centro do corpo antes de puxar e termine com cotovelos próximos ao tronco.',move:'Os braços puxam o elástico para trás enquanto ombros permanecem baixos.',evite:'Arquear a lombar, elevar os ombros ou perder a tensão do elástico na volta.'},
    inverted_row_vis:{titulo:'Remada invertida: peito em direção à barra',nota:'Mantenha o corpo rígido como prancha e puxe sem quebrar o quadril.',move:'O peito sobe em direção ao apoio enquanto os cotovelos dobram e as escápulas retraem.',evite:'Deixar o quadril cair, puxar só com o pescoço ou encurtar demais a amplitude.'},
    australian_row_vis:{titulo:'Australian Pull-up: remada horizontal inclinada',nota:'Quanto mais horizontal o corpo, maior a dificuldade.',move:'O tronco sobe em direção à barra com o corpo alinhado e calcanhares firmes.',evite:'Dobrar o quadril, encolher os ombros ou perder o alinhamento do corpo.'},
    ring_row_vis:{titulo:'Remada em argola: puxar com estabilidade',nota:'As argolas pedem controle extra; mantenha punhos neutros e corpo firme.',move:'O peito avança até as argolas enquanto braços e escápulas puxam em conjunto.',evite:'Abrir cotovelos sem controle, girar o corpo ou deixar as argolas balançarem demais.'},
    assisted_pullup_vis:{titulo:'Barra assistida: subir com ajuda e controle',nota:'Use apoio ou assistência suficiente para completar a amplitude com boa forma.',move:'O corpo sobe em direção à barra enquanto cotovelos descem e escápulas trabalham.',evite:'Chutar demais, encolher os ombros no topo ou encurtar demais a descida.'},
    negative_pullup_vis:{titulo:'Negativa de barra: descer devagar',nota:'Comece no topo com ajuda e priorize uma descida lenta e contínua.',move:'O corpo desce da barra de forma controlada enquanto os cotovelos estendem aos poucos.',evite:'Soltar de uma vez, perder o controle escapular ou tensionar demais o pescoço.'},
    bear_crawl_vis:{titulo:'Bear Crawl: caminhar em quatro apoios',nota:'Mantenha joelhos baixos e passos curtos para preservar estabilidade.',move:'Mão e pé opostos avançam juntos enquanto tronco e quadril ficam baixos.',evite:'Erguer demais o quadril, cruzar mãos e pés ou balançar o tronco.'},
    burpee_vis:{titulo:'Burpee: descer, apoiar e levantar',nota:'Use versão sem salto quando precisar reduzir impacto.',move:'O corpo agacha, apoia as mãos, leva os pés para trás e retorna para ficar em pé.',evite:'Cair sobre os punhos, arquear a lombar na prancha ou acelerar sem controle.'},
    knee_pushup_vis:{titulo:'Flexão com joelhos: empurrar com base reduzida',nota:'Mantenha joelhos, quadril e ombros alinhados durante toda a repetição.',move:'Peito desce em direção ao chão enquanto cotovelos dobram e depois empurram.',evite:'Deixar o quadril para trás, abrir demais os cotovelos ou encurtar muito a descida.'},
    incline_pushup_vis:{titulo:'Flexão inclinada: empurrar em apoio elevado',nota:'Quanto mais alto o apoio, menor a dificuldade.',move:'O peito se aproxima do apoio enquanto o corpo permanece alinhado.',evite:'Dobrar o quadril, deixar a cabeça avançar ou usar apoio instável.'},
    decline_pushup_vis:{titulo:'Flexão declinada: pés elevados',nota:'A elevação dos pés aumenta a carga sobre ombros e parte superior do peito.',move:'O corpo desce em bloco enquanto as mãos sustentam maior parte do peso.',evite:'Arquear a lombar, elevar demais o quadril ou perder controle dos ombros.'},
    handstand_hold_vis:{titulo:'Handstand Hold: sustentar invertido na parede',nota:'Use a parede como segurança e mantenha cotovelos estendidos.',move:'O corpo permanece invertido e alinhado enquanto braços empurram o chão.',evite:'Afundar nos ombros, arquear demais a lombar ou afastar demais as mãos da parede.'},
    handstand_pushup_vis:{titulo:'Handstand Push-up: descer e empurrar invertido',nota:'Use amplitude parcial e apoio seguro até dominar o controle.',move:'A cabeça desce entre as mãos e o corpo volta a subir pela força dos ombros.',evite:'Descer rápido, abrir demais os cotovelos ou perder o alinhamento invertido.'},
    single_leg_bridge_vis:{titulo:'Ponte unilateral: elevar com uma perna',nota:'Mantenha a pelve nivelada e use amplitude menor se girar.',move:'Uma perna sustenta enquanto o quadril sobe e a outra permanece elevada.',evite:'Rodar a pelve, empurrar pela lombar ou perder o apoio do pé.'},
    ab_wheel_vis:{titulo:'Roda abdominal: avançar e retornar',nota:'Comece com deslocamento curto e pare antes de perder a lombar neutra.',move:'Braços e roda avançam enquanto o tronco alonga; o core puxa de volta.',evite:'Arquear a lombar, jogar o quadril para frente ou avançar além do controle.'},
    scapular_retraction_vis:{titulo:'Retração escapular: aproximar as escápulas',nota:'O movimento é pequeno e acontece nas escápulas, não nos cotovelos.',move:'As escápulas deslizam para trás e levemente para baixo enquanto braços ficam quase parados.',evite:'Encolher os ombros, arquear a lombar ou forçar o pescoço.'},
    scapular_pushup_vis:{titulo:'Scapular Push-up: afastar e aproximar escápulas',nota:'Mantenha cotovelos estendidos durante toda a repetição.',move:'O peito desce levemente entre os ombros e depois o chão é empurrado pelas escápulas.',evite:'Dobrar cotovelos, deixar a lombar cair ou encolher os ombros.'},
    stepup_vis:{titulo:'Step-up: subir no apoio com controle',nota:'Use um degrau estável e altura adequada para manter equilíbrio.',move:'A perna de cima empurra o corpo até ficar em pé sobre o apoio.',evite:'Saltar com a perna de baixo, deixar o joelho cair para dentro ou perder equilíbrio.'},
    stepup_weighted_vis:{titulo:'Step-up com colete: subir mantendo postura',nota:'A carga aumenta a exigência; mantenha o mesmo padrão do step-up livre.',move:'A perna apoiada conduz a subida enquanto o tronco permanece estável.',evite:'Inclinar demais o tronco, usar impulso excessivo ou descer sem controle.'},
    dips_vis:{titulo:'Paralelas: descer e empurrar entre apoios',nota:'Use amplitude confortável e ombros estáveis.',move:'Cotovelos dobram enquanto o corpo desce entre as barras e depois empurra para subir.',evite:'Afundar demais os ombros, balançar as pernas ou abrir os cotovelos sem controle.'}
  };
  return mapa[tipo]||null;
}
function quadroDiagramaCalifit(x,rotulo,conteudo,destaque=false){
  const titulo=String(rotulo||'').replace(/^\s*\d+\.\s*/,'');
  return `<g transform="translate(${x} 0)"><rect class="${destaque?'dv-panel-focus':'dv-panel'}" x="0" y="7" width="100" height="138" rx="10"/><text class="dv-label" x="50" y="24" text-anchor="middle">${escHtml(titulo)}</text>${conteudo}</g>`;
}
function passoDiagramaCalifit(){return '';}
function svgDiagramaExercicioCalifit(tipo){
  const cabeca=(x,y)=>`<circle class="dv-joint" cx="${x}" cy="${y}" r="6.5"/>`;
  const solo=`<line class="dv-ground" x1="8" y1="126" x2="92" y2="126"/>`;
  let f1='',f2='',f3='';
  switch(tipo){
    case 'hinge':
      f1=`${solo}${cabeca(51,39)}<path class="dv-body" d="M51 46 L51 78 M51 56 L39 82 M51 56 L63 82 M51 78 L42 123 M51 78 L61 123"/><circle class="dv-accent" cx="38" cy="89" r="4"/><circle class="dv-accent" cx="64" cy="89" r="4"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(33,58)}<path class="dv-body" d="M39 63 L67 76 M67 76 L53 123 M67 76 L76 123 M43 68 L49 105 M45 68 L60 105"/><circle class="dv-accent" cx="49" cy="109" r="4"/><circle class="dv-accent" cx="61" cy="109" r="4"/><path class="dv-arrow" d="M72 48 L90 48 M84 43 l6 5 -6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(51,39)}<path class="dv-body" d="M51 46 L51 78 M51 56 L39 82 M51 56 L63 82 M51 78 L42 123 M51 78 L61 123"/><path class="dv-arrow" d="M83 92 Q91 72 82 53"/><path class="dv-guide" d="M26 50 L74 74"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'hollow':case 'hollow_ball':
      f1=`${solo}${cabeca(22,108)}<path class="dv-body" d="M29 112 L54 113 M39 112 L36 89 M48 112 L67 92 M43 112 L64 119"/>${tipo==='hollow_ball'?'<circle class="dv-accent" cx="35" cy="83" r="7"/>':''}${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(20,106)}<path class="dv-body" d="M27 110 L52 111 L89 101 M31 109 L65 83"/>${tipo==='hollow_ball'?'<circle class="dv-accent" cx="72" cy="78" r="7"/>':''}<path class="dv-arrow" d="M70 118 Q86 112 92 101"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(20,106)}<path class="dv-body" d="M27 110 L52 111 L86 101 M31 109 L63 84"/><path class="dv-accent" d="M30 116 Q48 120 66 116"/><path class="dv-guide" d="M14 116 L91 116"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'side_plank':
      f1=`${solo}${cabeca(21,111)}<path class="dv-body" d="M28 113 L55 116 L87 122 M40 115 L37 126 M57 116 L62 126"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(21,82)}<path class="dv-body" d="M28 86 L54 96 L88 112 M40 90 L36 124 M55 96 L61 66"/><path class="dv-arrow" d="M72 113 L72 88 M67 94 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(21,82)}<path class="dv-body" d="M28 86 L54 96 L88 112 M40 90 L36 124 M55 96 L61 66"/><path class="dv-guide" d="M20 82 L89 112"/><circle class="dv-anchor" cx="38" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'bird_dog':
      f1=`${solo}${cabeca(25,83)}<path class="dv-body" d="M32 87 L58 94 M38 89 L33 125 M57 94 L63 125 M57 94 L82 125"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(25,83)}<path class="dv-body" d="M32 87 L58 94 M38 89 L33 125 M57 94 L63 125 M35 87 L9 77 M58 94 L95 88"/><path class="dv-arrow" d="M73 73 L93 73 M87 68 l6 5 -6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(25,83)}<path class="dv-body" d="M32 87 L58 94 M38 89 L33 125 M57 94 L63 125 M35 87 L9 77 M58 94 L95 88"/><path class="dv-guide" d="M8 80 L95 89"/><path class="dv-accent" d="M45 82 L61 82"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'dead_bug':
      f1=`${solo}${cabeca(18,112)}<path class="dv-body" d="M25 115 L52 115 M36 115 L32 85 M45 115 L64 91 M40 115 L60 122"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(18,112)}<path class="dv-body" d="M25 115 L52 115 M36 115 L21 82 M45 115 L94 123 M40 115 L64 91"/><path class="dv-arrow" d="M69 104 L92 115 M86 108 l7 7 -9 1"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(18,112)}<path class="dv-body" d="M25 115 L52 115 M36 115 L21 82 M45 115 L94 123 M40 115 L64 91"/><path class="dv-accent" d="M29 121 Q44 124 58 121"/><path class="dv-guide" d="M9 126 L95 126"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'scap_pull':
      f1=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,61)}<path class="dv-body" d="M50 68 L50 99 M50 75 L29 33 M50 75 L71 33 M50 99 L40 130 M50 99 L60 130"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,53)}<path class="dv-body" d="M50 60 L50 92 M50 67 L29 33 M50 67 L71 33 M50 92 L40 124 M50 92 L60 124"/><path class="dv-arrow" d="M86 84 L86 59 M81 65 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,53)}<path class="dv-body" d="M50 60 L50 92 M50 67 L29 33 M50 67 L71 33 M50 92 L40 124 M50 92 L60 124"/><path class="dv-guide" d="M29 33 L50 67 L71 33"/><path class="dv-accent" d="M41 65 Q50 72 59 65"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'band_row':
      f1=`<line class="dv-equip" x1="92" y1="36" x2="92" y2="126"/><line class="dv-band" x1="92" y1="76" x2="58" y2="76"/>${cabeca(37,51)}<path class="dv-body" d="M37 58 L37 92 M37 66 L58 76 M37 92 L28 126 M37 92 L48 126"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="92" y1="36" x2="92" y2="126"/><line class="dv-band" x1="92" y1="76" x2="52" y2="76"/>${cabeca(37,51)}<path class="dv-body" d="M37 58 L37 92 M37 66 L52 76 M37 92 L28 126 M37 92 L48 126 M52 76 L42 70"/><path class="dv-arrow" d="M75 61 L54 61 M60 56 l-6 5 6 5"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="92" y1="36" x2="92" y2="126"/><line class="dv-band" x1="92" y1="76" x2="52" y2="76"/>${cabeca(37,51)}<path class="dv-body" d="M37 58 L37 92 M37 66 L52 76 M37 92 L28 126 M37 92 L48 126 M52 76 L42 70"/><path class="dv-accent" d="M27 69 Q37 76 47 69"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'trx_row':
      f1=`<path class="dv-equip" d="M80 23 L90 23 L67 61 M93 23 L98 23 L73 61"/>${cabeca(23,82)}<path class="dv-body" d="M30 86 L55 99 L88 124 M55 99 L71 124 M32 86 L70 62"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`<path class="dv-equip" d="M80 23 L90 23 L67 61 M93 23 L98 23 L73 61"/>${cabeca(42,75)}<path class="dv-body" d="M49 79 L65 96 L88 124 M65 96 L74 124 M51 81 L71 62"/><path class="dv-arrow" d="M28 62 L46 62 M40 57 l6 5 -6 5"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`<path class="dv-equip" d="M80 23 L90 23 L67 61 M93 23 L98 23 L73 61"/>${cabeca(42,75)}<path class="dv-body" d="M49 79 L65 96 L88 124 M65 96 L74 124 M51 81 L71 62"/><path class="dv-guide" d="M42 75 L88 124"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'body_saw':
      f1=`${solo}${cabeca(20,102)}<path class="dv-body" d="M27 105 L58 111 L90 121 M39 107 L35 126 M57 111 L63 126"/><path class="dv-equip" d="M90 121 L98 121"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(11,102)}<path class="dv-body" d="M18 105 L51 111 L86 121 M30 107 L26 126 M50 111 L56 126"/><path class="dv-arrow" d="M68 93 L88 93 M82 88 l6 5 -6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(11,102)}<path class="dv-body" d="M18 105 L51 111 L86 121 M30 107 L26 126 M50 111 L56 126"/><path class="dv-guide" d="M10 102 L87 121"/><path class="dv-accent" d="M45 108 Q52 113 60 109"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'trx_fallout':
      f1=`<path class="dv-equip" d="M86 22 L95 22 L70 62 M98 22 L100 22 L76 62"/>${cabeca(32,48)}<path class="dv-body" d="M32 55 L32 88 M32 64 L72 62 M32 88 L23 126 M32 88 L43 126"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`<path class="dv-equip" d="M86 22 L95 22 L70 62 M98 22 L100 22 L76 62"/>${cabeca(22,67)}<path class="dv-body" d="M29 71 L57 87 L86 122 M57 87 L69 122 M31 72 L73 62"/><path class="dv-arrow" d="M45 49 L66 49 M60 44 l6 5 -6 5"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`<path class="dv-equip" d="M86 22 L95 22 L70 62 M98 22 L100 22 L76 62"/>${cabeca(22,67)}<path class="dv-body" d="M29 71 L57 87 L86 122 M57 87 L69 122 M31 72 L73 62"/><path class="dv-guide" d="M22 67 L86 122"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'pike':
      f1=`${solo}${cabeca(35,84)}<path class="dv-body" d="M42 88 L63 62 L90 125 M42 88 L29 125 M63 62 L50 125"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(28,110)}<path class="dv-body" d="M35 105 L61 64 L90 125 M35 105 L24 125 M61 64 L48 125"/><path class="dv-arrow" d="M17 83 Q28 92 31 106"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(28,110)}<path class="dv-body" d="M35 105 L61 64 L90 125 M35 105 L24 125 M61 64 L48 125"/><path class="dv-guide" d="M24 125 L28 110 L48 125"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'pistol':
      f1=`<line class="dv-equip" x1="92" y1="28" x2="92" y2="126"/><line class="dv-equip" x1="92" y1="55" x2="63" y2="67"/>${cabeca(47,46)}<path class="dv-body" d="M47 53 L47 84 M47 63 L64 67 M47 84 L39 124 M47 84 L82 95"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="92" y1="28" x2="92" y2="126"/><line class="dv-equip" x1="92" y1="55" x2="64" y2="73"/>${cabeca(38,66)}<path class="dv-body" d="M38 73 L50 94 M38 80 L64 73 M50 94 L32 124 M50 94 L86 98"/><path class="dv-arrow" d="M22 80 L22 103 M17 97 l5 6 5 -6"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="92" y1="28" x2="92" y2="126"/><line class="dv-equip" x1="92" y1="55" x2="64" y2="73"/>${cabeca(38,66)}<path class="dv-body" d="M38 73 L50 94 M38 80 L64 73 M50 94 L32 124 M50 94 L86 98"/><path class="dv-guide" d="M32 124 L50 94 L86 98"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'mini_walk':
      f1=`${solo}${cabeca(50,47)}<path class="dv-body" d="M50 54 L50 84 M50 62 L36 72 M50 62 L64 72 M50 84 L41 124 M50 84 L59 124"/><line class="dv-band" x1="41" y1="96" x2="59" y2="96"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,50)}<path class="dv-body" d="M50 57 L50 85 M50 64 L36 74 M50 64 L64 74 M50 85 L31 124 M50 85 L70 124"/><line class="dv-band" x1="36" y1="98" x2="64" y2="98"/><path class="dv-arrow" d="M27 109 L11 109 M16 104 l-6 5 6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(58,50)}<path class="dv-body" d="M58 57 L58 85 M58 64 L44 74 M58 64 L72 74 M58 85 L47 124 M58 85 L68 124"/><line class="dv-band" x1="48" y1="98" x2="68" y2="98"/><path class="dv-arrow" d="M18 109 L40 109 M34 104 l6 5 -6 5"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'mini_abduction':
      f1=`${solo}${cabeca(50,43)}<path class="dv-body" d="M50 50 L50 84 M50 60 L36 73 M50 60 L64 73 M50 84 L41 124 M50 84 L59 124"/><line class="dv-band" x1="42" y1="94" x2="58" y2="94"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(43,43)}<path class="dv-body" d="M43 50 L43 84 M43 60 L30 72 M43 60 L56 72 M43 84 L36 124 M43 84 L82 114"/><line class="dv-band" x1="36" y1="94" x2="68" y2="102"/><path class="dv-arrow" d="M65 88 L88 88 M82 83 l6 5 -6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(43,43)}<path class="dv-body" d="M43 50 L43 84 M43 60 L30 72 M43 60 L56 72 M43 84 L36 124 M43 84 L82 114"/><path class="dv-guide" d="M43 45 L43 124"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'external_rotation':
      f1=`${cabeca(49,42)}<path class="dv-body" d="M49 49 L49 87 M49 60 L34 72 M49 60 L64 72 M49 87 L40 125 M49 87 L58 125 M34 72 L50 74"/><line class="dv-band" x1="50" y1="74" x2="95" y2="74"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`${cabeca(49,42)}<path class="dv-body" d="M49 49 L49 87 M49 60 L34 72 M49 60 L64 72 M49 87 L40 125 M49 87 L58 125 M34 72 L21 61"/><line class="dv-band" x1="21" y1="61" x2="95" y2="74"/><path class="dv-arrow" d="M29 82 Q18 73 20 61"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`${cabeca(49,42)}<path class="dv-body" d="M49 49 L49 87 M49 60 L34 72 M49 60 L64 72 M49 87 L40 125 M49 87 L58 125 M34 72 L21 61"/><circle class="dv-anchor" cx="34" cy="72" r="4"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'pull_up':
      f1=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,66)}<path class="dv-body" d="M50 73 L50 101 M50 79 L29 33 M50 79 L71 33 M50 101 L40 130 M50 101 L60 130"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,50)}<path class="dv-body" d="M50 57 L50 87 M50 66 L34 45 M50 66 L66 45 M50 87 L40 119 M50 87 L60 119"/><path class="dv-arrow" d="M86 87 L86 55 M81 61 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,50)}<path class="dv-body" d="M50 57 L50 87 M50 66 L34 45 M50 66 L66 45 M50 87 L40 119 M50 87 L60 119"/><path class="dv-accent" d="M39 63 Q50 72 61 63"/><path class="dv-guide" d="M34 45 L50 66 L66 45"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'inverted_row':
      f1=`<line class="dv-equip" x1="75" y1="31" x2="96" y2="31"/>${solo}${cabeca(21,95)}<path class="dv-body" d="M28 99 L57 108 L90 124 M40 103 L73 32 M57 108 L68 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="75" y1="31" x2="96" y2="31"/>${solo}${cabeca(38,75)}<path class="dv-body" d="M45 79 L65 96 L90 124 M53 84 L82 32 M65 96 L74 124"/><path class="dv-arrow" d="M23 65 L40 65 M34 60 l6 5 -6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="75" y1="31" x2="96" y2="31"/>${solo}${cabeca(38,75)}<path class="dv-body" d="M45 79 L65 96 L90 124 M53 84 L82 32 M65 96 L74 124"/><path class="dv-guide" d="M38 75 L90 124"/><path class="dv-accent" d="M44 82 Q53 88 62 83"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'face_pull':
      f1=`<line class="dv-equip" x1="92" y1="36" x2="92" y2="126"/><line class="dv-band" x1="92" y1="62" x2="59" y2="65"/>${cabeca(40,48)}<path class="dv-body" d="M40 55 L40 90 M40 65 L59 65 M40 90 L31 126 M40 90 L50 126"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="92" y1="36" x2="92" y2="126"/><line class="dv-band" x1="92" y1="62" x2="55" y2="53"/>${cabeca(40,48)}<path class="dv-body" d="M40 55 L40 90 M40 65 L55 53 M55 53 L66 64 M40 90 L31 126 M40 90 L50 126"/><path class="dv-arrow" d="M74 45 L56 45 M62 40 l-6 5 6 5"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="92" y1="36" x2="92" y2="126"/><line class="dv-band" x1="92" y1="62" x2="55" y2="53"/>${cabeca(40,48)}<path class="dv-body" d="M40 55 L40 90 M40 65 L55 53 M55 53 L66 64 M40 90 L31 126 M40 90 L50 126"/><path class="dv-accent" d="M29 63 Q40 72 51 63"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'ring_push':
      f1=`<path class="dv-equip" d="M20 22 L35 70 M82 22 L67 70"/>${cabeca(50,44)}<path class="dv-body" d="M50 51 L50 84 M50 62 L35 70 M50 62 L67 70 M50 84 L40 125 M50 84 L60 125"/>${solo}${passoDiagramaCalifit(1,84,20)}`;
      f2=`<path class="dv-equip" d="M20 22 L38 78 M82 22 L64 78"/>${cabeca(50,63)}<path class="dv-body" d="M50 70 L50 96 M50 80 L38 78 M50 80 L64 78 M50 96 L40 125 M50 96 L60 125"/><path class="dv-arrow" d="M84 53 L84 75 M79 69 l5 6 5 -6"/>${solo}${passoDiagramaCalifit(2,84,20)}`;
      f3=`<path class="dv-equip" d="M20 22 L38 78 M82 22 L64 78"/>${cabeca(50,63)}<path class="dv-body" d="M50 70 L50 96 M50 80 L38 78 M50 80 L64 78 M50 96 L40 125 M50 96 L60 125"/><path class="dv-guide" d="M50 63 L50 125"/><circle class="dv-anchor" cx="38" cy="78" r="3"/><circle class="dv-anchor" cx="64" cy="78" r="3"/>${solo}${passoDiagramaCalifit(3,84,20)}`;break;
    case 'kb_swing':
      f1=`${solo}${cabeca(38,48)}<path class="dv-body" d="M38 55 L58 78 M58 78 L45 123 M58 78 L70 123 M45 66 L65 96"/><circle class="dv-accent" cx="69" cy="101" r="6"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,39)}<path class="dv-body" d="M50 46 L50 82 M50 58 L77 72 M50 82 L40 123 M50 82 L60 123"/><circle class="dv-accent" cx="82" cy="73" r="6"/><path class="dv-arrow" d="M70 105 Q92 86 85 66"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,39)}<path class="dv-body" d="M50 46 L50 82 M50 58 L77 72 M50 82 L40 123 M50 82 L60 123"/><circle class="dv-accent" cx="82" cy="73" r="6"/><path class="dv-guide" d="M50 39 L50 123"/><path class="dv-accent" d="M42 80 Q50 87 58 80"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'squat':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 83 M50 60 L35 72 M50 60 L65 72 M50 83 L40 124 M50 83 L60 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(43,68)}<path class="dv-body" d="M43 75 L57 94 M43 82 L30 91 M43 82 L58 91 M57 94 L35 124 M57 94 L78 124"/><path class="dv-arrow" d="M20 70 L20 99 M15 93 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(43,68)}<path class="dv-body" d="M43 75 L57 94 M43 82 L30 91 M43 82 L58 91 M57 94 L35 124 M57 94 L78 124"/><path class="dv-guide" d="M35 124 L57 94 L78 124"/><circle class="dv-anchor" cx="35" cy="124" r="3"/><circle class="dv-anchor" cx="78" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'lunge':
      f1=`${solo}${cabeca(47,42)}<path class="dv-body" d="M47 49 L47 82 M47 60 L34 72 M47 60 L60 72 M47 82 L28 124 M47 82 L77 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(47,58)}<path class="dv-body" d="M47 65 L47 92 M47 74 L34 84 M47 74 L60 84 M47 92 L27 124 M47 92 L77 124"/><path class="dv-arrow" d="M88 68 L88 96 M83 90 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(47,58)}<path class="dv-body" d="M47 65 L47 92 M47 74 L34 84 M47 74 L60 84 M47 92 L27 124 M47 92 L77 124"/><path class="dv-guide" d="M27 124 L47 92 L77 124"/><circle class="dv-anchor" cx="27" cy="124" r="3"/><circle class="dv-anchor" cx="77" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'bulgarian':
      f1=`<rect class="dv-equip" x="75" y="100" width="20" height="26" rx="3"/>${solo}${cabeca(42,43)}<path class="dv-body" d="M42 50 L42 82 M42 61 L30 72 M42 61 L55 72 M42 82 L30 124 M42 82 L82 101"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`<rect class="dv-equip" x="75" y="100" width="20" height="26" rx="3"/>${solo}${cabeca(42,62)}<path class="dv-body" d="M42 69 L47 94 M42 78 L30 88 M42 78 L55 88 M47 94 L29 124 M47 94 L82 101"/><path class="dv-arrow" d="M15 69 L15 99 M10 93 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`<rect class="dv-equip" x="75" y="100" width="20" height="26" rx="3"/>${solo}${cabeca(42,62)}<path class="dv-body" d="M42 69 L47 94 M42 78 L30 88 M42 78 L55 88 M47 94 L29 124 M47 94 L82 101"/><path class="dv-guide" d="M29 124 L47 94 L82 101"/><circle class="dv-anchor" cx="29" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'glute_bridge':
      f1=`${solo}${cabeca(20,112)}<path class="dv-body" d="M27 115 L54 115 M54 115 L72 96 M72 96 L88 124 M54 115 L45 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(20,105)}<path class="dv-body" d="M27 108 L55 93 L72 96 M72 96 L88 124 M55 93 L45 124"/><path class="dv-arrow" d="M57 115 L57 91 M52 97 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(20,105)}<path class="dv-body" d="M27 108 L55 93 L72 96 M72 96 L88 124 M55 93 L45 124"/><path class="dv-guide" d="M20 105 L72 96"/><path class="dv-accent" d="M47 96 Q55 88 63 95"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'pushup':
      f1=`${solo}${cabeca(20,91)}<path class="dv-body" d="M27 95 L57 105 L90 122 M39 99 L34 126 M57 105 L64 126"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(18,111)}<path class="dv-body" d="M25 114 L56 117 L90 122 M37 115 L34 126 M56 117 L64 126"/><path class="dv-arrow" d="M13 84 L13 108 M8 102 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(18,111)}<path class="dv-body" d="M25 114 L56 117 L90 122 M37 115 L34 126 M56 117 L64 126"/><path class="dv-guide" d="M18 111 L90 122"/><circle class="dv-anchor" cx="34" cy="126" r="3"/><circle class="dv-anchor" cx="64" cy="126" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'cossack':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 82 M50 60 L35 72 M50 60 L65 72 M50 82 L30 124 M50 82 L75 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(34,67)}<path class="dv-body" d="M34 74 L47 94 M34 82 L20 91 M34 82 L49 91 M47 94 L25 124 M47 94 L90 118"/><path class="dv-arrow" d="M70 60 L48 60 M54 55 l-6 5 6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(34,67)}<path class="dv-body" d="M34 74 L47 94 M34 82 L20 91 M34 82 L49 91 M47 94 L25 124 M47 94 L90 118"/><path class="dv-guide" d="M25 124 L47 94 L90 118"/><circle class="dv-anchor" cx="25" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'hanging_leg_raise':
      f1=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,57)}<path class="dv-body" d="M50 64 L50 94 M50 70 L29 33 M50 70 L71 33 M50 94 L43 127 M50 94 L57 127"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,57)}<path class="dv-body" d="M50 64 L50 94 M50 70 L29 33 M50 70 L71 33 M50 94 L29 95 M50 94 L71 95"/><path class="dv-arrow" d="M80 118 Q91 99 76 86"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="11" y1="31" x2="91" y2="31"/>${cabeca(50,57)}<path class="dv-body" d="M50 64 L50 94 M50 70 L29 33 M50 70 L71 33 M50 94 L29 95 M50 94 L71 95"/><path class="dv-accent" d="M42 91 Q50 99 58 91"/><path class="dv-guide" d="M29 95 L71 95"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'wall_sit':
      f1=`<line class="dv-equip" x1="25" y1="28" x2="25" y2="126"/>${solo}${cabeca(43,45)}<path class="dv-body" d="M43 52 L43 84 M43 61 L55 72 M43 61 L31 72 M43 84 L34 124 M43 84 L54 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`<line class="dv-equip" x1="25" y1="28" x2="25" y2="126"/>${solo}${cabeca(38,65)}<path class="dv-body" d="M38 72 L38 96 M38 80 L52 88 M38 80 L27 88 M38 96 L62 96 M62 96 L78 124"/><path class="dv-arrow" d="M88 66 L88 94 M83 88 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`<line class="dv-equip" x1="25" y1="28" x2="25" y2="126"/>${solo}${cabeca(38,65)}<path class="dv-body" d="M38 72 L38 96 M38 80 L52 88 M38 80 L27 88 M38 96 L62 96 M62 96 L78 124"/><path class="dv-guide" d="M38 72 L38 96 L62 96"/><circle class="dv-anchor" cx="78" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'thoracic_mobility':
      f1=`${solo}${cabeca(32,47)}<path class="dv-body" d="M32 54 L32 88 M32 64 L18 76 M32 64 L47 76 M32 88 L23 124 M32 88 L42 124"/><rect class="dv-equip" x="63" y="54" width="8" height="58" rx="2"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(32,47)}<path class="dv-body" d="M32 54 L32 88 M32 64 L18 76 M32 64 L55 66 M32 88 L23 124 M32 88 L42 124"/><rect class="dv-equip" x="63" y="54" width="8" height="58" rx="2"/><path class="dv-arrow" d="M45 46 Q61 55 56 72"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(32,47)}<path class="dv-body" d="M32 54 L32 88 M32 64 L18 76 M32 64 L55 66 M32 88 L23 124 M32 88 L42 124"/><rect class="dv-equip" x="63" y="54" width="8" height="58" rx="2"/><path class="dv-guide" d="M32 54 L32 124"/><circle class="dv-anchor" cx="32" cy="88" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'open_book':
      f1=`${solo}${cabeca(26,104)}<path class="dv-body" d="M33 108 L56 108 L78 108 M56 108 L74 122 M56 108 L74 94"/><path class="dv-equip" d="M42 118 Q56 110 70 118"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(26,104)}<path class="dv-body" d="M33 108 L56 108 L78 90 M56 108 L74 122 M56 108 L74 94"/><path class="dv-arrow" d="M63 83 Q81 73 89 85"/><path class="dv-equip" d="M42 118 Q56 110 70 118"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(26,104)}<path class="dv-body" d="M33 108 L56 108 L78 90 M56 108 L74 122 M56 108 L74 94"/><path class="dv-guide" d="M34 108 L79 90"/><circle class="dv-anchor" cx="56" cy="108" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'shoulder_circles':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L38 73 M50 60 L62 73 M50 87 L41 125 M50 87 L59 125"/><path class="dv-arrow" d="M28 66 Q37 41 60 44"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L34 58 M50 60 L66 58 M50 87 L41 125 M50 87 L59 125"/><path class="dv-arrow" d="M29 77 Q50 18 71 77"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L38 47 M50 60 L62 47 M50 87 L41 125 M50 87 L59 125"/><path class="dv-arrow" d="M72 47 Q61 34 49 35"/><path class="dv-guide" d="M50 49 L50 125"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'shoulder_pass_through':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L32 72 M50 60 L68 72 M50 87 L41 125 M50 87 L59 125"/><path class="dv-equip" d="M28 72 L72 72"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L38 45 M50 60 L62 45 M50 87 L41 125 M50 87 L59 125"/><path class="dv-equip" d="M35 44 L65 44"/><path class="dv-arrow" d="M24 75 Q50 18 76 75"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L42 42 M50 60 L58 42 M50 87 L41 125 M50 87 L59 125"/><path class="dv-equip" d="M38 40 L62 40"/><path class="dv-arrow" d="M74 50 Q86 65 74 82"/><path class="dv-guide" d="M50 49 L50 125"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'wall_slide_mobility':
      f1=`${solo}${cabeca(32,42)}<path class="dv-body" d="M32 49 L32 87 M32 60 L46 72 M32 60 L46 50 M32 87 L23 125 M32 87 L41 125"/><rect class="dv-equip" x="63" y="40" width="8" height="88" rx="2"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(32,42)}<path class="dv-body" d="M32 49 L32 87 M32 60 L49 58 M32 60 L49 42 M32 87 L23 125 M32 87 L41 125"/><rect class="dv-equip" x="63" y="40" width="8" height="88" rx="2"/><path class="dv-arrow" d="M54 74 L54 45 M49 51 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(32,42)}<path class="dv-body" d="M32 49 L32 87 M32 60 L49 58 M32 60 L49 42 M32 87 L23 125 M32 87 L41 125"/><rect class="dv-equip" x="63" y="40" width="8" height="88" rx="2"/><path class="dv-guide" d="M49 42 L49 58"/><path class="dv-accent" d="M32 49 L63 49"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'shoulder_mobility':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L34 74 M50 60 L66 74 M50 87 L41 125 M50 87 L59 125"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 52 M50 60 L64 52 M50 87 L41 125 M50 87 L59 125"/><path class="dv-arrow" d="M30 77 Q50 24 70 77"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 52 M50 60 L64 52 M50 87 L41 125 M50 87 L59 125"/><path class="dv-guide" d="M50 49 L50 125"/><path class="dv-accent" d="M36 52 Q50 40 64 52"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'cat_cow':
      f1=`${solo}${cabeca(24,83)}<path class="dv-body" d="M31 87 C40 80, 50 80, 58 87 M38 89 L33 125 M57 88 L63 125 M57 88 L82 125"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,90)}<path class="dv-body" d="M31 94 C40 104, 50 104, 58 94 M38 96 L33 125 M57 95 L63 125 M57 95 L82 125"/><path class="dv-arrow" d="M66 76 Q52 64 38 76"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,76)}<path class="dv-body" d="M31 80 C40 68, 50 68, 58 80 M38 82 L33 125 M57 81 L63 125 M57 81 L82 125"/><path class="dv-arrow" d="M38 71 Q52 61 66 71"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'breathing':
      f1=`${solo}${cabeca(26,104)}<path class="dv-body" d="M33 108 L56 108 L78 108 M56 108 L73 120 M56 108 L73 96"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(26,104)}<path class="dv-body" d="M33 108 L56 108 L78 108 M56 108 L73 120 M56 108 L73 96"/><path class="dv-accent" d="M39 115 Q56 124 73 115"/><path class="dv-arrow" d="M56 118 Q66 106 78 118"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(26,104)}<path class="dv-body" d="M33 108 L56 108 L78 108 M56 108 L73 120 M56 108 L73 96"/><path class="dv-guide" d="M37 108 L75 108"/><circle class="dv-anchor" cx="56" cy="108" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'ankle_mobility':
      f1=`${solo}<path class="dv-body" d="M45 40 L45 83 M45 56 L30 67 M45 56 L60 67 M45 83 L45 124 M45 124 L76 124"/>${cabeca(45,33)}${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}<path class="dv-body" d="M52 40 L52 83 M52 56 L37 67 M52 56 L67 67 M52 83 L45 124 M45 124 L76 124"/>${cabeca(52,33)}<path class="dv-arrow" d="M59 88 Q68 76 73 67"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}<path class="dv-body" d="M52 40 L52 83 M52 56 L37 67 M52 56 L67 67 M52 83 L45 124 M45 124 L76 124"/>${cabeca(52,33)}<circle class="dv-anchor" cx="45" cy="124" r="3"/><path class="dv-guide" d="M45 124 L76 124"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'dumbbell_press':
      f1=`${solo}${cabeca(19,112)}<path class="dv-body" d="M26 115 L55 115 M40 115 L40 95 M55 115 L74 95"/><circle class="dv-accent" cx="40" cy="89" r="4"/><circle class="dv-accent" cx="74" cy="89" r="4"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(19,112)}<path class="dv-body" d="M26 115 L55 115 M40 115 L40 72 M55 115 L74 72"/><circle class="dv-accent" cx="40" cy="66" r="4"/><circle class="dv-accent" cx="74" cy="66" r="4"/><path class="dv-arrow" d="M84 91 L84 67 M79 73 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(19,112)}<path class="dv-body" d="M26 115 L55 115 M40 115 L40 72 M55 115 L74 72"/><circle class="dv-accent" cx="40" cy="66" r="4"/><circle class="dv-accent" cx="74" cy="66" r="4"/><path class="dv-guide" d="M40 66 L40 115 M74 66 L74 115"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'shoulder_press':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 61 L36 72 M50 61 L64 72 M50 87 L41 125 M50 87 L59 125"/><circle class="dv-accent" cx="34" cy="72" r="4"/><circle class="dv-accent" cx="66" cy="72" r="4"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L42 42 M50 60 L58 42 M50 87 L41 125 M50 87 L59 125"/><circle class="dv-accent" cx="41" cy="36" r="4"/><circle class="dv-accent" cx="59" cy="36" r="4"/><path class="dv-arrow" d="M83 86 L83 46 M78 52 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L42 42 M50 60 L58 42 M50 87 L41 125 M50 87 L59 125"/><circle class="dv-accent" cx="41" cy="36" r="4"/><circle class="dv-accent" cx="59" cy="36" r="4"/><path class="dv-guide" d="M50 49 L50 125"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'one_arm_row':
      f1=`${solo}${cabeca(42,44)}<path class="dv-body" d="M42 51 L58 78 M58 78 L48 124 M58 78 L70 124 M58 66 L77 72"/><circle class="dv-accent" cx="82" cy="74" r="4"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(42,44)}<path class="dv-body" d="M42 51 L58 78 M58 78 L48 124 M58 78 L70 124 M58 66 L68 61"/><circle class="dv-accent" cx="73" cy="60" r="4"/><path class="dv-arrow" d="M88 82 L72 66 M73 74 l-3 -8 8 2"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(42,44)}<path class="dv-body" d="M42 51 L58 78 M58 78 L48 124 M58 78 L70 124 M58 66 L68 61"/><circle class="dv-accent" cx="73" cy="60" r="4"/><path class="dv-guide" d="M42 51 L70 124"/><circle class="dv-anchor" cx="48" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'carry_hold':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 72 M50 60 L64 72 M50 87 L41 125 M50 87 L59 125"/><circle class="dv-accent" cx="30" cy="78" r="5"/><circle class="dv-accent" cx="70" cy="78" r="5"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 72 M50 60 L64 72 M50 87 L41 125 M50 87 L59 125"/><circle class="dv-accent" cx="30" cy="78" r="5"/><circle class="dv-accent" cx="70" cy="78" r="5"/><path class="dv-arrow" d="M82 86 Q92 66 82 47"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 72 M50 60 L64 72 M50 87 L41 125 M50 87 L59 125"/><circle class="dv-accent" cx="30" cy="78" r="5"/><circle class="dv-accent" cx="70" cy="78" r="5"/><path class="dv-guide" d="M50 49 L50 125"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'bear_crawl_vis':
      f1=`${solo}${cabeca(25,82)}<path class="dv-body" d="M31 86 L57 92 M38 88 L33 124 M57 92 L64 124 M57 92 L82 118"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(31,82)}<path class="dv-body" d="M37 86 L63 92 M44 88 L39 124 M63 92 L70 124 M63 92 L88 118"/><path class="dv-arrow" d="M18 108 L36 108 M30 103 l6 5 -6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(37,82)}<path class="dv-body" d="M43 86 L69 92 M50 88 L45 124 M69 92 L76 124 M69 92 L94 118"/><path class="dv-guide" d="M43 86 L94 118"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'burpee_vis':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 85 M50 60 L36 72 M50 60 L64 72 M50 85 L41 124 M50 85 L59 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(36,88)}<path class="dv-body" d="M42 92 L58 100 M42 92 L30 124 M58 100 L82 124"/><path class="dv-arrow" d="M74 80 Q84 96 82 116"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,35)}<path class="dv-body" d="M50 42 L50 78 M50 56 L35 44 M50 56 L65 44 M50 78 L40 118 M50 78 L60 118"/><path class="dv-arrow" d="M82 96 L82 62 M77 68 l5 -6 5 6"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'knee_pushup_vis':
      f1=`${solo}${cabeca(24,88)}<path class="dv-body" d="M30 92 L55 98 L78 110 M38 94 L34 126 M55 98 L63 126"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(22,108)}<path class="dv-body" d="M28 112 L55 114 L78 116 M38 113 L34 126 M55 114 L63 126"/><path class="dv-arrow" d="M15 84 L15 106 M10 100 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(22,108)}<path class="dv-body" d="M28 112 L55 114 L78 116 M38 113 L34 126 M55 114 L63 126"/><path class="dv-guide" d="M28 112 L78 116"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'incline_pushup_vis':
      f1=`${solo}<rect class="dv-equip" x="76" y="78" width="18" height="48" rx="3"/>${cabeca(28,72)}<path class="dv-body" d="M34 76 L58 88 L78 92 M44 81 L77 80 M58 88 L70 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}<rect class="dv-equip" x="76" y="78" width="18" height="48" rx="3"/>${cabeca(38,82)}<path class="dv-body" d="M44 86 L62 96 L78 99 M52 90 L77 80 M62 96 L70 124"/><path class="dv-arrow" d="M22 67 L34 80"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}<rect class="dv-equip" x="76" y="78" width="18" height="48" rx="3"/>${cabeca(38,82)}<path class="dv-body" d="M44 86 L62 96 L78 99 M52 90 L77 80 M62 96 L70 124"/><path class="dv-guide" d="M38 82 L78 99"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'decline_pushup_vis':
      f1=`${solo}<rect class="dv-equip" x="10" y="92" width="22" height="34" rx="3"/>${cabeca(76,82)}<path class="dv-body" d="M70 86 L50 96 L28 100 M60 91 L80 124 M50 96 L42 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}<rect class="dv-equip" x="10" y="92" width="22" height="34" rx="3"/>${cabeca(76,104)}<path class="dv-body" d="M70 108 L50 108 L28 100 M60 108 L80 124 M50 108 L42 124"/><path class="dv-arrow" d="M88 78 L88 102 M83 96 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}<rect class="dv-equip" x="10" y="92" width="22" height="34" rx="3"/>${cabeca(76,104)}<path class="dv-body" d="M70 108 L50 108 L28 100 M60 108 L80 124 M50 108 L42 124"/><path class="dv-guide" d="M28 100 L76 104"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'handstand_hold_vis':
      f1=`${solo}${cabeca(50,114)}<path class="dv-body" d="M50 108 L50 72 M50 96 L38 84 M50 96 L62 84 M50 72 L42 34 M50 72 L58 34"/><rect class="dv-equip" x="78" y="22" width="7" height="104" rx="2"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(58,114)}<path class="dv-body" d="M58 108 L58 72 M58 96 L46 84 M58 96 L70 84 M58 72 L50 34 M58 72 L66 34"/><rect class="dv-equip" x="78" y="22" width="7" height="104" rx="2"/><path class="dv-arrow" d="M36 94 Q44 78 55 72"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(58,114)}<path class="dv-body" d="M58 108 L58 72 M58 96 L46 84 M58 96 L70 84 M58 72 L50 34 M58 72 L66 34"/><rect class="dv-equip" x="78" y="22" width="7" height="104" rx="2"/><path class="dv-guide" d="M58 34 L58 114"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'handstand_pushup_vis':
      f1=`${solo}${cabeca(58,114)}<path class="dv-body" d="M58 108 L58 72 M58 96 L46 84 M58 96 L70 84 M58 72 L50 34 M58 72 L66 34"/><rect class="dv-equip" x="78" y="22" width="7" height="104" rx="2"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(58,98)}<path class="dv-body" d="M58 92 L58 60 M58 82 L46 88 M58 82 L70 88 M58 60 L50 30 M58 60 L66 30"/><rect class="dv-equip" x="78" y="22" width="7" height="104" rx="2"/><path class="dv-arrow" d="M34 104 L34 82 M29 88 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(58,98)}<path class="dv-body" d="M58 92 L58 60 M58 82 L46 88 M58 82 L70 88 M58 60 L50 30 M58 60 L66 30"/><rect class="dv-equip" x="78" y="22" width="7" height="104" rx="2"/><path class="dv-guide" d="M58 30 L58 98"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'single_leg_bridge_vis':
      f1=`${solo}${cabeca(20,112)}<path class="dv-body" d="M27 115 L54 115 M54 115 L72 96 M72 96 L88 124 M54 115 L45 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(20,105)}<path class="dv-body" d="M27 108 L55 93 L72 96 M72 96 L88 124 M55 93 L82 82"/><path class="dv-arrow" d="M57 115 L57 91 M52 97 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(20,105)}<path class="dv-body" d="M27 108 L55 93 L72 96 M72 96 L88 124 M55 93 L82 82"/><path class="dv-guide" d="M20 105 L72 96"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'ab_wheel_vis':
      f1=`${solo}${cabeca(34,66)}<path class="dv-body" d="M40 70 L56 92 M56 92 L48 124 M56 92 L76 104 M40 80 L76 104"/><circle class="dv-accent" cx="82" cy="108" r="6"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(22,78)}<path class="dv-body" d="M28 82 L56 98 M56 98 L48 124 M56 98 L88 108 M28 88 L88 108"/><circle class="dv-accent" cx="94" cy="112" r="6"/><path class="dv-arrow" d="M69 87 L91 99"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(22,78)}<path class="dv-body" d="M28 82 L56 98 M56 98 L48 124 M56 98 L88 108 M28 88 L88 108"/><circle class="dv-accent" cx="94" cy="112" r="6"/><path class="dv-guide" d="M28 82 L94 112"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'scapular_retraction_vis':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L35 72 M50 60 L65 72 M50 87 L41 125 M50 87 L59 125"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L39 68 M50 60 L61 68 M50 87 L41 125 M50 87 L59 125"/><path class="dv-arrow" d="M31 58 L43 62 M69 58 L57 62"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L39 68 M50 60 L61 68 M50 87 L41 125 M50 87 L59 125"/><path class="dv-accent" d="M41 63 Q50 69 59 63"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'scapular_pushup_vis':
      f1=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L30 108 M80 88 L80 108"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,88)}<path class="dv-body" d="M30 92 L54 92 L80 92 M30 92 L30 108 M80 92 L80 108"/><path class="dv-arrow" d="M52 72 L52 88 M47 82 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,80)}<path class="dv-body" d="M30 84 L54 84 L80 84 M30 84 L30 108 M80 84 L80 108"/><path class="dv-arrow" d="M52 96 L52 80 M47 86 l5 -6 5 6"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'stepup_vis':
      f1=`${solo}<rect class="dv-equip" x="62" y="92" width="28" height="34" rx="3"/>${cabeca(40,42)}<path class="dv-body" d="M40 49 L40 86 M40 60 L28 72 M40 60 L52 72 M40 86 L32 124 M40 86 L67 96"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}<rect class="dv-equip" x="62" y="92" width="28" height="34" rx="3"/>${cabeca(55,42)}<path class="dv-body" d="M55 49 L55 86 M55 60 L43 72 M55 60 L67 72 M55 86 L67 96 M55 86 L48 124"/><path class="dv-arrow" d="M30 100 Q42 82 55 80"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}<rect class="dv-equip" x="62" y="92" width="28" height="34" rx="3"/>${cabeca(70,34)}<path class="dv-body" d="M70 41 L70 78 M70 52 L58 64 M70 52 L82 64 M70 78 L65 112 M70 78 L76 112"/><path class="dv-guide" d="M70 41 L70 112"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'stepup_weighted_vis':
      f1=`${solo}<rect class="dv-equip" x="62" y="92" width="28" height="34" rx="3"/>${cabeca(40,42)}<path class="dv-body" d="M40 49 L40 86 M40 60 L28 72 M40 60 L52 72 M40 86 L32 124 M40 86 L67 96"/><rect class="dv-accent" x="34" y="54" width="12" height="20" rx="3"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}<rect class="dv-equip" x="62" y="92" width="28" height="34" rx="3"/>${cabeca(55,42)}<path class="dv-body" d="M55 49 L55 86 M55 60 L43 72 M55 60 L67 72 M55 86 L67 96 M55 86 L48 124"/><rect class="dv-accent" x="49" y="54" width="12" height="20" rx="3"/><path class="dv-arrow" d="M30 100 Q42 82 55 80"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}<rect class="dv-equip" x="62" y="92" width="28" height="34" rx="3"/>${cabeca(70,34)}<path class="dv-body" d="M70 41 L70 78 M70 52 L58 64 M70 52 L82 64 M70 78 L65 112 M70 78 L76 112"/><rect class="dv-accent" x="64" y="46" width="12" height="20" rx="3"/><path class="dv-guide" d="M70 41 L70 112"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'dips_vis':
      f1=`${solo}<line class="dv-equip" x1="32" y1="62" x2="32" y2="126"/><line class="dv-equip" x1="68" y1="62" x2="68" y2="126"/>${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L32 66 M50 60 L68 66 M50 87 L42 124 M50 87 L58 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}<line class="dv-equip" x1="32" y1="62" x2="32" y2="126"/><line class="dv-equip" x1="68" y1="62" x2="68" y2="126"/>${cabeca(50,58)}<path class="dv-body" d="M50 65 L50 96 M50 76 L32 66 M50 76 L68 66 M50 96 L42 124 M50 96 L58 124"/><path class="dv-arrow" d="M84 54 L84 82 M79 76 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}<line class="dv-equip" x1="32" y1="62" x2="32" y2="126"/><line class="dv-equip" x1="68" y1="62" x2="68" y2="126"/>${cabeca(50,58)}<path class="dv-body" d="M50 65 L50 96 M50 76 L32 66 M50 76 L68 66 M50 96 L42 124 M50 96 L58 124"/><path class="dv-guide" d="M50 65 L50 124"/>${passoDiagramaCalifit(3,84,20)}`;break;

    case 'hollow_hold':
      f1=`${solo}${cabeca(24,108)}<path class="dv-body" d="M30 112 L52 105 L76 112 M52 105 L64 96 M52 105 L64 114"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,101)}<path class="dv-body" d="M30 105 L52 95 L80 105 M52 95 L68 84 M52 95 L68 106"/><path class="dv-arrow" d="M78 117 Q89 101 78 85"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,101)}<path class="dv-body" d="M30 105 L52 95 L80 105 M52 95 L68 84 M52 95 L68 106"/><path class="dv-guide" d="M30 105 L80 105"/><circle class="dv-anchor" cx="52" cy="95" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'hollow_hold_easy':
      f1=`${solo}${cabeca(24,110)}<path class="dv-body" d="M30 114 L52 108 L71 114 M52 108 L60 99 M52 108 L60 118"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,106)}<path class="dv-body" d="M30 110 L52 104 L68 110 M52 104 L60 96 M52 104 L60 114"/><path class="dv-arrow" d="M71 117 Q79 104 71 91"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,106)}<path class="dv-body" d="M30 110 L52 104 L68 110 M52 104 L60 96 M52 104 L60 114"/><path class="dv-guide" d="M30 110 L68 110"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'hollow_rock_vis':
      f1=`${solo}${cabeca(24,107)}<path class="dv-body" d="M30 111 L52 101 L78 111 M52 101 L66 91 M52 101 L66 112"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,112)}<path class="dv-body" d="M28 116 L52 105 L80 112 M52 105 L66 97 M52 105 L66 118"/><path class="dv-arrow" d="M20 112 Q28 98 38 103"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,102)}<path class="dv-body" d="M32 106 L52 96 L76 106 M52 96 L66 86 M52 96 L66 108"/><path class="dv-arrow" d="M86 102 Q78 88 68 93"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'plank_forearm':
      f1=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M54 88 L72 104 M54 88 L72 72"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M54 88 L72 104 M54 88 L72 72"/><path class="dv-arrow" d="M86 104 Q95 88 86 72"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M54 88 L72 104 M54 88 L72 72"/><path class="dv-guide" d="M30 88 L80 88"/><circle class="dv-anchor" cx="54" cy="88" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'plank_short':
      f1=`${solo}${cabeca(24,90)}<path class="dv-body" d="M30 94 L54 94 L74 94 M54 94 L66 108 M54 94 L66 80"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,90)}<path class="dv-body" d="M30 94 L54 94 L74 94 M54 94 L66 108 M54 94 L66 80"/><path class="dv-arrow" d="M80 108 Q88 94 80 80"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,90)}<path class="dv-body" d="M30 94 L54 94 L74 94 M54 94 L66 108 M54 94 L66 80"/><path class="dv-guide" d="M30 94 L74 94"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'plank_high_short':
      f1=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L30 108 M80 88 L80 108"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L30 108 M80 88 L80 108"/><path class="dv-arrow" d="M86 104 Q94 88 86 72"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L30 108 M80 88 L80 108"/><path class="dv-guide" d="M30 88 L80 88"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'situp_vis':
      f1=`${solo}${cabeca(24,111)}<path class="dv-body" d="M30 115 L54 115 L76 115 M54 115 L66 103 M54 115 L66 122"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(38,86)}<path class="dv-body" d="M44 90 L52 115 M52 115 L76 115 M52 115 L64 124 M52 103 L39 112"/><path class="dv-arrow" d="M70 94 Q58 79 45 79"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(42,72)}<path class="dv-body" d="M48 76 L54 115 M54 115 L76 115 M54 115 L64 124 M54 101 L42 108"/><path class="dv-guide" d="M48 76 L54 115"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'vup_vis':
      f1=`${solo}${cabeca(24,114)}<path class="dv-body" d="M30 118 L54 118 L78 118 M54 118 L66 106 M54 118 L66 125"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,74)}<path class="dv-body" d="M50 78 L54 98 M54 98 L72 120 M54 98 L72 76 M54 98 L36 76"/><path class="dv-arrow" d="M30 107 Q41 95 47 87"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(54,62)}<path class="dv-body" d="M54 66 L56 92 M56 92 L73 118 M56 92 L73 66 M56 92 L39 66"/><path class="dv-guide" d="M39 66 L73 66"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'mountain_climber_vis':
      f1=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L30 108 M80 88 L72 116"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L40 108 M80 88 L72 116"/><path class="dv-arrow" d="M46 114 Q55 101 61 92"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L30 116 M80 88 L62 104"/><path class="dv-arrow" d="M68 116 Q58 100 52 93"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'mountain_climber_fast':
      f1=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L34 112 M80 88 L70 116"/><path class="dv-arrow" d="M18 82 Q26 72 36 82"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L44 106 M80 88 L70 116"/><path class="dv-arrow" d="M46 114 Q55 101 61 92"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(24,84)}<path class="dv-body" d="M30 88 L54 88 L80 88 M30 88 L34 116 M80 88 L60 102"/><path class="dv-arrow" d="M68 116 Q58 100 52 93"/><path class="dv-arrow" d="M90 82 Q82 72 72 82"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'low_band_row':
      f1=`${solo}${cabeca(34,84)}<path class="dv-body" d="M40 88 L58 88 L78 88 M58 88 L70 104 M58 88 L70 72"/><path class="dv-equip" d="M78 88 L92 88"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(34,84)}<path class="dv-body" d="M40 88 L58 88 L72 88 M58 88 L70 104 M58 88 L70 72"/><path class="dv-equip" d="M72 88 L92 88"/><path class="dv-arrow" d="M88 78 L74 78 M80 73 l-6 5 6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(34,84)}<path class="dv-body" d="M40 88 L58 88 L72 88 M58 88 L70 104 M58 88 L70 72"/><path class="dv-equip" d="M72 88 L92 88"/><path class="dv-guide" d="M58 88 L92 88"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'band_row_standing':
      f1=`${solo}${cabeca(46,42)}<path class="dv-body" d="M46 49 L46 87 M46 60 L64 68 M46 60 L28 68 M46 87 L38 124 M46 87 L54 124"/><path class="dv-equip" d="M64 68 L88 68"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(46,42)}<path class="dv-body" d="M46 49 L46 87 M46 60 L56 61 M46 60 L28 68 M46 87 L38 124 M46 87 L54 124"/><path class="dv-equip" d="M56 61 L88 68"/><path class="dv-arrow" d="M82 57 L63 57 M69 52 l-6 5 6 5"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(46,42)}<path class="dv-body" d="M46 49 L46 87 M46 60 L56 61 M46 60 L28 68 M46 87 L38 124 M46 87 L54 124"/><path class="dv-equip" d="M56 61 L88 68"/><path class="dv-guide" d="M46 49 L46 124"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'inverted_row_vis':
      f1=`${solo}${cabeca(32,74)}<path class="dv-body" d="M38 78 L58 78 L82 78 M38 78 L26 96 M82 78 L94 96"/><path class="dv-equip" d="M28 64 L92 64"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(38,66)}<path class="dv-body" d="M44 70 L60 70 L82 70 M44 70 L34 90 M82 70 L92 90"/><path class="dv-equip" d="M28 64 L92 64"/><path class="dv-arrow" d="M88 84 L74 72 M76 81 l-3 -8 8 2"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(38,66)}<path class="dv-body" d="M44 70 L60 70 L82 70 M44 70 L34 90 M82 70 L92 90"/><path class="dv-equip" d="M28 64 L92 64"/><path class="dv-guide" d="M44 70 L82 70"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'australian_row_vis':
      f1=`${solo}${cabeca(34,78)}<path class="dv-body" d="M40 82 L58 82 L82 82 M40 82 L28 98 M82 82 L94 98"/><path class="dv-equip" d="M28 68 L92 68"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(40,71)}<path class="dv-body" d="M46 75 L60 75 L82 75 M46 75 L35 94 M82 75 L92 94"/><path class="dv-equip" d="M28 68 L92 68"/><path class="dv-arrow" d="M88 88 L76 78 M78 86 l-3 -8 8 2"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(40,71)}<path class="dv-body" d="M46 75 L60 75 L82 75 M46 75 L35 94 M82 75 L92 94"/><path class="dv-equip" d="M28 68 L92 68"/><path class="dv-guide" d="M46 75 L82 75"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'ring_row_vis':
      f1=`${solo}${cabeca(34,80)}<path class="dv-body" d="M40 84 L58 84 L82 84 M40 84 L28 100 M82 84 L94 100"/><path class="dv-equip" d="M46 58 L46 74 M76 58 L76 74"/><circle class="dv-anchor" cx="46" cy="76" r="3"/><circle class="dv-anchor" cx="76" cy="76" r="3"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(40,73)}<path class="dv-body" d="M46 77 L60 77 L82 77 M46 77 L35 96 M82 77 L92 96"/><path class="dv-equip" d="M48 58 L48 70 M74 58 L74 70"/><circle class="dv-anchor" cx="48" cy="72" r="3"/><circle class="dv-anchor" cx="74" cy="72" r="3"/><path class="dv-arrow" d="M88 90 L76 80 M78 88 l-3 -8 8 2"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(40,73)}<path class="dv-body" d="M46 77 L60 77 L82 77 M46 77 L35 96 M82 77 L92 96"/><path class="dv-equip" d="M48 58 L48 70 M74 58 L74 70"/><path class="dv-guide" d="M46 77 L82 77"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'assisted_pullup_vis':
      f1=`${solo}${cabeca(50,34)}<path class="dv-body" d="M50 41 L50 78 M50 56 L40 66 M50 56 L60 66 M50 78 L44 116 M50 78 L56 116"/><path class="dv-equip" d="M26 28 L74 28"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,28)}<path class="dv-body" d="M50 35 L50 70 M50 48 L42 55 M50 48 L58 55 M50 70 L45 110 M50 70 L55 110"/><path class="dv-equip" d="M26 28 L74 28"/><path class="dv-arrow" d="M82 90 L82 56 M77 62 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,28)}<path class="dv-body" d="M50 35 L50 70 M50 48 L42 55 M50 48 L58 55 M50 70 L45 110 M50 70 L55 110"/><path class="dv-equip" d="M26 28 L74 28"/><path class="dv-guide" d="M50 35 L50 110"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'negative_pullup_vis':
      f1=`${solo}${cabeca(50,28)}<path class="dv-body" d="M50 35 L50 70 M50 48 L42 55 M50 48 L58 55 M50 70 L45 110 M50 70 L55 110"/><path class="dv-equip" d="M26 28 L74 28"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,40)}<path class="dv-body" d="M50 47 L50 82 M50 60 L42 69 M50 60 L58 69 M50 82 L45 118 M50 82 L55 118"/><path class="dv-equip" d="M26 28 L74 28"/><path class="dv-arrow" d="M82 58 L82 92 M77 86 l5 6 5 -6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,48)}<path class="dv-body" d="M50 55 L50 90 M50 68 L42 77 M50 68 L58 77 M50 90 L45 122 M50 90 L55 122"/><path class="dv-equip" d="M26 28 L74 28"/><path class="dv-guide" d="M50 35 L50 122"/>${passoDiagramaCalifit(3,84,20)}`;break;

    case 'hip_flexor_stretch':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 72 M50 60 L64 72 M50 87 L44 124 M50 87 L70 112"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(56,42)}<path class="dv-body" d="M56 49 L56 87 M56 60 L43 72 M56 60 L70 72 M56 87 L50 124 M56 87 L75 111"/><path class="dv-arrow" d="M36 104 Q48 96 58 104"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(56,42)}<path class="dv-body" d="M56 49 L56 87 M56 60 L43 72 M56 60 L70 72 M56 87 L50 124 M56 87 L75 111"/><path class="dv-guide" d="M56 49 L56 124"/><circle class="dv-anchor" cx="50" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'hamstring_stretch':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 72 M50 60 L64 72 M50 87 L44 124 M50 87 L70 124"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(60,58)}<path class="dv-body" d="M60 65 L52 95 M52 95 L44 124 M52 95 L72 124 M52 77 L38 86 M52 77 L67 88"/><path class="dv-arrow" d="M70 64 Q58 56 45 62"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(60,58)}<path class="dv-body" d="M60 65 L52 95 M52 95 L44 124 M52 95 L72 124 M52 77 L38 86 M52 77 L67 88"/><path class="dv-guide" d="M60 65 L44 124"/><circle class="dv-anchor" cx="44" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'hip_mobility':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L36 72 M50 60 L64 72 M50 86 L39 124 M50 86 L61 124"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L36 72 M50 60 L64 72 M50 86 L24 124 M50 86 L67 108"/><path class="dv-arrow" d="M38 95 Q26 103 19 111"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L36 72 M50 60 L64 72 M50 86 L24 124 M50 86 L67 108"/><path class="dv-guide" d="M24 124 L67 108"/><circle class="dv-anchor" cx="24" cy="124" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'walk_light':
      f1=`${solo}${cabeca(44,42)}<path class="dv-body" d="M44 49 L44 86 M44 60 L31 72 M44 60 L57 72 M44 86 L37 124 M44 86 L53 118"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L38 72 M50 60 L62 68 M50 86 L42 124 M50 86 L60 113"/><path class="dv-arrow" d="M25 107 Q40 96 54 101"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(56,42)}<path class="dv-body" d="M56 49 L56 86 M56 60 L44 68 M56 60 L67 72 M56 86 L49 113 M56 86 L64 124"/><path class="dv-arrow" d="M38 106 Q54 96 70 102"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'march_place':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L37 71 M50 60 L63 71 M50 86 L42 124 M50 86 L58 124"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L37 71 M50 60 L63 71 M50 86 L40 104 M50 86 L58 124"/><path class="dv-arrow" d="M28 111 Q35 101 43 95"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L37 71 M50 60 L63 71 M50 86 L42 124 M50 86 L60 104"/><path class="dv-arrow" d="M72 111 Q65 101 57 95"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'jumping_jack':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L39 71 M50 60 L61 71 M50 86 L44 124 M50 86 L56 124"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(50,34)}<path class="dv-body" d="M50 41 L50 78 M50 56 L34 44 M50 56 L66 44 M50 78 L32 124 M50 78 L68 124"/><path class="dv-arrow" d="M22 104 Q31 82 44 68"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L39 71 M50 60 L61 71 M50 86 L44 124 M50 86 L56 124"/><path class="dv-arrow" d="M76 103 Q66 83 57 68"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'stationary_run':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 84 M50 60 L38 72 M50 60 L62 68 M50 84 L42 124 M50 84 L60 104"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(55,42)}<path class="dv-body" d="M55 49 L55 84 M55 60 L44 70 M55 60 L66 66 M55 84 L47 104 M55 84 L66 124"/><path class="dv-arrow" d="M35 112 Q45 97 51 90"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(45,42)}<path class="dv-body" d="M45 49 L45 84 M45 60 L34 66 M45 60 L56 70 M45 84 L24 124 M45 84 L43 104"/><path class="dv-arrow" d="M65 112 Q55 97 49 90"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'jump_rope':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 84 M50 60 L38 72 M50 60 L62 72 M50 84 L44 124 M50 84 L56 124"/><path class="dv-arrow" d="M28 84 Q18 69 28 54"/><path class="dv-arrow" d="M72 54 Q82 69 72 84"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(50,35)}<path class="dv-body" d="M50 42 L50 77 M50 55 L38 68 M50 55 L62 68 M50 77 L44 117 M50 77 L56 117"/><path class="dv-arrow" d="M23 86 Q50 24 77 86"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(50,35)}<path class="dv-body" d="M50 42 L50 77 M50 55 L38 68 M50 55 L62 68 M50 77 L44 117 M50 77 L56 117"/><path class="dv-guide" d="M44 117 L56 117"/><circle class="dv-anchor" cx="44" cy="117" r="3"/><circle class="dv-anchor" cx="56" cy="117" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'step_jack_vis':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L39 71 M50 60 L61 71 M50 86 L44 124 M50 86 L56 124"/>${passoDiagramaCalifit(1,84,20)}`
      f2=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L35 50 M50 60 L65 50 M50 86 L31 124 M50 86 L56 124"/><path class="dv-arrow" d="M24 111 Q31 96 39 87"/>${passoDiagramaCalifit(2,84,20)}`
      f3=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 86 M50 60 L39 71 M50 60 L61 71 M50 86 L44 124 M50 86 L56 124"/><path class="dv-arrow" d="M76 104 Q65 86 57 72"/>${passoDiagramaCalifit(3,84,20)}`;break;
    case 'calf_raise':
      f1=`${solo}${cabeca(50,42)}<path class="dv-body" d="M50 49 L50 87 M50 60 L36 72 M50 60 L64 72 M50 87 L42 124 M50 87 L58 124"/>${passoDiagramaCalifit(1,84,20)}`;
      f2=`${solo}${cabeca(50,34)}<path class="dv-body" d="M50 41 L50 79 M50 52 L36 64 M50 52 L64 64 M50 79 L42 117 M50 79 L58 117"/><path class="dv-arrow" d="M80 104 L80 84 M75 90 l5 -6 5 6"/>${passoDiagramaCalifit(2,84,20)}`;
      f3=`${solo}${cabeca(50,34)}<path class="dv-body" d="M50 41 L50 79 M50 52 L36 64 M50 52 L64 64 M50 79 L42 117 M50 79 L58 117"/><path class="dv-guide" d="M42 117 L58 117"/><circle class="dv-anchor" cx="42" cy="117" r="3"/><circle class="dv-anchor" cx="58" cy="117" r="3"/>${passoDiagramaCalifit(3,84,20)}`;break;
    default:return '';
  }
  return `<svg viewBox="0 0 328 154" role="img" aria-label="Demonstração simplificada: guia visual em três etapas do exercício" data-etapas="1. Preparar|2. Mover|3. Controlar"><title>Posição inicial e posição final, com etapa intermediária de movimento</title>${quadroDiagramaCalifit(4,'1. Preparar',f1)}${quadroDiagramaCalifit(112,'2. Mover',f2,true)}${quadroDiagramaCalifit(220,'3. Controlar',f3)}</svg>`;
}
function nivelDiagramaExercicioCalifit(){
  try{
    const perfil=ST?.perfil||{};
    const nivel=typeof avaliarProntidaoInicial==='function'?(avaliarProntidaoInicial(perfil)?.nivelEfetivo||perfil.nivel):perfil.nivel;
    return ['init','inter','avanc'].includes(nivel)?nivel:'init';
  }catch{return 'init';}
}
function htmlDiagramaExercicioCalifit(nome,compacto=false){
  const cobertura=classificarCoberturaDiagramaCalifit(nome);
  if(cobertura.modo!=='proprio'&&cobertura.modo!=='compartilhado') return '';
  const tipo=cobertura.tipo;
  const dados=dadosDiagramaExercicioCalifit(tipo);
  const svg=svgDiagramaExercicioCalifit(tipo);
  if(!dados||!svg) return '';
  const nivel=nivelDiagramaExercicioCalifit();
  const tag=cobertura.modo==='proprio'?'Esquema específico':'Base compartilhada';
  const aviso=cobertura.modo==='compartilhado'?'<div class="exercise-visual-shared-note">Este esquema mostra o padrão-base do movimento. Use as instruções escritas para o apoio, a carga e o equipamento desta variação.</div>':'';
  return `<div class="exercise-visual priority${compacto?' compact':''}" data-ex-diagrama="${escHtml(tipo)}" data-diagrama-qualidade="prioritario" data-diagrama-cobertura="${escHtml(cobertura.modo)}" data-nivel-diagrama="${escHtml(nivel)}"><div class="exercise-visual-head"><span>${escHtml(dados.titulo)}</span><span class="exercise-visual-tag">${escHtml(tag)}</span></div>${svg}${aviso}<div class="exercise-visual-cues"><div class="exercise-visual-cue"><strong>O que deve se mover</strong>${escHtml(dados.move)}</div><div class="exercise-visual-cue avoid"><strong>Evite isto</strong>${escHtml(dados.evite)}</div></div><div class="exercise-visual-note">${escHtml(dados.nota)}</div></div>`;
}
function listarDiagramasExerciciosCalifit(){return listarCoberturaDiagramasCalifit().filter(x=>x.modo==='proprio'||x.modo==='compartilhado').map(x=>({...x,qualidade:svgDiagramaExercicioCalifit(x.tipo)?'prioritario':'sem_diagrama'}));}




window.__CALIFIT_DIAGRAMS_MODULE__={
  classificarCoberturaDiagramaCalifit,
  tipoDiagramaExercicioCalifit,
  rotuloCoberturaDiagramaCalifit,
  htmlSeloCoberturaDiagramaCalifit,
  listarCoberturaDiagramasCalifit,
  resumoCoberturaDiagramasCalifit,
  dadosDiagramaExercicioCalifit,
  svgDiagramaExercicioCalifit,
  nivelDiagramaExercicioCalifit,
  htmlDiagramaExercicioCalifit,
  listarDiagramasExerciciosCalifit
};
})();
