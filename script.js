function genererPDF() {
    // Ciblage du conteneur principal (ID correspondant à votre index.html)
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (!element) {
        alert("Erreur : Conteneur de document non trouvé.");
        return;
    }

    // On cache les boutons d'action pour le PDF
    if (btnArea) btnArea.style.display = 'none';

    // Synchronisation forcée des données saisies (Inputs, Textarea et Checkbox)
    // C'est cette étape qui permet de voir les "croix" et le texte dans le PDF généré
    const inputs = element.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else {
            // Fixe la valeur textuelle dans le DOM pour la capture "photo"
            input.setAttribute('value', (input.value || '').toUpperCase());
        }
    });

    // Gestion des signatures (zones contenteditable)
    const sigs = element.querySelectorAll('.sig-content');
    sigs.forEach(sig => {
        sig.setAttribute('data-value', sig.innerText.toUpperCase());
    });

    // Récupération du nom pour le nom du fichier (ID : nom_passager)
    const nom = document.getElementById('nom_passager').value || "AGENT";

    const opt = {
        margin: [0, 0, 0, 0], // Indispensable pour éviter le décalage sur 2 pages
        filename: `PAXI_INCIDENT_${nom}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2, // Améliore la netteté du texte
            useCORS: true,
            letterRendering: true,
            scrollY: 0, // Force la capture depuis le haut du formulaire
            // FORCE la largeur à 794px (largeur A4 standard à 96 DPI)
            // Cela empêche le document d'être coupé sur la gauche
            windowWidth: 794 
        },
jsPDF: {
    unit: 'mm',
    format: [210, 297],
    orientation: 'portrait'
}
    };

    // Lancement de la génération
html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true,
    scrollY: 0,
    windowWidth: 794,   // largeur A4 exacte
    windowHeight: 1123  // 🔥 hauteur A4 (clé du problème)
},

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
