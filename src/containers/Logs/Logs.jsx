// @flow
import * as React from "react";
import JsonViewer from '../../components/JsonViewer/index';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const padding ={
  padding: '10px 20px'
}

const paddingBottom ={
  padding: '0 0 20px 0'
}

const data = {
  "total":4,
  "data":[
     {
        "id":"107",
        "sid":"f68189@127.0.0.1",
        "dstIp":"15.195.118.188",
        "srcIp":"121.182.53.136",
        "dstPort":0,
        "srcPort":0,
        "protocol":17,
        "captureId":2001,
        "capturePass":"myHep",
        "payloadType":5,
        "timeSeconds":1550667687,
        "timeUseconds":135,
        "protocolFamily":2,
        "create_date":1550667687000,
        "raw":"{\"type\":200,\"ssrc\":1814766290,\"report_count\":0,\"report_blocks\":[],\"sender_information\":{\"packets\":2,\"ntp_timestamp_sec\":\"3373905459\",\"ntp_timestamp_usec\":\"4280379832\",\"rtp_timestamp\":-210833031,\"octets\":40}} "
     },
     {
        "id":"110",
        "sid":"f68189@127.0.0.1",
        "dstIp":"15.195.118.188",
        "srcIp":"121.182.53.136",
        "dstPort":0,
        "srcPort":0,
        "protocol":17,
        "captureId":2001,
        "capturePass":"myHep",
        "payloadType":5,
        "timeSeconds":1550667690,
        "timeUseconds":136,
        "protocolFamily":2,
        "create_date":1550667690000,
        "raw":"{\"type\":200,\"ssrc\":1814766290,\"report_count\":1,\"report_blocks\":[{\"source_ssrc\":-1640316609,\"fraction_lost\":0,\"packets_lost\":0,\"highest_seq_no\":992,\"lsr\":\"0\",\"ia_jitter\":44,\"dlsr\":0}],\"sender_information\":{\"packets\":588,\"ntp_timestamp_sec\":\"3373905471\",\"ntp_timestamp_usec\":\"4285752605\",\"rtp_timestamp\":-210739271,\"octets\":11760}}"
     },
     {
        "id":"109",
        "sid":"f68189@127.0.0.1",
        "dstIp":"15.195.118.188",
        "srcIp":"121.182.53.136",
        "dstPort":0,
        "srcPort":0,
        "protocol":17,
        "captureId":2001,
        "capturePass":"myHep",
        "payloadType":5,
        "timeSeconds":1550667689,
        "timeUseconds":136,
        "protocolFamily":2,
        "create_date":1550667689000,
        "raw":"{\"type\":200,\"ssrc\":1814766290,\"report_count\":1,\"report_blocks\":[{\"source_ssrc\":-1640316609,\"fraction_lost\":0,\"packets_lost\":0,\"highest_seq_no\":783,\"lsr\":\"0\",\"ia_jitter\":48,\"dlsr\":0}],\"sender_information\":{\"packets\":379,\"ntp_timestamp_sec\":\"3373905467\",\"ntp_timestamp_usec\":\"4288694262\",\"rtp_timestamp\":-210772703,\"octets\":7580}}"
     },
     {
        "id":"108",
        "sid":"f68189@127.0.0.1",
        "dstIp":"15.195.118.188",
        "srcIp":"121.182.53.136",
        "dstPort":0,
        "srcPort":0,
        "protocol":17,
        "captureId":2001,
        "capturePass":"myHep",
        "payloadType":5,
        "timeSeconds":1550667688,
        "timeUseconds":136,
        "protocolFamily":2,
        "create_date":1550667688000,
        "raw":"{\"type\":200,\"ssrc\":1814766290,\"report_count\":1,\"report_blocks\":[{\"source_ssrc\":-1640316609,\"fraction_lost\":0,\"packets_lost\":0,\"highest_seq_no\":541,\"lsr\":\"0\",\"ia_jitter\":57,\"dlsr\":0}],\"sender_information\":{\"packets\":137,\"ntp_timestamp_sec\":\"3373905462\",\"ntp_timestamp_usec\":\"4286124543\",\"rtp_timestamp\":-210811367,\"octets\":2740}}"
      }
  ]
}


function Json(props) {
  let info = data.data.map((data, index)=> {
    return(
      <div style={paddingBottom}>
        <JsonViewer 
          json={data}
          key={data.id}
          />
      </div>
    )
  })
  return (
    <div>
      {info}
    </div>
  )
}

function ShowJson(){
  return (
    <div>
      <Json />
    </div>
  );
}

class Logs extends React.Component {

  render() {
    return (
        <Grid> 
          <Paper>
            <div style={padding}>
                <ShowJson />
            </div>
          </Paper>
        </Grid>
    );
  }
}

export default Logs;
