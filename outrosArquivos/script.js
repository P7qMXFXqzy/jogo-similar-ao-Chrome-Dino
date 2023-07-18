var posicaoPersonagemTopo = 28;

function pular(e){
  if(e.code == "ArrowUp"){
    document.removeEventListener('keydown', pular);
    direcao = "subir";
    //movimentação do personagem
    intervalo = setInterval(function (){
      //subida
      if(direcao == "subir"){
        posicaoPersonagemTopo = posicaoPersonagemTopo - 1;
        if(posicaoPersonagemTopo == 1){direcao = "descer";}
      }
      //descida
      else{
        posicaoPersonagemTopo = posicaoPersonagemTopo + 1;
        if(posicaoPersonagemTopo == 28){
          //parar animação quando o personagem voltar à posição original
          document.addEventListener('keydown', pular);
          clearInterval(intervalo);
        }}
        if(posicaoPersonagemTopo > 28){ 
          posicaoPersonagemTopo = 28;
          clearInterval(intervalo);
          }
      //alterar posição da imagem
      document.getElementById("personagem").style.top = posicaoPersonagemTopo + "%";
    }, 7);}}

function loopPrincipal(velocidade){
  document.getElementById("chao2").hidden = false;
  //variáveis que serão alteradas durante todo o jogo
  var posicaoChao = 0;
  var posicaoChao2 = 100;
  var posicaoInimigo = 100;
  var posicaoObstaculo = 100;
  var posicaoPersonagem = 20;
  var velocidade = 2;
  var geradorDeInimigo = false;
  var geradorDeObstaculo = false;
  var contagemGerador = 0;
  var pontuacao = 0;
  var pontuacaoProximaVelocidade = pontuacao + 100;
  //definir se um inimigo/obstáculo novo será gerado após uma contagem até 10
  function gerarInimigoEObstaculo(){
    if(contagemGerador == 10){
      var possibilidades = [false, true];
      escolha = Math.round(Math.random());
      contagemGerador = 0
      return possibilidades[escolha];}
    else{
      contagemGerador = contagemGerador + 1;
      return false;
    }
  }
  //reiniciar jogo
  function reiniciar(e){
    //voltar as variáveis pro valor original
    if(e.code == "ArrowUp"){ 
      posicaoChao = 0;
      posicaoChao2 = 100;
      posicaoInimigo = 100;
      posicaoObstaculo = 100;
      posicaoPersonagem = 20;  
      geradorDeInimigo = false;
      geradorDeObstaculo = false;
      contagemGerador = 0;
      pontuacao = 0;
      pontuacaoProximaVelocidade = pontuacao + 100;  
      document.getElementById("chao").style.left = "-" + posicaoChao + "%";
      document.getElementById("chao2").style.left = posicaoChao2 + "%";
      document.getElementById("inimigo").style.left = posicaoInimigo + "%";
      document.getElementById("obstaculoMaior").style.left = posicaoObstaculo + "%";
      document.getElementById("personagem").style.top = 28 + "%";
      velocidade = 2;
      document.getElementById("textoFimDeJogo").hidden = true;
      document.removeEventListener('keydown', reiniciar);
    }
  }
  //funcão que será chamada dentro do interval, mantém todos os elementos na tela se movendo/alterando
  function movimentacao(){
    //mover o chão
    posicaoChao = posicaoChao - velocidade
    posicaoChao2 = posicaoChao2 - velocidade
    document.getElementById("chao").style.left = posicaoChao + "%";
    document.getElementById("chao2").style.left = posicaoChao2 + "%";
    //se o gerador já tiver valor false, escolher novamente se um inimigo/obstáculo novo será gerado
    if(geradorDeInimigo == false){ geradorDeInimigo = gerarInimigoEObstaculo(); }
    else{
      //se já há um inimigo/obstáculo na tela, manter ele se movendo para a esquerda
      posicaoInimigo = posicaoInimigo - velocidade;
      document.getElementById("inimigo").style.left = posicaoInimigo + "%";
      //se o elemento chegar ao extremo da tela, movê-lo para o extremo oposto e definir gerador como false
      if(posicaoInimigo <= -10){
        posicaoInimigo = 100
        geradorDeInimigo = false;
      }
    }
    //mesmas explicações do bloco acima, porém para o obstáculo ao invés do inimigo 
    if(geradorDeObstaculo == false){ geradorDeObstaculo = gerarInimigoEObstaculo(); }
    else{
      posicaoObstaculo = posicaoObstaculo - velocidade;
      document.getElementById("obstaculoMaior").style.left = posicaoObstaculo + "%";
      if(posicaoObstaculo <= -10){
        posicaoObstaculo = 100
        geradorDeObstaculo = false;
      }
    }
    //voltar as 2 imagens de chão para a posição inicial caso toda a imagem tenha sido mostrada durante a rolagem
    if(posicaoChao <= -100){
      posicaoChao = 100;
      document.getElementById("chao").style.left = posicaoChao + "%";
    }
    if(posicaoChao2 <= -100){
      posicaoChao2 = 100;
      document.getElementById("chao2").style.left = posicaoChao2 + "%";
    }
    //parar todos os elementos e remover controle do personagem caso o personagem atinja um inimigo ou obstáculo
    if((posicaoInimigo >= (posicaoPersonagem-4) && posicaoInimigo <= (posicaoPersonagem+4) && posicaoPersonagemTopo >= 25) || (posicaoObstaculo >= (posicaoPersonagem-1) && posicaoObstaculo <= (posicaoPersonagem+7) && posicaoPersonagemTopo >= 17)){
      velocidade = 0;
      document.getElementById("textoFimDeJogo").hidden = false;
      document.addEventListener("keydown", reiniciar);
    }
    //se o loop chegar ao final, aumentar a pontuação em 1 ponto, alterar o campo de texto mostrando a pontuação,
    else{
      pontuacao = pontuacao + 1;
      document.getElementById("pontuação").textContent = pontuacao;
      //aumentar a velocidade a cada 100 pontos atingidos
      if(pontuacao == pontuacaoProximaVelocidade){
        document.getElementById("pontuação").style.color = "red";
        velocidade = velocidade + 1;
        pontuacaoProximaVelocidade = pontuacao + 100;
        setTimeout(function (){ document.getElementById("pontuação").style.color = "white"; },500)
      }
    }
  }
  //intervalo que irá chamar o loop principal
  intervalo = setInterval(function(){
    movimentacao();
  },50)
}

//animação de esticar o chão
function animacaoChao(){
  tamanhoChao = 25;
  intervalo = setInterval(function (){
    tamanhoChao = tamanhoChao + 5;
    document.getElementById("chao").style.width = tamanhoChao + "%";
    //iniciar jogo após a introdução acabar
    if(tamanhoChao == 110){
      document.addEventListener('keydown', pular);
      clearInterval(intervalo);
      loopPrincipal()
    }
  }, 30);
}

function introducao(){
  posicaoPersonagem = 195;
  direcao = "subir";
  //movimentação do personagem
  intervalo = setInterval(function (){
    //subida
    if(direcao == "subir"){
      posicaoPersonagem = posicaoPersonagem - 5;
      if(posicaoPersonagem == 50){direcao = "descer";}
    }
    //descida
    else{
      posicaoPersonagem = posicaoPersonagem + 5;
      if(posicaoPersonagem == 195){
        //quando o personagem voltar à posição original, executar animação de esticamento do chão
        clearInterval(intervalo);
        animacaoChao();
      }}
    //alterar posição da imagem
    document.getElementById("personagem").style.top = posicaoPersonagem + "px";
  }, 4);
}

//executar animação de introdução
function iniciarJogo(e) {
  if(e.code == "ArrowUp") {
    introducao();
    document.removeEventListener('keydown', iniciarJogo);
  }
}

//esperar usuário apertar a tecla "up" para iniciar o jogo
document.addEventListener('keydown', iniciarJogo);
