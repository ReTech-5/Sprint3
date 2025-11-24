var { GoogleGenAI } = require("@google/genai");
var chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

async function perguntar(req, res) {
    var pergunta = req.body.pergunta;
    
    if (pergunta == undefined) {
        res.status(400).send("Sua pergunta está undefined!");
    } else {
        try {
            var resultado = await gerarResposta(pergunta);
            res.json({ resultado });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

}

async function gerarResposta(mensagem) {
    try {
        // gerando conteúdo com base na pergunta
        var modeloIA = chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Em um paragráfo responda: ${mensagem}`

        });
        var resposta = (await modeloIA).text;
        var tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    perguntar,
    gerarResposta,
}