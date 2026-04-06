function genererPDF() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');

    if (!element) {
        alert("Erreur : conteneur introuvable.");
        return;
    }

    if (btnArea) btnArea.style.display = 'none';

    // Fix inputs
    const fields = element.querySelectorAll('input, textarea');
    fields.forEach((field) => {
        if (field.type === 'checkbox' || field.type === 'radio') {
            if (field.checked) {
                field.setAttribute('checked', 'checked');
            } else {
                field.removeAttribute('checked');
            }
        } else {
            field.setAttribute('value', field.value || '');
        }
    });

    const opt = {
        margin: [0, 0, 0, 0],
        filename: 'PAXI_INCIDENT.pdf',
        image: { type: 'jpeg', quality: 1 },

        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0
        },

        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },

        pagebreak: { mode: ['avoid-all'] }
    };

    html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {

            const pageHeight = pdf.internal.pageSize.getHeight();
            const pageWidth = pdf.internal.pageSize.getWidth();

            const canvas = document.querySelector('canvas');
            const imgHeight = canvas.height;
            const imgWidth = canvas.width;

            const ratio = pageWidth / imgWidth;
            const finalHeight = imgHeight * ratio;

            // 👉 Ajustement vertical automatique
            if (finalHeight < pageHeight) {
                const yOffset = (pageHeight - finalHeight) / 2;
                pdf.addImage(canvas, 'JPEG', 0, yOffset, pageWidth, finalHeight);
            } else {
                pdf.addImage(canvas, 'JPEG', 0, 0, pageWidth, finalHeight);
            }

        })
        .save()
        .finally(() => {
            if (btnArea) btnArea.style.display = 'block';
        });
}

function envoyerEmail() {
    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : 'INCONNU';

    const sujet = encodeURIComponent(`PAXI Incident - ${nom}`);
    const corps = encodeURIComponent(`Nouveau rapport d'incident généré pour : ${nom}`);
    window.location.href = `mailto:votre-email@alyzia.com?subject=${sujet}&body=${corps}`;
}
