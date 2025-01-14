let recipes = [];
let prices = [];
let counter = 0;
 
const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

let allIngredients = []

async function start() {
  const resources = await fetch('/backend/recipes.json');
  const json = await resources.json();
  recipes = json.recipes;
  prices = recipes.map(prices => prices.price);
  allIngredients = recipes.map(recipe => recipe.ingredients)
  
  const answers = [];

  answers.push(question01());
  answers.push(question02());
  answers.push(question03());
  answers.push(question04());
  answers.push(question05());
  answers.push(question06());
  answers.push(question07());
  answers.push(question08());
  answers.push(question09());
  answers.push(question10());

  for (const [index, answer] of answers.entries()) {
    const style =
      index % 2 === 0
        ? 'backgroundColor: black; color: green'
        : 'backgroundColor: black; color: blue';

    console.log(
      `%c Questão ${(index + 1).toString().padStart(2, '0')}: ${answer}`,
      style
    );
  }
}

function question01() {
  /**
   * Questão 01: Quantas receitas existem ao todo?
   */
  return `Há ${recipes.length} receitas ao todo.`;
}

function question02() {
  /**
   * Questão 02: Qual é a média de preços das receitas?
   */
  const sum = prices.reduce((acum, price) => acum + price, 0);
    const medium = sum / prices.length;
    return `À média de preços das receitas é de: ${moneyFormatter.format(medium.toFixed(2))}`;
}

function question03() {
  /**
   * Questão 03: Qual é a receita mais cara e o seu preço?
   * Dica 01: formate o número obtido com o moneyFormatter, declarado
   * no início deste arquivo
   */
  const expensive = recipes.reduce((expensive, actualRecipe) => {
    return actualRecipe.price > expensive.price ? actualRecipe : expensive;
  }, { title: '', price: 0 });
  return `A receita mais cara é a "${expensive.title}" que custa ${moneyFormatter.format(expensive.price.toFixed(2))}`;
}

function question04() {
  /**
   * Questão 04: Qual é a receita que possui mais ingredientes? Mostre também a
   * quantidade de ingredientes desta receita
   */
  const recipesWithMostIngredients = recipes.reduce((mostIngredients, actualRecipe) => {
    if (!mostIngredients) {
      return actualRecipe;
    }
    return actualRecipe.ingredients.length > mostIngredients.ingredients.length ? actualRecipe : mostIngredients;
  }, null);
  return `A receita com mais ingredientes é a "${recipesWithMostIngredients.title}", que possui ${recipesWithMostIngredients.ingredients.length} ingredientes.`;
}

function question05() {
  /**
   * Questão 05: Liste todos os ingredientes distintos considerando todas
   * as receitas. Liste os ingredientes separados por ', '.
   * Dica 01: pesquise por array.flat()
   * Dica 02: pesquise por array.join()
   * Dica 03: pesquise por Set em JavaScript e faça a re-conversão
   * para array com Array.from
   */
  const flattedIngredients = allIngredients.flat(2);
  const joinedIngredients = flattedIngredients.join(', '); 
  const convertedIngredients = Array.from(joinedIngredients.split(','));
  const distinctIngredioents = [...new Set(convertedIngredients) ];
  return `Os ingredientes distintos entre as receitas são: ${distinctIngredioents}`;
}

function question06() {
  /**
   * Questão 06: existe algum ingrediente que aparece em todas as receitas?
   * Em caso afirmativo, informe-o(os).
   * Dica 01: reaproveite funções já implementadas
   * Dica 02: utilize array.every
   * Dica 03: utilize array.forEach
   * Dica 04: pesquise pelo método array.includes
   * Dica 05: pesquise pelo método array.splice
   */
  const common = [];
  const errorMsg = []
  allIngredients[0].forEach(ingredient => {
    if (allIngredients.every(recipeIngredients => recipeIngredients.includes(ingredient))) {
    common.push(ingredient);
    } else {
      errorMsg.push('As receitas não contêm um ingrediente em comum.')
    }
})
  return common.length === 1 ? `O ingrediente em comum para todas as receitas é o/a: "${common}"` : `Erro: ${errorMsg}`;
}

function question07() {
  /**
   * Questão 07: Quantas receitas possuem "uva" como ingrediente?
   * Dica 01: pesquise pelo método array.includes
   */

  allIngredients.forEach(recipeIngredients => {
    if (recipeIngredients.includes('uva')) {
      counter++;
    }
  })
  return `${counter} receitas possuem "uva" como ingrediente.`;
}

function question08() {
  /**
   * Questão 08: Quantas receitas possuem "abóbora" e "aveia" como ingredientes?
   * Dica 01: pesquise pelo método array.includes
   */
  allIngredients.forEach(recipeIngredients => {
    if (recipeIngredients.includes('abóbora') && recipeIngredients.includes('aveia')) {
      counter++;
    }
  })
  return `${counter} receitas possuem "abóbora" e "aveia" como ingrediente.`;
}

function question09() {
  /**
   * Questão 09: Um determinado cliente quer comprar 2 itens de cada receita
   * que contenha "calabresa" com ingrediente. Quanto ele vai pagar?
   */
  let total = 0;
  recipes.forEach(recipeIngredients => {
    if (recipeIngredients.ingredients.includes('calabresa')) {
      total += recipeIngredients.price * 2
      counter++;
    }
  })
  return `O total de ${counter} pedidos contendo calabresa é: ${moneyFormatter.format(total.toFixed(2))}`;
}

function question10() {
  /**
   * Questão 10: Qual seria o faturamento bruto mensal se fossem vendidos,
   * durante um mês, 3 itens de cada receita?
   */
  const diasMes = 30
  let brutoMensal = 0;
  recipes.forEach(recipeIngredients => {
    brutoMensal += (recipeIngredients.price * 3) * diasMes
  })
  return `O faturamento bruto mensal vendendo 3 items de cada receita durante 1 mês é: ${moneyFormatter.format(brutoMensal.toFixed(2))}`;
}

start();
