# IPCP Responsible RWE Prototype

Open `index.html` in a browser. This is a zero-cost, local demo combining the supplied NCRP workbook snapshot with synthetic care-pathway records.

The prototype demonstrates:

- real NCRP 2022 site-wise incidence metrics from `India_Cancer_Incidence_NCRP_Data.xlsx`;
- HEOR reference data from `IPCP_India_Oncology_HEOR_Dataset.xlsx`: outcomes, screening, economic burden and HTA benchmarks;
- Disease Intelligence plus separate Tests/Diagnostics, Biomarkers vs stages, Clinical trials, and API/Drug Development views;
- Tests/Diagnostics adds named NGS panels, biomarker designations and stage-linked branded/INN molecule examples; Disease Intelligence deliberately excludes diagnostics and trial recruitment;
- Clinical trials combines live ClinicalTrials.gov recruitment with landmark OS/PFS evidence summaries and explicit NCCN/ESMO source-access status;
- API/Drug Development adds public PubChem/openFDA refreshes plus a global oncology pharma GCC/R&D watchlist;
- JEV evidence model adds a deterministic fixed-choice evidence gate with provenance, applicability, recency, consistency and quality weights;
- Vault longitudinal evidence adapts the source-linked workflow: bring in records → keep them safe → AI organises details → a person checks → approved records only;
- Vault evidence artifacts include source/page references, longitudinal events, verification queue, identity-mismatch holds, reviewer decisions and pilot measurement fields;
- disease-specific stage/biomarker charts, readiness pie charts, live recruitment graphs, and market-access-to-HEOR linkage;
- breast, lung, cervical and oral-cavity cohort views;
- top-site incidence graph and Power BI-ready CSV exports;
- FHIR-like observations and HGVS-style molecular provenance;
- an agent run with policy, consent, schema, cross-source and human-review gates;
- PHC/registry/NCG cross-check signals;
- export-blocking and small-cell disclosure controls.

To refresh from the source workbook, run from the project folder:

`node work/refresh_ncrp.mjs <path-to>/India_Cancer_Incidence_NCRP_Data.xlsx <output-folder>/data`

The refresh creates `ncrp_data.js` for the browser and CSVs for Power BI. The source workbook is never modified.

Refresh the HEOR workbook with:

`node work/refresh_heor.mjs <path-to>/IPCP_India_Oncology_HEOR_Dataset.xlsx <output-folder>/data`

This creates `heor_data.js` and four Power BI-ready HEOR CSV extracts.

The Clinical trials view uses the ClinicalTrials.gov API v2 at runtime when network access is available. The API/Drug Development view queries PubChem PUG and openFDA label search for public molecule identity/evidence signals. Each view displays its refresh time, source, and an explicit unavailable state when a public endpoint cannot be reached. CDSCO and NPPA are treated as controlled market-access evidence sources; molecule/indication-level approval and dossier data are not inferred.

It does not connect to live ABDM, Ayushman Bharat, hospital EHRs, genomic databases, or an external model. Those integrations require data-sharing agreements, ethics review, DPDP/ABDM controls, and a secured provider configuration.

The JEV artifact is stored in `data/jev_model.js`. It is a local prototype adapter, not a hosted JEV service or clinical decision system. A production connector must undergo model validation, security review, DPDP data-processing review, and human/IEC governance before it can replace the local deterministic scorer.

The Vault adaptation is stored in `data/vault_model.js` and is synthetic teaching data only. It is based on the supplied Vault Enterprise materials: source-linked evidence, human release gate, visible uncertainty, longitudinal timeline, reviewer queue, identity-mismatch handling, and pilot measures such as review time, field agreement, corrections and source traceability. It does not import or expose any real patient data from the PDFs.

## Publish with GitHub Pages

This folder is self-contained: `index.html` is the Pages entry point and the `data/` folder contains the browser artifacts. Create a public GitHub repository, upload the contents of this folder at repository root, then enable **Settings → Pages → Deploy from branch → main → /(root)**. Do not upload source PDFs, workbooks, credentials or private patient data; see `NOTICE.md`.
