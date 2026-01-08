fetch("promo.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur chargement JSON");
    }
    return response.json();
  })
  .then((data) => {
    const tbody = document.getElementById("apprenants-body");
    tbody.innerHTML = ""; // vide le tbody (retire le lorem)

    data.apprenants.forEach((apprenant) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.ville}</td>
        <td><a href="#">Détail</a></td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });
