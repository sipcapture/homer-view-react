import { createSelector } from "reselect";

const exports = store => {
  return store.get("exports");
};

export const makeSelectExport = createSelector(
  exports,
  exp => exp
);

export const makeSelectTxt = createSelector(
  exports,
  exp => exp.txt
);

export const makeSelectPcap = createSelector(
  exports,
  exp => exp.pcap
);
