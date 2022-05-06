$(document).ready(function () {
    var participantes = [];
    var cores = [
        { id: 0, cor: "azul", ativo: 0 },
        { id: 1, cor: "verde", ativo: 0 },
        { id: 2, cor: "vermelho", ativo: 0 },
        { id: 3, cor: "amarelo", ativo: 0 },
        { id: 4, cor: "preto", ativo: 0 },
        { id: 5, cor: "branco", ativo: 0 },
        { id: 6, cor: "rosa", ativo: 0 }];

    $.fn.onlyLetter = function (text) {
        return !/^[a-zA-Z]+$/.test(text);
    }

    $.fn.hasWhiteSpace = function (value) {
        return value.indexOf(" ") >= 0;
    }

    $.fn.inserirNaTabela = function (nome, cor) {
        $("#listaParticipantes").append(function () {
            return '<tr><td><i style="color: ' + cor + '" class="fas fa-user"></i></td><td>' + nome + '</td></tr>';
        });

        $("#listaPontuacao").append(function () {
            return '<tr><td>' + nome + '</td><td class="pointsLabel" id="' + nome + '">0</td></tr>';
        });
    }

    $.fn.inserirParticipantes = function (nomeVar, corVar) {

        participantes.push({ nome: nomeVar, cor: corVar, pts: 0 });
        $().inserirNaTabela(nomeVar, corVar);
        $("#" + corVar).attr("disabled", "disabled");
        $("#txtNome").val('');
        $("#cor").val('');

        return alert("Participante adicionado!");
    }

    $.fn.limitPlayers = function () {
        if (participantes.length == 7)
            return alert("Limite de participantes alcançado. É permitido no máximo 7 jogadores.");
    }

    $.fn.insertPlayerAsOption = function (playerName) {
        $("#playerNameSelect").append( function () {
            return "<option value='"+playerName+"'>"+ playerName +"</option>";
        });

        $("#playerNameSelect2").append( function () {
            return "<option value='"+playerName+"'>"+ playerName +"</option>";
        });
    }

    $.fn.verificarParticipantes = function (nomeVar, corVar) {
        var playersAmount = participantes.length;
        var corExiste = false;
        var nomeExiste = false;

        $().limitPlayers();

        for (playersAmount -= 1; playersAmount >= 0; playersAmount--) {

            var nome2Var = JSON.stringify(participantes[playersAmount].nome).replace(/\"/g, '');
            var cor2Var = JSON.stringify(participantes[playersAmount].cor).replace(/\"/g, '');

            if (nomeVar === nome2Var) {
                nomeExiste = true;
                break;
            }
            if (corVar === cor2Var) {
                corExiste = true;
                break;
            }
        }

        if (corVar == null)
            return alert("Escolha uma cor para este participante!");
        else if (nomeVar.length > 12 || $().hasWhiteSpace(nomeVar) || $().onlyLetter(nomeVar)) {
            return alert("Nome inválido!");
        }
        else if (corExiste) {
            return alert("Essa cor já está em uso.\nEscolha outra!");
        }
        else if (nomeExiste) {
            return alert("Esse participante já está no jogo.");
        }
        else {
                    $().insertPlayerAsOption(nomeVar);
            return $().inserirParticipantes(nomeVar, corVar);
        }
    }

    $(".fecharBt").on("click", function () {
        $(".modal .modalContainer").slideUp("fast");
        setTimeout(function () {
            $(".modal").fadeOut("fast");
        }, 250);
    });

    $("#addUserBt").on("click", function () {
        $("#modalAddUser").fadeIn("fast");
        setTimeout(function () {
            $("#modalAddUser .modalContainer").slideDown("fast");
        }, 400);
    });

    $("#confirmAddUserBt").on("click", function () {
        var nome = $("#txtNome").val();
        var cor = $("#cor").val();

        $().verificarParticipantes(nome, cor);
    });


    // Adicionar Pontos
    $("#addPointsBt").on("click", function () {
        $("#modalAddPoints").fadeIn("fast");
        setTimeout(function () {
            $("#modalAddPoints .modalContainer").slideDown("fast");
        }, 400);
    });

    $("#confirmAddPointsBt").on("click", function () {
        var nome = $("#playerNameSelect").val();
        var qtd = $("#txtPontosAdd").val();

        if (qtd <= 0 || isNaN(qtd)) {
            return alert("Insira um valor válido.");
        }

        pontuacaoAtual = parseInt($("#" + nome).text()) + parseInt(qtd);

        $("#" + nome).text(pontuacaoAtual.toString());

        $("#modalAddPoints").fadeOut("fast");
        setTimeout(function () {
            $("#modalAddPoints .modalContainer").slideDown("fast");
        }, 400);

        return alert(nome + " ganhou " + qtd + " pontos!") + $("input").val();
    });
    // Fim Add Pontos

    // Remover Pontos
    $("#remPointsBt").on("click", function () {
        $("#modalRemPoints").fadeIn("fast");
        setTimeout(function () {
            $("#modalRemPoints .modalContainer").slideDown("fast");
        }, 400);
    });

    $("#confirmRemPointsBt").on("click", function () {
        var playerName = $("#playerNameSelect2").val();
        var playerPoints = $("#txtPontosRem").val();

        pontuacaoAtual = parseInt($("#" + playerName).text()) - playerPoints; 
        
        if (playerPoints == 0) {
            alert("Esse usuário já está com a pontuação zerada!");
        } else if (pontuacaoAtual < 0){
            pontuacaoAtual = 0;
        }

        $("#" + playerName).text(pontuacaoAtual.toString());

        $("#modalRemPoints").fadeOut("fast");
        setTimeout(function () {
            $("#modalRemPoints .modalContainer").slideDown("fast");
        }, 400);

        return alert(playerName + " perdeu " + playerPoints + " pontos!") + $("input").val();
    });
    // Fim Rem Pontos

    $("#addErrosBt").on("click", function () {
        $("#modalAddErros").fadeIn("fast");
        setTimeout(function () {
            $("#modalAddErros .modalContainer").slideDown("fast");
        }, 400);
    });

    $("#confirmAddErrosBt").on("click", function () {
        $("#listaErros").append(function () {
            $("#modalAddErros").fadeOut("fast");
            setTimeout(function () {
                $("#modalAddErros .modalContainer").slideDown("fast");
            }, 400);

            return '<tr class="line"><td><i style="color:red;" class="fas fa-times"></i></td><td>' + $("#txtPalavra").val() + '</td></tr>' + $("input").val('');
        });
    });

    $("#addDicasBt").on("click", function () {
        $("#modalAddDicas").fadeIn("fast");
        setTimeout(function () {
            $("#modalAddDicas .modalContainer").slideDown("fast");
        }, 400);
    });

    $("#confirmAddDicasBt").on("click", function () {
        $("#listaDicas").append(function () {
            $("#modalAddDicas").fadeOut("fast");
            setTimeout(function () {
                $("#modalAddDicas .modalContainer").slideDown("fast");
            }, 400);
            return '<tr class="line"><td>'+ $("#txtTipNumber").val() +'</td><td>' + $("#txtDica").val() + '</td></tr>' + $("input").val('');
        });
    });

    // Avançar partida
    $("#nextRound").on("click", function () {
        $(".line").remove();
        alert("Pronto para a nova rodada!");
    });
    // Fim avançar partida

    // Zerar pontuações 
    $.fn.resetPoints = function () {
        var countPlayers = participantes.length;
        var countPointless = 0;

        for (count = 0; count < countPlayers; count++) {
            var playerName = participantes[count].nome;

            if (participantes[count].pts = 0)
                countPointless++
        }

        if (countPointless == participantes.length)
            return alert("As pontuações já estão zeradas.");
        else {
            for (count = 0; count < countPlayers; count++) {
                var playerName = participantes[count].nome;

                participantes[count].pts = 0;
                $("#" + playerName).text(0);
            }
            return;
        }
    }
    // Fim zerar pontuações

    // Resetar partida
    $("#resetRound").on("click", function () {
        $(".line").remove();
        $().resetPoints();
    });
    // Fim resetar partida
});