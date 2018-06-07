'use strict';

const RequestMessage = require('../RequestMessage');

class RenewRequest extends RequestMessage {
  constructor(nbDueDate, itemIdentifier,itemProperties,feeAcknowledged) {
    super('29');
    
    this.thirdParty = true;
    this.noBlock = true;//false
    this.nbDueDate = nbDueDate;
    this.itemIdentifier = itemIdentifier;
    this.itemProperties = itemProperties || '';
    this.feeAcknowledged = feeAcknowledged || null;
    this.transactionDate = RequestMessage.getDateTime();
    this.cancel = null;
  }

  buildMessage() {
    this.append(this.thirdParty ? 'Y' : 'N');
    this.append(this.noBlock ? 'Y' : 'N');
    this.append(this.transactionDate);
    if (this.returnDate) {
      this.append(this.returnDate);
    }
    this.append('AO');
    this.append(this.institutionId);
    this.append('|AA');
    this.append(this.patronIdentifier);
    this.append('|AB');
    this.append(this.itemIdentifier);
    this.append('|AC');
    this.append(this.terminalPassword);
    if (this.itemProperties) {
      this.append('|CH');
      this.append(this.itemProperties);
    }
    if (this.feeAcknowledged !== null) {
      this.append('|BO');
      this.append(this.feeAcknowledged ? 'Y' : 'N');
    }
    if (this.cancel !== null) {
      this.append('|BI');
      this.append(this.cancel ? 'Y' : 'N');
    }
    
  }
}

module.exports = RenewRequest;
