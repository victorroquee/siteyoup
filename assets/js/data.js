/*
 * Conteúdo do site YOUP.
 * Para adicionar um case ou um ano na linha do tempo, edite este arquivo.
 * Fotos de cada case ficam em assets/media/<slug>/ (01.jpg, 02.jpg, ...).
 * Para usar vídeo, coloque o arquivo em assets/media/<slug>/video.mp4 e preencha "video".
 * Textos marcados com [A CONFIRMAR] precisam de revisão da YOUP.
 */
window.YOUP = {
  contato: {
    email: "contato@youp.com.br",
    telefone: "[A CONFIRMAR]",
    endereco: "Helbor Trilogy Office, conj. 1608<br>Av. Pereira Barreto, 1479<br>São Bernardo do Campo — SP, 09751-000",
    redes: [
      { nome: "Instagram", url: "https://www.instagram.com/agenciayoup/" },
      { nome: "Facebook", url: "https://www.facebook.com/agenciayoup/" },
      { nome: "YouTube", url: "https://www.youtube.com/channel/UCLhvFUwo51P28dkmJFbkxSQ" }
    ]
  },

  // Vídeo principal da HOME. Deixe vazio ("") para usar a sequência de fotos.
  heroVideo: "",

  numeros: [
    { valor: 26, sufixo: "", rotulo: "anos de história" },
    // Público presencial divulgado: 100 mil (X-Fighters 2011) + 100 mil (Jump Festival, 10 edições) + 70 mil (Dia D, 3 edições)
    // + 43 mil (X Games 2008) + 11 mil (Vert Evolution 2013) + 8 mil (Skate Run 2015) = 332 mil
    { valor: 332, prefixo: "+", sufixo: " mil", rotulo: "presenças em seis projetos" },
    // Building Drop: Reel no Instagram da Red Bull Brasil (13,1 mi) + três vídeos no YouTube (≈ 6,05 mi) ≈ 19,15 mi. Recorte Brasil, soma provisória.
    { valor: 19, prefixo: "+", sufixo: " mi", rotulo: "visualizações do Building Drop nas redes" },
    { valor: 2, sufixo: "", rotulo: "Guinness World Records™" },
    { valor: 4, sufixo: "", rotulo: "eventos com transmissão ao vivo na TV" }
  ],
  numerosNota: "Presenças: público acumulado em projetos do portfólio da YOUP. A soma não representa pessoas únicas, e os resultados foram construídos junto às marcas, atletas e demais parceiros. Visualizações: Instagram e YouTube, considerando apenas a Red Bull Brasil; recorte parcial, não representa o total do projeto.",

  servicos: [
    {
      verbo: "VER",
      titulo: "Content<br>& Digital",
      chamada: "Construímos memórias.",
      texto: "Convergimos o universo físico e o digital para gerar conteúdo de alta relevância — legítimo ao conceito da marca e autêntico para o público de cada segmento. Da captação em locação à narrativa de plataforma, transformamos experiências reais em imagens que duram.",
      nota: "Documentários, branded content, campanhas e narrativas digitais."
    },
    {
      verbo: "OUVIR",
      titulo: "Live Marketing<br>& Brand Experience",
      chamada: "Onde marca e público se encontram.",
      texto: "Eventos e festivais são as ferramentas mais poderosas para conectar marcas e pessoas. Produzimos experiências ao vivo onde a marca não só se manifesta — ela escuta. Atmosferas projetadas para compartilhar emoções, criar conversa e construir memória coletiva.",
      nota: "É a essência da YOUP desde o Dia D, em 2006."
    },
    {
      verbo: "SENTIR",
      titulo: "Tailor<br>Made",
      chamada: "Cada marca, um projeto único.",
      texto: "Cada desafio nasce de uma realidade própria — e cada projeto YOUP é construído a partir dela. Concebemos, planejamos e executamos soluções sob medida, do conceito estratégico à operação em campo. Sentimos o que sua marca precisa transmitir antes de qualquer entrega, e construímos a partir daí, com a profundidade de 26 anos em ações de alta complexidade.",
      nota: ""
    }
  ],

  // Atletas (página atletas.html). Para adicionar um atleta, copie um bloco.
  // Sem foto, deixe foto: "" e o card mostra "foto em breve".
  atletas: [
    {
      nome: "Pedro Caldas",
      pais: "Brasil",
      modalidade: "Wakeboard",
      bio: "Atleta brasileiro da Red Bull e um dos principais nomes do wakeboard, reconhecido pelo estilo criativo e por levar o esporte a cenários inusitados.",
      foto: "assets/atletas/SI202212070291_hires_jpeg_24bit_rgb.webp",
      pos: "48% 30%",
      alt: "Pedro Caldas sorri de capacete Red Bull, com a prancha de wakeboard debaixo do braço",
      instagram: "pedrowake"
    },
    {
      nome: "Aaron Colton",
      pais: "EUA",
      modalidade: "Street Freestyle",
      bio: "Piloto norte-americano da Red Bull e referência no street freestyle. Em 2026, veio ao Brasil para apresentações ao público de Goiânia e no MotoGP, além de uma ação nos Três Marcos.",
      foto: "assets/atletas/_DSC3378.webp",
      alt: "Retrato de Aaron Colton de boné Red Bull e óculos espelhados",
      instagram: "aaroncolton"
    },
    {
      nome: "Aras Gibieža",
      pais: "Lituânia",
      modalidade: "Stunt Riding",
      bio: "Piloto lituano da Red Bull, especialista em acrobacias com motocicletas. Em 2026, veio ao Brasil para um show em Goiânia no Red Bull Moto Parade, celebrando o retorno da MotoGP.",
      foto: "assets/atletas/SI202307310405.webp",
      pos: "44% 40%",
      alt: "Aras Gibieža de capacete Red Bull, com o público ao fundo",
      instagram: "aras_freestyle"
    },
    {
      nome: "Pedro Barros",
      pais: "Brasil",
      modalidade: "Skate Bowl e Park",
      bio: "Referência mundial no skate bowl e park, o brasileiro é atleta da Red Bull e medalhista de prata nos Jogos Olímpicos de Tóquio.",
      foto: "assets/atletas/SI202006100025.webp",
      pos: "44% 30%",
      alt: "Pedro Barros sorri de boné Red Bull contra o céu azul",
      instagram: "pedrobarrossk8"
    }
  ],

  // Marcos da empresa que não são cases (aparecem só na linha do tempo).
  marcos: [
    { ano: 2000, titulo: "Nasce a YOUP", destaques: ["Fundação da YOUP, que nasceu como uma agência digital, se especializando em esportes."] },
    { ano: 2003, titulo: "Marketing esportivo", destaques: ["A YOUP incorpora a produção de eventos e se transforma numa agência de marketing esportivo."] },
    { ano: 2007, titulo: "Associação à Reunion", destaques: ["Nos associamos à Reunion, uma das agências que mais tarde formou a [A CONFIRMAR: XYZ Live, empresa do Grupo ABC]."] },
    { ano: 2013, titulo: "Independência", destaques: ["Madura, a YOUP retoma a independência e se torna uma das principais agências especializadas em esportes de ação do país."] }
  ],

  // Projetos que fazem parte da história da YOUP, mas não são cases assinados pela agência
  // (aparecem só na linha do tempo, sem página de case). Fotos em assets/media/<slug>/.
  historia: [
    {
      slug: "x-fighters-2011",
      ano: 2011,
      nome: "Red Bull X-Fighters",
      logo: "assets/media/logos/x-fighters.png",
      destaques: ["Em frente à Esplanada dos Ministérios, Brasília", "Público recorde de cerca de 100 mil pessoas", "Transmissão ao vivo"],
      fotos: 3
    },
    {
      slug: "x-games-2008",
      ano: 2008,
      nome: "X Games Brasil",
      logo: "assets/media/logos/x-games.png",
      destaques: ["1ª edição internacional do X Games no Brasil", "Mais de 43 mil pessoas", "Transmissão ao vivo / ESPN"],
      fotos: 2
    }
  ],

  /*
   * Campos de cada case:
   *   slug, ano, nome, subtitulo, chamada, destaques (lista curta)
   *   meta: lista de [rótulo, valor] mostrada no topo do case (Cliente, Atleta, Local...)
   *   desafio, entrega (lista de parágrafos), resultado, citacao {texto, autor}
   *   texto: usado quando o case ainda não tem desafio/entrega/resultado
   *   fotos: quantidade de fotos em assets/media/<slug>/ (0 = "fotos em breve")
 *   periodo: opcional, para projetos com várias edições (ex.: "2015–2024"); "ano" continua valendo para a ordem
 *   pos: enquadramento da capa nos cartões (ex.: "left top"); sem ele, a foto fica centralizada
 *   destaque: true no case que aparece em destaque na página inicial
   */
  cases: [
    {
      slug: "wake-em-curitiba-2026",
      ano: 2026,
      nome: "Dá para andar de wake em Curitiba?",
      subtitulo: "Pedro Caldas",
      logo: "assets/media/logos/red-bull.png",
      chamada: "Wakeboard em Curitiba (PR).",
      destaques: [],
      meta: [["Cliente", "Red Bull"], ["Atleta", "Pedro Caldas"], ["Local", "Curitiba (PR)"], ["Ano", "2026"]],
      texto: "[A CONFIRMAR: texto completo do case]",
      fotos: 3,
      video: ""
    },
    {
      slug: "building-drop-2025",
      destaque: true,
      pos: "left top",
      ano: 2025,
      nome: "Red Bull Building Drop",
      subtitulo: "Sandro Dias",
      logo: "assets/media/logos/building-drop.png",
      chamada: "Sandro Dias quebra 2 recordes mundiais.",
      destaques: ["2 Guinness World Records™", "Drop-in de 70 m em quarter pipe temporário", "103,8 km/h de velocidade máxima"],
      meta: [["Cliente", "Red Bull"], ["Atleta", "Sandro “Mineirinho” Dias"], ["Local", "Porto Alegre (RS)"], ["Ano", "2025"]],
      desafio: "Transformar a fachada curva do Centro Administrativo Fernando Ferrari (CAFF) — prédio modernista de 22 andares e quase 89 metros de altura, em Porto Alegre — na maior rampa de skate do mundo. O CAFF era, há décadas, uma lenda urbana entre os skatistas brasileiros: um prédio com formato de quarter pipe natural que ninguém tinha coragem de descer. O objetivo: tirar essa lenda do imaginário e colocá-la nos Guinness World Records, com o hexacampeão mundial de vert Sandro Dias aos 50 anos.",
      entrega: [
        "Assumimos a produção executiva do Red Bull Building Drop, coordenando uma das operações mais complexas já realizadas no skate mundial: dois meses de montagem da estrutura temporária revestindo a fachada curva do CAFF com painéis de madeira compensada; instalação de airbags de impacto (o mesmo utilizado no MotoGP™) na base da rampa; articulação com o governo do Rio Grande do Sul, a Prefeitura de Porto Alegre e órgãos responsáveis; coordenação de equipes técnicas, de segurança e de filmagem para registrar as descidas progressivas (55 m, 60 m, 65 m e 70 m); e gestão do plano de desmontagem sustentável, com cerca de 115 toneladas de materiais reaproveitados — sucata metálica reciclada e aproximadamente 800 tábuas de madeira doadas a ONGs locais ou destinadas a biomassa."
      ],
      resultado: "Sandro Dias entrou para a história ao quebrar dois Guinness World Records™ simultaneamente: maior drop-in em quarter pipe temporário (70 metros de plataforma) e maior velocidade em quarter pipe temporário (103,8 km/h). A descida durou 8 segundos e submeteu o atleta a um pico de 3,9 G — equivalente a quase quatro vezes seu próprio peso. O projeto repercutiu na imprensa internacional, foi celebrado por nomes como Tony Hawk e Ryan Sheckler, e consolidou um marco que, segundo o próprio Hawk, “saltou cinco vezes além do que todos os outros já fizeram”.",
      citacao: { texto: "Esse sonho estava sendo planejado havia 13 anos. Não importa o quão longe seus sonhos possam parecer — nunca desista deles.", autor: "Sandro Dias" },
      fotos: 3,
      video: ""
    },
    {
      slug: "ferias-de-wake-2022",
      posHeroCel: "60% 50%",
      ano: 2022,
      nome: "De Férias com o Wake",
      subtitulo: "Pedro Caldas",
      logo: "assets/media/logos/ferias-de-wake.png",
      chamada: "Wakeboard pela primeira vez na “Veneza Marajoara”.",
      destaques: ["1º Double Front Roll da história no winch, fora de um cable park", "Afuá (PA), uma cidade 100% fluvial", "Produção Red Bull para o Brasil e o exterior"],
      meta: [["Cliente", "Red Bull"], ["Atleta", "Pedro Caldas"], ["Local", "Afuá (PA) — Ilha de Marajó"], ["Ano", "2022"]],
      desafio: "Levar uma produção audiovisual de wakeboard de alto nível para o coração da Amazônia — mais especificamente para Afuá, a “Veneza Marajoara”, uma cidade construída sobre palafitas onde não circulam carros e a logística obedece ao ritmo dos rios. O objetivo: registrar a tentativa de uma manobra inédita do atleta Pedro Caldas e transformar a cidade em palco de wakeboard pela primeira vez na história.",
      entrega: [
        "Assumimos a produção executiva do projeto Pedro Caldas: De Férias com o Wake, coordenando toda a operação em campo: logística de equipe e equipamentos em uma cidade 100% fluvial, montagem de rampa sobre o rio, operação de um winch elétrico (silencioso, para preservar a rotina local), articulação com a Prefeitura de Afuá e a Secretaria Municipal de Turismo, Esporte, Lazer e Cultura, além do suporte completo às filmagens nos igarapés do bairro Capim-Marinho e nos rios que cercam a cidade."
      ],
      resultado: "Pedro Caldas executou, próximo à Muralha — árvore de cerca de 60 metros que é cartão-postal de Afuá —, o primeiro Double Front Roll da história realizado no winch, fora de um cable park. Um marco para o wakeboard mundial, registrado em uma produção Red Bull que projetou Afuá e a cultura ribeirinha amazônica para audiências do Brasil e do exterior.",
      citacao: { texto: "Foi ótimo estar ali e levar meu esporte para aquelas pessoas. Fiquei orgulhoso da beleza do meu País, da minha terra.", autor: "Pedro Caldas" },
      fotos: 3,
      video: ""
    },
    {
      slug: "sonhos-concretos-2020",
      ano: 2020,
      nome: "Sonhos Concretos",
      subtitulo: "O Skate Encontra Niemeyer",
      logo: "assets/media/logos/sonhos-concretos.png",
      logoClaro: true,
      chamada: "O skate encontra Niemeyer.",
      destaques: ["Documentário na Red Bull TV (10/06/2020)", "8 meses de operação em 4 estados", "Projeção a 52 m de altura em plena pandemia"],
      meta: [["Cliente", "Red Bull Brasil"], ["Atletas", "Pedro Barros e Murilo Peres"], ["Locações", "DF, RJ, SP e MG"], ["Ano", "2020"]],
      desafio: "Produzir um documentário inédito que homenageasse Oscar Niemeyer ao unir duas linguagens brasileiras de projeção mundial — a arquitetura modernista do mestre e o skate de alto nível — colocando dois dos maiores skatistas do Brasil, Pedro Barros e Murilo Peres, para andar sobre as curvas de concreto de obras icônicas como o Congresso Nacional, a Casa das Canoas, o MAC Niterói, a Oca do Ibirapuera e o Auditório JK em Belo Horizonte. Acessar esses patrimônios, com autorização para uso esportivo, era a peça-chave do projeto.",
      entrega: [
        "Assumimos a produção executiva de campo do documentário, com 8 meses de operação cruzando quatro estados brasileiros. Articulamos a parceria estratégica com a Fundação Oscar Niemeyer — viabilizando as autorizações para cada locação — e coordenamos toda a logística dos atletas (esfera Sports): deslocamentos, hospedagens, agenda de filmagens, suporte técnico e operacional em cada obra visitada, em diálogo com os órgãos responsáveis por patrimônios públicos e privados de altíssima sensibilidade.",
        "Para o lançamento — realizado em junho de 2020, em plena pandemia — produzimos a ativação outdoor concebida pela agência DPZ&T: uma projeção especial a céu aberto na empena do Shopping Pátio Paulista, em São Paulo, ao lado do retrato de Niemeyer grafitado por Eduardo Kobra. A 52 metros de altura, o screening permitiu que moradores dos prédios da região acompanhassem o conteúdo em pleno isolamento social, respeitando todas as restrições sanitárias do período."
      ],
      resultado: "Sonhos Concretos: O Skate Encontra Niemeyer, com direção de Hugo Haddad, estreou na Red Bull TV em 10 de junho de 2020 e teve ampla repercussão na imprensa de cultura, esporte e publicidade — sendo reconhecido como um dos cases mais criativos de branded content do ano. O projeto consolidou a parceria histórica entre a Red Bull e o universo do skate brasileiro, e prestou tributo ao legado de um dos maiores arquitetos da era moderna por uma via inédita: transformando seus monumentos em pistas de uma sessão de skate única na história.",
      citacao: { texto: "Esses lugares eram imagináveis para o skate só nos sonhos mais profundos. Viver isso tudo é mágico. Poder reinterpretar as obras de Niemeyer com o skate é memorável.", autor: "Pedro Barros" },
      fotos: 3,
      video: ""
    },
    {
      slug: "conquista-da-estaiada-2017",
      ano: 2017,
      nome: "A Conquista da Ponte Estaiada",
      subtitulo: "Felipe Camargo",
      logo: "assets/media/logos/red-bull-media-house.png",
      logoSombra: true,
      chamada: "138 metros em uma única cordada.",
      destaques: ["138 m de escalada em uma única cordada", "Corda especial de 200 m, feita sob medida", "Abertura da 11ª Virada Esportiva de São Paulo"],
      meta: [["Cliente", "Red Bull"], ["Atleta", "Felipe Camargo"], ["Local", "Ponte Octávio Frias de Oliveira — São Paulo (SP)"], ["Ano", "2017"], ["Parceria institucional", "Prefeitura de São Paulo (abertura da 11ª Virada Esportiva)"]],
      desafio: "Levar o escalador Felipe Camargo, um dos maiores nomes da escalada brasileira, ao topo de um dos cartões-postais mais icônicos de São Paulo — a Ponte Estaiada — para hastear a bandeira de abertura da Virada Esportiva da cidade. No vocabulário da escalada, “conquistar” é o termo usado para descrever a leitura de uma parede em busca dos pontos de apoio que levam ao topo. O objetivo aqui era exatamente esse: transformar uma estrutura urbana de 140 metros de altura — equivalente a um prédio de 46 andares — em uma via de escalada inédita, no coração da capital.",
      entrega: [
        "Assumimos a produção executiva da operação, articulando a parceria entre Red Bull e Prefeitura de São Paulo para integrar a escalada à abertura oficial da 11ª Virada Esportiva. Coordenamos toda a logística técnica e de segurança da ação na coluna central da ponte, pela face leste da estrutura: liberação da via para o atleta, equipe de apoio em solo e em altura, equipamentos de filmagem e transmissão, e o planejamento operacional para o início da escalada às 6h45 da manhã, garantindo visibilidade pública da calçada e dos prédios vizinhos.",
        "A escalada exigiu uma solução técnica inédita: cordas convencionais têm no máximo 80 metros, o que tornaria impossível subir os 138 metros da ponte em uma única “cordada”. Operacionalizamos a fabricação de uma corda especial de 200 metros sob medida — peça que, no topo da subida, somava cerca de 20 kg sobre o atleta, transformando a cordada única em um feito técnico de altíssima complexidade."
      ],
      resultado: "Felipe Camargo conquistou a Ponte Estaiada em uma única cordada de 138 metros e hasteou a bandeira no topo, abrindo oficialmente a 11ª Virada Esportiva de São Paulo. A ação rendeu ampla cobertura na imprensa esportiva e de comportamento, projetou a escalada brasileira para um público de massa e consolidou um marco simbólico: a fusão entre um esporte de natureza e um dos ícones arquitetônicos da maior metrópole do país.",
      citacao: { texto: "Geralmente não se escala grandes paredes em uma só cordada — nem existe corda longa o suficiente para isso. Tive que mandar fazer uma corda especial, de 200 metros. Como a Ponte Estaiada é um cartão-postal impressionante da cidade, isto se torna ainda mais espetacular.", autor: "Felipe Camargo" },
      fotos: 1,
      video: ""
    },
    {
      slug: "skate-run-2015",
      ano: 2015,
      periodo: "2015–2024",
      nome: "Skate Run São Paulo",
      subtitulo: "Projeto proprietário",
      logo: "assets/media/logos/skate-run.png",
      chamada: "A maior corrida de skate do mundo!",
      destaques: ["Percurso de 8 km pelas ruas", "8 mil participantes na edição de 2015", "Competição freeride", "Para todas as idades, sexos e categorias"],
      meta: [["Cliente", "YOUP (projeto proprietário)"], ["Local", "São Paulo (SP)"], ["Período", "2015–2024"], ["Última edição", "2024"]],
      texto: "Um evento único, uma incrível corrida de skate pelas principais ruas do Brasil. Competição “Freeride”, onde o objetivo é se divertir e, claro, tentar fazer o menor tempo possível do percurso de 8 km. Democrático, um evento para todas as idades, sexo e categorias!",
      fotos: 3,
      video: ""
    },
    {
      slug: "vert-evolution-2013",
      ano: 2013,
      nome: "Red Bull Vert Evolution",
      subtitulo: "Estação da Luz",
      logo: "assets/media/logos/vert-evolution.png",
      chamada: "Uma nova era para o skate vertical.",
      destaques: ["11.000 espectadores na Praça da Luz", "Transmissão ao vivo para mais de 165 países", "12 atletas convidados"],
      meta: [["Cliente", "Red Bull"], ["Local", "Praça da Luz, em frente à Estação da Luz — São Paulo (SP)"], ["Ano", "2013"], ["Chancela técnica", "Confederação Brasileira de Skate (CBSk)"]],
      desafio: "Reinventar a competição de skate vertical em um evento único, capaz de unir os maiores nomes do esporte no mundo e, ao mesmo tempo, renovar a linguagem do formato — do julgamento à experiência do público — em um cenário urbano emblemático de São Paulo. O objetivo: marcar uma nova era para o skate vertical mundial.",
      entrega: [
        "Assumimos a produção executiva do Red Bull Vert Evolution, da concepção à execução: viabilização do uso da Praça da Luz em parceria com o poder público municipal, montagem da rampa vertical em pleno coração de São Paulo, coordenação dos 12 atletas convidados — entre eles o hexacampeão mundial Sandro Dias, Pedro Barros, o canadense Pierre-Luc Gagnon e o norte-americano Mitchie Brusco, além dos oito primeiros colocados do ranking brasileiro de Skate Vertical —, articulação com a Confederação Brasileira de Skate para a chancela técnica do evento, e estruturação completa da operação de transmissão ao vivo internacional.",
        "Como diferencial, foi implementado um formato de julgamento totalmente inovador, baseado em quatro critérios independentes: técnica (dificuldade das manobras), variedade (diversidade de manobras dentro de uma mesma volta), altura e extensão (amplitude) e execução (perfeição técnica) — modelo que redesenhou a forma de avaliar uma volta de skate vertical."
      ],
      resultado: "O evento reuniu 11.000 espectadores presenciais na Praça da Luz e teve transmissão ao vivo para mais de 165 países, levando o skate vertical brasileiro para uma audiência verdadeiramente global. Realizado no feriado da Proclamação da República, o Red Bull Vert Evolution consolidou-se como um marco do esporte no país e estabeleceu um novo padrão de produção e formato para competições da modalidade.",
      fotos: 3,
      video: ""
    },
    {
      slug: "dia-d-2006",
      ano: 2006,
      nome: "Dia D",
      subtitulo: "Skate, Música e Diversão",
      logo: "assets/media/logos/dia-d.png",
      chamada: "Skate, música e diversão!",
      destaques: ["3 edições", "70 mil pessoas nas três edições", "Transmissão ao vivo / SporTV"],
      meta: [["Criação", "Sandro Dias e Chorão (Charlie Brown Jr.)"], ["Edições", "3"], ["Ano", "2006"]],
      texto: "Sandro Dias e Chorão, com o Charlie Brown Jr., criaram a perfeita harmonia entre o skate e a música, possibilitando uma atmosfera única de muita diversão!",
      fotos: 5,
      video: ""
    },
    {
      slug: "jump-festival",
      ano: null,
      nome: "Jump Festival",
      subtitulo: "Skate, BMX e Freestyle Motocross",
      logo: "",
      chamada: "O maior evento de esportes de ação do Brasil.",
      destaques: ["10 edições", "4.000 competidores", "100.000 espectadores", "Transmissão ao vivo Globo / Esporte Espetacular"],
      meta: [["Modalidades", "Skate, BMX e Freestyle Motocross"], ["Edições", "10"], ["Ano", "[A CONFIRMAR]"]],
      texto: "O encontro das tribos do skate, BMX e freestyle motocross, no maior evento de esportes de ação do Brasil.",
      fotos: 1,
      video: ""
    },
    {
      slug: "brewhood-live-outdoors",
      ano: null,
      nome: "Brewhood Live Outdoors",
      subtitulo: "Lançamento Brewranch",
      logo: "",
      chamada: "Evento de lançamento do Brewranch.",
      destaques: ["Evento de lançamento do Brewranch", "Lançamento oficial da cerveja", "Vídeo promocional Brewranch"],
      meta: [["Projeto", "Lançamento oficial da cerveja Brewranch"], ["Ano", "[A CONFIRMAR]"]],
      texto: "Evento de lançamento e vídeo promocional da cerveja Brewranch. [A CONFIRMAR: texto completo do case]",
      fotos: 1,
      video: ""
    }
  ]
};

YOUP.fotosDo = function (c) {
  var out = [];
  for (var i = 1; i <= c.fotos; i++) out.push("assets/media/" + c.slug + "/" + (i < 10 ? "0" : "") + i + ".jpg");
  return out;
};
YOUP.capa = function (c) { return YOUP.fotosDo(c)[0] || ""; };
YOUP.destaque = function () {
  return YOUP.cases.filter(function (c) { return c.destaque; })[0] || YOUP.cases[0];
};
