import { describe } from 'node:test'
import {
  addJournalEventListener,
  deleteJournalHandler,
  showJournalByMood,
  searchJournalEventListener,
  showAddModalEventListener,
  closeAddModalEventListener
} from '../js/ui'
import { getJournals } from '../js/storage'
import { loadJournal } from '../js/journal'

describe('journal storage persistence & filtering/searching', () => {
  const mockDOM = () => {
    document.body.innerHTML = ''
    document.body.innerHTML = `<div>
             <div class="search-container">
            <input
            type="text"
            placeholder="Search by title or content"
            id="search-input"
          />
            <button id="search-button">
            <ion-icon name="search-outline"></ion-icon>
            </button>
            </div>
            <div class="journal-container" id="journal-container"></div>
            <div id="add-journal-modal"></div>
            <div id="add-journal-error"></div>
            <input type="text" id="journal-title" class="journal-inputs"/>
              <textarea
                  id="journal-content"
                  rows="4"
                  class="journal-inputs"
                ></textarea>
                <select id="journal-mood" class="journal-inputs">
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="motivated">Motivated</option>
                </select>
                <input type="date" id="journal-date" class="journal-inputs" />
                 <div class="journal-btn-div">
                <span id="add-journal-error">please fill out all fields</span>
                <button type="submit" class="add-journal-btn" id="add-journal-btn">Add Journal</button>
              </div>
             </div>`
  }

  test('add journal & persist it in local storage', () => {
    localStorage.clear()
    mockDOM()
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'happy'
    document.getElementById('journal-date').value = '2022-01-01'
    const addJournalBtn = document.getElementById('add-journal-btn')
    addJournalBtn.addEventListener('click', addJournalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))
    expect(getJournals().length).toBe(1)
  })

  test('add journal, delete it & persist it in localstorage', () => {
    localStorage.clear()
    mockDOM()
    // Add a journal to local storage
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'happy'
    document.getElementById('journal-date').value = '2022-01-01'
    const addJournalBtn = document.getElementById('add-journal-btn')
    addJournalBtn.addEventListener('click', addJournalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))

    // Load the journal
    loadJournal()

    // Wait for the journal list to be generated
    setTimeout(() => {
      const deleteJournalBtn = document.getElementById(
        `delete-${getJournals()[0].id}`
      )
      // Add an event listener to the delete button
      deleteJournalBtn.addEventListener('click', (event) =>
        deleteJournalHandler(event.target.id)
      )

      // Dispatch a click event on the delete button
      deleteJournalBtn.dispatchEvent(new Event('click'))

      // Expect the length of the journals in local storage to be 0
      expect(JSON.parse(getJournals()).length).toBe(0)
    }, 100)
  })

  test('add two journal, delete one, and persist it in localstorage', () => {
    localStorage.clear()
    mockDOM()
    // Add a journal to local storage
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'happy'
    document.getElementById('journal-date').value = '2022-01-01'
    const addJournalBtn = document.getElementById('add-journal-btn')
    addJournalBtn.addEventListener('click', addJournalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))

    // Add a journal to local storage
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'happy'
    document.getElementById('journal-date').value = '2023-01-02'
    const addJournalBtn2 = document.getElementById('add-journal-btn')
    addJournalBtn2.addEventListener('click', addJournalEventListener)
    addJournalBtn2.dispatchEvent(new Event('click'))

    // Load the journal
    loadJournal()

    // Wait for the journal list to be generated
    setTimeout(() => {
      const deleteJournalBtn = document.getElementById(
        `delete-${getJournals()[0].id}`
      )
      // Add an event listener to the delete button
      deleteJournalBtn.addEventListener('click', (event) =>
        deleteJournalHandler(event.target.id)
      )

      // Dispatch a click event on the delete button
      deleteJournalBtn.dispatchEvent(new Event('click'))

      // Expect the length of the journals in local storage to be 0
      expect(JSON.parse(localStorage.getItem('journals')).length).toBe(1)
    }, 100)
  })

  //add journal & filter by mood
  test('add two motivated journals and one happy journal, and filter by motivation', () => {
    localStorage.clear()
    mockDOM()
    // Add a journal to local storage
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'motivated'
    document.getElementById('journal-date').value = '2022-01-01'
    const addJournalBtn = document.getElementById('add-journal-btn')
    addJournalBtn.addEventListener('click', addJournalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))

    // Add a journal to local storage
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'motivated'
    document.getElementById('journal-date').value = '2023-01-02'
    const addJournalBtn2 = document.getElementById('add-journal-btn')
    addJournalBtn2.addEventListener('click', addJournalEventListener)
    addJournalBtn2.dispatchEvent(new Event('click'))

    // Add a journal to local storage
    document.getElementById('journal-title').value = 'title'
    document.getElementById('journal-content').value = 'content'
    document.getElementById('journal-mood').value = 'happy'
    document.getElementById('journal-date').value = '2023-01-02'
    const addJournalBtn3 = document.getElementById('add-journal-btn')
    addJournalBtn3.addEventListener('click', addJournalEventListener)
    addJournalBtn3.dispatchEvent(new Event('click'))

    // Load the journal by mood
    showJournalByMood('motivated')

    // Wait for the journal list to be generated
    setTimeout(() => {
      const journalDiv = document.getElementById('journal-container')
      expect(journalDiv.childElementCount).toBe(2)
    }, 100)
  })

  //search journal by title or content
  test('add a journal with a specific title and content, search by title or content', () => {
    localStorage.clear()
    mockDOM()
    // Add a journal to local storage
    document.getElementById('journal-title').value = 'The gods must be mad'
    document.getElementById('journal-content').value =
      'Searching for the gods must be mad'
    document.getElementById('journal-mood').value = 'motivated'
    document.getElementById('journal-date').value = '2022-01-01'
    const addJournalBtn = document.getElementById('add-journal-btn')
    addJournalBtn.addEventListener('click', addJournalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))

    // Add a journal to local storage
    document.getElementById('journal-title').value = 'Araba is crazy'
    document.getElementById('journal-content').value =
      'Searching for Araba is crazy'
    document.getElementById('journal-mood').value = 'happy'
    document.getElementById('journal-date').value = '2023-01-02'
    const addJournalBtn2 = document.getElementById('add-journal-btn')
    addJournalBtn2.addEventListener('click', addJournalEventListener)
    addJournalBtn2.dispatchEvent(new Event('click'))

    const searchInput = document.getElementById('search-input')
    searchInput.value = 'gods'

    const searchBtn = document.getElementById('search-button')
    searchBtn.addEventListener('click', searchJournalEventListener)
    searchBtn.dispatchEvent(new Event('click'))

    // Wait for the journal list to be generated
    setTimeout(() => {
      const journalDiv = document.getElementById('journal-container')
      const title =
        journalDiv.firstElementChild.getElementsByTagName('h3')[0].textContent
      expect(title).toBe('The gods must be mad')
    }, 100)
  })
})

// UI test
describe('UI test', () => {
  const mockDOM = () => {
    document.body.innerHTML = ''
    document.body.innerHTML = `<div>
                 <button class="add-journal" id="add-journal">
          Add<ion-icon name="add-outline"></ion-icon>
        </button>
        <div id="add-journal-modal" class="modal">  <span id="close-add-modal">&times;</span></div>
             </div>`
  }
  test('show add journal modal', () => {
    mockDOM()
    const addJournalBtn = document.getElementById('add-journal')
    addJournalBtn.addEventListener('click', showAddModalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))
    expect(document.getElementById('add-journal-modal').style.display).toBe(
      'block'
    )
  })

  test('hide add journal modal', () => {
    mockDOM()
    const addJournalBtn = document.getElementById('add-journal')
    addJournalBtn.addEventListener('click', showAddModalEventListener)
    addJournalBtn.dispatchEvent(new Event('click'))
    const closeBtn = document.getElementById('close-add-modal')
    closeBtn.addEventListener('click', closeAddModalEventListener)
    setTimeout(() => {
      expect(document.getElementById('add-journal-modal').style.display).toBe(
        'none'
      )
    })
  })
})
