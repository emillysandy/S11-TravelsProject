const travels = require("../models/travels.json");

const getAllTravels = (req, res) => {
    res.status(200).json(travels);
};

const getTravelById = (req, res) => {
    const resquestId = req.params.id;
    const filteredTravel = utils.filterById(travels, resquestId);

    res.status(200).send(filteredTravel);
};

const createDriver = (req, res) => {
    // trazer o dados da requisição
    let { name, license } = req.body;

    let newDriver = {
        id: Math.random().toString(32).substr(2),
        name,
        license
    };


    //verificar o id de cada item da lista de viagens para achar aquele que é igual ao id requerido
    let travelRequired = utils.findById(travels, travelRequiredId);

    travels.forEach((travel) => {
        let sameTravel = travel === travelRequired;

        if (sameTravel) {
            travel.driverInfos = []
            travel.driverInfos.push(newDriver)
        };
    });

    // usar módulo fs para escrever as alterações no nosso arquivo

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
        if (err) {
            res.status(500).send({
                "message": err
            })
        } else {
            // enviar a resposta pro postman
            res.status(201).send({ "message": "Motorista cadastrado com sucesso", travelRequired });
        };
    });
};

const deleteTravel = (req, res) => {
    const requiredId = req.params.id;

    let filteredTravel = utils.filterById(travels, requiredId);

    const index = travels.indexOf(filteredTravel);

    if (index >= 0) {
        travels.splice(index, 1)

        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
            if (err) {
                res.status(500).send({ message: err })

            } else {
                res.status(200).json([{
                    "mensagem": "Viagem deletada",
                    travels
                }]);
            };
        });
    };
};

// substituir todo motorista APESAR do método PUT ser usado para substituir apenas uma parte
const replaceDriver = (req, res) => {
    const requiredId = req.params.id;
    const {
        name,
        license
    } = req.body;

    let filteredDriver = utils.filterById(travels, requiredId);
    
    const index = passengers.indexOf(filteredDriver);
    

    let updatedDriver = {
        id,
        name,
        license
    };

    if (index >= 0) { 
        travels.splice(index, 1, updatedDriver) 
        fs.writeFile("./src/models/passengers.json", JSON.stringify(travels), 'utf8', function(err) {
            if (err) {
                res.status(500).send({ message: err }) // caso de erro retorno status 500
            } else {
                res.status(200).json([{
                    "mensagem": "Motorista substituido no sistema com sucesso",
                    updatedDriver
                }]);
            }
        })
    } else {
        res.status(404).send({ message: "Motorista não encontrado para ser atualizado!" })
    }
};


module.exports = {
    getAllTravels,
    getTravelById,
    deleteTravel,
    createDriver, 
    replaceDriver
}