import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectExport, makeSelectPcap, makeSelectTxt } from "./selectors";
import Export from "./Export";
import { getExportTxtAsync, getExportPcapAsync } from "./actions";

const mapStateToProps = createStructuredSelector({
  exports: makeSelectExport,
  pcap: makeSelectPcap,
  txt: makeSelectTxt
});

const mapDispatchToProps = {
  getExportTxt: getExportTxtAsync.request,
  getExportPcap: getExportPcapAsync.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export);
