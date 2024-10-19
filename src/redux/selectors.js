import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "./contacts/selectors";
import { selectNameFilter } from "./filters/selectors";

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    if (!nameFilter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(nameFilter) || contact.number.includes(nameFilter)
    );
  }
);
