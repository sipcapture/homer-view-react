export default function formatData(messages = []) {
  messages.sort(function(a, b) {
    return parseInt(a.micro_ts) - parseInt(b.micro_ts);
  });

  // Create a mermaid diagram
  let output = "sequenceDiagram\n";

  // Convert HEP events to mermaid rows
  messages.forEach(set => {
    if (set.method || set.event) {
      output +=
        set.srcIp +
        "/" +
        set.srcPort +
        "->>" +
        set.dstIp +
        "/" +
        set.dstPort +
        ": " +
        (set.method || set.event) +
        "\n";
    } else {
      output +=
        set.srcIp +
        "/" +
        set.srcPort +
        "->>" +
        set.dstIp +
        "/" +
        set.dstPort +
        ": HEP\n";
    }
  });

  return output;
}
