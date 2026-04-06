function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btn = document.querySelector('.no-print');

    // Masquer le bouton avant la capture
    if (btn) btn.style.display = 'none';

    // Synchronisation des inputs pour qu'ils soient visibles sur l'image
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
        filename: 'PAXI_Incident_Rapport.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0,
            windowWidth: 794 // Force la largeur exacte d'un A4 en pixels
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        // Réafficher le bouton après
        if (btn) btn.style.display = 'block';
    });
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
