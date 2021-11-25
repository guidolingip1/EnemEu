import express from "express";
import {v4 as uuidv4} from 'uuid';

const router = express.Router();

let data = []

const conteudos = [
  {
    cadeira: "Português",
    conteudo: [
      "Funções de linguagem e gramática",
      "Semântica",
      "Compreensão e interpretação de texto",
      "Norma culta e coloquial",
      "Morfologia",
      "Linguística",
      "Sintaxe",
      "Gêneros textuais."
    ]
  },
  {
    cadeira: "Literatura",
    conteudo: [
      "Movimentos literários: barroco, quinhentismo, modernismo, naturalismo e realismo;",
      "Obras literárias: principalmente clássicos brasileiros;",
      "Figuras de linguagem;",
      "Poesias Concretas;",
      "E por fim, Literatura Contemporânea"
    ]
  },
  {
    cadeira: "Fil e socio",
    conteudo: [
      "Globalização e suas consequências;",
      "Iluminismo;",
      "Existencialismo;",
      "Marxismo;",
      "Contratualismo;",
      "Relações de Trabalho;",
      "Cultura de massa;",
      "Movimentos sociais;",
      "Fé e Razão: São Tomás e Santo Agostinho;",
      "Pensadores da Grécia Antiga."
    ]
  },
  {
    cadeira: "Geografia",
    conteudo: [
      'Agricultura Brasileira;',
      'Impactos no meio ambiente;',
      'Planos e blocos econômicos;',
      'Geopolítica mundial;',
      'Migrações;',
      'Desenvolvimento humano e social'
    ]
  },
  {
    cadeira: "História",
    conteudo: [
      "Período Colonial;",
      "República;",
      "Período de escravidão;",
      "Era Vargas;",
      "Ditadura Militar;",
      "Era populista.",
      "Período de Idade Média e Moderna;",
      "Revolução industrial;",
      "Primeira e Segunda Guerra Mundial;",
      "Nazismo/Holocausto e Fascismo;",
      "Liberalismo;",
      "Guerra Fria."
    ]
  },
  {
    cadeira: "Matemática",
    conteudo: [
      "Porcentagem;",
      "Razões e proporções;",
      "Leitura e interpretação de gráficos;",
      "Medidas para dados simples;",
      "Prismas;",
      "Regra de três."
    ]
  },
  {
    cadeira: "Biologia",
    conteudo: [
      "Ecologia e Sustentabilidade, bem como problemas ambientais;",
      "Evolução;",
      "Imunização;",
      "Genética e mutações;",
      "Citologia;",
      "Ciclos de carbono, nitrogênio e água."
    ]
  },
  {
    cadeira: "Química",
    conteudo: [
      "Unidades de concentração;",
      "Estequiometria;",
      "pH e pOH;",
      "Cadeias Carbônicas;",
      "Radioatividade;",
      "Soluções;",
      "Oxidações;",
      "Eletroquímica"
    ]
  },
  {
    cadeira: "Física",
    conteudo: [
      "Eletricidade;",
      "Hidrostática;",
      "Ondas;",
      "Óptica;",
      "Usinas / instalações residenciais;",
      "Calorimetria;",
      "Acústica;",
      "Mecânica."
    ]
  },
]

//todas as rotas daqui começam com /data
//Get => Lista datas
router.get('/', (req, res) => {
  res.json(data);
});

//post => cria dados
router.post('/', (req, res) => {
  const newData = req.body;

  const dataId = uuidv4();
  const dataObj = {...newData, id: dataId};

  data.push(dataObj);
  res.send(`A cadeira ${newData.cadeira} e o assunto ${newData.assunto} foi adicionada a lista`)
});

//like
router.put('/like/:id', (req, res) => {
  const { id } = req.params;
  let objeto = data.find(item => item.id === id);
  objeto.quantidade+=1;
  res.json(objeto);
  console.log(objeto);
});

//deslike
router.put('/dislike/:id', (req, res) => {
  const { id } = req.params;
  let objeto = data.find(item => item.id === id);
  if(objeto.quantidade >= 1) {
    objeto.quantidade-=1;
  }
  res.json(objeto);
  console.log(objeto);
});

//Sortear
router.get('/sortear', (req, res) => {
  //sorteia uma cadeira
  const randCadeira = conteudos[Math.floor(Math.random() * conteudos.length)];

  //determina que newArray seja igual aos conteúdos
  let newArray = randCadeira.conteudo;

  //sorteia um conteúdo
  const randConteudo = newArray[Math.floor(Math.random() * newArray.length)];

  let sorteado = {
    conteudo: randCadeira.cadeira,
    materia: randConteudo
  }
  
  let value = data.findIndex(x => x.conteudo == randCadeira.cadeira && x.materia == randConteudo);
  
  if(value == -1) {
    let id =  uuidv4();
    data.push({
      ...sorteado,
      quantidade: 1,
      id
    });
  }else {
    data[value].quantidade += 1;
  }

  res.json(sorteado);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  data = data.filter((item) => item.id != id);

  res.send(`Usuário com o id ${id} foi deletado!`);
});


export default router;