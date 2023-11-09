# To-Do List

Manage your tasks with ease using this web-based To-Do List application. Create, view, filter, edit, and delete tasks with the convenience of browser-local storage to persist your tasks across sessions.

## Project Link

You can access the To-Do List app online at [To-Do List](https://todolist5945.netlify.app/).

## Functionalities

### Ticket Creation

The ticket creation process is initiated by clicking an element with the class "open-modal". The `openTicketModal` function is triggered, which opens a modal for input. The modal allows you to enter text, choose a filter color, and create a new ticket. Pressing the Enter key saves the ticket with a unique ID and the selected filter color.

### Ticket Storage

All tickets are stored in the browser's LocalStorage. Each ticket is represented as an object with a unique ID, a filter color, and text content. Ticket objects are stored as an array in LocalStorage, serialized into a JSON string.

### Ticket Deletion

Each ticket includes a delete button represented by a trash icon. Clicking this button triggers an event listener, removing the ticket element from the DOM and also deleting its associated data from LocalStorage.

### Ticket Filtering

Event listeners are set up for ".filter" elements. Clicking on these elements toggles the visibility of tickets based on their associated filter color. The color of a ticket can also be changed by clicking on its header.

## User Interface (UI) Elements

- Filters: UI elements that allow users to view tickets based on their color classifications. Available colors include red, blue, green, yellow, and black.

- Modal: A dialog box/pop-up window used for creating new tickets. It is displayed when the "openModal" button is clicked and can be closed using the "closeModal" button.

- Tickets: Each ticket is a UI element that displays the ticket content and includes a header colored according to its filter classification.

## Events

The following events are handled in the code:

- Opening and closing the ticket modal: The click event on "openModal" and "closeModal" buttons triggers the opening and closing of the ticket creation modal.

- Filter selection: The click event on each filter element allows for the selection and deselection of filters.

- Ticket creation: A keypress event is used within the ticket modal. If the 'Enter' key is pressed when text is present in the modal's text field, a new ticket is created.

- Filter change on ticket: The click event on the ticket header allows users to change the ticket's filter color by cycling through the available colors.

- Ticket deletion: The click event on the ticket delete button removes the ticket from the view and local storage.

## Data Storage

The application uses the browser's LocalStorage as a simple database to store ticket data. Each ticket is stored as an object, with properties for the ticket filter color, ticket value (text), and a unique ticket identifier. The ticket data is retrieved and parsed from LocalStorage whenever tickets are loaded or filtered.

## Functions

The following key functions are implemented in the code:

- `selectFilter()`: Implements the logic for selecting a filter, deselecting any currently selected filter, and loading the corresponding tickets.

- `loadSelectedTickets()`: Fetches the tickets from LocalStorage that match a particular filter and displays them.

- `loadTickets()`: Fetches all tickets from LocalStorage and displays them.

- `openTicketModal()`: Opens the ticket creation modal and sets up the required event listeners.

- `closeTicketModal()`: Closes the ticket creation modal.

- `handleKeyPress()`: Handles the 'Enter' keypress event within the ticket modal's text field, initiating ticket creation.

- `saveTicketToDb()`: Saves a newly created ticket to LocalStorage.

- `appendTicket()`: Creates a new ticket DOM element from ticket data and appends it to the ticket container, also setting up the necessary event listeners for filter color change and deletion.

## Libraries Used

The `uuid` function, used to create unique IDs, comes from the `uuid` library.
