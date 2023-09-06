# Google Search Backend

## Instruções de Execução

*   Ter instalado o Node.js v18 ou superior;
*   Na raiz do projeto executar o comando `npm install` para instalar as dependências;
*   Na raiz do projeto executar o comando `npm start` para iniciar o servidor;

## Sobre a API

* O projeto está configurado para rodar na porta 3000;
* Existe um único endpoint, que aceita os seguintes parâmetros:
    * `search`: Representa o termo que será utilizado na consulta;
    * `offset`: Representa a quantidade de offset que será utilizado na consulta;

### Exemplo de Requisição:
```sh
curl --request GET \
  --url 'http://localhost:3000/?search=maringá&offset=0'
```

### Exemplo de Resposta:
```json
[
	{
		"title": "Prefeitura Municipal de Maringá",
		"link": "http://www.maringa.pr.gov.br/"
	},
	{
		"title": "Maringá – Wikipédia, a enciclopédia livre",
		"link": "https://pt.wikipedia.org/wiki/Maring%C3%A1"
	},
	{
		"title": "Maringa.Com: Empregos, Entretenimento e Notícías de Maringá",
		"link": "https://maringa.com/"
	},
	{
		"title": "Maringá - VIAJE PARANÁ",
		"link": "https://www.viajeparana.com/Maringa"
	},
	{
		"title": "Maringá Futebol Clube - Início",
		"link": "https://maringafc.com/"
	},
	{
		"title": "Universidade Estadual de Maringá",
		"link": "http://www.uem.br/"
	},
	{
		"title": "Maringá - PR - IBGE Cidades",
		"link": "https://cidades.ibge.gov.br/brasil/pr/maringa"
	},
	{
		"title": "Paraná | Maringá | História & Fotos - IBGE Cidades",
		"link": "https://cidades.ibge.gov.br/brasil/pr/maringa/historico"
	},
	{
		"title": "PREFEITURA DE MARINGÁ (@prefeiturademaringa) - Instagram",
		"link": "https://www.instagram.com/prefeiturademaringa/?hl=pt-br"
	}
]
```
