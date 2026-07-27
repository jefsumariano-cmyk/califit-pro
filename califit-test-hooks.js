(function registrarModuloTestesCalifit(){
'use strict';

function instalarHooksTesteCalifit(){
  if(typeof window==='undefined') return;
  const decisaoProgressaoTesteCalifit=({perfil=ST.perfil,exercicio={},registro={},registroTreino=null,preferencia='manter'}={})=>{
    const ex={...exercicio,log:registro};
    const treino=registroTreino||{tipo:'feito',treino:{exercicios:[ex]},exercicios:[ex],checkinMinimo:{dor:registro.dorGeral||registro.dorCheckin||'nao',dificuldade:registro.dificuldadeGeral||registro.diffGeral||registro.diff||'adequado',esforco:registro.esforcoGeral||(+registro.rpe>=8?'alto':'moderado')}};
    const classe=classificarConfiancaFeedback(treino);
    const cautela=progressaoCautelaAtiva(ex,perfil);
    const reg=avaliarSegurancaExercicioRegional(ex,perfil,{});
    const dor=analisarDorRegistro(registro);
    const tecnicaRuim=/ruim|falha/.test(normTxt(registro.tecnica||registro.obs||''));
    const rpeAlto=(+registro.rpe||0)>=8;
    const parcial=registro.feito==='parcial';
    const fadiga=/fadiga|cansac|exaust|falh/.test(normTxt(registro.obs||''))||rpeAlto;
    const acima=registroAcimaDoPlanejado(ex,registro);
    const cargaPendente=equipamentosCarregadosSemCarga(perfil).length>0&&exercicioUsaCargaNumerica(ex);
    const equipamentoIndisponivel=!requisitosEquipamentoExercicio(ex,perfil).disponivel;
    const cirurgia=cirurgiaTemLimitacaoAtiva(perfil)&&(/core|prancha|hollow|dead bug|bird dog|roda|abdominal/.test(normTxt(nomeTecnicoExercicio(ex)))||reg.bloqueado||reg.cautela);
    const motivos=[];
    let ajuste='manter',permitido=false,intensidade='manter';
    if(preferencia==='reduzir'){ajuste='reduzir';motivos.push('Preferência reduzir respeitada.');}
    if(!checkinMinimoCompleto(treino)){motivos.push('Feedback incompleto: progressão conservadora.');}
    if(dor.temDor){ajuste=dor.nivel==='forte'||dor.alertaProfissional?'bloquear':'manter a prescrição atual com cautela';motivos.push('Dor informada: não aumentar volume; reduza ou troque a variação se a dor repetir.');}
    if(cautela||reg.bloqueado||reg.cautela){ajuste=ajuste==='bloquear'?ajuste:'manter a prescrição atual com cautela';motivos.push('Cautela de segurança ativa: manter volume e variação sem progressão agressiva.');}
    if(cirurgia){ajuste='manter a prescrição atual com cautela';motivos.push('Recuperação/cirurgia: manter core conservador e sem aumento de volume.');}
    if(tecnicaRuim){ajuste='manter';motivos.push('Técnica/falha técnica: consolidar controle antes de avançar.');}
    if(rpeAlto){ajuste='manter';motivos.push('Esforço alto/RPE alto: não aumentar agora.');}
    if(parcial&&!fadiga&&!dor.temDor) motivos.push('Parcial por tempo: manter sem regressão agressiva.');
    if(parcial&&fadiga){ajuste='manter';motivos.push('Parcial por fadiga: bloquear aumento.');}
    if(acima.acima){motivos.push(notaRegistroAcimaPlanejado(ex,registro)||'Acima do planejado: usar com cautela.');}
    if(cargaPendente){ajuste='manter';motivos.push('Carga pendente: não autorizei aumento de carga externa.');}
    if(equipamentoIndisponivel){ajuste='manter';motivos.push('Equipamento ausente: manter variação possível ou alternativa segura.');}
    const permitidoBase=progressaoPermitidaPorFeedback(treino,{dor:dor.temDor,cautela:cautela||reg.bloqueado||reg.cautela||cirurgia||tecnicaRuim||rpeAlto||cargaPendente||equipamentoIndisponivel||preferencia==='reduzir'});
    if(permitidoBase&&!parcial){
      permitido=true;
      intensidade=intensidadeProgressaoPorFeedback(treino,{});
      ajuste=intensidade==='leve'||intensidade==='mínima'?'progressão leve':ajuste;
      motivos.push('Feedback completo sem dor permite progressão leve.');
    }
    if(acima.acima&&permitido){motivos.push('Não transformar registro acima do planejado em meta agressiva nem aumentar carga e volume ao mesmo tempo.');}
    const progressaoTecnica=progressaoPossivelEspecifica(ex,cautela||reg.bloqueado||reg.cautela);
    const texto=[ajuste,classe,intensidade,...motivos,progressaoTecnica?.titulo,progressaoTecnica?.aviso||'',progressaoTecnica?.criterio||''].filter(Boolean).join(' ');
    return{ajuste,permitido,intensidade,confianca:classe,motivos,texto,acima,progressaoTecnica};
  };
  const dataFluxoTeste=(dia=1)=>{
    const d=new Date('2026-06-15T12:00:00.000Z');
    d.setDate(d.getDate()+(+dia||0));
    return d.toISOString();
  };
  const semanaFluxoTeste=(num=1,inicio='2026-06-15T00:00:00.000Z')=>{
    const ini=new Date(inicio);
    const fim=new Date(ini);
    fim.setDate(ini.getDate()+6);
    fim.setHours(23,59,59,0);
    return{id:`fluxo-sem-${num}`,num,inicio:ini.toISOString(),fim:fim.toISOString(),aberta:true,fechada:false,registros:{},resumoIA:'',semanaNoBloco:num,plano:cloneObj(ST.plano)};
  };
  const treinoPlanoFluxoTeste=(plano=ST.plano)=>{
    const dia=Object.values(plano?.dias||{}).find(d=>d&&d.tipo!=='descanso'&&([...(d.aq||[]),...(d.ex||[]),...(d.core||[]),...(d.ombro||[])].length));
    if(!dia) return{nome:'Treino teste',exercicios:[],dadosDetalhados:true};
    const exercicios=[...(dia.aq||[]),...(dia.ex||[]),...(dia.core||[]),...(dia.ombro||[])].map(e=>({...e}));
    return{nome:dia.nome||'Treino teste',tipo:dia.tipo||'forca',exercicios,dadosDetalhados:true};
  };
  const criarEstadoFluxoTesteCalifit=(perfil={})=>{
    const base=DEF();
    const p=Object.assign({},base.perfil,perfil||{});
    p.marcas=Object.assign({},base.perfil.marcas,p.marcas||{});
    p.saude=Object.assign({},base.perfil.saude,p.saude||{});
    p.saude.cirurgia=Object.assign({},base.perfil.saude.cirurgia,p.saude.cirurgia||{});
    p.objetivos=arr(p.objetivos).length?arr(p.objetivos):['forca'];
    p.diasTreino=arr(p.diasTreino).length?arr(p.diasTreino):[1,3,5];
    p.equipamentos=normalizarEquipamentos(arr(p.equipamentos).length?p.equipamentos:['Peso corporal']);
    ST=migrarEstadoSalvo({done:true,perfil:p,semanas:[],checkins:[],contextoTreinador:base.contextoTreinador});
    instalarPlanoGerado(gerarPlano(ST.perfil));
    const sem=semanaFluxoTeste(1);
    ST.semanas=[sem];
    ST.semanaAtual=sem.id;
    ST.exec={};
    normalizarNumeracaoSemanas();
    return ST;
  };
  const semanaFluxoPorId=semanaId=>(ST.semanas||[]).find(s=>String(s.id)===String(semanaId))||getSem()||(ST.semanas||[])[0];
  const registroTreinoFluxo=(semanaId,dia,registro)=>{
    const sem=semanaFluxoPorId(semanaId);
    if(!sem) return null;
    sem.registros=sem.registros||{};
    sem.registros[String(dia)]=registro;
    recalcularPreviaPendenteCalifit(sem,'registro da semana atualizado');
    return registro;
  };
  const identidadeExercicioEditGuard=(ex={})=>({
    n:ex.n,
    nome:ex.nome,
    id:ex.id,
    chave:ex.chave,
    familia:ex.familia,
    padrao:ex.padrao,
    pad:ex.pad,
    exercicioId:ex.exercicioId,
    nomeOriginal:ex.nomeOriginal||ex.exercicioOriginal||ex.n||ex.nome||ex.exercicioId||''
  });
  const camposEditaveisRegistroExercicio=['series','reps','tempo','feito','diff','dificuldade','rpe','dor','dorRegiao','tecnica','cargaKg','cargaUsada','carga','resistenciaElastico','resistenciaUsada','obs','observacoes','atencaoDor','acimaPlanejado','notaAcimaPlanejado'];
  function sanitizarExercicioEditadoCalifit(original={},patch={}){
    const base=cloneObj(original||{});
    const identidade=identidadeExercicioEditGuard(base);
    camposEditaveisRegistroExercicio.forEach(c=>{
      if(Object.prototype.hasOwnProperty.call(patch||{},c)) base[c]=patch[c];
    });
    if(patch?.log&&typeof patch.log==='object'){
      const log={...(base.log||{})};
      camposEditaveisRegistroExercicio.forEach(c=>{
        if(Object.prototype.hasOwnProperty.call(patch.log,c)) log[c]=patch.log[c];
      });
      base.log=log;
    }
    Object.entries(identidade).forEach(([k,v])=>{if(v!==undefined&&v!==null&&v!=='') base[k]=v;});
    if(!base.nomeOriginal) base.nomeOriginal=base.n||base.nome||base.exercicioId||'';
    if(['series','reps','tempo','feito','diff','dificuldade','rpe','dor','dorRegiao','tecnica','cargaKg','cargaUsada','carga','resistenciaElastico','resistenciaUsada','obs','observacoes','log'].some(c=>Object.prototype.hasOwnProperty.call(patch||{},c))) base.editadoPeloUsuario=true;
    return base;
  }
  function sanitizarEdicaoRegistroTreinoCalifit(registroAtual={},patch={}){
    const atual=cloneObj(registroAtual||{});
    const novo=Object.assign({},atual,patch||{});
    const treinoAtual=atual.treino||{};
    const treinoPatch=patch?.treino&&typeof patch.treino==='object'?patch.treino:{};
    novo.treino=Object.assign({},treinoAtual,treinoPatch);
    const atuais=arr(atual.exercicios).length?arr(atual.exercicios):arr(treinoAtual.exercicios);
    if(Array.isArray(patch?.exercicios)){
      const editados=atuais.map((ex,i)=>sanitizarExercicioEditadoCalifit(ex,patch.exercicios[i]||{}));
      novo.exercicios=removerDuplicadosExercicios(editados);
      novo.treino.exercicios=novo.exercicios;
    }else if(Array.isArray(novo.treino.exercicios)){
      novo.treino.exercicios=removerDuplicadosExercicios(arr(novo.treino.exercicios).map((ex,i)=>sanitizarExercicioEditadoCalifit(atuais[i]||ex,ex)));
      novo.exercicios=novo.treino.exercicios;
    }
    if(patch?.checkinMinimo&&typeof patch.checkinMinimo==='object') aplicarFeedbackGeralRegistroTreinoCalifit(novo,patch.checkinMinimo);
    return novo;
  }
  const registrarTreinoFluxoTesteCalifit=(opcoes={})=>{
    const cfg=opcoes&&typeof opcoes==='object'?opcoes:{};
    const {semanaId,dia=1,treino=null,registro={},checkinMinimo=undefined}=cfg;
    const registroSeguro=registro&&typeof registro==='object'?registro:{};
    const t=cloneObj(treino||treinoPlanoFluxoTeste());
    const logs=arr(registroSeguro.exercicios).length?registroSeguro.exercicios:arr(t.exercicios).map(ex=>({nome:ex.n||ex.nome,feito:'sim',diff:'moderado',rpe:7,dor:'nao',tecnica:'boa',series:[{reps:8},{reps:8}]}));
    t.exercicios=arr(t.exercicios).map((ex,i)=>({...ex,log:logs[i]||logs.find(l=>normTxt(l.nome)===normTxt(ex.n||ex.nome))||logs[0]||{}}));
    t.dadosDetalhados=registroSeguro.dadosDetalhados!==false;
    const reg=Object.assign({tipo:'feito',data:dataFluxoTeste(dia),treino:t,exercicios:t.exercicios,checkinMinimo:checkinMinimo===undefined?{dor:'nao',dificuldade:'moderado',esforco:'moderado'}:checkinMinimo,observacoes:''},registroSeguro,{tipo:'feito',treino:t,exercicios:t.exercicios});
    return registroTreinoFluxo(semanaId,dia,reg);
  };
  const registrarDescansoFluxoTesteCalifit=({semanaId,dia=0,observacao=''}={})=>registroTreinoFluxo(semanaId,dia,{tipo:'descanso',data:dataFluxoTeste(dia),descansoTipo:'descanso total',duracaoMin:0,sensacao:'boa',obs:observacao});
  const registrarAtividadeLeveFluxoTesteCalifit=({semanaId,dia=0,atividade='caminhada leve',intensidade='leve',observacao=''}={})=>registroTreinoFluxo(semanaId,dia,{tipo:'descanso',atividadeLeve:true,data:dataFluxoTeste(dia),descansoTipo:atividade,duracaoMin:20,sensacao:intensidade||'leve',obs:observacao});
  const registrarTreinoPerdidoFluxoTesteCalifit=({semanaId,dia=1,motivo='treino perdido'}={})=>registroTreinoFluxo(semanaId,dia,{tipo:'perdido',data:dataFluxoTeste(dia),motivo,obs:motivo});
  const reabrirEditarRegistroFluxoTesteCalifit=({semanaId,dia=1,patch={}}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    if(!sem?.registros) return null;
    const atual=sem.registros[String(dia)]||{};
    const novo=sanitizarEdicaoRegistroTreinoCalifit(atual,patch);
    sem.registros[String(dia)]=novo;
    recalcularPreviaPendenteCalifit(sem,'registro reaberto e editado');
    return novo;
  };
  const checkinFluxoTeste=(sem,preferencia='manter')=>{
    const existente=(ST.checkins||[]).find(c=>String(c.semanaId)===String(sem.id));
    if(existente){
      existente.respostas=Object.assign({dor:'nao',exercicioFacil:'',exercicioDificil:'',recuperacao:'boa',sonoEnergia:'boa'},existente.respostas||{},{preferencia});
      recalcularPreviaPendenteCalifit(sem,'check-in semanal atualizado');
      return existente;
    }
    const c={id:`check-${sem.id}`,semanaId:sem.id,data:sem.fim||new Date().toISOString(),respostas:{dor:'nao',exercicioFacil:'',exercicioDificil:'',recuperacao:'boa',sonoEnergia:'boa',preferencia}};
    ST.checkins=arr(ST.checkins);
    ST.checkins.push(c);
    recalcularPreviaPendenteCalifit(sem,'check-in semanal atualizado');
    return c;
  };
  const editarCheckinSemanalTesteCalifit=({semanaId,patch={}}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    if(!sem) return null;
    let check=(ST.checkins||[]).find(c=>String(c.semanaId)===String(sem.id));
    if(!check) check=checkinFluxoTeste(sem,'manter');
    check.respostas=Object.assign({},check.respostas||{},patch||{});
    const previa=recalcularPreviaPendenteCalifit(sem,'check-in semanal editado');
    return{checkin:check,previa};
  };
  const gerarPreviaFluxoTesteCalifit=({semanaId}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    if(!sem) return null;
    const previa=gerarPreviaProximaSemana(sem);
    ST.previaProximaSemana=previa;
    if(previa) sem.previaPendente=true;
    return previa;
  };
  const fecharSemanaFluxoTesteCalifit=({semanaId,preferencia='manter'}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    if(!sem) return null;
    checkinFluxoTeste(sem,preferencia);
    return gerarPreviaFluxoTesteCalifit({semanaId:sem.id});
  };
  const aplicarPreviaFluxoTesteCalifit=({semanaId}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    const prev=ST.previaProximaSemana||gerarPreviaFluxoTesteCalifit({semanaId:sem?.id});
    const origem=sem||((ST.semanas||[]).find(s=>String(s.id)===String(prev?.semanaOrigemId)));
    if(!prev||!origem) return null;
    origem.planoAntesFechamento=cloneObj(prev.planoOrigem||ST.plano);
    origem.planoBaseAntesFechamento=cloneObj(prev.planoBaseOrigem||ST.planoBaseSemTempo||limparMetadadosTempoPlano(ST.plano));
    origem.planoBaseEstruturalAntesFechamento=cloneObj(prev.planoBaseEstruturalOrigem||ST.planoBaseEstrutural||separarPlanoBaseEstrutural(ST.planoBaseSemTempo||ST.plano));
    if(prev.resumoAjustes?.length) origem.resumoIA=prev.resumoAjustes.join('\n');
    origem.aberta=false;
    origem.fechada=true;
    delete origem.previaPendente;
    ST.planoBaseEstrutural=separarPlanoBaseEstrutural(prev.planoBaseEstrutural||ST.planoBaseEstrutural||prev.planoBaseSemTempo||prev.plano);
    ST.planoBaseSemTempo=limparMetadadosTempoPlano(prev.planoBaseSemTempo||prev.plano);
    ST.plano=ajustarPlanoAoTempo(ajustarDescansosPlano(deduplicarPlano(cloneObj(ST.planoBaseSemTempo))),ST.perfil);
    const ini=new Date(origem.fim||new Date().toISOString());
    ini.setDate(ini.getDate()+1);
    ini.setHours(0,0,0,0);
    const nova=semanaFluxoTeste((ST.semanas||[]).length+1,ini.toISOString());
    nova.geradaPorFechamentoDe=origem.id;
    nova.semanaNoBloco=prev.semanaNoBloco||origem.semanaNoBloco||1;
    nova.plano=cloneObj(ST.plano);
    ST.semanas=arr(ST.semanas);
    ST.semanas.push(nova);
    ST.semanaAtual=nova.id;
    ST.previaProximaSemana=null;
    ST.exec={};
    normalizarNumeracaoSemanas();
    return{origem,nova,ST};
  };
  const criarEstadoCorpoTesteCalifit=(perfil={})=>{
    const base=DEF();
    const p=Object.assign({},base.perfil,perfil||{});
    p.marcas=Object.assign({},base.perfil.marcas,p.marcas||{});
    p.saude=Object.assign({},base.perfil.saude,p.saude||{});
    p.saude.cirurgia=Object.assign({},base.perfil.saude.cirurgia,p.saude.cirurgia||{});
    p.objetivos=arr(p.objetivos).length?arr(p.objetivos):['forca'];
    p.diasTreino=arr(p.diasTreino).length?arr(p.diasTreino):[1,3,5];
    p.equipamentos=normalizarEquipamentos(arr(p.equipamentos).length?p.equipamentos:['Peso corporal']);
    ST=migrarEstadoSalvo({done:true,perfil:p,bio:[],pesoDiario:[],corpo:{historicoMetas:[]},semanas:[],checkins:[]});
    return ST;
  };
  const registrarPesoCorpoTesteCalifit=({data=new Date().toISOString(),peso}={})=>{
    return registrarOuCorrigirPesoDiario({data,peso,origem:'pesoDiario'});
  };
  const corrigirPesoCorpoTesteCalifit=registrarPesoCorpoTesteCalifit;
  const registrarBioCorpoTesteCalifit=({data=new Date().toISOString(),peso,gorduraPct,massaMuscular,massaOssea,aguaPct,gorduraVisceral,metabolismoBasal}={})=>{
    const valores=[
      ['peso',validarPesoKg(peso,{opcional:true})],
      ['gordura',validarGorduraCorporal(gorduraPct,{opcional:true})],
      ['massaMuscular',validarMassaMuscular(massaMuscular,{opcional:true})],
      ['aguaCorp',validarAguaCorporal(aguaPct,{opcional:true})],
      ['gordVisceral',validarGorduraVisceral(gorduraVisceral,{opcional:true})],
      ['tmb',validarTmb(metabolismoBasal,{opcional:true})]
    ];
    const invalido=valores.find(([,r])=>!r.valido);
    if(invalido) return{valido:false,mensagem:invalido[1].mensagem};
    if(!valores.some(([,r])=>r.valor!=null)) return{valido:false,mensagem:'Preencha pelo menos um dado corporal.'};
    const entry={data,peso:valores[0][1].valor,gordura:valores[1][1].valor,massaMuscular:valores[2][1].valor,massaOssea:validarNumeroCorporal(massaOssea,{min:1,max:8,campo:'Massa óssea',opcional:true}).valor,aguaCorp:valores[3][1].valor,gordVisceral:valores[4][1].valor,tmb:valores[5][1].valor,origem:'bioimpedancia'};
    ST.bio=arr(ST.bio);
    const existente=ST.bio.find(x=>chaveDia(x.data)===chaveDia(data));
    if(existente) atualizarRegistroBio(existente,entry);
    else adicionarRegistroBio(entry);
    ST.bio.sort((a,b)=>new Date(b.data||0)-new Date(a.data||0));
    if(entry.peso) ST.perfil.peso=entry.peso;
    return{valido:true,registro:existente||entry};
  };
  const corrigirBioCorpoTesteCalifit=({data,patch={}}={})=>{
    const existente=arr(ST.bio).find(x=>chaveDia(x.data)===chaveDia(data));
    if(!existente) return registrarBioCorpoTesteCalifit({...patch,data});
    const merged={data:existente.data,peso:existente.peso,gorduraPct:existente.gordura,massaMuscular:existente.massaMuscular,massaOssea:existente.massaOssea,aguaPct:existente.aguaCorp,gorduraVisceral:existente.gordVisceral,metabolismoBasal:existente.tmb,...patch};
    return registrarBioCorpoTesteCalifit(merged);
  };
  const calcularIndicadoresCorpoTesteCalifit=({perfil=ST.perfil,registro=null}={})=>{
    const b=registro||arr(ST.bio)[0]||{};
    return calcularLeituraCorporalCalifit({...b,peso:b.peso||perfil.peso,altura:perfil.altura,idade:perfil.idade,genero:perfil.genero,gordura:b.gordura??b.gorduraPct,massaMuscular:b.massaMuscular});
  };
  const listarHistoricoCorpoTesteCalifit=()=>({pesoDiario:cloneObj(arr(ST.pesoDiario)),bio:cloneObj(arr(ST.bio)),metas:cloneObj(arr(ST.corpo?.historicoMetas))});
  const ultimosRegistrosCorpoTesteCalifit=()=>[...arr(ST.pesoDiario).map(x=>({...x,tipo:'peso'})),...arr(ST.bio).map(x=>({...x,tipo:'bio'}))].sort((a,b)=>new Date(b.data||0)-new Date(a.data||0));
  const definirMetaCorpoTesteCalifit=({pesoMeta,gorduraMeta,observacao='',data=new Date().toISOString()}={})=>{
    const mudou=salvarMetasCorporais(pesoMeta,gorduraMeta,data);
    const ultimo=arr(ST.corpo?.historicoMetas)[0];
    if(ultimo&&observacao) ultimo.observacao=observacao;
    return{mudou,metaPeso:ST.perfil.metaPeso,metaGordura:ST.perfil.metaGordura,historico:cloneObj(arr(ST.corpo?.historicoMetas))};
  };
  const exportarEstadoTesteCalifit=()=>JSON.stringify(ST);
  const importarEstadoTesteCalifit=json=>{ST=migrarEstadoSalvo(typeof json==='string'?JSON.parse(json):json);return ST;};
  const criarEstadoHistoricoTesteCalifit=(perfil={})=>criarEstadoFluxoTesteCalifit(perfil);
  const fecharSemanaHistoricoTesteCalifit=fecharSemanaFluxoTesteCalifit;
  const aplicarPreviaHistoricoTesteCalifit=aplicarPreviaFluxoTesteCalifit;
  const editarRegistroHistoricoTesteCalifit=reabrirEditarRegistroFluxoTesteCalifit;
  const avancarNSemanasTesteCalifit=({n=1,padraoRegistros='completo',preferencia='manter'}={})=>{
    const criadas=[];
    for(let i=0;i<n;i++){
      const sem=getSem()||ST.semanas[ST.semanas.length-1];
      if(!sem) break;
      if(padraoRegistros==='perdido') registrarTreinoPerdidoFluxoTesteCalifit({semanaId:sem.id,dia:1,motivo:'perdido'});
      else registrarTreinoFluxoTesteCalifit({semanaId:sem.id,dia:1});
      fecharSemanaFluxoTesteCalifit({semanaId:sem.id,preferencia});
      const aplicado=aplicarPreviaFluxoTesteCalifit({semanaId:sem.id});
      if(aplicado?.nova) criadas.push(aplicado.nova);
    }
    return{ST,criadas};
  };
  const reabrirSemanaHistoricoTesteCalifit=({semanaId}={})=>{
    const sem=(ST.semanas||[]).find(s=>String(s.id)===String(semanaId));
    if(!sem) return null;
    sem.aberta=true;
    sem.fechada=false;
    sem.reabertaDepois=true;
    ST.semanaAtual=sem.id;
    normalizarNumeracaoSemanas();
    return sem;
  };
  const limparSemanaAtualTesteCalifit=()=>{
    const sem=getSem();
    if(!sem) return null;
    sem.registros={};
    sem.resumoIA='';
    sem.previaPendente=false;
    ST.checkins=(ST.checkins||[]).filter(c=>String(c.semanaId)!==String(sem.id)&&Number(c.semanaNum)!==Number(sem.num));
    if(ST.previaProximaSemana?.semanaOrigemId&&String(ST.previaProximaSemana.semanaOrigemId)===String(sem.id)) ST.previaProximaSemana=null;
    ST.exec={};
    return sem;
  };
  const resetTotalTesteCalifit=()=>{ST=DEF();return ST;};
  const exportarBackupHistoricoTesteCalifit=()=>JSON.stringify(ST);
  const importarBackupHistoricoTesteCalifit=json=>{
    const anterior=cloneObj(ST);
    try{
      const dados=typeof json==='string'?JSON.parse(json):json;
      if(!backupValido(dados)) return{ok:false,erro:'Arquivo de backup inválido.',ST};
      ST=migrarEstadoSalvo(dados);
      normalizarNumeracaoSemanas();
      return{ok:true,ST};
    }catch(e){
      ST=migrarEstadoSalvo(anterior);
      return{ok:false,erro:'Arquivo de backup inválido.',ST};
    }
  };
  const validarIntegridadeEstadoTesteCalifit=(estado=ST)=>{
    const st=estado||ST;
    const ids=arr(st.semanas).map(s=>String(s.id||''));
    const semanasDuplicadas=ids.length!==new Set(ids).size;
    const semanaAtualExiste=!st.semanaAtual||arr(st.semanas).some(s=>String(s.id)===String(st.semanaAtual));
    const checkinsOrfaos=arr(st.checkins).filter(c=>c?.semanaId&&!ids.includes(String(c.semanaId))).length;
    return{ok:!semanasDuplicadas&&semanaAtualExiste&&!checkinsOrfaos,semanasDuplicadas,semanaAtualExiste,checkinsOrfaos};
  };
  const formatarDataHojeTesteCalifit=(d=new Date('2026-06-30T12:00:00'))=>dataHojeUX(d);
  const formatarPrescricaoPorLadoTesteCalifit=(ex={})=>prescricaoClara(ex);
  const exercicioEhPorLadoTesteCalifit=(ex={})=>!!complementoPrescricaoLado(ex);
  const instrucoesExercicioTesteCalifit=(ex={})=>{
    const inf=infoExercicio(ex);
    return [inf.amigavel,inf.sub,...arr(inf.passos),inf.dica,inf.erro,inf.reg,orientacaoComplementoPrescricao(ex)].filter(Boolean).join(' ');
  };
  const labelsDificuldadeTesteCalifit=()=>labelsDificuldadeTreino();
  const recomendacaoAcionavelTesteCalifit=({exercicio={},registro={},perfil=ST.perfil}={})=>{
    const decisao=decisaoProgressaoTesteCalifit({perfil,exercicio,registro});
    const nome=infoExercicio(exercicio).amigavel||nomeTecnicoExercicio(exercicio)||'exercício';
    const dor=analisarDorRegistro(registro);
    if(dor.temDor) return `Manter ${nome} com a mesma prescrição. Não aumentar volume; reduza amplitude ou troque a variação se a dor repetir.`;
    if(/muito|pesado/.test(normTxt(registro.diff||decisao.texto))) return `Manter ${nome} com o volume atual e consolidar técnica antes de subir dificuldade.`;
    if(/leve|facil|fácil/.test(normTxt(registro.diff||decisao.texto))&&!(registro.dor&&registro.tecnica&&(registro.rpe||registro.diff))) return `Manter ${nome} com a prescrição atual. Complete dor, técnica e esforço antes de progredir por exercício fácil.`;
    if(/leve|facil|fácil/.test(normTxt(registro.diff||decisao.texto))) return `Progredir pouco em ${nome}: adicionar 1-2 repetições ou 5-10s apenas se continuar sem dor.`;
    return `Manter ${nome} com a prescrição atual e registrar mais uma sessão para decidir a progressão.`;
  };
  const validarCheckinCompletoTesteCalifit=(registroTreino={})=>({
    completo:checkinMinimoCompleto(registroTreino),
    conta:treinoContaParaProgressao(registroTreino),
    status:statusProgressaoPorCheckin(registroTreino),
    qualidade:qualidadeFeedbackTreino(registroTreino),
    confianca:classificarConfiancaFeedback(registroTreino),
    score:scoreConfiancaFeedback(registroTreino)
  });
  const recomendacaoCheckinAcionavelTesteCalifit=({exercicio={},registro={},perfil=ST.perfil}={})=>{
    const decisao=decisaoProgressaoTesteCalifit({perfil,exercicio,registro});
    return{...decisao,mensagem:recomendacaoAcionavelTesteCalifit({exercicio,registro,perfil})};
  };
  const editarRegistroTreinoTesteCalifit=args=>reabrirEditarRegistroFluxoTesteCalifit(args);
  const registrarAtividadeLeveTesteCalifit=args=>registrarAtividadeLeveFluxoTesteCalifit(args);
  const registrarDescansoTesteCalifit=args=>registrarDescansoFluxoTesteCalifit(args);
  const recomendacoesPorExercicioTesteCalifit=(treino={})=>arr(treino.exercicios||treino.treino?.exercicios).map(ex=>({
    exercicio:ex.nome||ex.n||nomeTecnicoExercicio(ex),
    recomendacao:recomendacaoAcionavelTesteCalifit({exercicio:ex,registro:ex.log||ex})
  }));
  const salvarCheckinSemanalUnicoTesteCalifit=({semanaId,respostas={}}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    if(!sem) return null;
    const recomendacaoGerada=gerarRecomendacaoCheckin(respostas,ST.perfil?.diasTreino?.length||3);
    const checkin=salvarCheckinSemanalUnicoCalifit(sem,{respostas,recomendacaoGerada});
    atualizarContextoTreinadorPorCheckin(checkin);
    recalcularPreviaPendenteCalifit(sem,'check-in semanal atualizado');
    return checkin;
  };
  const aplicarEdicaoCompletaRegistroTesteCalifit=({semanaId,dia=1,patch={}}={})=>{
    const sem=semanaFluxoPorId(semanaId);
    const atual=registroTreinoUnicoDiaCalifit(sem,dia);
    if(!atual) return null;
    const novo=sanitizarEdicaoRegistroTreinoCalifit(atual,patch);
    salvarRegistroTreinoUnicoDiaCalifit(sem,dia,novo);
    recalcularPreviaPendenteCalifit(sem,'registro reaberto e editado');
    return novo;
  };
  const resumoConclusaoTempoTesteCalifit=(registro={})=>resumoConclusaoTempoCalifit(registro);
  const snapshotRegistroTreinoTesteCalifit=()=>({
    labels:labelsCheckinTesteCalifit(),
    statusAjuda:ajudaStatusRegistroHtml(),
    dorRegioes:regioesDorRegistro(),
    campos:['rd-rpe','rd-dor','rd-dor-regiao','rd-tec','rd-obs','er-ci-dor','er-ci-dif','er-ci-esf','er-rpe','er-dor','er-dor-regiao','er-tec','er-obs-ex','er-diff','er-f'],
    microtexto:'Essas respostas influenciam a próxima semana.'
  });
  const timersDisponiveisExercicioTesteCalifit=(ex={},opts={})=>timersDisponiveisExercicio(ex,opts);
  const cronometroAquecimentoExTesteCalifit=(ex={})=>cronometroAquecimentoEx(ex);
  const resumoAquecimentoTreinoTesteCalifit=(dia={})=>resumoAquecimentoTreino(dia);
  const snapshotHojeUXTesteCalifit=()=>{
    const exTempo={n:'Prancha Lateral',s:1,r:'20s',ds:30};
    const aq={n:'Mobilidade Torácica',s:1,r:'30s',ds:0};
    const aqReps={n:'Retração Escapular no Solo/Parede',s:1,r:'10',ds:0};
    return{
      data:formatarDataHojeTesteCalifit(),
      aquecimentoTimers:timersDisponiveisExercicio(aq),
      aquecimentoTimerRepeticoes:cronometroAquecimentoEx(aqReps),
      exercicioTempoTimers:timersDisponiveisExercicio(exTempo),
      prescricaoLateral:prescricaoClara(exTempo),
      orientacaoLateral:orientacaoComplementoPrescricao(exTempo),
      labels:labelsDificuldadeTreino(),
      recomendacao:recomendacaoAcionavelTesteCalifit({exercicio:exTempo,registro:{feito:'sim',diff:'mod',dor:'nao',rpe:7,tecnica:'boa'}})
    };
  };
  window.__CALIFIT_TEST_HOOKS__={
    DEF,
    getST:()=>ST,
    setST:dados=>{ST=migrarEstadoSalvo(dados||{});return ST;},
    resumoConfiancaSemana,
    classificarConfiancaFeedback,
    scoreConfiancaFeedback,
    checkinMinimoCompleto,
    treinoContaParaProgressao,
    statusProgressaoPorCheckin,
    progressaoPermitidaPorFeedback,
    intensidadeProgressaoPorFeedback,
    progressaoPossivelEspecifica,
    progressaoCautelaAtiva,
    registroAcimaDoPlanejado,
    faixaPlanejadaExercicio,
    notaRegistroAcimaPlanejado,
    orientacaoReservaExercicio,
    dataHojeUX,
    formatarDataHojeTesteCalifit,
    formatarPrescricaoPorLadoTesteCalifit,
    exercicioEhPorLadoTesteCalifit,
    instrucoesExercicioTesteCalifit,
    labelsDificuldadeTesteCalifit,
    labelsCheckinTesteCalifit,
    impactoStatusRegistroTesteCalifit,
    validarCheckinCompletoTesteCalifit,
    recomendacaoCheckinAcionavelTesteCalifit,
    editarRegistroTreinoTesteCalifit,
    aplicarEdicaoCompletaRegistroTesteCalifit,
    feedbackGeralTreinoCalifit,
    aplicarFeedbackGeralRegistroTreinoCalifit,
    metadadosConclusaoTempoCalifit,
    resumoConclusaoTempoTesteCalifit,
    registroTreinoUnicoDiaCalifit,
    salvarRegistroTreinoUnicoDiaCalifit,
    checkinSemanalDaSemanaCalifit,
    normalizarCheckinsSemanaisCalifit,
    salvarCheckinSemanalUnicoTesteCalifit,
    snapshotRegistroTreinoTesteCalifit,
    registrarAtividadeLeveTesteCalifit,
    registrarDescansoTesteCalifit,
    recomendacoesPorExercicioTesteCalifit,
    recomendacaoAcionavelTesteCalifit,
    sanitizarEdicaoRegistroTreinoTesteCalifit:sanitizarEdicaoRegistroTreinoCalifit,
    sanitizarEdicaoTreinoPlanejadoTesteCalifit:sanitizarEdicaoTreinoPlanejadoCalifit,
    editarTreinoPlanejadoTesteCalifit,
    normalizarLinguagemInformalAssistenteCalifit,
    confirmacaoInformalPuraAssistenteCalifit,
    detectarMudancaNivelExperienciaAssistenteCalifit,
    detectarDiasConsecutivosAssistenteCalifit,
    contextoTrocaExercicioAssistenteCalifit,
    classificarIntencaoTreinadorTesteCalifit:classificarIntencaoTreinador,
    contextoTreinadorResumidoTesteCalifit:contextoTreinadorResumido,
    respostaTreinadorEstruturadaTesteCalifit:respostaTreinadorEstruturada,
    responderTreinadorTesteCalifit:responderTreinadorLocal,
    diaAssistentePorTextoCalifit,
    rotuloDiaAssistenteCalifit,
    localizarAtividadeAssistenteCalifit,
    resumoAtividadesAssistenteCalifit,
    interpretarAcaoAssistenteEstadoCalifit,
    aplicarAcaoAssistenteEstadoCalifit,
    regenerarPlanoAssistentePreservandoEstadoCalifit,
    mensagemConfirmacaoAcaoAssistenteCalifit,
    snapshotPerfilImpactoPlanoCalifit,
    perfilPlanoImpactadoCalifit,
    registroDiaTemTreinoConcluidoCalifit,
    mesclarDiaRegistradoComNovoPlanoCalifit,
    listarExerciciosBibliotecaTesteCalifit:listarExerciciosBibliotecaCalifit,
    filtrarExerciciosBibliotecaTesteCalifit:filtrarExerciciosBibliotecaCalifit,
    detalheExercicioBibliotecaTesteCalifit:detalheExercicioBibliotecaCalifit,
    opcoesFiltroBibliotecaTesteCalifit:opcoesFiltroBiblioteca,
    normalizarChaveFiltroBibliotecaTesteCalifit:normalizarChaveFiltroBibliotecaCalifit,
    listarSkillTreeTesteCalifit:listarSkillTreeCalifit,
    detalheSkillTreeNoTesteCalifit:detalheSkillTreeNoCalifit,
    caminhoSkillTreeTesteCalifit:caminhoSkillTreeCalifit,
    filtrarSkillTreeTesteCalifit:filtrarSkillTreeCalifit,
    responderSkillTreeTreinadorTesteCalifit:responderSkillTreeTreinadorCalifit,
    localizarSkillTreePorExercicioTesteCalifit:localizarSkillTreePorExercicioCalifit,
    historicoSkillTreeTesteCalifit:historicoSkillTreeCalifit,
    evidenciasNoSkillTreeTesteCalifit:evidenciasNoSkillTreeCalifit,
    avaliarProgressoSkillTreeTesteCalifit:avaliarProgressoSkillTreeCalifit,
    resumoProgressoSkillTreeTesteCalifit:resumoProgressoSkillTreeCalifit,
    mapaProgressoSkillTreeTesteCalifit:mapaProgressoSkillTreeCalifit,
    obterPreferenciasLembretesTesteCalifit:obterPreferenciasLembretesCalifit,
    salvarPreferenciasLembretesTesteCalifit:salvarPreferenciasLembretesCalifit,
    ativarTodosTiposLembretesTesteCalifit:ativarTodosTiposLembretesCalifit,
    desativarTodosTiposLembretesTesteCalifit:desativarTodosTiposLembretesCalifit,
    avaliarLembretesTesteCalifit:avaliarLembretesCalifit,
    avaliarLembretesComDispensadosTesteCalifit:avaliarLembretesComDispensadosCalifit,
    statusBackupLocalTesteCalifit:statusBackupLocalCalifit,
    auditarIntegridadeLocalTesteCalifit:auditarIntegridadeLocalCalifit,
    validarCoberturaMetadadosExerciciosTesteCalifit:validarCoberturaMetadadosExercicios,
    acionarLembreteTesteCalifit:acionarLembreteCalifit,
    dispensarLembreteTesteCalifit:dispensarLembreteCalifit,
    limparDismissLembretesTesteCalifit:limparDismissLembretesCalifit,
    adiarLembreteTesteCalifit:adiarLembreteCalifit,
    estadoDoresOnboardingTesteCalifit:estadoDoresOnboardingAtual,
    aplicarEstadoDoresOnboardingTesteCalifit:aplicarEstadoDoresOnboarding,
    preservarScrollDuranteTesteCalifit:preservarScrollDuranteCalifit,
    garantirBotoesTipoButtonTesteCalifit:garantirBotoesTipoButtonCalifit,
    timersDisponiveisExercicioTesteCalifit,
    cronometroAquecimentoExTesteCalifit,
    rotuloCronometroAquecimentoCalifit,
    quantidadeExerciciosSessaoCalifit,
    resumoAquecimentoTreinoTesteCalifit,
    snapshotHojeUXTesteCalifit,
    numeroCargaRegistrada,
    cargaRegistradaExercicio,
    decisaoProgressaoTesteCalifit,
    confiancaPreviaSemana,
    motivosAjustePreviaSemana,
    ajustesPrePopuladosPrevia,
    resumoDecisaoPreviaSemana,
    finalizarPreviaProximaSemana,
    recalcularPreviaPendenteCalifit,
    direcaoAlteracaoPreviaCalifit,
    gerarPreviaProximaSemana,
    criarEstadoFluxoTesteCalifit,
    registrarTreinoFluxoTesteCalifit,
    registrarDescansoFluxoTesteCalifit,
    registrarAtividadeLeveFluxoTesteCalifit,
    registrarTreinoPerdidoFluxoTesteCalifit,
    reabrirEditarRegistroFluxoTesteCalifit,
    fecharSemanaFluxoTesteCalifit,
    editarCheckinSemanalTesteCalifit,
    gerarPreviaFluxoTesteCalifit,
    aplicarPreviaFluxoTesteCalifit,
    criarEstadoCorpoTesteCalifit,
    registrarPesoCorpoTesteCalifit,
    corrigirPesoCorpoTesteCalifit,
    registrarBioCorpoTesteCalifit,
    corrigirBioCorpoTesteCalifit,
    calcularIndicadoresCorpoTesteCalifit,
    calcularLeituraCorporalTesteCalifit:calcularLeituraCorporalCalifit,
    classificarTipoCorporalTesteCalifit:classificarTipoCorporalCalifit,
    listarHistoricoCorpoTesteCalifit,
    ultimosRegistrosCorpoTesteCalifit,
    registroPesoMaisRecenteTesteCalifit:registroPesoMaisRecente,
    definirMetaCorpoTesteCalifit,
    exportarEstadoTesteCalifit,
    importarEstadoTesteCalifit,
    criarEstadoHistoricoTesteCalifit,
    avancarNSemanasTesteCalifit,
    fecharSemanaHistoricoTesteCalifit,
    aplicarPreviaHistoricoTesteCalifit,
    reabrirSemanaHistoricoTesteCalifit,
    editarRegistroHistoricoTesteCalifit,
    limparSemanaAtualTesteCalifit,
    resetTotalTesteCalifit,
    exportarBackupHistoricoTesteCalifit,
    importarBackupHistoricoTesteCalifit,
    validarIntegridadeEstadoTesteCalifit,
    migrarEstadoSalvo,
    backupValido,
    validarPesoKg,
    validarAlturaCm,
    validarGorduraCorporal,
    leituraBioSeparada,
    sugestaoPesoReferencia,
    registroPesoMaisRecente,
    gerarPlano,
    gerarPlanoTesteCalifit:perfil=>gerarPlano(perfil),
    montarSequenciaPorObjetivo,
    selecionarSwingMetabolicoReducaoGorduraCalifit,
    diagnosticarSwingMetabolicoCalifit,
    diagnosticarCordaMetabolicaCalifit,
    selecionarCondicionamentoMetabolicoCalifit,
    atividadeConflitaCordaNoDiaCalifit,
    ajustarCordaConflitoDiaCalifit,
    diagnosticarCintoCargaCalifit,
    integrarCintoCargaCalifit,
    normalizarEstadosSemanasCalifit,
    normalizarNumeracaoSemanas,
    normalizarAlteracoesPreviaCalifit,
    semanaMaisRecenteRealCalifit,
    checkinPertenceSemanaCalifit,
    restaurarSubstituicoesTemporariasPlanoCalifit,
    classificarCargaAtividade,
    normalizarImpactoAtividadeCalifit,
    normalizarRecuperacaoAtividadeCalifit,
    atividadesPlanejadasDia,
    atividadesRegistradasDia,
    atividadeRegistradaCorrespondente,
    atualizarAtividadeComplementarNoRegistroCalifit,
    removerAtividadeComplementarDoRegistroCalifit,
    normalizarRegistroAtividadesComplementaresCalifit,
    filtrarRegistroAtividadesParaPlanejadasCalifit,
    preservarRegistrosAtividadeNaRegeneracaoCalifit,
    coletarAtividadesComplementaresPerfilCalifit,
    definirSelecaoAtividadePerfilCalifit,
    montarRegistroAtividadesComplementaresCalifit,
    atividadesRealizadasSemanaCalifit,
    resumoCargaAtividadesSemanaCalifit,
    aplicarAjustesAtividadesRegistradasPlanoCalifit,
    recalcularPlanoAtualPorAtividadesRegistradasCalifit,
    resumoRecuperacaoSemana,
    decisaoAjusteVolumeSemana,
    estrategiaRetornoGradual,
    distribuirTreinosPorAtividades,
    configDistribuicaoSemanalCalifit,
    cargasPadraoTreinoCalifit,
    padraoDominanteTreinoCalifit,
    penalidadeRecuperacaoSequenciaCalifit,
    ajustarDistribuicaoSemanalPlanoCalifit,
    aplicarAjustesAtividadesPlano,
    progressaoDeterministicaUnica,
    deduplicarPlano,
    cfgNivel,
    configNivelTreinoCalifit,
    fatorPeriodizacaoNivelCalifit,
    selecionarExercicioSeguro,
    diagnosticarCoreCarregadoCalifit,
    equipamentoDisponivel,
    nivelPermiteExercicio,
    normalizarFrequenciaRecenteCalifit,
    configFrequenciaRecenteCalifit,
    fatorPeriodizacaoFrequenciaCalifit,
    avaliarProntidaoInicial,
    normalizarTreinoPorNivelEProntidao,
    aplicarPeriodizacao,
    metaExercicio,
    metaExercicioPorNome,
    requisitosEquipamentoExercicio,
    avaliarSegurancaExercicioRegional,
    exercicioBloqueadoPorTextoCirurgia,
    equipamentosValidosParaPrescricao,
    perfilComEquipamentosValidos,
    equipamentosCarregadosSemCarga,
    equipamentosCarregadosSemDecisao,
    cirurgiaTemLimitacaoAtiva,
    aplicarSegurancaRegionalPlano,
    aplicarSegurancaCirurgiaPlano
  };
}




window.__CALIFIT_TEST_MODULE__={
  instalarHooksTesteCalifit
};
})();
