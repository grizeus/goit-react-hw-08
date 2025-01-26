import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "./contacts/selectors";
import { selectNameFilter } from "./filters/selectors";

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, entityFilter) => {
    if (!entityFilter) {
      return contacts;
    }
    return contacts.filter(
      contact =>
        contact.name.toLocaleLowerCase().includes(entityFilter) ||
        contact.phoneNumber.includes(entityFilter) ||
        contact.email?.includes(entityFilter)
    );
  }
);
