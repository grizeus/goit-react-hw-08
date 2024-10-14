import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.items;
export const selectNameFilter = state => state.filters.name;
export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    if (!nameFilter) {
      return contacts;
    }
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(nameFilter));
  }
);