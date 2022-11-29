const Boissons = [
  {
    id: 1,
    name: "Triple Secret des moines",
    degre: 8,
    picture: "http://brasserie-goudale.com/wp-content/uploads/2018/05/Triple-fond-7499.jpg",
    categorie: "Bière",
    taillesPrix: {
      "25cl": "3€",
      "50cl": "5€",
      "1L": "10€"
    },
    dispo: true,
    description: 'Lorem Ipsum'
  },
  {
    id: 2,
    name: "Cuvée des trolls",
    degre: 7,
    picture: "https://www.dubuisson.com/wp-content/uploads/2018/06/logo-trolls-1-300x300.png",
    categorie: "Bière",
    taillesPrix: {
      "25cl": "3€",
      "50cl": "5€",
      "1L": "10€"
    },
    dispo: true,
    description: 'Lorem Ipsum'
  },
  {
    id: 3,
    name: "Coca",
    degre: 0,
    picture: "https://logo-marque.com/wp-content/uploads/2020/08/Coca-Cola-Embleme.png",
    categorie: "Soft",
    taillesPrix: {
      "1L": "5€"
    },
    dispo: true,
    description: 'Lorem Ipsum'
  },
];

module.exports = Boissons;