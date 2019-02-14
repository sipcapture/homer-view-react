import _ from 'lodash';
import moment from 'moment';
import maybe from '../helpers/maybe';

export default function formatMessagesResponse(rawData){
  const data = _.cloneDeep(
    maybe(rawData.data, data => data.messages) || []
  );

  const dataTable = _.map(data, (val, index) => [
    { key: 'id', label: val.id, id: val.id },
    { key: 'date', label: moment(val.create_date).format('DD-MM-YYYY') },
    { key: 'time', label: moment(val.create_date).format('HH:mm:ss.SSS') },
    {
      key: 'diff',
      label: data[index - 1]
        ? moment(val.create_date).diff(
          data[index - 1].create_date,
          'seconds',
          true,
        )
        : 0,
    },
    { key: 'event', ...eventSelectType(val) },
    { key: 'msgSize', label: val.raw.length },
    {
      key: 'srcIp',
      label: checkAlias(val, rawData.data.alias)
        .srcAlias,
    },
    { key: 'srcPort', label: val.srcPort },
    {
      key: 'dstIp',
      label: checkAlias(val, rawData.data.alias)
        .dstAlias,
    },
    { key: 'dstPort', label: val.dstPort },
    { key: 'proto', label: protoCheck(val.protocolFamily) },
    { key: 'type', ...transactionCheck(val.payloadType) },
  ]);

  const dataHead = [
    { key: 'id', label: 'Id' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'diff', label: 'Diff' },
    { key: 'event', label: 'Event' },
    { key: 'msgSize', label: 'Msg Size' },
    { key: 'srcIp', label: 'Src IP/Host' },
    { key: 'srcPort', label: 'Sport' },
    { key: 'dstIp', label: 'Dst IP/Host' },
    { key: 'dstPort', label: 'Dport' },
    { key: 'proto', label: 'Proto' },
    { key: 'type', label: 'Type' },
  ];

  return { dataTable, dataHead };
}

function eventSelectType(row) {
  if (row.event && (!row.method || !row.reply_reason)) {
    switch (row.event) {
      case 'CRITICAL':
        return { label: 'CRITICAL', styles: { color: 'red' } };
      case 'ERROR':
        return { label: 'ERROR', styles: { color: 'orange' } };
      case 'INVITE':
        return { label: 'ERROR', styles: { fontWeight: 'bolder' } };
      case parseInt(row.event, 10) >= 100 && row.event <= 189:
        return { label: row.event, styles: { fontWeight: 'grey' } };
      case parseInt(row.event, 10) >= 400:
        return { label: row.event, styles: { color: 'red' } };
      case parseInt(row.event, 10) === 200:
        return { label: row.event, styles: { color: 'green' } };
      default:
        return { label: '-', styles: { color: 'grey' } };
    }
  } else if (row.method || row.reply_reason) {
    switch (row.event) {
      case parseInt(row.reply_reason, 10) > 399:
        return { label: row.reply_reason, styles: { color: 'red' } };
      case parseInt(row.reply_reason, 10) > 100 && row.reply_reason < 299:
        return { label: row.reply_reason, styles: { color: 'green' } };
      case parseInt(row.reply_reason, 10) > 99 && row.reply_reason < 199:
        return { label: row.reply_reason, styles: { color: '#2077a0' } };
      default:
        return { label: row.method, styles: { color: 'grey' } };
    }
  } else {
    return transactionCheck(row.payloadType);
  }
}

function transactionCheck(type) {
  if (parseInt(type, 10) === 86) return { label: 'XLOG' };
  if (parseInt(type, 10) === 87) return { label: 'MI' };
  if (parseInt(type, 10) === 1) return { label: 'SIP' };
  if (parseInt(type, 10) === 100) return { label: 'LOG' };
  if (parseInt(type, 10) === 88) return { label: 'REST' };
  if (parseInt(type, 10) === 89) return { label: 'NET' };
  if (parseInt(type, 10) === 4) return { label: 'WebRTC' };
  return { label: 'Unknown' };
}

function checkAlias(address, aliasObj) {
  const aliasObject = _.cloneDeep(aliasObj);

  const srcAlias = _.find(
    aliasObject,
    (val, index) =>
      index === `${address.srcIp}:${address.srcPort}` ||
      index === address.srcIp,
  );
  const dstAlias = _.find(
    aliasObject,
    (val, index) =>
      index === `${address.dstIp}:${address.dstPort}` ||
      index === address.dstIp,
  );

  return {
    srcAlias: srcAlias || address.srcIp,
    dstAlias: dstAlias || address.dstIp,
  };
}

function protoCheck(type) {
  if (parseInt(type, 10) === 2) return 'UDP';
  if (parseInt(type, 10) === 1) return 'TCP';
  return 'UDP';
}
