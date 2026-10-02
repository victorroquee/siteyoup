# Site YOUP

Site estático, sem build e sem dependência. Abre direto, mas **precisa de
servidor** para os vídeos do YouTube funcionarem (o `file://` faz o YouTube
devolver "Erro 153").

```
cd ~/Desktop/youpreview.netlify.app
node servidor.js
# abre http://127.0.0.1:8787
```

O `servidor.js` existe por um motivo só: o `python3 -m http.server` não
responde a pedido de faixa (Range), e sem isso o vídeo da órbita não pode ser
arrastado pelo scroll, fica parado no primeiro quadro. Na Netlify funciona
sozinho.

Repositório: https://github.com/victorroquee/siteyoup

---

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

**Vídeo da órbita.** `assets/media/marca/orbita.mp4`, 24 fps, gerado a partir
do `youp-orbita-2x.mp4` do motion-studio. Ele não fica em loop solto: o avanço
da seção presa na tela vira o tempo do vídeo, igual às palavras que acendem,
e subir de volta roda ao contrário. Por isso o arquivo é gravado com chave a
cada quatro quadros (`-g 4`), que é o que aguenta ser arrastado sem travar, e
por isso ele precisa de servidor que responda Range. Três cuidados na hora de
trocar o arquivo: o fundo precisa ser exatamente o `--vinho` da página
(senão aparece um retângulo no meio da seção) e o arquivo precisa ser gravado
em faixa de cor limitada (`-color_range tv`, com os flags bt709). Em faixa
cheia o Chrome escurece tudo e o retângulo volta. O comando que gerou o atual
levanta o preto do arquivo até o vinho da página com `blend=all_mode=lighten`
em RGB, nunca em YUV, que torce as cores. E o vídeo cresce um pouco além da
coluna (`scale(1.12)`), menos no celular, onde o scale empurrava a página para
o lado.

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
