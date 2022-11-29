
const validCategories = ["Bière", "Soft"];
module.exports = (sequelize, DataTypes) => {
  // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
  return sequelize.define(
    "Boisson",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // contrainte pour que le nom soit unique
        unique: {
          msg: "Le nom est déjà utilisé",
        },
        validate: {
          len: { args: [3, 25], msg: "Le champ name doit être de 3 caractères au minimum 25 au max" },
          notNull: { msg: 'Le champ name est requis , il ne peut être de type "null".' },
          notEmpty: { msg: "Le champ name est requis." },
        },
      },

      degre: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isNumeric: { msg: "Utilisez uniquement des nombres pour les degrés." },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "L'image doit être une URL valide" },
          notNull: { msg: "Le champ picture est requis." },
        },
      }, categorie: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          categorieValid(value) {
            if (!value) {
              throw new Error("Un produit doit appartenir à une catégorie")
            }
            // if (!validCategories.includes(value)) {
            //   throw new Error(`Les catégories valides sont : ${validCategories}`);
            // }
          }
        }
      },
      taillesPrix: {
        type: DataTypes.STRING,
        allowNull: false,

        get() {
          // return this.getDataValue("taillesPrix");
          const objPrix = JSON.parse(this.getDataValue("taillesPrix")); // reconverti en object pour le fetch
          return objPrix;
        },
        set(taillesPrix) {
          this.setDataValue("taillesPrix", JSON.stringify(taillesPrix));  // converti en chaine pour la bdd
        }
      },
      dispo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },

    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
