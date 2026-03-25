function unsupportedMfaResult(message = "MFA is not available on the website authentication flow.") {
  return {
    data: null,
    error: new Error(message),
  };
}

export const enrollMFA = async () => unsupportedMfaResult();

export const verifyMFAEnrollment = async () => unsupportedMfaResult();

export const challengeMFA = async () => unsupportedMfaResult();

export const verifyMFAChallenge = async () => unsupportedMfaResult();

export const unenrollMFA = async () => unsupportedMfaResult();

export const getMFAFactors = async () => ({ data: [], error: null });

export const getAssuranceLevel = async () => ({
  data: {
    currentLevel: "aal1",
    nextLevel: "aal1",
    currentAuthenticationMethods: [],
  },
  error: null,
});

export const hasMFAEnrolled = async () => false;

export const getVerifiedMFAFactors = async () => ({ data: [], error: null });

const mfaService = {
  enrollMFA,
  verifyMFAEnrollment,
  challengeMFA,
  verifyMFAChallenge,
  unenrollMFA,
  getMFAFactors,
  getAssuranceLevel,
  hasMFAEnrolled,
  getVerifiedMFAFactors,
};

export default mfaService;
