function genererPDF() {
    // On cible le conteneur principal
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (typeof html2pdf === "undefined") {
        alert("Erreur : la librairie PDF n'est pas chargée.");
        return;
    }

    // On cache les boutons pour qu'ils n'apparaissent pas sur le PDF
    if (btnArea) btnArea.style.display = 'none';

    // Synchronisation forcée des données saisies (Inputs et Checkbox)
    const inputs = element.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else {
            // On fige la valeur textuelle dans l'attribut HTML pour la capture
            input.setAttribute('value', (input.value || '').toUpperCase());
        }
    });

    // Gestion des zones éditables (signatures)
    const sigs = element.querySelectorAll('.sig-content');
    sigs.forEach(sig => {
        sig.setAttribute('data-value', sig.innerText.toUpperCase());
    });

    // Récupération du nom pour le fichier (ID adapté à PAXI)
    const nom = document.getElementById('nom_passager').value || "AGENT";

    const opt = {
        margin: [0, 0, 0, 0], // Marges à zéro pour éviter les décalages de page
        filename: `PAXI_INCIDENT_${nom}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 1, // Augmenté à 2 pour une meilleure netteté
            useCORS: true,
            letterRendering: true,
            scrollY: 0, // Force le rendu depuis le haut de la page
            windowWidth: document.documentElement.offsetWidth // Capture la largeur réelle
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    // Exécution de la génération
    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            // On réaffiche les boutons après la génération
            if (btnArea) btnArea.style.display = 'block';
        })
        .catch(err => {
            if (btnArea) btnArea.style.display = 'block';
            console.error("Erreur PDF:", err);
            alert("Erreur lors de la génération du PDF.");
        });
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
