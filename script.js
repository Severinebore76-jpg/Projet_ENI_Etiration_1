fetch("promo.json")
  .then((response) => {
    if (!response.ok) throw new Error("Erreur chargement JSON");
    return response.json();
  })
  .then((data) => {
    const tbody = document.getElementById("apprenants-body");
    const cardsContainer = document.getElementById("apprenants-cards");

    // Zones à afficher/masquer
    const tableContainer = document.querySelector(".table-container");

    // Radios
    const radioListe = document.querySelector(
      'input[name="display"][value="liste"]'
    );
    const radioCartes = document.querySelector(
      'input[name="display"][value="cartes"]'
    );

    // 1) Remplir le tableau (LISTE)
    tbody.innerHTML = "";
    data.apprenants.forEach((apprenant) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.ville}</td>
        <td><button class="btn-detail" data-id="${apprenant.id}">Détail</button></td>
      `;
      tbody.appendChild(tr);
    });

    // 2) Créer les cartes (CARTES)
    cardsContainer.innerHTML = "";
    data.apprenants.forEach((apprenant) => {
      const card = document.createElement("div");
      card.className = "apprenant-card";
      card.innerHTML = `
        <div class="name">${apprenant.prenom} ${apprenant.nom}</div>
        <div class="city">${apprenant.ville}</div>
        <button class="btn-detail" data-id="${apprenant.id}">Détail</button>
      `;
      cardsContainer.appendChild(card);
    });

    // 3) Fonction de bascule (affiche l’un, masque l’autre)
    function setView(mode) {
      if (mode === "cartes") {
        tableContainer.classList.add("hidden");
        cardsContainer.classList.remove("hidden");
      } else {
        cardsContainer.classList.add("hidden");
        tableContainer.classList.remove("hidden");
      }
    }

    // Par défaut : LISTE (comme la consigne)
    setView("liste");
    radioListe.checked = true;

    // Quand l’utilisateur change
    radioListe.addEventListener("change", () => setView("liste"));
    radioCartes.addEventListener("change", () => setView("cartes"));

    // Bonus debug (tu peux enlever après)
    console.log("Switch prêt. Liste/Cartes OK.");
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });
