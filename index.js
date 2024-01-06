const regiaoTabuleiro = document.querySelectorAll("#tabuleiro span");
let quadro = [];
let vezJogador = "";

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

function atualizarVez() {
  const nomeJogador = document.getElementById(vezJogador);
  document.getElementById("turno").textContent = nomeJogador.value;
}

function iniciarJogo() {
  const p1 = document.getElementById("player1");
  const p2 = document.getElementById("player2");
  if (p1.value === "" || p2.value === "") {
    // alert("Preencha o nome dos jogadores");
    const toastElList = document.querySelectorAll(".toast");
    const toastList = [...toastElList].map((toastEl) => {
      const toast = new bootstrap.Toast(toastEl, {});
      toast.show();
    });
  } else {
    quadro = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    vezJogador = "player1";
    document.getElementById("venceuTurno").textContent = "TURNO:";
    atualizarVez();

    regiaoTabuleiro.forEach(function (elemento) {
      elemento.classList.remove("win");
      elemento.innerText = "";
      elemento.classList.add("cursor-pointer");
      elemento.addEventListener("click", clickTabuleiro);
    });
  }
}

function clickTabuleiro(ev) {
  const span = ev.currentTarget;
  const regiao = span.dataset.region;
  const linhaColuna = regiao.split(".");
  const linha = linhaColuna[0];
  const coluna = linhaColuna[1];

  if (vezJogador === "player1") {
    span.innerHTML = `<i class="bi bi-x-lg text-primary fw-bold ms-2"></i
    >`;
    quadro[linha][coluna] = "X";
  } else {
    span.innerHTML = `<i class="bi bi-circle text-danger fw-bold ms-2"></i
    >`;
    quadro[linha][coluna] = "O";
  }
  console.clear();
  console.table(quadro);

  desabilitaRegiao(span);

  const regiaoWin = getRegiaoWin();
  if (regiaoWin.length > 0) {
    mostrarVitoria(regiaoWin);
  } else if (quadro.flat().includes("")) {
    vezJogador = vezJogador === "player1" ? "player2" : "player1";
    atualizarVez();
  } else {
    document.querySelector("#venceuTurno").textContent = "EMPATE";
    document.querySelector("#turno").textContent = "NINGUÉM GANHOU !";
  }
}

function getRegiaoWin() {
  const winRegiao = [];
  if (
    quadro[0][0] &&
    quadro[0][0] === quadro[0][1] &&
    quadro[0][0] === quadro[0][2]
  )
    winRegiao.push("0.0", "0.1", "0.2");
  if (
    quadro[1][0] &&
    quadro[1][0] === quadro[1][1] &&
    quadro[1][0] === quadro[1][2]
  )
    winRegiao.push("1.0", "1.1", "1.2");
  if (
    quadro[2][0] &&
    quadro[2][0] === quadro[2][1] &&
    quadro[2][0] === quadro[2][2]
  )
    winRegiao.push("2.0", "2.1", "2.2");
  if (
    quadro[0][0] &&
    quadro[0][0] === quadro[1][0] &&
    quadro[0][0] === quadro[2][0]
  )
    winRegiao.push("0.0", "1.0", "2.0");
  if (
    quadro[0][1] &&
    quadro[0][1] === quadro[1][1] &&
    quadro[0][1] === quadro[2][1]
  )
    winRegiao.push("0.1", "1.1", "2.1");
  if (
    quadro[0][2] &&
    quadro[0][2] === quadro[1][2] &&
    quadro[0][2] === quadro[2][2]
  )
    winRegiao.push("0.2", "1.2", "2.2");
  if (
    quadro[0][0] &&
    quadro[0][0] === quadro[1][1] &&
    quadro[0][0] === quadro[2][2]
  )
    winRegiao.push("0.0", "1.1", "2.2");
  if (
    quadro[0][2] &&
    quadro[0][2] === quadro[1][1] &&
    quadro[0][2] === quadro[2][0]
  )
    winRegiao.push("0.2", "1.1", "2.0");

  return winRegiao;
}

function mostrarVitoria(regioes) {
  regioes.forEach(function (regiao) {
    document
      .querySelector('[data-region="' + regiao + '"]')
      .classList.add("win");
  });
  const nomeJogador = document.getElementById(vezJogador).value;
  document.getElementById("venceuTurno").textContent = "VENCEDOR(A) - ";
  document.getElementById("turno").textContent = `${nomeJogador}`;
}

function desabilitaRegiao(elemento) {
  elemento.classList.remove("cursor-pointer");
  elemento.removeEventListener("click", clickTabuleiro);
}

document.getElementById("iniciarJogo").addEventListener("click", iniciarJogo);
