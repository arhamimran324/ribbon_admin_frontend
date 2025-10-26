import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAppState, LocationOption } from "@/types";

const initialState: IAppState = {
  showLogoutModal: false,
  showGpEmailModal: false,
  showEmailSuccessModal: false,
  showConfirmUploadModal: false,
  showRevokeAccessConfirmPassword: false,
  verifyRevokeAccess: false,
  showConfirmDeleteAccountModal: false,
  deleteAccount: false,
  showUploadSuccessModal: false,
  showMobileHeader: false,
  showhealthProblemsModal: false,
  resetPasswordCounter: 0,
  file: null,
  location: [],
  filterName: "",
  termsConditionsModal: false,
  monetiseDataModal: false,
  wantToSendSARModal: false,
  wantMedicalDataBackupModal: false,
  wantConnectWalletModal: false,
  wantToSecureDataModal: false,
  wantToSecureAllDataModal: false,
  wantToUpdateMedicalDataModal: false,
  monetiseBenifitsModal: false,
  licenceFreeUser: 1,
  isLogoutModel: false,
  expandedIndex: null,
  isDrawerOpen: false,
  section: "",
  singleuserId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onFilterName: (state, action) => {
      state.filterName = action.payload;
    },

    setFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },

    toggleMobileHeader: (state, action: PayloadAction<boolean>) => {
      state.showMobileHeader = action.payload;
    },

    toggleLogoutModal: (state, action: PayloadAction<boolean>) => {
      state.showLogoutModal = action.payload;
    },

    toggleGpEmailModal: (state, action: PayloadAction<boolean>) => {
      state.showGpEmailModal = action.payload;
    },

    setRevokeAccessConfirmPassword: (state, action: PayloadAction<boolean>) => {
      state.showRevokeAccessConfirmPassword = action.payload;
    },

    setVerifyRevokeAccess: (state, action: PayloadAction<boolean>) => {
      state.verifyRevokeAccess = action.payload;
    },

    toggleConfirmDeleteAccountModal: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.showConfirmDeleteAccountModal = action.payload;
    },

    toggleHealthProblemsModal: (state, action: PayloadAction<boolean>) => {
      state.showhealthProblemsModal = action.payload;
    },

    setDeleteAccount: (
      state,
      action: PayloadAction<{ deleteAccount: boolean }>,
    ) => {
      state.deleteAccount = action.payload.deleteAccount;
    },

    toggleConfirmUploadModal: (state, action: PayloadAction<boolean>) => {
      state.showConfirmUploadModal = action.payload;
    },
    toggleTermsConditionsModal: (state, action: PayloadAction<boolean>) => {
      state.termsConditionsModal = action.payload;
    },

    toggleEmailSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.showEmailSuccessModal = action.payload;
    },

    toggleUploadSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.showUploadSuccessModal = action.payload;
    },

    addResetPasswordCounter: (state) => {
      state.resetPasswordCounter += 1;
    },

    restoreResetPasswordCounter: (state) => {
      state.resetPasswordCounter = 0;
    },

    addLocationInfo: (state, action: PayloadAction<LocationOption[]>) => {
      state.location = action.payload;
    },

    setMonetiseDataModal: (state, action: PayloadAction<boolean>) => {
      state.monetiseDataModal = action.payload;
    },

    setWantToSendSARModal: (state, action: PayloadAction<boolean>) => {
      state.wantToSendSARModal = action.payload;
    },

    setWantMedicalDataBackupModal: (state, action: PayloadAction<boolean>) => {
      state.wantMedicalDataBackupModal = action.payload;
    },
    setWantConnectModal: (state, action: PayloadAction<boolean>) => {
      state.wantConnectWalletModal = action.payload;
    },
    setWantToSecureDataModal: (state, action: PayloadAction<boolean>) => {
      state.wantToSecureDataModal = action.payload;
    },
    setWantToSecureAllDataModal: (state, action: PayloadAction<boolean>) => {
      state.wantToSecureAllDataModal = action.payload;
    },
    setWantToUpdateMedicalDataModal: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.wantToUpdateMedicalDataModal = action.payload;
    },
    setMonetiseBenifitsModal: (state, action: PayloadAction<boolean>) => {
      state.monetiseBenifitsModal = action.payload;
    },
    addUser: (state) => {
      state.licenceFreeUser = state.licenceFreeUser + 1;
    },
    removeUser: (state) => {
      state.licenceFreeUser = state.licenceFreeUser - 1;
    },
    setExpandedIndex: (state, action) => {
      state.expandedIndex = action.payload;
    },
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setIsLogoutModel: (state, action) => {
      state.isLogoutModel = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    resetLogoutState: (state) => {
      state.isLogoutModel = false;
    },
    resetIsDrawerOpen: (state) => {
      state.isDrawerOpen = false;
    },
    setUserId: (state, action) => {
      state.singleuserId = action.payload;
    },
  },
});

export const {
  toggleMobileHeader,
  toggleLogoutModal,
  addResetPasswordCounter,
  restoreResetPasswordCounter,
  toggleGpEmailModal,
  toggleEmailSuccessModal,
  setRevokeAccessConfirmPassword,
  setVerifyRevokeAccess,
  toggleConfirmDeleteAccountModal,
  setDeleteAccount,
  toggleUploadSuccessModal,
  toggleConfirmUploadModal,
  setFile,
  addLocationInfo,
  toggleHealthProblemsModal,
  onFilterName,
  toggleTermsConditionsModal,
  setMonetiseDataModal,
  setWantToUpdateMedicalDataModal,
  setWantToSecureAllDataModal,
  setWantToSecureDataModal,
  setWantConnectModal,
  setWantMedicalDataBackupModal,
  setWantToSendSARModal,
  setMonetiseBenifitsModal,
  addUser,
  removeUser,
  setIsDrawerOpen,
  setExpandedIndex,
  setIsLogoutModel,
  setSection,
  resetLogoutState,
  resetIsDrawerOpen,
  setUserId,
} = appSlice.actions;
