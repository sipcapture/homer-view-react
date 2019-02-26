import { createAction } from "redux-actions";
import createAsyncAction from "../../helpers/createAsyncActions";

export const { getExportPcapAsync } = createAsyncAction('getExportPcapAsync');
export const { getExportTxtAsync } = createAsyncAction('getExportTxtAsync');
