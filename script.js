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
    // On cible l'élément à imprimer
    const element = document.getElementById('document-to-print');
    
    // On récupère le nom et le numéro de fiche pour le nom du fichier
    const nom = document.getElementById('nom_passager').value || "Sans_Nom";
    const fiche = document.getElementById('num_fiche').value || "000";

    const options = {
        margin: 0,
        filename: `Rapport_Incident_${nom}_Fiche_${fiche}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            letterRendering: true 
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    // Lancement de la génération
    html2pdf().set(options).from(element).save();
}

// FONCTION POUR L'ENVOI PAR MAIL (Préparation)
function envoyerEmail() {
    alert("La fonction d'envoi par mail nécessite une configuration EmailJS avec vos identifiants.");
}