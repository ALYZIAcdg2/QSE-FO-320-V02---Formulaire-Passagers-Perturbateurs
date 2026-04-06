document.addEventListener("DOMContentLoaded", () => {
    // Gestion des cases à cocher manuelles (si nécessaire)
    document.querySelectorAll('.check-item').forEach(item => {
        item.addEventListener('click', () => {
            item.textContent = item.textContent.includes('☐')
                ? item.textContent.replace('☐','☑')
                : item.textContent.replace('☑','☐');
        });
    });
});

function genererPDF() {
    const element = document.getElementById('document-to-print');
    
    // Récupération des infos pour le nom du fichier
    const nom = document.getElementById('nom_passager').value || "Sans_Nom";
    const fiche = document.getElementById('num_fiche').value || "000";

    const opt = {
        margin: 0,
        filename: `Rapport_Incident_${nom}_Fiche_${fiche}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            width: 794, // Correspond à la largeur A4 en pixels (96 DPI)
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    // Utilisation de la promesse pour s'assurer du rendu complet
    html2pdf().set(opt).from(element).save();
}

// FONCTION POUR L'ENVOI PAR MAIL (Préparation)
function envoyerEmail() {
    alert("La fonction d'envoi par mail nécessite une configuration EmailJS avec vos identifiants.");
}