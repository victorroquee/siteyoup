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
`u986403640`, host `77.37.127.95`, porta 65002). O site mora numa pasta só
dele dentro do domínio, ao lado de outros projetos que já estavam lá, então
subir de novo não encosta em nada do vizinho.

```
cd ~/Desktop/youpreview.netlify.app
umask 077; printf '%s' '<senha>' > /tmp/.youppw
sshpass -f /tmp/.youppw rsync -az --delete \
  --exclude .git --exclude .gitignore --exclude LEIA-ME.md \
  --exclude servidor.js --exclude .DS_Store \
  -e "ssh -p 65002 -o NumberOfPasswordPrompts=1 -o PubkeyAuthentication=no -o PreferredAuthentications=password" \
  ./ u986403640@77.37.127.95:domains/testarea.loopconsult.com.br/public_html/youp/
```

Dois detalhes que fazem falta se forem esquecidos. O `--delete` existe para
arquivo apagado aqui sumir de lá também, e por isso o `.htaccess` do site
precisa estar no repositório, senão a próxima subida o apaga. E o Apache da
Hostinger não conhece `.webm`: sem o `AddType video/webm` do `.htaccess` ele
entrega o vídeo da órbita como `text/plain` e o navegador recusa a fonte.

A senha do SSH tem `@!` no fim, o que quebra o `sshpass -e`. Por isso o
arquivo com `-f`, e por isso os `-o` vêm na linha: sem eles o cliente tenta
chave pública primeiro e leva Permission denied.

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

**Hero no celular.** A descrição do case (o "2020 · Sonhos Concretos" e a
linha abaixo dele) sai da tela, e a régua de slides encolhe de 28 para 16 px
por traço. No celular o título já ocupa a cena inteira e esses dois elementos
cobriam o meio da foto. No desktop continuam os dois.

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

**Vídeo da órbita.** Três arquivos em `assets/media/marca/`, todos 24 fps e
11 segundos, em loop solto, sem depender de rolagem:

| Arquivo | Para quem | Tamanho |
|---|---|---|
| `orbita.webm` | padrão, 1204 px, fundo transparente | 1,8 MB |
| `orbita-cel.webm` | tela até 860 px, 740 px de largura | 0,7 MB |
| `orbita.mp4` | reserva para quem não lê alfa em webm (Safari) | 1,1 MB |

O webm vem primeiro porque tem fundo transparente de verdade: é ele que faz a
órbita parecer desenhada na página e não colada num quadro. O `orbita()` no
`main.js` troca pelo arquivo de celular quando a tela é pequena, onde a cena
tem menos da metade da largura e o download pesa mais.

Os três saem cortados no conteúdo (`crop=1204:1120:188:94` sobre o render de
1480). O arquivo cru tinha 12,8% de sobra à esquerda contra 6,1% à direita, o
que deixava a cena maior do que precisava e visivelmente torta para a
esquerda. Cortado, ele fica centrado e a mesma caixa mostra a órbita 23%
maior.

O tamanho na tela é 595 px no desktop (coluna `.88fr` da grade) e 94% da
coluna no celular, o que dá 329 px numa tela de 390. Os arquivos têm cerca do dobro disso porque em
tela retina o vídeo na medida exata fica mole.

**Como gerar de novo.** A fonte é o `motion-studio` em `~/Downloads`, e o
tamanho sai do próprio render, não de ampliação depois:

```
cd ~/Downloads/motion-studio
node render.mjs --fps 24 --dur 11 --sub 4 --w 1480 --h 1336 --alpha \
  --out out/youp-orbita-alta-alpha.webm
```

Desse arquivo saem os três: o `orbita.webm` é ele reencodado em `crf 33`, o
`orbita-cel.webm` é a mesma coisa em 740 px, e o `orbita.mp4` é ele achatado
sobre o `--vinho` da página com `overlay`. O mp4 precisa do fundo exatamente
no `--vinho` (senão aparece um retângulo no meio da seção) e precisa de faixa
de cor limitada (`-color_range tv`, flags bt709), pois em faixa cheia o Chrome
escurece tudo e o retângulo volta. O webm sai com
`libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0`, que é o que preserva o alfa.

Com o vídeo tocando, o logotipo de reserva que fica atrás sai de cena
(`.orbita.is-vivo`): o webm é transparente e deixaria o logo aparecer por trás
das marcas. Quem não conseguir tocar vídeo continua vendo o logotipo.

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
