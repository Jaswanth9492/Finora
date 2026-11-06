
// ========================================
// FINORA - EVENT DASHBOARD
// ========================================

// 1. Check login session
const currentUser = JSON.parse(
  sessionStorage.getItem("finoraCurrentUser") || "null"
);

if (!currentUser) {
  window.location.replace("login.html");
} else {
  document.getElementById("user-name").textContent =
    currentUser.name.split(" ")[0];

  document.getElementById("profile-name").textContent =
    currentUser.name;

  document.getElementById("profile-avatar").textContent =
    currentUser.name.charAt(0).toUpperCase();
}

// 2. Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  sessionStorage.removeItem("finoraCurrentUser");
  sessionStorage.removeItem("finoraSelectedEvent");
  window.location.replace("login.html");
});

// 3. Select event type
let selectedEvent = "Wedding";

const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach(card => {
  card.addEventListener("click", () => {
    eventCards.forEach(item => item.classList.remove("selected"));

    card.classList.add("selected");

    selectedEvent = card.dataset.event;

    document.getElementById("selected-event-name").textContent =
      selectedEvent;

    document.getElementById("planner").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// 4. Get events belonging to current user
function getMyEvents() {
  const allEvents = JSON.parse(
    localStorage.getItem("finoraEvents") || "{}"
  );

  return allEvents[currentUser.email] || [];
}

// 5. Save events
function saveMyEvents(events) {
  const allEvents = JSON.parse(
    localStorage.getItem("finoraEvents") || "{}"
  );

  allEvents[currentUser.email] = events;

  localStorage.setItem("finoraEvents", JSON.stringify(allEvents));
}

// 6. Currency format
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

// 7. Safely display user-entered text
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// 8. Create a new event
const plannerForm = document.getElementById("planner-form");

plannerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("event-title").value.trim();
  const date = document.getElementById("event-date").value;
  const city = document.getElementById("event-city").value;
  const guests = Number(document.getElementById("guest-count").value);
  const budget = Number(document.getElementById("event-budget").value);

  const message = document.getElementById("form-message");

  message.style.color = "#bd4b3e";

  if (!title || !date || !city || guests <= 0 || budget <= 0) {
    message.textContent = "Please enter all event details correctly.";
    return;
  }

  const eventDate = new Date(date + "T00:00:00");

  if (Number.isNaN(eventDate.getTime())) {
    message.textContent = "Please select a valid event date.";
    return;
  }

  if (eventDate < new Date(new Date().toDateString())) {
    message.textContent = "Please select today or a future date.";
    return;
  }

  // Create event object
  const newEvent = {
    id: Date.now(),
    title: title,
    type: selectedEvent,
    date: date,
    city: city,
    guests: guests,
    budget: budget,
    createdAt: new Date().toISOString()
  };

  // Save event for this logged-in user
  const events = getMyEvents();

  events.push(newEvent);

  saveMyEvents(events);

  // Save selected event for budget page
  sessionStorage.setItem(
    "finoraSelectedEvent",
    JSON.stringify(newEvent)
  );

  // Show success message
  message.style.color = "#247a4b";
  message.textContent = "Event saved successfully! Opening your budget plan...";

  // Navigate after saving
  setTimeout(() => {
    window.location.href = "budget.html";
  }, 700);
});

// 9. Display all saved events
function renderEvents() {
  const container = document.getElementById("my-events");
  const events = getMyEvents();

  if (events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>✧</span>
        <h3>No events planned yet</h3>
        <p>Your event plans will appear here once you create one.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = events.map(item => `
    <article class="event-result">
      <div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>
          ${escapeHTML(item.type)} ·
          ${escapeHTML(item.city)} ·
          ${item.guests} guests
        </p>
        <p>${escapeHTML(item.date)}</p>
        <button class="delete-event" data-id="${item.id}">
          Delete event
        </button>
      </div>

      <div>
        <strong>${formatCurrency(item.budget)}</strong>
        <button class="open-event" data-id="${item.id}">
          Open budget →
        </button>
      </div>
    </article>
  `).join("");

  // Open an existing event
  container.querySelectorAll(".open-event").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      const selected = getMyEvents().find(item => item.id === id);

      if (selected) {
        sessionStorage.setItem(
          "finoraSelectedEvent",
          JSON.stringify(selected)
        );

        window.location.href = "budget.html";
      }
    });
  });

  // Delete an event
  container.querySelectorAll(".delete-event").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      const updatedEvents = getMyEvents().filter(
        item => item.id !== id
      );

      saveMyEvents(updatedEvents);
      renderEvents();
    });
  });
}

// 10. Load events when dashboard opens
if (currentUser) {
  renderEvents();
}
