/* ICIP adaptation of the Vault Enterprise source-linked longitudinal evidence pattern.
   All records below are synthetic teaching data; no real patient data is included. */
window.ICIP_VAULT={
  modelName:'ICIP source-linked longitudinal evidence workspace',
  version:'0.1-prototype',
  synthetic:true,
  workflow:['Bring in records','Keep it safe','AI organises details','A person checks','Use approved records'],
  profiles:{
    'Breast cancer':{recordId:'ICIP-SYN-BR-0007',patient:'Synthetic patient A',documents:5,events:[
      {date:'2024-01-12',type:'Pathology report',source:'DOC-BR-001 · page 3',detail:'Invasive breast carcinoma · ER/PR/HER2 fields proposed',status:'REVIEW'},
      {date:'2024-02-03',type:'Imaging report',source:'DOC-BR-002 · page 2',detail:'Regional node assessment · source-linked',status:'VERIFIED'},
      {date:'2024-03-15',type:'Treatment note',source:'DOC-BR-003 · page 1',detail:'Surgery and systemic-treatment plan proposed',status:'REVIEW'},
      {date:'2024-08-20',type:'Follow-up note',source:'DOC-BR-004 · page 1',detail:'Adverse-event field · reviewer confirmation pending',status:'HOLD'}]},
    'Lung cancer':{recordId:'ICIP-SYN-LU-0014',patient:'Synthetic patient B',documents:5,events:[
      {date:'2024-01-09',type:'Pathology report',source:'DOC-LU-001 · page 4',detail:'NSCLC histology · EGFR/ALK/ROS1 fields proposed',status:'REVIEW'},
      {date:'2024-02-28',type:'Molecular report',source:'DOC-LU-002 · page 1',detail:'NGS result · assay and specimen provenance linked',status:'VERIFIED'},
      {date:'2024-04-02',type:'Imaging report',source:'DOC-LU-003 · page 2',detail:'Metastatic-site assessment · source-linked',status:'VERIFIED'},
      {date:'2024-09-11',type:'Treatment note',source:'DOC-LU-004 · page 1',detail:'Targeted therapy line · reviewer confirmation pending',status:'REVIEW'}]},
    'Cervical cancer':{recordId:'ICIP-SYN-CE-0021',patient:'Synthetic patient C',documents:5,events:[
      {date:'2024-01-18',type:'HPV/pathology report',source:'DOC-CE-001 · page 2',detail:'HPV genotype and pathology fields proposed',status:'REVIEW'},
      {date:'2024-03-04',type:'Imaging report',source:'DOC-CE-002 · page 1',detail:'Locoregional extent · source-linked',status:'VERIFIED'},
      {date:'2024-05-19',type:'Treatment note',source:'DOC-CE-003 · page 1',detail:'Chemoradiation plan proposed',status:'REVIEW'},
      {date:'2024-10-01',type:'Follow-up note',source:'DOC-CE-004 · page 1',detail:'Outcome field has a deliberate identity mismatch',status:'HOLD'}]},
    'Oral cavity cancer':{recordId:'ICIP-SYN-OR-0032',patient:'Synthetic patient D',documents:5,events:[
      {date:'2024-02-06',type:'Pathology report',source:'DOC-OR-001 · page 3',detail:'Oral cavity squamous-cell carcinoma · biomarker fields proposed',status:'REVIEW'},
      {date:'2024-03-21',type:'Imaging report',source:'DOC-OR-002 · page 2',detail:'Local and nodal extent · source-linked',status:'VERIFIED'},
      {date:'2024-05-07',type:'Treatment note',source:'DOC-OR-003 · page 1',detail:'Surgery/radiation plan proposed',status:'REVIEW'},
      {date:'2024-11-12',type:'Follow-up note',source:'DOC-OR-004 · page 1',detail:'Unclear recurrence field held for reviewer',status:'HOLD'}]}
  },
  proposals:[
    {field:'Cancer site',value:'Selected cohort',source:'source document + page reference',decision:'APPROVED'},
    {field:'Stage/TNM',value:'Proposed from pathology/imaging',source:'source document + page reference',decision:'REVIEW'},
    {field:'Biomarker result',value:'Proposed from pathology/NGS',source:'assay report + specimen provenance',decision:'REVIEW'},
    {field:'Treatment event',value:'Proposed from treatment note',source:'source document + date',decision:'REVIEW'},
    {field:'Outcome / adverse event',value:'Held when unclear or mismatched',source:'follow-up note + identity check',decision:'HOLD'}
  ],
  metrics:{syntheticPatients:20,syntheticDocuments:100,reportTypes:5,identityMismatchesTested:2,annualCasesDiscussed:'70,000+',plannedScale:'130,000',measures:['Review time per case','Field agreement vs reference','Reviewer corrections','Source traceability','Identity mismatch handling']},
  pilot:{phase1:'20 synthetic cases · $0',phase2:'100 customer cases · $0',phase3:'500 cases · $5/case',phase4:'1,000 cases · $3.5/case',enterprise:'$250K-$450K/year · jointly scoped'}
};
