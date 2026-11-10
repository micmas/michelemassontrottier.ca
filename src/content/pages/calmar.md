---
title: "CALMaR : de l’imagerie aux questions cliniques"
description: "CALMaR : neuroimagerie et questions cliniques, avec un premier cas d’utilisation en aphasie post-AVC. Une application web, une chaîne de traitement complète et une base de connaissances ouverte et sourcée sur l’aphasie."
wide: true
---

<p class="eyebrow">Co-designed, Automated Lesion Mapping and Reporting</p>

Les images du cerveau sont riches en information, mais leur analyse et leur interprétation ne sont pas toujours accessibles aux équipes cliniques. CALMaR vise à rapprocher la neuroimagerie des questions que posent les orthophonistes, à l’aide d’analyses reproductibles et de rapports compréhensibles.

## Mon rôle

Je dirige le développement du projet à The University of Queensland et suis l’investigatrice principale de la subvention EAIT Early Career Philanthropic Grant (2026–2027). Mon travail relie le développement de la chaîne de traitement, les besoins cliniques, la co-conception et la documentation.

Le projet est développé en affiliation avec le Queensland Aphasia Research Centre et en co-conception avec les orthophonistes de Metro North Health et des personnes ayant une expérience vécue de l’aphasie.

## Deux façons de l’utiliser

- **Une application web qui fonctionne dans le navigateur.** Charger une IRM structurelle, examiner et corriger la lésion, puis lire un rapport, sans rien installer. Les images restent sur l’ordinateur de l’utilisateur.
- **Une chaîne de traitement complète pour les équipes de recherche.** Des notebooks qui s’exécutent dans Neurodesk ajoutent un formulaire guidé, un contrôle de qualité détaillé et d’autres analyses, comme la déconnexion de la substance blanche, l’imagerie de l’AVC aigu et la santé cérébrale de fond.

## La base de connaissances sur l’aphasie post-AVC

Les deux s’appuient sur la [base de connaissances sur l’aphasie post-AVC](https://aphasia-kb.app/) (en anglais), une collection ouverte de ce que dit la littérature scientifique sur l’aphasie après un AVC : quelles régions cérébrales sont liées à quelles atteintes, ce qui prédit la récupération et quelles thérapies sont appuyées par des données probantes. Chaque constat correspond à une seule affirmation tirée d’un seul article, citée avec le passage dont elle provient, de sorte que chacun peut ouvrir l’article et vérifier. Les rapports de CALMaR citent directement ces constats.

Les articles sont repérés par des recherches systématiques. Un modèle de langage exécuté localement rédige des ébauches de constats à partir de chaque article; des personnes les révisent ensuite, et chaque constat indique son statut de révision. Les [données et le code](https://github.com/micmas/stroke-aphasia-kb) sont ouverts, et les cliniciennes, cliniciens et chercheurs peuvent aider à trier des articles et à réviser des constats.

## Le parcours de traitement en aphasie post-AVC

<ol class="workflow"><li><strong>Images IRM</strong><span>Charger l’imagerie structurelle.</span></li><li><strong>Cartographie</strong><span>Segmenter la lésion et repérer les régions et les connexions touchées.</span></li><li><strong>Révision</strong><span>Vérifier et corriger la lésion; les décisions sont documentées.</span></li><li><strong>Rapport sourcé</strong><span>Mettre la lésion en lien avec la littérature scientifique, avec une source pour chaque énoncé.</span></li></ol>

Le traitement se fait localement, dans le navigateur ou dans [Neurodesk](/neurodesk/) : les images des patients n’ont pas à quitter l’ordinateur, et chaque étape consigne ce qu’elle a fait et pourquoi.

## Explorer CALMaR

<div class="feature-grid">
<article class="feature-card">

### Essayer l’application web

Cartographier une lésion et lire son rapport dans le navigateur, avec des exemples d’images inclus.

[Ouvrir l’application web](https://webapps.neurodesk.org/calmar/)

</article>
<article class="feature-card">

### Consulter les données probantes

Parcourir la base de connaissances : constats, articles et passages qui les appuient.

[Ouvrir la base de connaissances](https://aphasia-kb.app/)

</article>
<article class="feature-card">

### Aider à vérifier les données

Cliniciennes, cliniciens et chercheurs peuvent trier des articles ou réviser des constats, même quelques minutes à la fois.

[Participer](https://aphasia-kb.app/#/involve)

</article>
<article class="feature-card">

### Utiliser la chaîne complète

Le code et les notebooks pour les équipes de recherche qui travaillent dans Neurodesk.

[Code sur GitHub](https://github.com/micmas/calmar)

</article>
</div>

Vous découvrez la neuroimagerie? Le [guide CALMaR](https://how-to-calmar.github.io/) explique les concepts derrière chaque étape.

## Cas d’utilisation et développement

- **Premier cas d’utilisation : aphasie post-AVC.** Le travail porte sur la cartographie des lésions et la production de rapports interprétables pour les équipes cliniques.
- **En développement : une version pour les maladies neurodégénératives.** Je travaille à adapter l’approche aux questions de neuroimagerie propres à ces maladies.
- **Étape envisagée ensuite : traumatisme craniocérébral (TCC).** Une version pour le TCC fait partie des développements que je souhaite entreprendre par la suite.

## État du projet

CALMaR est en développement. L’application web, le code, la base de connaissances et le guide sont ouverts. La base de connaissances continue de s’enrichir, et de nombreux constats attendent encore une révision. L’utilité clinique et la fiabilité du workflow restent des questions à évaluer; la disponibilité ouverte de ces outils ne démontre pas à elle seule une efficacité clinique.

## Collaborations

Je souhaite échanger avec des équipes intéressées par la neuroimagerie de l’AVC, des maladies neurodégénératives ou du TCC, les rapports accessibles, la co-conception et l’évaluation de workflows cliniques. Je cherche aussi des cliniciennes, des cliniciens et des chercheurs pour aider à réviser les données de la base de connaissances.

[Discuter de CALMaR](/contactez-moi/) · [En savoir plus sur Neurodesk](/neurodesk/)
