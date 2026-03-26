
//Variáveis

// Contagem
let botao1 = document.getElementById("botao1");
let botao2 = document.getElementById("botao2");
let contar = document.getElementById("contador");
let i = 0;

// Campo de escrita

let campoEntrada = document.getElementById("campo");
let resultado = document.getElementById("resultado");
let caracteres = document.getElementById("contadorcarac");

// Adição de listas

let botaounordem = document.getElementById("b_ul");
let botaoordem = document.getElementById("b_ol");
const listas = document.getElementById("listas");

// Reinício

let botaoreinicio = document.getElementById("reinicializacao");

// Inicializador de contagem
contar.innerHTML = ("Quantidade de cliques = " + i);

// Botão de adição
botao1.onclick = function(){
    i++;
    contar.innerHTML = ("Quantidade de cliques = " + i);
};

// Botão de subtração
botao2.onclick = function(){
    if (i <= 0) {
        window.alert("Não é possível clicar menos que 0 vezes!");
    } else {
        i--;
        contar.innerHTML = ("Quantidade de cliques = " + i);
    }
};

// Campo acionado por Enter
campoEntrada.onkeydown = function(event){ // código da própria aula
    if(event.key == "Enter"){
        resultado.innerHTML = campoEntrada.value;
        campoEntrada.value = "";
    }
};

// Contador de caracteres do campo de texto
campoEntrada.onkeyup = function(){
    let tamanho_texto = campoEntrada.value.split(" ").join("").length; // split e join para eliminar espaços
    caracteres.innerHTML = "Quantidade de caracteres = " + tamanho_texto;
};

// Adiciona lista não ordenada

botaounordem.addEventListener("click", function(){
    const criarListaUl = document.createElement('ul');
    criarListaUl.id = "teste";
    listas.appendChild(criarListaUl);
    let i = 0;
    while(i < 10){
    const li = document.createElement("li");
    li.textContent = "Item " + (i+1);
    criarListaUl.appendChild(li);
    i++;
    }
});

// Adiciona lista ordenada

botaoordem.addEventListener("click", function(){
    const criarListaOl = document.createElement('ol');
    criarListaOl.id = "teste";
    listas.appendChild(criarListaOl);
    let i = 0;
    while(i < 10){
    const li = document.createElement("li");
    li.textContent = "Item " + (i+1);
    criarListaOl.appendChild(li);
    i++;
    }
});

// Botão que reinicia a página
botaoreinicio.onclick = function(){
    window.location.reload();
}