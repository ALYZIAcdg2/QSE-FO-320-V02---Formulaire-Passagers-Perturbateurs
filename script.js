function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (!element) {
        alert("Erreur : conteneur #document-to-print introuvable.");
        return;
    }

    if (btnArea) btnArea.style.display = 'none';

    // Figer les valeurs saisies pour la capture PDF
    const fields = element.querySelectorAll('input, textarea');
    fields.forEach(field => {
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

    const editableZones = element.querySelectorAll('[contenteditable="true"]');
    editableZones.forEach(zone => {
        zone.setAttribute('data-value', zone.innerText || '');
    });

    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : "incident";

    // Largeur/hauteur réelles du document
    const elementWidth = Math.ceil(element.scrollWidth);
    const elementHeight = Math.ceil(element.scrollHeight);

    const opt = {
        margin: [0, 0, 0, 0],
        filename: `PAXI_INCIDENT_${nom || "incident"}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
            width: elementWidth,
            height: elementHeight,
            windowWidth: elementWidth,
            windowHeight: elementHeight
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
            if (btnArea) btnArea.style.display = 'block';
            console.error("Erreur PDF :", err);
            alert("Erreur lors de la génération du PDF.");
        });
}

function envoyerEmail() {
    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : "INCONNU";

    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
function envoyerEmail() {
    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : "INCONNU";

    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
