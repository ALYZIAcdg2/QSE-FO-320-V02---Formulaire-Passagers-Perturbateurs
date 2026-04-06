function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (btnArea) btnArea.style.display = 'none';

    // Synchronisation forcée des données pour le rendu
    const inputs = element.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) input.setAttribute('checked', 'checked');
            else input.removeAttribute('checked');
        } else {
            input.setAttribute('value', input.value.toUpperCase());
        }
    });

    const opt = {
        margin: 0,
        filename: 'PAXI_INCIDENT.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0,
            windowWidth: 794 // FIXE la largeur pour éviter la coupure gauche
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        if (btnArea) btnArea.style.display = 'block';
    });
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
