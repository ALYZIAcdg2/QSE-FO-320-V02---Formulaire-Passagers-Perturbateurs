function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (!element) {
        alert("Erreur : conteneur #document-to-print introuvable.");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("Erreur : la librairie html2pdf n'est pas chargée.");
        return;
    }

    if (btnArea) btnArea.style.display = 'none';

    window.scrollTo(0, 0);

    // Figer les valeurs saisies pour la capture PDF
    const fields = element.querySelectorAll('input, textarea');
    fields.forEach((field) => {
        const type = (field.type || '').toLowerCase();

        if (type === 'checkbox' || type === 'radio') {
            if (field.checked) {
                field.setAttribute('checked', 'checked');
            } else {
                field.removeAttribute('checked');
            }
        } else {
            field.setAttribute('value', field.value || '');
        }
    });

    // Figer les zones éditables si présentes
    const editableZones = element.querySelectorAll('[contenteditable="true"]');
    editableZones.forEach((zone) => {
        zone.setAttribute('data-value', zone.innerText || '');
    });

    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : 'incident';

    const opt = {
        margin: [0, 0, 0, 0],
        filename: `PAXI_INCIDENT_${nom}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        pagebreak: {
            mode: ['avoid-all']
        }
    };

    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            if (btnArea) btnArea.style.display = 'block';
        })
        .catch((err) => {
            console.error('Erreur PDF :', err);
            alert("Erreur lors de la génération du PDF.");
            if (btnArea) btnArea.style.display = 'block';
        });
}

function envoyerEmail() {
    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : 'INCONNU';

    function envoyerPDFPowerAutomate(blob) {
    const reader = new FileReader();

    reader.onloadend = function () {
        const base64data = reader.result.split(',')[1];

        fetch("TON_URL_POWER_AUTOMATE", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                file: base64data,
                filename: "PAXI_INCIDENT.pdf"
            })
        })
        .then(() => alert("PDF envoyé + stocké + mail envoyé ✅"))
        .catch(() => alert("Erreur envoi ❌"));
    };

    reader.readAsDataURL(blob);
}
    

    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
html2pdf()
    .from(element)
    .outputPdf('blob')
    .then(function (pdfBlob) {
        envoyerPDFPowerAutomate(pdfBlob);
    });
