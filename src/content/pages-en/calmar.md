---
title: "CALMaR: connecting imaging with clinical questions"
description: "CALMaR: neuroimaging and clinical questions, with post-stroke aphasia as the first use case. A browser app, a full pipeline and an open, cited knowledge base of the aphasia literature."
fr: "calmar"
wide: true
---

<p class="eyebrow">Co-designed, Automated Lesion Mapping and Reporting</p>

Brain images contain valuable information, but analysing and interpreting them is not always accessible to clinical teams. CALMaR aims to connect neuroimaging with the questions speech pathologists ask in practice, through reproducible analyses and understandable reports.

## My role

I lead the project’s development at The University of Queensland and am the sole Chief Investigator on its EAIT Early Career Philanthropic Grant (2026–2027). My work connects pipeline development, clinical requirements, co-design and documentation.

The project is developed in affiliation with the Queensland Aphasia Research Centre and co-designed with Metro North Health speech pathologists and people with lived experience of aphasia.

## Two ways to use it

- **A web app that runs in the browser.** Load a structural MRI, review and correct the lesion, and read a report, with nothing to install. Images stay on the user’s computer.
- **A complete pipeline for research teams.** Notebooks that run in Neurodesk add a guided form, detailed quality control and further analyses, such as white-matter disconnection, acute stroke imaging and background brain health.

## The stroke aphasia knowledge base

Both draw on the [stroke aphasia knowledge base](https://aphasia-kb.app/), an open collection of what the research literature says about aphasia after stroke: which brain regions relate to which impairments, what predicts recovery and which therapies have evidence. Each finding is a single claim from a single paper, quoted with the passage it comes from, so anyone can open the paper and check. CALMaR reports cite these findings directly.

Papers are identified through systematic searches. A language model running locally drafts findings from each paper; people then review them, and every finding shows its review status. The [data and code](https://github.com/micmas/stroke-aphasia-kb) are open, and clinicians and researchers can help screen papers and review findings.

## The post-stroke aphasia workflow

<ol class="workflow"><li><strong>MRI images</strong><span>Load structural imaging.</span></li><li><strong>Lesion mapping</strong><span>Segment the lesion and locate the regions and connections it affects.</span></li><li><strong>Review</strong><span>Check and correct the lesion; decisions are documented.</span></li><li><strong>Cited report</strong><span>Relate the lesion to the research literature, with a source for each statement.</span></li></ol>

Processing runs locally, in the browser or in [Neurodesk](/en/neurodesk/), so patient images do not need to leave the computer, and each step records what it did and why.

## Explore CALMaR

<div class="feature-grid">
<article class="feature-card">

### Try the web app

Map a lesion and read its report in the browser, with example scans included.

[Open the web app](https://webapps.neurodesk.org/calmar/)

</article>
<article class="feature-card">

### Read the evidence

Browse the knowledge base: findings, papers and the passages that support them.

[Open the knowledge base](https://aphasia-kb.app/)

</article>
<article class="feature-card">

### Help check the evidence

Clinicians and researchers can screen papers or review findings, even a few minutes at a time.

[Get involved](https://aphasia-kb.app/#/involve)

</article>
<article class="feature-card">

### Run the full pipeline

Code and notebooks for research teams working in Neurodesk.

[Code on GitHub](https://github.com/micmas/calmar)

</article>
</div>

New to neuroimaging? The [CALMaR guide](https://how-to-calmar.github.io/) explains the concepts behind each step.

## Use cases and development

- **First use case: post-stroke aphasia.** The work focuses on lesion mapping and interpretable reports for clinical teams.
- **In development: a version for neurodegenerative conditions.** I am adapting the approach to neuroimaging questions specific to these conditions.
- **Planned next: traumatic brain injury (TBI).** A TBI version is a future development I intend to pursue after this work.

## Project stage

CALMaR is in development. The web app, code, knowledge base and guide are open. The knowledge base is still growing, and many findings are awaiting review. Clinical usefulness and workflow reliability remain questions to evaluate; open availability does not itself demonstrate clinical effectiveness.

## Collaboration

I welcome discussion with teams interested in neuroimaging in stroke, neurodegenerative conditions or TBI, accessible reports, co-design and the evaluation of clinical workflows. I am also looking for clinicians and researchers to help review the evidence in the knowledge base.

[Discuss CALMaR](/en/contact/) · [Explore Neurodesk](/en/neurodesk/)
