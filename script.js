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

// FONCTION POUR GÉNÉRER LE PDF
function genererPDF() {
    const element = document.getElementById('document-to-print');
    
    // On récupère les infos pour le nom du fichier
    const nom = document.getElementById('nom_passager').value || "Sans_Nom";
    const fiche = document.getElementById('num_fiche').value || "000";

    const options = {
        margin: [0, 0, 0, 0], // Aucune marge pour éviter les sauts de page
        filename: `Rapport_${nom}_Fiche_${fiche}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2, // Haute définition
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            precision: 32
        }
    };

    // Lancement de la capture
    html2pdf().set(options).from(element).save();
}

// FONCTION POUR L'ENVOI PAR MAIL (Préparation)
function envoyerEmail() {
    alert("La fonction d'envoi par mail nécessite une configuration EmailJS avec vos identifiants.");
}