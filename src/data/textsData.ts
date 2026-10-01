import { TextQuestion } from '../types';

export const TEXTS_DATA: TextQuestion[] = [
  {
    id: 'txt-1',
    genre: 'CONVITE',
    genreName: 'Convite de Aniversário',
    title: 'Festa do Lucca!',
    content: [
      'Venha comemorar comigo meus 7 anos!',
      'Vai ter muita brincadeira, pipoca e bolo de chocolate!',
      'Data: 15 de Outubro (Sábado)',
      'Horário: Às 15 horas',
      'Local: Salão de Festas Encantado'
    ],
    senderOrAuthor: 'Seu amigo, Lucca',
    dateOrPlace: 'Rua das Flores, 120',
    question: 'Para que serve este texto?',
    options: [
      { id: 'a', text: 'Convidar para uma festa de aniversário', isCorrect: true },
      { id: 'b', text: 'Ensinar a fazer um bolo de chocolate', isCorrect: false },
      { id: 'c', text: 'Vender brinquedos e pipoca', isCorrect: false },
      { id: 'd', text: 'Contar uma história de fantasia', isCorrect: false }
    ],
    explanation: 'Este texto é um convite! Ele serve para convidar pessoas queridas para uma festa de aniversário, informando o dia, a hora e o local.',
    visualTheme: 'invite',
    icon: '🎈'
  },
  {
    id: 'txt-2',
    genre: 'RECEITA',
    genreName: 'Receita Culinária',
    title: 'Brigadeiro Divertido de Colher',
    content: [
      'Ingredientes:',
      '• 1 lata de leite condensado',
      '• 3 colheres de chocolate em pó',
      '• 1 colher de manteiga',
      '',
      'Modo de Fazer:',
      '1. Misture tudo na panela com a ajuda de um adulto.',
      '2. Mexa em fogo baixo até desgrudar do fundo.',
      '3. Deixe esfriar e saboreie com colher!'
    ],
    senderOrAuthor: 'Caderno de Receitas da Vovó',
    question: 'Qual é o principal objetivo deste texto?',
    options: [
      { id: 'a', text: 'Ensinar o passo a passo para fazer um doce', isCorrect: true },
      { id: 'b', text: 'Contar uma piada engraçada sobre chocolate', isCorrect: false },
      { id: 'c', text: 'Avisar que a aula de culinária acabou', isCorrect: false },
      { id: 'd', text: 'Convidar a turma para ir ao mercado', isCorrect: false }
    ],
    explanation: 'Este texto é uma receita culinária! Sua função principal é ensinar a preparar um alimento, mostrando os ingredientes e o modo de fazer.',
    visualTheme: 'recipe',
    icon: '🥣'
  },
  {
    id: 'txt-3',
    genre: 'BILHETE',
    genreName: 'Bilhete Familiar',
    title: 'Recado na Geladeira',
    content: [
      'Mariana,',
      '',
      'Fui até a padaria comprar pão fresco para o lanche da tarde.',
      'Coma a maçã lavada que deixei na fruteira.',
      'Volto em 15 minutinhos!'
    ],
    senderOrAuthor: 'Beijos, Mamãe',
    dateOrPlace: 'Segunda-feira, às 16h',
    question: 'Este texto foi escrito para:',
    options: [
      { id: 'a', text: 'Deixar um recado rápido para a filha', isCorrect: true },
      { id: 'b', text: 'Ensinar a plantar árvores de maçã', isCorrect: false },
      { id: 'c', text: 'Divulgar os preços da padaria', isCorrect: false },
      { id: 'd', text: 'Fazer uma lista de materiais escolares', isCorrect: false }
    ],
    explanation: 'Este texto é um bilhete! É uma mensagem curta e carinhosa usada no dia a dia para dar um recado ou aviso para alguém.',
    visualTheme: 'note',
    icon: '📝'
  },
  {
    id: 'txt-4',
    genre: 'CARTAZ',
    genreName: 'Cartaz de Campanha Pública',
    title: 'CAMPANHA DE VACINAÇÃO INFANTIL',
    content: [
      'Cuidar da saúde é um ato de carinho!',
      'Traga a sua carteirinha de vacinação.',
      'Proteja seu filho contra a gripe e o sarampo.',
      'Dias 20 e 21 de Novembro em todos os Postos de Saúde.',
      'Vacinar é proteger quem a gente ama!'
    ],
    senderOrAuthor: 'Ministério da Saúde e Prefeitura',
    dateOrPlace: 'Posto de Saúde Central',
    question: 'A finalidade deste cartaz é:',
    options: [
      { id: 'a', text: 'Conscientizar e informar as famílias sobre a vacinação', isCorrect: true },
      { id: 'b', text: 'Contar a história de um médico corajoso', isCorrect: false },
      { id: 'c', text: 'Vender remédios para dor de cabeça', isCorrect: false },
      { id: 'd', text: 'Dar os parabéns para as crianças que estudam', isCorrect: false }
    ],
    explanation: 'Os cartazes de campanha servem para conscientizar o público e informar a população sobre datas e cuidados de saúde importantes.',
    visualTheme: 'poster',
    icon: '📢'
  },
  {
    id: 'txt-5',
    genre: 'PIADA',
    genreName: 'Piadinha Infantil',
    title: 'Conversa no Mar',
    content: [
      'Dois peixinhos estavam nadando calmamente.',
      'De repente, um deles esbarra no outro e pergunta:',
      '— Ei, você sabe o que o peixe faz no dia do aniversário dele?',
      'O outro peixinho responde surpreso:',
      '— Não sei, o que ele faz?',
      '— Nada!'
    ],
    senderOrAuthor: 'Revista Recreio das Crianças',
    question: 'Qual é a função deste texto?',
    options: [
      { id: 'a', text: 'Divertir e fazer o leitor dar risada', isCorrect: true },
      { id: 'b', text: 'Ensinar como criar peixinhos no aquário', isCorrect: false },
      { id: 'c', text: 'Avisar que o mar está com ondas perigosas', isCorrect: false },
      { id: 'd', text: 'Fazer uma lista de animais aquáticos', isCorrect: false }
    ],
    explanation: 'Este texto é uma piada (ou anedota)! Seu objetivo é o entretenimento, criando humor e fazendo as crianças darem risadas.',
    visualTheme: 'joke',
    icon: '😄'
  },
  {
    id: 'txt-6',
    genre: 'LISTA',
    genreName: 'Lista de Compras da Feira',
    title: 'Compras de Sábado',
    content: [
      '1. Bananas maduras (1 dúzia)',
      '2. Cenouras frescas (1 quilo)',
      '3. Tomates vermelhos (6 unidades)',
      '4. Alface crespa (1 maço)',
      '5. Laranjas para suco'
    ],
    senderOrAuthor: 'Anotações da Família',
    question: 'Para que serve uma lista como esta?',
    options: [
      { id: 'a', text: 'Organizar e lembrar os alimentos que precisam ser comprados', isCorrect: true },
      { id: 'b', text: 'Convidar o feirante para um almoço', isCorrect: false },
      { id: 'c', text: 'Explicar a importância da vitamina C', isCorrect: false },
      { id: 'd', text: 'Contar uma lenda sobre a floresta', isCorrect: false }
    ],
    explanation: 'A lista serve para organizar tarefas ou itens, ajudando a não esquecer nenhum ingrediente ou produto na hora das compras.',
    visualTheme: 'list',
    icon: '📋'
  },
  {
    id: 'txt-7',
    genre: 'ANUNCIO',
    genreName: 'Anúncio de Cachorro Perdido',
    title: 'PROCURA-SE: PIPOCA!',
    content: [
      'Nosso cachorrinho vira-lata caramelo desapareceu ontem à tarde perto da pracinha.',
      'Ele atende pelo nome de Pipoca e tem uma manchinha branca na pata direita.',
      'Quem encontrar por favor ligar para o telefone: (11) 98765-4321.',
      'Oferecemos recompensa!'
    ],
    senderOrAuthor: 'Família do Pipoca',
    question: 'Este anúncio foi feito para:',
    options: [
      { id: 'a', text: 'Ajudar a encontrar um cachorrinho desaparecido', isCorrect: true },
      { id: 'b', text: 'Vender ração de cachorro na internet', isCorrect: false },
      { id: 'c', text: 'Ensinar o cãozinho a dar a pata', isCorrect: false },
      { id: 'd', text: 'Convidar os vizinhos para uma caminhada', isCorrect: false }
    ],
    explanation: 'Este texto é um anúncio comunitário! Serve para divulgar a perda do animal e pedir ajuda aos vizinhos para encontrá-lo.',
    visualTheme: 'ad',
    icon: '🐶'
  },
  {
    id: 'txt-8',
    genre: 'NOTICIA',
    genreName: 'Notícia Infantil',
    title: 'Cientistas encontram fóssil de dinossauro no Brasil',
    content: [
      'Nesta semana, uma equipe de pesquisadores encontrou ossos gigantes de um dinossauro que viveu há milhões de anos no interior de São Paulo.',
      'O fóssil tem quase 12 metros de comprimento e será exibido no museu para as crianças visitarem nas férias escolares!'
    ],
    senderOrAuthor: 'Jornal Joca - Notícias para Crianças',
    dateOrPlace: 'Edição de Setembro',
    question: 'A finalidade de uma notícia como esta é:',
    options: [
      { id: 'a', text: 'Informar sobre um acontecimento real e interessante', isCorrect: true },
      { id: 'b', text: 'Contar uma história de mentira para assustar', isCorrect: false },
      { id: 'c', text: 'Ensinar a desenhar um dinossauro passo a passo', isCorrect: false },
      { id: 'd', text: 'Fazer uma propaganda de brinquedos jurássicos', isCorrect: false }
    ],
    explanation: 'A notícia serve para informar os leitores sobre fatos reais, atuais e relevantes que aconteceram no mundo.',
    visualTheme: 'news',
    icon: '📰'
  }
];
