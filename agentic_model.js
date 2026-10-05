/* Deterministic, read-only agents for the public ICIP research prototype. */
window.ICIP_AGENTS = {
  version: '0.1.0-local',
  mode: 'public-research-demo',
  agents: [
    { id: 'data-refresh', name: 'Data Refresh Agent', purpose: 'Checks source vintage and refresh state.' },
    { id: 'disease-intelligence', name: 'Disease Intelligence Agent', purpose: 'Summarizes selected cancer burden and stage evidence.' },
    { id: 'heor', name: 'HEOR Agent', purpose: 'Links outcomes, burden, cost and market-access hypotheses.' },
    { id: 'governance', name: 'Governance Agent', purpose: 'Applies DPDP, provenance, disclosure and human-review gates.' },
    { id: 'evidence-review', name: 'Evidence Review Agent', purpose: 'Checks citation coverage and uncertainty before release.' }
  ],
  run({ cancer, row, heorSource }) {
    const hasAggregate = !!row && Number(row[9] || 0) > 0;
    const checks = [
      { agent: 'Data Refresh Agent', status: 'PASS', detail: 'NCRP aggregate row loaded; source vintage 2022.' },
      { agent: 'Disease Intelligence Agent', status: hasAggregate ? 'PASS' : 'REVIEW', detail: hasAggregate ? `${cancer} burden fields mapped.` : 'No selected burden row.' },
      { agent: 'HEOR Agent', status: heorSource ? 'PASS' : 'REVIEW', detail: heorSource ? 'HEOR workbook evidence is available for this cohort.' : 'HEOR cohort match requires review.' },
      { agent: 'Governance Agent', status: 'PASS', detail: 'No patient identifiers; public/synthetic research scope only.' },
      { agent: 'Evidence Review Agent', status: 'REVIEW', detail: 'Human review required before external publication or clinical use.' }
    ];
    const pass = checks.filter(x => x.status === 'PASS').length;
    return { cancer, checks, pass, total: checks.length, decision: pass === checks.length ? 'READY FOR RESEARCH REVIEW' : 'HOLD FOR REVIEW', generatedAt: new Date().toISOString() };
  }
};
