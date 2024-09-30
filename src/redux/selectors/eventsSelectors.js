
export const selectEvents = (state) => state.events.items || [];
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;
export const selectHasMoreEvents = (state) => state.events.hasMore;
