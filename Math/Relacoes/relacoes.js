/*
 * Description: Cria uma matriz U (universo) e retorna suas características
 * Author: Lucas Mateus
 * Created at: 06/05/2023
 * Updated at: 07/05/2023
 */

/* = = = = = = = = = = = = = = = = = = */

const pRelacoes = document.getElementById("relacoes");
const txtArea = document.getElementById("elements");

var arg1 = [];
var booleans = [];
var relacoes = []; // Relações geradas pela funct "relacao"

// const arg1 = ['a', 'b', 'c', 'd', 'e'];
// const arg1 = [1,2,3,4,5,6,7,8,9,10];
// const arg2 = ['r', 't', 'u'];

// Pega os elementos inseridos na "textArea"
function getElements(){
        
        // Limpa tudo antes de prosseguir
        arg1 = [];
        relacoes = [];
        booleans = [];

        // Separa os elementos a cada "," lida
        nums = txtArea.value.split(",");

        // Remove os espaços e salva os elementos.
        nums.forEach(value => {
            
            // Se algo for inserido, coloca-o no array
            if (value != ""){
                arg1.push(value.trim());
            }
            
        });
        

        console.log(arg1);

        return arg1;
}
 
// Gera uma relação baseada...
function relacao(arg1, arg2){

    // Em dois arrays
    if (arg1 != null && arg2 != null) {
        
        for (let r = 0; r < arg1.length; r++) {
            for (let v = 0; v < arg2.length; v++){
                
                // Elementos:
                    let val1 = arg1[r];
                    let val2 = arg2[v];

                // E nesta regra:
                if(val1 > val2 || val2 > val1){
                    relacoes.push({val1, val2});
                    console.log(val1 + "-" + val2 + "\n");
                }else{
                    continue;
                }
            }
        }

    // Relação com um array (arg1)
    }else if(arg1 != null){
        for (let a = 0; a < arg1.length; a++) {
            for (let b = 0; b < arg1.length; b++) {
                
                // Elementos:
                    let val1 = arg1[a];
                    let val2 = arg1[b];

                // Nesta regra:
                if(val1 > val2){
                    relacoes.push({val1, val2});
                    console.log(val1 + "-" + val2 + "\n");
                }else{
                    continue;
                }
            }
        }
    }else{
        document.write("cé de ment's?");
    }

    // console.log(relacoes);
    imprimeRelacao();
    verif();
}

// Imprime a relação gerada na tela
function imprimeRelacao(){
    
    pRelacoes.innerText = " ";

    relacoes.forEach(indice =>{

        let row = "(" + indice.val1 + " - " + indice.val2 + ") ";

        pRelacoes.insertAdjacentText("beforeend", row);
    });
}

// Considerando o conjunto "relacoes {a,b}" - checked
function isReflexiva(){
    
    for (let x = 0; x < relacoes.length; x++) {
        
        // Pega índice 
        let num = relacoes[x];

        // Compara com todos os elementos do array
        for (let y = 1; y < relacoes.length; y++) {
            
            // Se todos os termos forem duplicados (x, x)
            if (num.val1 == num.val2){ 
                booleans.push(true);
                break;
            }else{
                continue;
            }
        }
    }

    // Se: nº de termos distintos for igual o tamanho do array...
    if (booleans.length == arg1.length) {
        booleans = [];
        return true; // É reflexiva
    
    }else{
        booleans = [];
        return false; // Não é reflexiva
    }

}

// Considerando o conjunto "relacoes {a, b}" - checked
function isSimetrica(){
    
    // Esse indice é true
    esse_sim = false;

    for (let i = 0; i < relacoes.length; i++) {

        // Pega um índice
        const element = relacoes[i];
        
        // Se: valores iguais = true
        if (element.val1 == element.val2){
            
            // indica que esse índice é simétrico
            esse_sim = true;

        // Se: valores invertidos, é simetrico
        }else{
            
            for (let j = 0; j < relacoes.length; j++){
            
                if(element.val1 == relacoes[j].val2 
                && element.val2 == relacoes[j].val1){
                    
                    // indica que esse índice é simétrico
                    esse_sim = true;
                    break;
                }else{
                    // indica que esse índice é simétrico
                    esse_sim = false;
                }
            }
        }
        

        if (esse_sim){
            continue;
        }else{
            break;
        }
    }

    if (esse_sim) {
        return true;
    } else {
        return false;
    }

}

// Considerando o conjunto "relacoes {a, b}" - checked
function isTransitiva(){

    // Ao fim da execução, há de ser true
    var transitiva = false;
    
    for (let x = 0; x < relacoes.length; x++) {
        const element = relacoes[x];

        for (let y = 0; y < relacoes.length; y++) {

            // Se {a, b} conectar com {b, c}
            if(element.val2 == relacoes[y].val1){

                // Pega o valor "c"
                let c = relacoes[y].val2;

                //  Compara o valor "c" com tudo
                for (let z = 0; z < relacoes.length; z++) {

                    // Se existir {a, c}
                    if (element.val1 == relacoes[z].val1 && c == relacoes[z].val2) {
                        transitiva = true;

                        /* RETORNO VISUAL PARA COMPREENDER O CÓDIGO */
                        // console.log("Se: " 
                        //     + element.val1 +"-"+element.val2 
                        //     +" ligado com "
                        //     + relacoes[y].val1 +"-"+relacoes[y].val2
                        //     +" ("+relacoes[z].val1+"-"+ relacoes[z].val2 +")"
                        //     +" deu: "+ element.val1 +"-"+c
                        //     );

                        break;
                    }
                }
            }else{

                // Mesmo que não entre na condição
                // É true
                transitiva = true;
            }
        }
    }

    // Retorna se é true ou não
    if (transitiva) {
        return true;
    } else {
        return false;
    }
}

// Considerando o conjunto "relacoes {a, b}" - checked
function isAntissimetrica(){

    // Ao fim da execução, precisa ser true
    var antissimetrica = false;

    for (let i = 0; i < relacoes.length; i++) {

        // Pega o índice a ser testado
        const element = relacoes[i];

        // Se: valores invertidos e iguais, é antissimetrico
        if(element.val1 == element.val2){
            
            // É antissimétrico
            antissimetrica = true;

        }else{

            for (let j = 0; j < relacoes.length; j++) {         

                // Indice 1: element: b-a
                // Deveria ser: element: a-b
                // Indice 4: relacoes: c-b
                if (element.val1 == relacoes[j].val2 
                 && element.val2 == relacoes[j].val1) {
                    // Não É antissimétrico, por serem distintos
                    antissimetrica = false;
                    break;
                }else{
                    // É antissimétrico, porque não entra na condição
                    antissimetrica = true;
                }

                // console.log("--> v1 == r2 (" 
                //         + element.val1 + " == " + relacoes[j].val2 
                //         + ")\n--> v2 == r1 (" 
                //         + element.val2 + " == " + relacoes[j].val1
                //         + ")\n--> v1 == v2 (" 
                //         + element.val1 + " == " + element.val2
                //         +")");
            }
        }

        // Sai do laço se falso
        if (antissimetrica){
            continue;
        } else {
            return false;
        }
    }

    // Retorna o tipo
    if (antissimetrica){
        return true;
    } else {
        return false;
    }
}

/* BLOCO DE EXECUÇÃO */
function verif(){
    // REFLEXIVA
        if(isReflexiva()){
            document.getElementById("reflex").innerHTML = "Sim";
            document.getElementById("reflex").style.color = "green";
        }else{
            document.getElementById("reflex").innerHTML = "Não";
            document.getElementById("reflex").style.color = "red";
        }

    // SIMÉTRICA
        if (isSimetrica()) {
            document.getElementById("simet").innerHTML = "Sim";
            document.getElementById("simet").style.color = "green";
        }else{
            document.getElementById("simet").innerHTML = "Não";
            document.getElementById("simet").style.color = "red";
        }

    // TRANSITIVA
        if (isTransitiva()) {
            document.getElementById("transit").innerHTML = "Sim";
            document.getElementById("transit").style.color = "green";
        }else{
            document.getElementById("transit").innerHTML = "Não";
            document.getElementById("transit").style.color = "red";
        }

    // ANTISSIMÉTRICA
        if (isAntissimetrica()) {
            document.getElementById("antissi").innerHTML = "Sim";
            document.getElementById("antissi").style.color = "green";
        }else{
            document.getElementById("antissi").innerHTML = "Não";
            document.getElementById("antissi").style.color = "red";
        }
}   