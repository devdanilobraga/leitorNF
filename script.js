// Função para processar o código de barras e exibir no histórico
function processarMiniDANFE(code) {
    const cnpjEmitente = code.substr(6, 14);
    const dataEmissaoRaw = code.substr(2, 6);  // Extrai os caracteres da data (aammdd)
    const ano = "20" + dataEmissaoRaw.substr(0, 2); // Pega os últimos dois dígitos do ano e acrescenta "20"
    const mes = dataEmissaoRaw.substr(2, 2); // Pega o mês
    const dataEmissaoFormatada = `${mes}/${ano}`;
    const modelo = code.substr(20, 22);
    const serie = code.substr(22, 3);
    const numeroNF = code.substr(30, 4);
    const codigoDV = code.substr(34, 35);
    const codigoProduto = code.substr(43, 1) || "N/A";
    const volume = code.substr(40, 1) || "N/A";


 /*   const cnpjEmitente = accessKey.substring(6, 20);
    const dataEmissao = accessKey.substring(2, 6);
    const modelo = accessKey.substring(20, 22);
    const serie = accessKey.substring(22, 25);
    const numeroNF = accessKey.substring(25, 34);
    const codigoDV = accessKey.substring(34, 35);

*/

    const historicoList = document.getElementById("historicoList");
    const historicoItem = document.createElement("li");
    historicoItem.innerHTML = `
        <strong>CNPJ Emitente:</strong> ${cnpjEmitente}<br>
        <strong>Data Emissão:</strong> ${dataEmissaoFormatada}<br>
        <strong>Modelo:</strong> ${modelo}<br>
        <strong>Série:</strong> ${serie}<br>
        <strong>Número NF:</strong> ${numeroNF}<br>
        <strong>Código DV:</strong> ${codigoDV}<br>
        <strong>Código Produto:</strong> ${codigoProduto}<br>
        <strong>Volume:</strong> ${volume}
    `;

    historicoList.appendChild(historicoItem);
}


document.getElementById("pesquisarManual").addEventListener("click", function() {
    const code = document.getElementById("codigoBarrasInput").value;

    // Verifica se o código de barras tem 44 caracteres
    if (code.length === 44) {
        // Verifica se os primeiros 8 caracteres do CNPJ são "71052559"
        if (code.substr(6, 8) === "71052559") {
            // Código de barras lido com sucesso
            document.getElementById("mensagemAviso").textContent = "Código de barras lido com sucesso!";
            document.getElementById("mensagemAviso").style.color = "green";

            // Processar e exibir as informações da Mini DANFE
            processarMiniDANFE(code);
        } else {
            // CNPJ inválido
            document.getElementById("mensagemAviso").textContent = "CNPJ inválido na Mini DANFE!";
            document.getElementById("mensagemAviso").style.color = "red";
        }
    } else {
        // Código de barras com tamanho incorreto
        document.getElementById("mensagemAviso").textContent = "Código de barras com tamanho incorreto!";
        document.getElementById("mensagemAviso").style.color = "red";
    }
});
