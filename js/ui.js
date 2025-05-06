import {
  loadJournal,
  loadHappy,
  loadMotivated,
  loadSad,
  loadSearch
} from './journal.js'
export function showAddModalEventListener() {
  const addJournalModal = document.getElementById('add-journal-modal')
  const currentDate = moment().format('YYYY-MM-DD')
  document.getElementById('journal-date').setAttribute('max', currentDate)
  addJournalModal.style.display = 'block'
}

export function closeAddModalEventListener() {
  const addJournalModal = document.getElementById('add-journal-modal')
  addJournalModal.style.display = 'none'
}

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
  const journals = JSON.parse(localStorage.getItem('journals')) || []
  journals.push(journal)
  localStorage.setItem('journals', JSON.stringify(journals))
  closeAddModalEventListener()
  loadJournal()
}

export function showEditModalHandler(id) {
  const journalID = id.split('-')[1]
  localStorage.setItem('journalID', journalID)
  const journal = JSON.parse(localStorage.getItem('journals')).find(
    (journal) => journal.id === journalID
  )
  const editJournalModal = document.getElementById('edit-journal-modal')
  document.getElementById('journal-edit-title').value = journal.title
  document.getElementById('journal-edit-content').value = journal.content
  document.getElementById('journal-edit-mood').value = journal.mood
  document.getElementById('journal-edit-date').value = journal.date
  editJournalModal.style.display = 'block'
}

export function closeEditModalEventListener() {
  const editJournalModal = document.getElementById('edit-journal-modal')
  editJournalModal.style.display = 'none'
}

export function deleteJournalHandler(id) {
  const journalID = id.split('-')[1]
  const journals = JSON.parse(localStorage.getItem('journals')).filter(
    (journal) => journal.id !== journalID
  )
  localStorage.setItem('journals', JSON.stringify(journals))
  loadJournal()
}

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
  const journals = JSON.parse(localStorage.getItem('journals'))
  const index = journals.findIndex((journal) => journal.id === journalID)
  journals[index] = journal
  localStorage.setItem('journals', JSON.stringify(journals))
  closeEditModalEventListener()
  loadJournal()
}

export function showJournalByMood(mood) {
  if (mood === 'all') {
    loadJournal()
  } else if (mood === 'happy') {
    const journals = JSON.parse(localStorage.getItem('journals'))
    const filteredJournal = journals.filter((journal) => journal.mood === mood)
    localStorage.setItem(mood, JSON.stringify(filteredJournal))
    loadHappy()
  } else if (mood === 'sad') {
    const journals = JSON.parse(localStorage.getItem('journals'))
    const filteredJournal = journals.filter((journal) => journal.mood === mood)
    localStorage.setItem(mood, JSON.stringify(filteredJournal))
    loadSad()
  } else if (mood === 'motivated') {
    const journals = JSON.parse(localStorage.getItem('journals'))
    const filteredJournal = journals.filter((journal) => journal.mood === mood)
    localStorage.setItem(mood, JSON.stringify(filteredJournal))
    loadMotivated()
  }
}

export function searchJournalEventListener() {
  const searchInput = document.getElementById('search-input').value
  const journals = JSON.parse(localStorage.getItem('journals'))
  const filteredJournal = journals.filter((journal) =>
    journal.title.toLowerCase().includes(searchInput.toLowerCase())
  )
  localStorage.setItem('search', JSON.stringify(filteredJournal))
  loadSearch()
}
