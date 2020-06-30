import { LightningElement, wire, track } from 'lwc';

import findContacts from '@salesforce/apex/ContactController.findContacts';

export default class HelloWorld extends LightningElement {
  @track contactsList;
  @track error;

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  searchAccount= '';
  handleSearchInputChange(event) {
    this.searchAccount = event.target.value;
  }

  handleSearchContactClick() {
    console.log("in handle search");
    findContacts( { searchKey: this.searchAccount } )
      .then(result => {
        console.log(result);
          this.contactsList = result;
      })
      .catch(error => {
          this.error = error;
      });
  }
}