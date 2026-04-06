function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    // Masquage temporaire des boutons pour le PDF
    if (btnArea) btnArea.style.display = 'none';

    // Synchronisation forcée des données saisies (Inputs et Checkbox)
    const inputs = element.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) input.setAttribute('checked', 'checked');
            else input.removeAttribute('checked');
        } else {
            // Fixe la valeur dans le DOM pour la capture
            input.setAttribute('value', input.value.toUpperCase());
        }
    });

    const nom = document.getElementById('nom_passager').value || "AGENT";

    const opt = {
        margin: 0, // Suppression des marges pour correspondre au mode "Sans Marge"
        filename: `PAXI_INCIDENT_${nom}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            letterRendering: true,
            scrollY: 0,
            // FORCE la largeur de capture à 794px (équivalent A4 à 96 DPI)
            // Cela empêche le document de "baver" vers la droite ou le bas
            windowWidth: 794 
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            if (btnArea) btnArea.style.display = 'block';
        });
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
