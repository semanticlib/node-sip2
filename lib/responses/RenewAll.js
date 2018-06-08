'use strict';

const ResponseMessage = require('../ResponseMessage');
const ItemType = require('../variables/ItemType');

class RenewAllResponse extends ResponseMessage {

  parse(message) {
    this.identifier = '66';
    this.message = message;

    const data = {};
console.log(this.message)
    //6610000000120180608    113258AO|||BN970041580 HTML-Referenz 3.2 Nefzger, Wolfgang Keine Verl�ngerung, da Medium mit besonderer Leihfr

    data.ok = this.intToBool(this.message.charAt(2));
    data.renewedCount = this.stringToInt(this.message.substring(3, 7));
    data.unrenewedCount = this.stringToInt(this.message.substring(7, 11));

    data.transactionDate = this.parseDateTime(this.message.substring(11, 29));

    data.institutionId = this.parseVariableWithoutDelimeter('AO', this.message.substring(29));

    Object.keys(ItemType).forEach((key) => {
      const itemType = ItemType[key];
      const temp = this.parseVariableMulti(itemType, this.message.substring(29));
      if (temp && temp.length > 0) {
        data[key] = {}
        data[key].items = temp;
        data[key].itemType = key;
        data[key].itemTypeId = itemType;
      }
    });
// items -> []

    data.screenMessage = this.parseVariableMulti('AF', this.message.substring(24));
    data.printLine = this.parseVariableMulti('AG', this.message.substring(24));
    if (this.parseSequence(this.message) !== '') {
      data.sequence = parseInt(this.parseSequence(this.message), 10);
    }
    data.checksum = this.parseChecksum(this.message);

    return data;
  }
}

module.exports = RenewAllResponse;
