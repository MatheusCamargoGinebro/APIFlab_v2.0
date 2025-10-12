// O========================================================================================O
/* 
    # Arquivo que contém a função que trabalha em conjunto com o lado da interface, 
    # para permiti-la encontrar a API quando estiverem na mesma rede.
*/
// O========================================================================================O

// O========================================================================================O

const solver = (request, response) => {
	const { challenge } = request.params;

	console.log(challenge);

	return response
		.status(200)
		.json({ status: true, whoAmI: "APIFLab_v2.0", solveChallenge: challenge });
};

module.exports = solver;

// O========================================================================================O
