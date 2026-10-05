/* UI adapter for the local ICIP agent orchestrator. */
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>\"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const map = { 'Breast cancer':'Breast', 'Lung cancer':'Lung and bronchus', 'Cervical cancer':'Uterine cervix', 'Oral cavity cancer':'Oral cavity and pharynx' };
  function selectedRow() {
    const rows = window.IPCP_NCRP_DATA?.sheets?.['Site-wise Incidence 2022'] || [];
    return rows.slice(4).find(r => r[0] === map[$('cohort').value]);
  }
  function renderAgents() {
    if ($('view').value !== 'agents') return;
    const cancer = $('cohort').value, row = selectedRow();
    const heor = window.IPCP_HEOR_DATA?.sheets?.Outcomes_by_Cancer?.some(r => r[0] === map[cancer]);
    const result = window.ICIP_AGENTS.run({ cancer, row, heorSource: heor });
    $('detail-title').textContent = `${cancer} · agentic AI control plane`;
    const cards = window.ICIP_AGENTS.agents.map(a => `<div class="record"><div><b>${esc(a.name)}</b><br><small>${esc(a.purpose)}</small></div><span class="tag ok">READ-ONLY</span></div>`).join('');
    const checks = result.checks.map(x => `<div class="agent-step"><b>${esc(x.agent)}</b><span>${esc(x.detail)} <span class="tag ${x.status==='PASS'?'ok':'warn'}">${x.status}</span></span></div>`).join('');
    $('detail').innerHTML = `<div class="evidence"><b>Orchestrator decision:</b> ${esc(result.decision)} · ${result.pass}/${result.total} gates passed · <small>run ${esc(result.generatedAt)}</small></div><h3 style="margin:16px 0 6px">Specialist agents</h3>${cards}<h3 style="margin:16px 0 6px">Guarded execution trace</h3>${checks}<div class="notice"><b>Safety boundary:</b> this browser agent layer only reads public/aggregate or synthetic data. It cannot diagnose, prescribe, recruit participants, write to an EHR, or release evidence without human review. Connect a production model only through a secured backend with DPDP, access control, audit logging and secret management.</div>`;
    $('steps').innerHTML = `<div class="agent-step"><b>Orchestrator</b><span>${esc(result.decision)} <span class="tag ${result.pass >= 3 ? 'ok' : 'warn'}">${result.pass}/${result.total}</span></span></div>`;
    $('answer').innerHTML = `<b>${esc(cancer)}:</b> the agent run is deterministic and source-aware. Review the trace before using any output in a research artifact.`;
  }
  $('view').addEventListener('change', renderAgents);
  $('cohort').addEventListener('change', renderAgents);
  $('run').addEventListener('click', renderAgents);
  renderAgents();
})();
