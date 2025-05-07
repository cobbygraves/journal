import { loadJournal, loadFilter, loadSearch } from './journal.js'
import { getJournals, storeJournals } from './storage.js'

// event listener to show the form to add journal
export function showAddModalEventListener() {
  const addJournalModal = document.getElementById('add-journal-modal')
  const currentDate = moment().format('YYYY-MM-DD')
  document.getElementById('journal-date').setAttribute('max', currentDate)
  addJournalModal.style.display = 'block'
}

// event listener to close the form to add journal
export function closeAddModalEventListener() {
  const addJournalModal = document.getElementById('add-journal-modal')
  addJournalModal.style.display = 'none'
}

// event listener to add a journal to the list
export function addJournalEventListener() {
  const journalTitle = document.getElementById('journal-title').value
  const journalContent = document.getElementById('journal-content').value
  const journalMood = document.getElementById('journal-mood').value
  const journalDate = document.getElementById('journal-date').value
  const journal = {
    id: Date.now().toString(),
    title: journalTitle,
    content: journalContent,
    mood: journalMood,
    date: journalDate
  }
  const journals = getJournals()
  journals.push(journal)
  storeJournals(journals)
  closeAddModalEventListener()
  loadJournal()
}

//handler to show the form to edit journal
export function showEditModalHandler(id) {
  const journalID = id.split('-')[1]
  localStorage.setItem('journalID', journalID)
  const journal = getJournals().find((journal) => journal.id === journalID)
  const editJournalModal = document.getElementById('edit-journal-modal')
  document.getElementById('journal-edit-title').value = journal.title
  document.getElementById('journal-edit-content').value = journal.content
  document.getElementById('journal-edit-mood').value = journal.mood
  document.getElementById('journal-edit-date').value = journal.date
  editJournalModal.style.display = 'block'
}

// event listener to close the form to edit journal
export function closeEditModalEventListener() {
  const editJournalModal = document.getElementById('edit-journal-modal')
  editJournalModal.style.display = 'none'
}

// handler to delete a journal
export function deleteJournalHandler(id) {
  const journalID = id.split('-')[1]
  const journals = getJournals().filter((journal) => journal.id !== journalID)
  localStorage.setItem('journals', JSON.stringify(journals))
  loadJournal()
}

// event listener to edit a journal
export function editJournalEventListener() {
  const journalID = localStorage.getItem('journalID')
  const journalTitle = document.getElementById('journal-edit-title').value
  const journalContent = document.getElementById('journal-edit-content').value
  const journalMood = document.getElementById('journal-edit-mood').value
  const journalDate = document.getElementById('journal-edit-date').value
  const journal = {
    id: journalID,
    title: journalTitle,
    content: journalContent,
    mood: journalMood,
    date: journalDate
  }
  const journals = getJournals()
  const index = journals.findIndex((journal) => journal.id === journalID)
  journals[index] = journal
  storeJournals(journals)
  closeEditModalEventListener()
  loadJournal()
}

// event listener to show journal by mood
export function showJournalByMood(mood) {
  if (mood === 'all') {
    loadJournal()
  } else {
    loadFilter(mood)
  }
}

// event listener to search journal
export function searchJournalEventListener() {
  const searchInput = document.getElementById('search-input').value
  loadSearch(searchInput)
}
