function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (typeof html2pdf === "undefined") {
        showAlert("Erreur : la librairie PDF n'est pas chargée.");
        return;
    }

    if (btnArea) btnArea.style.display = 'none';

    // Synchronisation forcée des données saisies
    const inputs = element.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else {
            input.setAttribute('value', (input.value || '').toUpperCase());
        }
    });

    const sigs = element.querySelectorAll('.sig-content');
    sigs.forEach(sig => {
        sig.innerHTML = sig.innerText.toUpperCase();
    });

    const nom = document.getElementById('nom-agent').value || "AGENT";

    const opt = {
        margin: [5, 5, 5, 5],
        filename: `EVAL_DGR_${nom}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 1,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            letterRendering: true
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
        })
        .catch(err => {
            if (btnArea) btnArea.style.display = 'block';
            console.error("Erreur PDF:", err);
            showAlert("Erreur lors de la génération du PDF.");
        });
}

function envoyerEmail() {
    const nom = document.getElementById('nom_passager').value || "INCONNU";
    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
