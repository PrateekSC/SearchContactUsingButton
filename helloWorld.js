import { LightningElement, wire, track } from 'lwc';

import getContactList from '@salesforce/apex/ContactController.getContactList';
import findContacts from '@salesforce/apex/ContactController.findContacts';

const DELAY = 300;


export default class HelloWorld extends LightningElement {
  @track contactsListByLoad;
  @track error;

  greeting = 'Hello World!';

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  greetingChangeHandler(event) {
    this.greeting = event.target.value;
  }

  handleLoadContactClick() {
    getContactList()
    .then(result => {
        this.contactsListByLoad = result;
    })
    .catch(error => {
        this.error = error;
    });
  }
  
  searchKey = '';
  @wire(findContacts, { searchKey: '$searchKey' })
  autoSearchedContacts;

  handleAutoloadInputChange(event) {
      window.clearTimeout(this.delayTimeout);
      const searchKey = event.target.value;
      this.delayTimeout = setTimeout(() => {
          this.searchKey = searchKey;
      }, DELAY);
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