/* Synthetic EHR/EMR transformation adapter for the public ICIP prototype. */
window.ICIP_EHR_TRANSFORM = {
  version: '0.1.0-local',
  canonicalProfile: 'ICIP-Oncology-Canonical-v0.1',
  supportedInputs: ['FHIR R4 JSON', 'HL7 v2-like segments', 'CSV/EMR export'],
  sample: {
    sourceType: 'FHIR R4 JSON', sourceSystem: 'Synthetic teaching record',
    patient: { id: 'patient-example-001', name: 'Synthetic Patient' },
    condition: { code: 'C50.9', text: 'Malignant neoplasm of breast', stage: 'Stage II' },
    observations: [{ code: '85319-0', text: 'HER2 status', value: 'Negative', unit: null }],
    medication: { code: 'tamoxifen', text: 'Tamoxifen', status: 'active' }
  },
  transform(input) {
    const patientId = 'ICIP-SYN-' + String(input.patient?.id || 'unknown').replace(/[^A-Za-z0-9]/g, '').slice(-8);
    return {
      subject: { pseudonym: patientId, identifiersRemoved: true },
      condition: { code: input.condition?.code || 'unknown', display: input.condition?.text || 'Not mapped', stage: input.condition?.stage || 'Not recorded' },
      biomarkers: (input.observations || []).map(o => ({ code: o.code, display: o.text, value: o.value, provenance: 'synthetic-source' })),
      medications: input.medication ? [{ code: input.medication.code, display: input.medication.text, status: input.medication.status, provenance: 'synthetic-source' }] : [],
      provenance: { sourceType: input.sourceType, sourceSystem: input.sourceSystem, sourceTimestamp: new Date().toISOString(), consentScope: 'research-demo', humanReview: 'required' },
      governance: { dpdpPurpose: 'research and HEOR prototype', deIdentification: 'pseudonymized demo only', export: 'blocked until review' }
    };
  }
};
