/* Destiny 1 local model-type adapter for ICIP.
 * Deterministic research scoring only; no patient-level prediction or clinical advice.
 */
window.ICIP_DESTINY1 = {
  modelType: 'Destiny 1',
  version: '0.1.0-local',
  purpose: 'Rank evidence readiness for oncology RWE and HEOR research artifacts.',
  prohibitedUses: ['diagnosis', 'prescribing', 'trial recruitment', 'individual survival prediction'],
  profiles: {
    'Breast cancer': { stages: ['Locally advanced', 'Metastatic'], biomarkers: ['ER/PR', 'HER2', 'BRCA1/2', 'PIK3CA'], signals: ['NCRP burden', 'HEOR outcomes', 'stage/biomarker map'] },
    'Lung cancer': { stages: ['Locally advanced', 'Metastatic'], biomarkers: ['EGFR', 'ALK/ROS1', 'KRAS G12C', 'PD-L1'], signals: ['NCRP burden', 'trial status', 'stage/biomarker map'] },
    'Cervical cancer': { stages: ['Locoregional', 'Recurrent/metastatic'], biomarkers: ['HPV 16/18', 'high-risk HPV', 'PD-L1', 'p16'], signals: ['NCRP burden', 'screening coverage', 'HEOR outcomes'] },
    'Oral cavity cancer': { stages: ['Locally advanced', 'Recurrent/metastatic'], biomarkers: ['HPV', 'PD-L1 CPS', 'TP53/CDKN2A', 'EGFR'], signals: ['NCRP burden', 'landmark trial evidence', 'drug-development watchlist'] }
  },
  evaluate(input, jevDecision) {
    const profile = this.profiles[input.cancer] || this.profiles['Breast cancer'];
    const completeness = [!!input.ncrpRow, !!input.heorMatch, !!input.sourceTrace, !!input.humanReview].filter(Boolean).length / 4;
    const base = 0.45 + (0.25 * completeness) + (input.ncrpRow ? 0.10 : 0) + (input.heorMatch ? 0.10 : 0);
    const score = Math.min(1, Number(base.toFixed(3)));
    const decision = jevDecision === 'REJECT' ? 'HOLD' : score >= 0.75 && jevDecision === 'ACCEPT' ? 'READY FOR RESEARCH REVIEW' : 'REVIEW';
    return { modelType: this.modelType, version: this.version, cancer: input.cancer, score, decision, profile, jevDecision: jevDecision || 'REVIEW', completeness: Math.round(completeness * 100), generatedAt: new Date().toISOString(), rationale: 'Combines source completeness with JEV evidence disposition; human review remains mandatory.' };
  }
};
