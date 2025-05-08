//retrieve journals from local storage
export const getJournals = () => JSON.parse(localStorage.getItem('journals') || '[]')

//store journals to local storage
export const storeJournals = (journals) =>
  localStorage.setItem('journals', JSON.stringify(journals))
