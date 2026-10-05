# Site YOUP

Site estático, sem build e sem dependência. Abre direto, mas **precisa de
servidor** para os vídeos do YouTube funcionarem (o `file://` faz o YouTube
devolver "Erro 153").

```
cd ~/Desktop/youpreview.netlify.app
node servidor.js
# abre http://127.0.0.1:8787
```

O `python3 -m http.server 8787` também serve, mas ele não responde a pedido de
faixa (Range), então vídeo nenhum pode ser adiantado no meio. O `servidor.js`
responde. Na Netlify isso funciona sozinho.

Repositório: https://github.com/victorroquee/siteyoup

---

## Onde está publicado

**https://testarea.loopconsult.com.br/youp/**, na Hostinger (conta
`u986403640`, host `77.37.127.95`, porta 65002). A pasta publicada é um clone
deste repositório, então publicar é dar `pull`:

```
ssh -p 65002 u986403640@77.37.127.95
cd ~/domains/testarea.loopconsult.com.br/public_html/youp && git pull
```

Em uma linha, de fora:

```
sshpass -f /tmp/.youppw ssh -p 65002 -o NumberOfPasswordPrompts=1 \
  -o PubkeyAuthentication=no -o PreferredAuthentications=password \
  u986403640@77.37.127.95 \
  'cd ~/domains/testarea.loopconsult.com.br/public_html/youp && git pull'
```

O site mora numa pasta só dele, ao lado de outros projetos que já estavam no
mesmo domínio, então publicar não encosta em nada do vizinho.

Três coisas que o `.htaccess` do repositório resolve e que quebram em silêncio
se ele sumir. O Apache da Hostinger não conhece `.webm` nem outros tipos de
mídia e entrega como `text/plain`, o que faz o navegador recusar a fonte. O
`.git` e o `LEIA-ME.md` ficam dentro da pasta publicada por causa do clone, e
as regras bloqueiam os dois. E o `Accept-Ranges` é o que deixa adiantar vídeo.

**Cache.** O CDN da Hostinger respeita o `Expires` do `.htaccess`, e com dois
dias de validade o site ficava remendado depois de publicar: metade dos
navegadores pegava a folha nova e metade a velha. Folha, script e HTML agora
valem zero segundo: o site ainda muda toda hora, e esquecer de subir o `?v=`
deixava metade dos navegadores com a versão velha. Os links de CSS e JS levam
`?v=AAAAMMDD` mesmo assim, como segunda tranca: ao mexer neles, subir esse
número em todas as páginas faz o cache antigo deixar de ter o que entregar.
Hoje está em `?v=20261004`.

A senha do SSH tem `@!` no fim, o que quebra o `sshpass -e`: usar arquivo com
`-f`, e os `-o` na linha, senão o cliente tenta chave pública primeiro e leva
Permission denied.

## Onde fica cada coisa

| Arquivo | O que é |
|---|---|
| `assets/js/data.js` | **Todo o conteúdo.** Cases, marcos da história, serviços, atletas, contato. É aqui que se mexe no texto. |
| `assets/js/main.js` | Comportamento. Uma IIFE só, sem framework. |
| `assets/css/style.css` | Tudo, menos a página de Atletas. |
| `assets/css/atletas.css` | Só a página de Atletas. |
| `assets/media/` | Fotos por case, logos, marca, prévias e vídeo da órbita. |

Páginas: `index`, `quem-somos`, `nossa-historia`, `cases`, `case` (recebe
`?c=slug`), `atletas`, `contato`, `privacidade`.

---

## Decisões que não são óbvias no código

**Escala de movimento.** Nenhuma animação inventa valor: tudo sai dos tokens
em `:root` (`--t-toque` .18s, `--t-estado` .4s, `--t-camada` .7s, `--t-cena`
1.2s, `--d-passo` .15s) e de duas curvas (`--ease`, `--ease-entrada`). Antes
eram 24 durações diferentes para 54 animações, e era isso que fazia o site
parecer solto.

**Escala de espaço.** `--e-1` a `--e-8` mais `--e-secao`, e `--ev-1` a
`--ev-5` para o vertical. Os verticais existem porque dentro de uma cena
presa na tela quem manda é a altura, não a largura.

**Paleta.** Cinco valores. `--roxo` #522e90 é a cor da marca (conferida
contra o logo do Instagram, bate exato) e só aparece onde se lê ou onde
responde ao toque. Para texto sobre o escuro existe `--roxo-luz` #8f6fd4,
porque o #522e90 puro dá 2:1 ali e não serve.

**Sem travessão em lugar nenhum**, sem fonte monoespaçada e sem
`letter-spacing`, com uma exceção: o `-.035em` do logotipo.

**Andaime de produção.** A função `pendencias()` esconde da tela qualquer
`[PREENCHER]` ou `[A CONFIRMAR]`, junto com o bloco e o rótulo que o
acompanham. O texto continua no arquivo: preencheu, volta a aparecer sozinho.

**Vídeo.** `playerDe()` é o único lugar que monta a URL do embed. Aceita
arquivo mp4 do próprio site ou ID de 11 caracteres do YouTube, e reconhece
qual é dos dois. Nada mais barra o vídeo: o aviso de cookies só informa, e o
embed já entra com `autoplay=1&mute=1`, que é a única forma de um navegador
deixar um vídeo começar sozinho.

**Hero do case com filme.** `fundoDoHero()` troca a foto parada pelo vídeo do
case quando ele existe. A capa continua por baixo como cartaz e o embed entra
por cima quando carrega, então nunca aparece retângulo preto. O embed não
recebe clique e leva um `scale(1.2)`, que joga para fora o título e a marca
que o YouTube desenha por cima do vídeo. Quem manda no som é o botão do canto,
que fala com o player por `postMessage` (daí o `enablejsapi=1`): ligar o som
sem recarregar, porque recarregar voltaria o filme para o começo. Com
`prefers-reduced-motion` o hero continua sendo a foto. O player de baixo, esse
sim com controle e tela cheia, deixou de tocar sozinho para os dois não
rodarem juntos.

**Case em destaque, centrado.** Os três selos (2 Guinness, 70 m, 103,8 km/h)
saíram a pedido. Sem eles sobrou uma coluna só de texto curto, e alinhada à
esquerda ela deixava a metade direita da foto vazia, com o conjunto parecendo
torto. O bloco passou a ser centrado, ancorado na base. Junto saiu o véu que
vinha da esquerda no `.feature::after`: ele existia para o texto se ler sobre
a fachada clara do prédio, e com o texto no meio só escurecia metade da foto
de graça. Ficou o véu de cima para baixo, com o escuro onde o texto cai. Os
números não se perderam: continuam nos `destaques` e no `selo` do case.

O logo precisa de `margin: 0 auto` explícito. No site `img` é `display: block`,
então `text-align: center` sozinho não o move.

**Ver, Ouvir, Sentir no celular.** O índice dos serviços deixa de ser três
links soltos e vira uma barra de etapas presa no topo, com a parte selecionada
acesa numa pílula roxa. Antes ele rolava para fora da tela antes de alguém ver
que havia uma seleção.

E a etapa é mesmo uma escolha: tocar nela deixa só o bloco dela na tela, VER
mostra Content & Digital e esconde os outros dois. Os três empilhados davam
uma rolagem longa em que a barra só acendia sozinha, sem nunca parecer que
alguém podia mandar nela. No desktop nada muda: os três continuam à vista e o
índice segue sendo atalho de rolagem.

A classe `servicos--abas` entra pelo JS, então sem ele os três continuam
visíveis. Um detalhe que custou caro: o bloco fechado não tem caixa na tela, e
o `reveal()` mede posição, então ele nunca ganhava o `is-in` e abria **em
branco**, com o `opacity: 0` de pé. Por isso `acende()` marca o bloco como
revelado na hora de abrir. Vale para qualquer coisa que nasça escondida.

**Abertura.** A tela de entrada mostra só o logotipo. A faixa roxa que corria
embaixo dele saiu a pedido.

**Hero de Atletas.** A etiqueta "YOUP × Red Bull · MotoGP 2026" e a frase "A
gente vive o esporte no grau máximo." saíram a pedido, e o título ficou filho
único do bloco. As margens que separavam os três (`.15em` em cima, `.2em`
embaixo) viraram um vão enorme na base, porque `.2em` de um corpo que chega a
23rem é quase 5rem de nada. Agora o título não tem margem vertical e o respiro
vem do `padding-bottom` do `.at-hero__content`. O `<title>` e as metatags de
compartilhamento continuam com os dois textos: eles não aparecem na tela e é
o que o buscador e o WhatsApp leem.

**Foto do hero no celular.** A foto do case é deitada e o hero do celular é
uma coluna em pé: cortando uma na outra, o navegador esticava 1700 px de
altura para os 2500 que uma tela de 3x pede, e a abertura chegava mole. Em
tela até 760 px entra o corte em pé pronto, em `assets/media/hero-cel/`, feito
do mesmo arquivo com `crop` + `scale=lanczos` + `unsharp` em 1240x2684. Se
faltar o corte de algum case, o `onerror` traz a foto original de volta.

Para refazer (quando mudar o case em destaque ou a ordem dos cases), o corte
sai de `assets/media/<slug>/01.jpg` com o mesmo enquadramento que o
`posHeroCel` do `data.js` define: a conta está no histórico do repositório, no
commit que criou a pasta.

**Hero sem descrição do case.** O canto do hero mostrava ano, nome, chamada e
um "Ver case" da foto que estava passando. Saiu inteiro, a pedido, nos dois
tamanhos. Ficou a foto, a frase da marca e a régua de slides, que no celular
encolhe de 28 para 16 px por traço. O caminho para os cases continua no menu
e na trilha logo abaixo.

**Hover do card.** Passar o mouse no card toca o filme do case, não mais só
a prévia. Os dois trabalham juntos: a prévia montada com as fotos
(`assets/media/previa/<slug>.mp4`) entra na hora, porque é arquivo do próprio
site, e cobre o segundo que o embed do YouTube leva para carregar; quando o
filme aparece, ele fica por cima. Da segunda passada em diante o embed já está
no card e volta na hora. No máximo três embeds ficam vivos ao mesmo tempo, que
é o que impede uma grade inteira de cases de virar dez players na memória. No
toque não há hover, então o celular não baixa nada disso.

**Filme em pé.** Case com `videoVertical: true` no `data.js` (hoje o Wake em
Curitiba, que é um Short) monta todos os quadros em 9:16, senão o player do
YouTube sobra tarja preta dos dois lados. No hero o filme fica numa coluna no
meio, a capa entra desfocada atrás como ambiente e as bordas do vídeo somem em
degradê, para não virar três retângulos colados.

**Selo de recorde.** O case que declara `selo` no `data.js` ganha a placa logo
abaixo de "O resultado". O logo oficial do Guinness é marca registrada e não
veio no kit da YOUP, então a placa usa o desenho de medalha do próprio site:
o que vale ali é o nome escrito e os dois recordes, não uma imitação do selo.

**Vídeo da órbita.** Dois arquivos em `assets/media/marca/`, os dois 24 fps e
11 segundos, em loop solto, sem depender de rolagem:

| Arquivo | Para quem | Tamanho |
|---|---|---|
| `orbita.mp4` | padrão, 1204 px | 1,8 MB |
| `orbita-cel.mp4` | tela até 860 px, 740 px de largura | 0,7 MB |

Já foi webm com fundo transparente, que é o que faria a órbita parecer
desenhada na página em vez de colada num quadro. Não deu: o Safari pintava o
alfa de preto e aparecia um retângulo no meio da seção. Os dois voltaram para
mp4 achatado sobre o `--vinho` da página, e quem resolve o encontro com o
fundo é o degradê da borda, explicado logo abaixo. O `orbita()` no `main.js`
troca pelo arquivo de celular quando a tela é pequena, onde a cena tem menos
da metade da largura e o download pesa mais.

Os três saem cortados no conteúdo (`crop=1204:1120:188:94` sobre o render de
1480). O arquivo cru tinha 12,8% de sobra à esquerda contra 6,1% à direita, o
que deixava a cena maior do que precisava e visivelmente torta para a
esquerda. Cortado, ele fica centrado e a mesma caixa mostra a órbita 23%
maior.

O tamanho na tela sai da coluna `1.12fr` da grade do manifesto, com um
`scale(.95)` por cima: numa tela de 1440 a caixa tem 671 px e a cena desenha
638 px. O scale já foi 1.12, e aí a órbita passava da coluna e ficava maior do
que a cena pedia; em .95 ela fica contida. Baixar muito mais é que é o risco:
o scale nasceu justamente para a órbita não virar um selo girando no canto. No
celular o transform é `none` e a cena ocupa 94% da coluna, o que dá 329 px numa
tela de 390. Os arquivos têm cerca do dobro disso porque em tela retina o
vídeo na medida exata fica mole.

**O retângulo mais escuro.** O fundo do arquivo é a cor exata da página, mas
cada navegador converte vídeo de um jeito: o Chrome pinta `#14091b` e o Safari
`#14071d`, contra o `#14091c` do CSS. Um ou dois níveis bastam para desenhar
um retângulo numa área chapada, e não existe cor de fundo que acerte os dois
ao mesmo tempo. Por isso a borda do vídeo sai em degradê (`mask-image` nos
dois eixos, 6,5% de cada lado): o encontro com a página acontece em alfa zero,
e aí não há diferença para aparecer. O corte do arquivo deixa justamente essa
margem vazia em volta das marcas, então o degradê não come nada do desenho.

**Como gerar de novo.** A fonte é o `motion-studio` em `~/Downloads`, e o
tamanho sai do próprio render, não de ampliação depois:

```
cd ~/Downloads/motion-studio
node render.mjs --fps 24 --dur 11 --sub 4 --w 1480 --h 1336 --alpha \
  --out out/youp-orbita-alta-alpha.webm
```

Desse arquivo saem os dois: o `orbita.mp4` é ele achatado sobre o `--vinho`
da página com `overlay`, e o `orbita-cel.mp4` é a mesma coisa em 740 px. O
fundo precisa ser exatamente o `--vinho` (senão aparece um retângulo no meio
da seção) e a faixa de cor precisa ser limitada (`-color_range tv`, flags
bt709), pois em faixa cheia o Chrome escurece tudo e o retângulo volta.

Com o vídeo tocando, o logotipo de reserva que fica atrás sai de cena
(`.orbita.is-vivo`). Quem não conseguir tocar vídeo continua vendo o logotipo.

**Faixa em duotone.** As seis fotos de bastidores vêm de eventos diferentes,
cada uma com uma luz. O preto e branco apaga a cor de origem e o roxo entra
por cima no modo `multiply`, que leva o escuro para o preto e o claro para o
roxo: duas cores, nenhuma briga. No hover a foto sai um pouco do roxo. As
fotos ficam coladas, sem respiro entre elas.

---

## Pendências

**1. Oito campos de texto em branco em `atletas.html`**, linhas 134 a 150: os
quatro títulos e os quatro parágrafos da seção "O que a Youp entregou". A
seção inteira está escondida até alguém escrever. Não inventei porque é
afirmação factual sobre o que a agência entregou na MotoGP.

**2. Dois cases sem vídeo**: X Games 2008 e Dia D 2006. Não existe material
oficial no YouTube. Vale pedir o link para a Red Bull ou para a produtora.

**3. Vídeo de exemplo em dois tópicos de "Do briefing ao impossível".**
"Content & Digital" está com o filme do De Férias com o Wake e "Tailor Made"
com o da Conquista da Estaiada. São cases do próprio assunto, mas não são o
material do tópico: trocar quando a YOUP mandar os reels. Falta também o fundo
do hero da home (`heroVideo` no `data.js`, pasta `assets/media/hero/` criada).

**4. Logo em alta.** O máximo que existe em acesso público é a imagem de 150
pixels do Instagram. O vetor tem que vir do kit de marca.

**5. Divergência na fonte.** O youp.com.br diz "Dia D, em 2000" na nota de
Live Marketing e "Dia D criado em 2006" na linha do tempo, na mesma página.
Aqui está 2006, que é o que bate com a cronologia. Vale confirmar.

---

## Como verificar antes de publicar

Com o servidor no ar, os scripts de verificação ficam em
`/private/tmp/claude-501/-Users-victorroque/<sessão>/scratchpad/`. O que
importa checar: nenhum `[PREENCHER]` visível, nenhum overflow horizontal em
1440, 768 e 390, e nenhum erro de console. Tudo isso estava limpo na última verificação, nas três larguras e em
todas as páginas.
