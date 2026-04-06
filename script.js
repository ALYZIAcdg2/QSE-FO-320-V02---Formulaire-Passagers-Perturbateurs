function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btn = document.querySelector('.btn-area');

    if (btn) btn.style.display = 'none';

    // Synchronisation forcée des données pour le PDF
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
        margin: 0, // Indispensable pour éviter le décalage
        filename: 'PAXI_Rapport_Incident.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0, 
            windowWidth: 794 // Aligné sur la largeur A4 pour éviter la coupure gauche
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        if (btn) btn.style.display = 'block';
    });
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
