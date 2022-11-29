const nomBDD = 'barV1' // mettre le meme nom que la bdd dans phpMyAdmin
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(nomBDD, "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
try {
  sequelize.authenticate();
  console.log('Connexion sequelize réussie.');
} catch (error) {
  console.error('Erreur:', error);
}
const BoissonModel = require("./src/models/boissons");
const Boisson = BoissonModel(sequelize, DataTypes); // les boissons de la bdd
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 8000;
app
  .use(bodyParser.json())// IMPORTANT POUR CREER ET MODIFIER BOISSON 
  .use(cors());

app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`));

// findAll Boissons : OK
app.get("/api/getAll-boissons", (req, res) => {
  Boisson.findAll({ order: ["id"] })
    .then((Boissons) => {
      const message = "La liste des boissons a bien été récupérée.";
      res.json({ message, boissons: Boissons });
    })
    // recup l'erreur 500
    .catch((error) => {
      const message = `La liste des boissons  n'a pas pu être récupérée. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
})
// get une boisson avec son id : OK
app.get("/api/getOne-boissons/:id", (req, res) => {
  const id = req.params.id;
  Boisson.findByPk(id)
    .then((Boisson) => {
      if (Boisson === null) {
        const message = "La boisson demandée n'existe pas. Réessayez avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `La boisson ${Boisson.name} a bien été récupérée.`;
      res.json({ message, boisson: Boisson });
    })
    .catch(error => console.log(error))
});
// modif une boissons : OK
app.put("/api/modif-boisson/:id", (req, res) => {
  const id = req.params.id;
  Boisson.update(req.body, {
    where: { id: id },
  })
  Boisson.findByPk(id)
    .then((Boisson) => {
      if (Boisson === null) {
        const message = "La boisson demandée n'existe pas. Réessayez avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      if (req.body.name != Boisson.name) {
        const message = `La boisson ${Boisson.name} a bien été modifiée et renommée en : ${req.body.name}.`;
        res.json({ message, ancienne_Boisson: Boisson, nouvelle_Boisson: req.body });
      }
      const message = `La boisson ${Boisson.name} a bien été modifiée.`;
      res.json({ message, ancienne_Boisson: Boisson, nouvelle_Boisson: req.body });
    })
    .catch(error => console.log(error))
});

// test ajout boisson OK
const { ValidationError, UniqueConstraintError } = require("sequelize");
app.post("/api/new-boisson", (req, res) => {
  Boisson.create(req.body)
    .then((Boisson) => {
      const message = `La boisson ${req.body.name} a bien été créer.`;
      res.json({ message, data: Boisson });
    })
    .catch((error) => {
      // si le nom est déja utilisé (fonctionne aussi sans) :
      if (error instanceof UniqueConstraintError) {
        const message = ` La boisson ${req.body.name} existe déjà`
        return res.status(400).json({ message, data: error });
      }
      if (error instanceof ValidationError) {
        const message = `La boisson ${req.body.name} n'a pas pu être créer ${error.message}`
        return res.status(400).json({
          message, data: error.message
        });
      }
      const message = "La boisson n'a pas pu être créer. Veuillez réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
})
// delete One-boisson
app.delete("/api/delete-boisson/:id", (req, res) => {
  const id = req.params.id;
  Boisson.findByPk(id)
    .then((Boisson) => {
      if (Boisson === null) {
        const message = "La boisson demandée n'existe pas.";
        return res.status(404).json({ message });
      }
      const BoissonSuppr = Boisson;
      Boisson.destroy({
        where: { id: Boisson.id },
      })
        .then((_) => {
          const message = `La boisson ${Boisson.name} avec l'id : ${BoissonSuppr.id} a bien été supprimée.`;
          res.json({ message, boissonSuppr: BoissonSuppr });
        })
        .catch((error) => {
          const message = `La boisson ${Boisson.name} n'a pas pu être supprimé. Veuillez réessayez dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    })
});
