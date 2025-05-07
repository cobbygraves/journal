import {
  showAddModalEventListener,
  closeAddModalEventListener,
  addJournalEventListener,
  showEditModalHandler,
  deleteJournalHandler,
  closeEditModalEventListener,
  editJournalEventListener,
  showJournalByMood,
  searchJournalEventListener
} from '../js/ui.js'

const moment = window.moment

//event listener to generate the journal
export function loadJournal() {
  var journals = JSON.parse(localStorage.getItem('journals'))
  var journalList = document.getElementById('journal-container')
  if (!journals || journals.length === 0) {
    journalList.innerHTML = `<p style="text-align: center;">...No entry added yet...</p>`
    return
  }
  journalList.innerHTML = ''
  for (let i = 0; i < journals.length; i++) {
    var journal = journals[i]
    journalList.innerHTML += `
              <div class="journal-card">
              <div class="card-header">
                  <small>Date: <span>${moment(journal.date).format(
                    'DD/MM/YYYY'
                  )}</span></small>
                  <small>Mood: <span>${journal.mood}</span></small>
              </div>
              <h3>${journal.title}</h3>
              <p>${journal.content}</p>
              <div class="card-footer">
                  <button class="edit-journal" id="edit-${journal.id}">
                      Edit<ion-icon name="create-outline"></ion-icon>
                  </button>
                  <button class="delete-journal" id="delete-${journal.id}">
                      Delete<ion-icon name="trash-outline"></ion-icon>
                  </button>
              </div>
          </div>
          `
  }

  for (let i = 0; i < journals.length; i++) {
    var journal = journals[i]
    document
      .getElementById(`edit-${journal.id}`)
      .addEventListener('click', (event) =>
        showEditModalHandler(event.target.id)
      )
    document
      .getElementById(`delete-${journal.id}`)
      .addEventListener('click', (event) =>
        deleteJournalHandler(event.target.id)
      )
  }
}

loadJournal()

//event listener to search journal
export function loadSearch(text) {
  var journals = JSON.parse(localStorage.getItem('journals') || '[]')
  var journalList = document.getElementById('journal-container')
  var filteredJournals = journals.filter(
    (journal) =>
      journal.title.toLowerCase().includes(text.toLowerCase()) ||
      journal.content.toLowerCase().includes(text.toLowerCase())
  )
  if (!filteredJournals || filteredJournals.length === 0) {
    journalList.innerHTML = `<p style="text-align: center;">...Search result not found...</p>`
    return
  }
  journalList.innerHTML = ''
  for (let i = 0; i < filteredJournals.length; i++) {
    var journal = filteredJournals[i]
    journalList.innerHTML += `
                <div class="journal-card">
                <div class="card-header">
                    <small>Date: <span>${moment(journal.date).format(
                      'DD/MM/YYYY'
                    )}</span></small>
                    <small>Mood: <span>${journal.mood}</span></small>
                </div>
                <h3>${journal.title}</h3>
                <p>${journal.content}</p>
                <div class="card-footer">
                    <button class="edit-journal" id="edit-${journal.id}">
                        Edit<ion-icon name="create-outline"></ion-icon>
                    </button>
                    <button class="delete-journal" id="delete-${journal.id}">
                        Delete<ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>
            </div>
            `
  }

  for (let i = 0; i < filteredJournals.length; i++) {
    var journal = filteredJournals[i]
    document
      .getElementById(`edit-${journal.id}`)
      .addEventListener('click', (event) =>
        showEditModalHandler(event.target.id)
      )
    document
      .getElementById(`delete-${journal.id}`)
      .addEventListener('click', (event) =>
        deleteJournalHandler(event.target.id)
      )
  }
}

//event listener to filtered journal
export const loadFilter = (moodFilter) => {
  var journals = JSON.parse(localStorage.getItem('journals') || '[]')
  var filteredJournals = journals.filter(
    (journal) => journal.mood === moodFilter
  )
  var journalList = document.getElementById('journal-container')
  if (!filteredJournals || filteredJournals.length === 0) {
    journalList.innerHTML = `<p style="text-align: center;">...No ${moodFilter} entry added yet...</p>`
    return
  }
  journalList.innerHTML = ''
  for (let i = 0; i < filteredJournals.length; i++) {
    var journal = filteredJournals[i]
    journalList.innerHTML += `
                <div class="journal-card">
                <div class="card-header">
                    <small>Date: <span>${moment(journal.date).format(
                      'DD/MM/YYYY'
                    )}</span></small>
                    <small>Mood: <span>${journal.mood}</span></small>
                </div>
                <h3>${journal.title}</h3>
                <p>${journal.content}</p>
                <div class="card-footer">
                    <button class="edit-journal" id="edit-${journal.id}">
                        Edit<ion-icon name="create-outline"></ion-icon>
                    </button>
                    <button class="delete-journal" id="delete-${journal.id}">
                        Delete<ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>
            </div>
            `
  }

  for (let i = 0; i < filteredJournals.length; i++) {
    var journal = filteredJournals[i]
    document
      .getElementById(`edit-${journal.id}`)
      .addEventListener('click', (event) =>
        showEditModalHandler(event.target.id)
      )
    document
      .getElementById(`delete-${journal.id}`)
      .addEventListener('click', (event) =>
        deleteJournalHandler(event.target.id)
      )
  }
}

// event listener to show the form to add journal
document
  .getElementById('add-journal')
  .addEventListener('click', showAddModalEventListener)

// event listener to close the form to add journal
document
  .getElementById('close-add-modal')
  .addEventListener('click', closeAddModalEventListener)

document
  .getElementById('close-edit-modal')
  .addEventListener('click', closeEditModalEventListener)

// event listener to add a journal to the list
document
  .getElementById('add-journal-btn')
  .addEventListener('click', addJournalEventListener)

// event listener to add a journal to the list
document
  .getElementById('edit-journal-btn')
  .addEventListener('click', editJournalEventListener)

//even listener to filter journal by mood
document
  .getElementById('filter')
  .addEventListener('change', (event) => showJournalByMood(event.target.value))

//even listener to search journal
document
  .getElementById('search-button')
  .addEventListener('click', searchJournalEventListener)
