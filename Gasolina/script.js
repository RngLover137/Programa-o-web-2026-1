const precos = {
  gasolina: 6.69,
  etanol: 4.30,
  diesel: 6.03,
};

const selectCombustivel = document.getElementById("combustivel");
const inputLitros       = document.getElementById("litros");
const resultado         = document.getElementById("resultado");
const resultadoBox      = document.getElementById("resultado-box");
const erroCombustivel   = document.getElementById("erro-combustivel");
const erroLitros        = document.getElementById("erro-litros");

const formatarMoeda = (valor) =>
  valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

const exibirErro = (campo, msgEl, exibir) => {
  campo.classList.toggle("erro", exibir);
  msgEl.classList.toggle("visivel", exibir);
};

const validarEntradas = () => {
  const tipo   = selectCombustivel.value;
  const litros = parseFloat(inputLitros.value);

  let valido = true;

  if (!tipo) {
    exibirErro(selectCombustivel, erroCombustivel, true);
    valido = false;
  } else {
    exibirErro(selectCombustivel, erroCombustivel, false);
  }

  if (inputLitros.value.trim() === "") {
    erroLitros.textContent = "Insira a quantidade de litros.";
    exibirErro(inputLitros, erroLitros, true);
    valido = false;
  } else if (isNaN(litros) || litros <= 0) {
    erroLitros.textContent = "O valor deve ser um número positivo.";
    exibirErro(inputLitros, erroLitros, true);
    valido = false;
  } else {
    exibirErro(inputLitros, erroLitros, false);
  }

  return valido ? { tipo, litros } : null;
};

const calcularAbastecimento = () => {
  const dados = validarEntradas();

  resultadoBox.classList.remove("preenchido", "com-erro");

  if (!dados) {
    resultado.textContent = "—";
    resultadoBox.classList.add("com-erro");
    return;
  }

  const precoPorLitro = precos[dados.tipo];
  const valorTotal    = precoPorLitro * dados.litros;

  resultado.textContent = formatarMoeda(valorTotal);
  resultadoBox.classList.add("preenchido");
};

const atualizarValor = () => calcularAbastecimento();

selectCombustivel.addEventListener("change", atualizarValor);
inputLitros.addEventListener("input", atualizarValor);

inputLitros.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    atualizarValor();
  }
});
