(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>\"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const map = { 'Breast cancer':'Breast', 'Lung cancer':'Lung and bronchus', 'Cervical cancer':'Uterine cervix', 'Oral cavity cancer':'Oral cavity and pharynx' };
  function render() {
    if ($('view').value !== 'destiny1') return;
    const cancer = $('cohort').value;
    const rows = window.IPCP_NCRP_DATA?.sheets?.['Site-wise Incidence 2022'] || [];
    const ncrpRow = rows.slice(4).find(r => r[0] === map[cancer]);
    const heorMatch = window.IPCP_HEOR_DATA?.sheets?.Outcomes_by_Cancer?.some(r => r[0] === map[cancer]);
    const jevItems = window.ICIP_JEV?.profiles?.[cancer] || [];
    const jevScores = jevItems.map(x => x.quality * .30 + x.applicability * .25 + x.recency * .15 + x.consistency * .20 + x.provenance * .10);
    const jevDecision = jevScores.length && Math.max(...jevScores) >= .78 ? 'ACCEPT' : 'REVIEW';
    const result = window.ICIP_DESTINY1.evaluate({ cancer, ncrpRow, heorMatch, sourceTrace: true, humanReview: false }, jevDecision);
    $('detail-title').textContent = `${cancer} · Destiny 1 + JEV model`; 
    $('detail').innerHTML = `<div class="evidence"><b>Model type:</b> ${esc(result.modelType)} · ${esc(result.version)}<br><b>Decision:</b> <span class="tag ${result.decision==='READY FOR RESEARCH REVIEW'?'ok':'warn'}">${esc(result.decision)}</span> · score ${Math.round(result.score*100)}/100 · JEV ${esc(result.jevDecision)}</div><div class="metrics"><div class="metric"><strong>${result.completeness}%</strong><span>input completeness</span></div><div class="metric"><strong>${result.profile.stages.length}</strong><span>stage contexts</span></div><div class="metric"><strong>${result.profile.biomarkers.length}</strong><span>biomarker domains</span></div><div class="metric"><strong>${result.profile.signals.length}</strong><span>evidence signals</span></div></div><h3 style="margin:16px 0 6px">Destiny 1 evidence profile</h3><div class="record"><b>Stage contexts</b><span>${result.profile.stages.map(esc).join(' · ')}</span></div><div class="record"><b>Biomarker domains</b><span>${result.profile.biomarkers.map(esc).join(' · ')}</span></div><div class="record"><b>Connected signals</b><span>${result.profile.signals.map(esc).join(' · ')}</span></div><div class="agent-step"><b>JEV gate</b><span>Evidence disposition returned ${esc(result.jevDecision)} <span class="tag ${result.jevDecision==='ACCEPT'?'ok':'warn'}">${esc(result.jevDecision)}</span></span></div><div class="notice"><b>Rationale:</b> ${esc(result.rationale)} No Destiny 1 output is a clinical recommendation or individual-patient prediction. A reviewer must approve any research artifact.</div>`;
    $('steps').innerHTML = `<div class="agent-step"><b>Destiny 1</b><span>${esc(result.decision)} <span class="tag ${result.decision==='READY FOR RESEARCH REVIEW'?'ok':'warn'}">${Math.round(result.score*100)}/100</span></span></div><div class="agent-step"><b>JEV</b><span>Source gate ${esc(result.jevDecision)}</span></div><div class="agent-step"><b>Governance</b><span>Human review required <span class="tag warn">HOLD</span></span></div>`;
    $('answer').innerHTML = `<b>${esc(cancer)}:</b> Destiny 1 has produced a source-aware research-readiness assessment. Review the evidence trace before publication.`;
  }
  $('view').addEventListener('change', render); $('cohort').addEventListener('change', render); $('run').addEventListener('click', render); render();
})();
