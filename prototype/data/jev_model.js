/* ICIP JEV-style decision model artifact.
   This is a local, deterministic adapter contract: it scores predefined evidence options.
   It is not a clinical decision engine and does not generate patient recommendations. */
window.ICIP_JEV={
  modelName:'ICIP-JEV evidence decision model',
  version:'0.1-prototype',
  purpose:'Score evidence options for oncology intelligence, HEOR and market-access research',
  thresholds:{accept:0.78,review:0.55},
  weights:{quality:0.30,applicability:0.25,recency:0.15,consistency:0.20,provenance:0.10},
  profiles:{
    'Breast cancer':[
      {claim:'ER/PR biomarker supports treatment stratification',option:'SUPPORTED',quality:.90,applicability:.90,recency:.80,consistency:.90,provenance:.85,source:'Pathology/NGS mapping required'},
      {claim:'KEYNOTE-522 evidence is transferable to every breast-cancer cohort',option:'NOT SUPPORTED',quality:.80,applicability:.35,recency:.85,consistency:.80,provenance:.85,source:'Trial population and TNBC eligibility required'},
      {claim:'Market access should be evaluated with WTP/QALY and budget impact',option:'SUPPORTED',quality:.85,applicability:.90,recency:.75,consistency:.85,provenance:.80,source:'HEOR dataset / India context'}
    ],
    'Lung cancer':[
      {claim:'EGFR/ALK/ROS1 testing can change treatment eligibility',option:'SUPPORTED',quality:.90,applicability:.90,recency:.85,consistency:.90,provenance:.85,source:'NGS panel map'},
      {claim:'A live trial recruitment status is equivalent to efficacy',option:'NOT SUPPORTED',quality:.85,applicability:.80,recency:.90,consistency:.90,provenance:.90,source:'ClinicalTrials.gov status feed'},
      {claim:'OS/PFS estimates require line, biomarker and comparator context',option:'SUPPORTED',quality:.90,applicability:.90,recency:.85,consistency:.90,provenance:.85,source:'Landmark trial evidence view'}
    ],
    'Cervical cancer':[
      {claim:'HPV 16/18 is an etiologic evidence signal, not a treatment result',option:'SUPPORTED',quality:.90,applicability:.90,recency:.80,consistency:.90,provenance:.85,source:'NCRP/HPV evidence'},
      {claim:'Screening participation can be interpreted without denominator and programme context',option:'NOT SUPPORTED',quality:.80,applicability:.75,recency:.80,consistency:.85,provenance:.80,source:'HEOR screening dataset'},
      {claim:'Market access requires indication-level evidence and affordability inputs',option:'SUPPORTED',quality:.85,applicability:.90,recency:.75,consistency:.85,provenance:.80,source:'HEOR-market access view'}
    ],
    'Oral cavity cancer':[
      {claim:'PD-L1/HPV results require assay and specimen provenance',option:'SUPPORTED',quality:.90,applicability:.90,recency:.80,consistency:.90,provenance:.85,source:'Biomarker governance rule'},
      {claim:'Registry burden alone proves comparative treatment effectiveness',option:'NOT SUPPORTED',quality:.85,applicability:.80,recency:.80,consistency:.90,provenance:.85,source:'NCRP aggregate limitation'},
      {claim:'R&D pipeline signals should be separated from approved market access',option:'SUPPORTED',quality:.85,applicability:.90,recency:.75,consistency:.85,provenance:.80,source:'Drug-development watchlist'}
    ]
  }
};
