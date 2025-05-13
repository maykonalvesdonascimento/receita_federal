function calcular(){
    //Declaração de variaveis ( que são espaços que irão guardar valores que serão utilizado pelo programa)

    // Armazenando os valores que o usuário digitou em Renda Mensal e em Gastos
    let rendaMensal = document.getElementById('renda__mensal');
    let deducao = document.getElementById('gastos').value;
    let renda = rendaMensal.value;
    //criando a variavel pagar e retirar , que serão utilizada nos calculos
    let pagar=0;
    let retirar;

    //criando as variaveis com valores vigentes de descontos e porcentagens
    let descontoSimplificado = 564.80;
    let faixa=[2259.20,2826.65, 3751.05, 4664.68 ];
    let porcentagem= [0,0.075,0.15,0.225,0.275];
 

    //Verificando se o usuário digitou o campo renda, caso ele não digitou aparece uma mensagem pedindo pra ele digitar
    if (renda==""){
        alert('Por favor preencha o campo de Renda Mensal');
        rendaMensal.focus();
    }
    //Caso o Usuário tenha digitado corretamente inicia o algoritmo do calculo de Imposto de Renda
    else{
        /**verifica se o usuário digitou os gastos com saúde
         * Se o valor de gastos  não for Vazio , e o valor de renda for maior de gastos, ele subtrai o valor de renda com o valor dos gastos.
         * 
         * Caso qualquer uma das condições não for verdadeira ele não executa esse bloco de código
          **/
        if(deducao!=""&& renda>deducao){
            renda= renda - deducao;
        }
        
       // Caso da renda com desconto simplificado seja menor doq 2259.20( ou seja valor da faixa 1) , será isento.
        if((renda-descontoSimplificado)<=faixa[0]){
            trocarStatusBotao();
            pagar= Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagar);
            document.getElementById('resultado').innerHTML=`<label class="texto__paragrafo">Valor a Pagar por Mês de Imposto de Renda :isento</label>`;
        }else {
            //aplico o desconto Simplificado. 
            
                renda= renda-descontoSimplificado;
           
            
            /**
              Antes de explicar a lógica que eu usei vou explicar como se faz o imposto de renda.
              Primeiro necessita pegar o valor da remuneração
              subtrair o desconto simplificado
              e verificar em qual faixa a renda esta.

              Exemplo:

              renda inicial : 3000 reais
              valor simplificado : 564,80 reais

              renda = renda inicial - valor simplificado 
              renda = 3000 - 564,80
              renda = 2.435,20
              
              após isso vejo qual faixa de valores ele se encontra:

              tabela:

              Faixa 1 -  Até R$ 2.259,20
              Faixa 2 -  De R$ 2.259,21 até R$ 2.826,65
              Faixa 3 -  De R$ 2.826,66 até R$ 3.751,05
              Faixa 4 -  De R$ 3.751,06 até R$ 4.664,68
              Faixa 5 -  Acima de R$ 4.664,68

              Logo R$ 2435 esta na Faixa 2
              
              pego o valor da renda , e subtraio do valor máximo da faixa anterior ( no caso faixa 01)

              fica 2435-2259,20 = 176

              esse valor de 176 a gente pega o valor da alicota da faixa:

              Faixa 1 -  0
              Faixa 2 -  7,5%
              Faixa 3 -  15%
              Faixa 4 -  22,5%
              Faixa 5 -  27,5%

              Logo 176 * 7,5% = R$13,20

              Se o número fosse maior, teria que repetir o processo em cada faixa

              exemplo:

              Número é 6000

              terá que calcular o valor da faixa 5 , depois calcular o valor da faixa 4 , depois o valor da faixa 3 e assim por diante... até chegar na faixa 1 , e somar todos os valores

              A lógica abaixo faz exatamente isso

              Começa da faixa 5 e vai descendo até a faixa 1 ( somando todos valores no processo)


             * 
             */ 
            if ( renda> faixa[3]){
                retirar = renda-faixa[3];
                pagar = pagar+ (retirar * porcentagem[4]);
                renda = renda  - retirar-0.0001;
            }
            
            if(renda<faixa[3] && renda>faixa[2]){
                retirar = renda-faixa[2];
                pagar = pagar +(retirar * porcentagem[3]);
                renda = renda - retirar-0.0001;
            }
            if(renda<faixa[2] && renda>faixa[1]){
                retirar = renda-faixa[1];
                pagar = pagar +(retirar * porcentagem[2]);
                renda = renda - retirar-0.0001;
            }
            if(renda<faixa[1] && renda>faixa[0]){
                retirar = renda-faixa[0];
                pagar = pagar+(retirar * porcentagem[1]);
                renda = renda - retirar;
            }


            trocarStatusBotao();

            pagar= Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagar);
            document.getElementById('resultado').innerHTML=`<label class="texto__paragrafo">Valor a Pagar por Mês de Imposto de Renda : ${pagar}</label>`;

        }
       
    }

}
function alternativo(){
    let pagar = 0;
    let rendaMensal = document.getElementById('renda__mensal');
    let deducao = document.getElementById('gastos').value;
    let descontoSimplificado = 564.80;
    let faixa=[2259.20,2826.65, 3751.05, 4664.68 ];
    let desconto = [0,169.44,381.44,662.77,896.00];
    let porcentagem= [0,0.075,0.15,0.225,0.275];
    let renda = rendaMensal.value;

    if (renda==""){
        alert('Por favor preencha o campo de Renda Mensal');
        rendaMensal.focus();
    }
    else{
        if(deducao!=""&& renda>deducao){
            renda= renda - deducao;
        }
    
       
        if((renda-descontoSimplificado)<=faixa[0]){
            trocarStatusBotao();
            pagar= Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagar);
            document.getElementById('resultado').innerHTML=`<label class="texto__paragrafo">Valor a Pagar por Mês de Imposto de Renda : isento</label>`;
        }else {
                renda= renda-descontoSimplificado;
            
            
            /**
             * Lógica Alternativa, no qual usa essa formúla
             * 
             * Renda- Desconto Simplificado
             * IR = Renda * porcentagem da faixa - desconto da faixa. 
             * 
             * Ambas as lógicas resultam no mesmo valor!
             */
            if ( renda> faixa[3]){
               pagar = (renda * porcentagem[4]) - desconto[4];
            }else if(renda<faixa[3] && renda>faixa[2]){
                pagar = (renda* porcentagem[3]) -desconto[3];
            }
            if(renda<faixa[2] && renda>faixa[1]){
                pagar = (renda* porcentagem[2]) -desconto[2];
            }
            if(renda<faixa[1] && renda>faixa[0]){
                pagar = (renda* porcentagem[1]) -desconto[1];
            }


            trocarStatusBotao();
            pagar= Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagar);
            document.getElementById('resultado').innerHTML=`<label class="texto__paragrafo">Valor a Pagar por Mês de Imposto de Renda : ${pagar}</label>`;

        }
    }
}
// código pra o botão reiniciar , que vai apagar todos os campos e habilitar os botões calcular e método alternativo
function reiniciar(){
    
    document.getElementById('renda__mensal').value="";
    document.getElementById('gastos').value="";
    document.getElementById('resultado').innerHTML=`<label class="texto__paragrafo">Valor a Pagar por Mês de Imposto de Renda : A ser calculado</label>`;
    document.getElementById('renda__mensal').focus();
    trocarStatusBotao();

}
// código que permite que os botões fiquem desabilitados ou habilitado
function trocarStatusBotao(){
    let btn = document.getElementById('btn-reiniciar');
    let btncalcular = document.getElementById('btn-calcular');
    let btnalternativo = document.getElementById('btn-alternativo');
    if(btn.classList.contains('container__botao-desabilitado')){
        btn.classList.remove('container__botao-desabilitado');
        btn.classList.add('container__botao');
        btnalternativo.classList.remove('container__botao');
        btnalternativo.classList.add('container__botao-desabilitado');
        btncalcular.classList.remove('container__botao');
        btncalcular.classList.add('container__botao-desabilitado');
    }else{
        btn.classList.remove('container__botao');
        btn.classList.add('container__botao-desabilitado');
        btnalternativo.classList.remove('container__botao-desabilitado');
        btnalternativo.classList.add('container__botao');
        btncalcular.classList.remove('container__botao-desabilitado');
        btncalcular.classList.add('container__botao');
    }
}