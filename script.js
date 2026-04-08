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

async function envoyerEmail() {
    const element = document.getElementById('document-to-print');
    const btnArea = document.querySelector('.btn-area');
    const bouton = document.querySelector('.btn.envoyer');

    const nomInput =
        document.getElementById('nom_passager') ||
        document.getElementById('nom-passager') ||
        document.querySelector('input[name="nom_passager"]');

    const nom = nomInput && nomInput.value ? nomInput.value.trim() : 'INCONNU';

    try {
        bouton.disabled = true;
        bouton.innerText = "ENVOI EN COURS...";

        if (btnArea) btnArea.style.display = 'none';

        // Figer les champs comme ton PDF
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

        const editableZones = element.querySelectorAll('[contenteditable="true"]');
        editableZones.forEach((zone) => {
            zone.setAttribute('data-value', zone.innerText || '');
        });

        const opt = {
            margin: [0, 0, 0, 0],
            filename: `PAXI_INCIDENT_${nom}.pdf`,
            image: { type: 'jpeg', quality: 0.95 },
html2canvas: {
    scale: 0.6,
    useCORS: true
},
image: { type: 'jpeg', quality: 0.5 },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // Génération PDF sans téléchargement
        const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');

        // Conversion base64
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = () => resolve(reader.result);
        });

        // 🔥 ENVOI EMAILJS
        await emailjs.send("service_ddubyvm", "template_f5eltxm", {
            to_email: "votre-email@alyzia.com",
            subject: `PAXI Incident - ${nom}`,
            message: `Nouveau rapport généré pour : ${nom}`,
            attachment: base64
        });

        alert("Email envoyé avec succès ✅");

    } catch (error) {
        console.error(error);
        alert("Erreur lors de l'envoi ❌");
    } finally {
        bouton.disabled = false;
        bouton.innerText = "ENVOYER EMAIL";
        if (btnArea) btnArea.style.display = 'block';
    }
}
