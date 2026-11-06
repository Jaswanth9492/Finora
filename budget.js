

// ==================================================
// FINORA - COMPLETE SMART EVENT BUDGET SYSTEM
// ==================================================

// 1. USER AND EVENT INFORMATION

const user = JSON.parse(
  sessionStorage.getItem("finoraCurrentUser") || "null"
);

let selectedEvent = JSON.parse(
  sessionStorage.getItem("finoraSelectedEvent") || "null"
);

// Recover saved event if session is missing
if (user && !selectedEvent) {
  const allEvents = JSON.parse(
    localStorage.getItem("finoraEvents") || "{}"
  );

  const userEvents = allEvents[user.email] || [];

  if (userEvents.length > 0) {
    selectedEvent = userEvents[userEvents.length - 1];

    sessionStorage.setItem(
      "finoraSelectedEvent",
      JSON.stringify(selectedEvent)
    );
  }
}

// 2. EXPENSE CATEGORIES

const categories = [
  { name: "Venue", icon: "🏛️", percentage: 25, color: "#c7a46a" },
  { name: "Food & Catering", icon: "🍽️", percentage: 25, color: "#849b83" },
  { name: "Decoration", icon: "🌸", percentage: 12, color: "#b68d9c" },
  { name: "Photography", icon: "📸", percentage: 10, color: "#8295ae" },
  { name: "Entertainment", icon: "🎵", percentage: 7, color: "#c18b62" },
  { name: "Transportation", icon: "🚗", percentage: 5, color: "#9a91b5" },
  { name: "Invitations & Gifts", icon: "💌", percentage: 4, color: "#b78b72" },
  { name: "Makeup & Styling", icon: "💄", percentage: 4, color: "#c28d9d" },
  { name: "Lighting & Sound", icon: "💡", percentage: 4, color: "#8e9b9b" },
  { name: "Event Management", icon: "🎯", percentage: 4, color: "#a38e72" },
  { name: "Other Expenses", icon: "✨", percentage: 0, color: "#99958a" }
];

// 3. SERVICE PACKAGE CATALOG
// All prices are illustrative estimates.

const serviceCatalog = {

  "Venue": {
    container: "venue-list",
    packages: [
      {
        name: "Community Hall",
        icon: "🏛️",
        rate: 250,
        fixed: 15000,
        tag: "Budget friendly",
        description: "A practical indoor space for family celebrations.",
        includes: "Basic seating · Hall space · Basic facilities"
      },
      {
        name: "Banquet Hall",
        icon: "🏨",
        rate: 350,
        fixed: 25000,
        tag: "Popular choice",
        description: "An elegant venue for memorable celebrations.",
        includes: "Indoor hall · Guest seating · Basic amenities"
      },
      {
        name: "Luxury Convention Centre",
        icon: "✨",
        rate: 500,
        fixed: 60000,
        tag: "Premium",
        description: "A spacious venue for grand events.",
        includes: "Premium hall · Guest facilities · Parking"
      }
    ]
  },

  "Food & Catering": {
    container: "catering-list",
    packages: [
      {
        name: "Essential Menu",
        icon: "🍽️",
        rate: 250,
        fixed: 0,
        tag: "Budget friendly",
        description: "A simple and satisfying meal.",
        includes: "Welcome drink · 2 starters · Main course · Dessert"
      },
      {
        name: "Premium Menu",
        icon: "🥗",
        rate: 450,
        fixed: 0,
        tag: "Popular choice",
        description: "A balanced menu with more variety.",
        includes: "Drinks · 3 starters · Main course · Breads · 2 desserts"
      },
      {
        name: "Royal Menu",
        icon: "👑",
        rate: 700,
        fixed: 0,
        tag: "Luxury",
        description: "A grand dining experience for your guests.",
        includes: "Welcome drinks · 4 starters · Grand buffet · 3 desserts"
      }
    ]
  },

  "Decoration": {
    container: "decoration-list",
    packages: [
      {
        name: "Classic Decoration",
        icon: "🌼",
        rate: 0,
        fixed: 25000,
        tag: "Budget friendly",
        description: "Simple and elegant event decoration.",
        includes: "Basic stage · Fabric backdrop · Flower arrangements"
      },
      {
        name: "Floral Decoration",
        icon: "🌸",
        rate: 80,
        fixed: 40000,
        tag: "Popular choice",
        description: "Beautiful floral arrangements and stage design.",
        includes: "Floral stage · Entrance decor · Table arrangements"
      },
      {
        name: "Royal Decoration",
        icon: "💐",
        rate: 150,
        fixed: 75000,
        tag: "Luxury",
        description: "A grand themed decoration experience.",
        includes: "Premium stage · Floral installations · Theme styling"
      }
    ]
  },

  "Photography": {
    container: "photography-list",
    packages: [
      {
        name: "Essential Photography",
        icon: "📷",
        rate: 0,
        fixed: 25000,
        tag: "Budget friendly",
        description: "Capture the important moments of your event.",
        includes: "One photographer · Edited photos · Digital delivery"
      },
      {
        name: "Candid & Traditional",
        icon: "📸",
        rate: 50,
        fixed: 40000,
        tag: "Popular choice",
        description: "A combination of candid and traditional photography.",
        includes: "Photo team · Candid photos · Short highlight video"
      },
      {
        name: "Cinematic Package",
        icon: "🎬",
        rate: 100,
        fixed: 75000,
        tag: "Premium",
        description: "A cinematic storytelling experience.",
        includes: "Photo team · Cinematic film · Highlight reel · Editing"
      }
    ]
  },

  "Entertainment": {
    container: "entertainment-list",
    packages: [
      {
        name: "Basic DJ",
        icon: "🎧",
        rate: 0,
        fixed: 15000,
        tag: "Budget friendly",
        description: "Music and DJ entertainment for your event.",
        includes: "DJ · Basic sound system · Music playlist"
      },
      {
        name: "Live Music",
        icon: "🎤",
        rate: 0,
        fixed: 35000,
        tag: "Popular choice",
        description: "A live performance for your guests.",
        includes: "Performers · Audio equipment · Stage performance"
      },
      {
        name: "Grand Entertainment",
        icon: "🎶",
        rate: 0,
        fixed: 75000,
        tag: "Premium",
        description: "A complete entertainment experience.",
        includes: "DJ · Live performers · Special performances"
      }
    ]
  },

  "Transportation": {
    container: "transport-list",
    packages: [
      {
        name: "Basic Transport",
        icon: "🚌",
        rate: 100,
        fixed: 5000,
        tag: "Budget friendly",
        description: "Practical transport arrangements for guests.",
        includes: "Basic guest transport planning"
      },
      {
        name: "Comfort Transport",
        icon: "🚗",
        rate: 200,
        fixed: 10000,
        tag: "Popular choice",
        description: "Comfortable guest travel arrangements.",
        includes: "Guest pickup coordination · Car arrangements"
      },
      {
        name: "Premium Transport",
        icon: "🚘",
        rate: 350,
        fixed: 20000,
        tag: "Luxury",
        description: "Premium travel arrangements for special guests.",
        includes: "Premium cars · Guest coordination · Travel planning"
      }
    ]
  },

  "Invitations & Gifts": {
    container: "invitation-list",
    packages: [
      {
        name: "Digital Invitations",
        icon: "💌",
        rate: 10,
        fixed: 1000,
        tag: "Budget friendly",
        description: "Share beautiful invitations digitally.",
        includes: "Digital invitation design · Shareable files"
      },
      {
        name: "Printed Invitations",
        icon: "💝",
        rate: 40,
        fixed: 3000,
        tag: "Popular choice",
        description: "Traditional printed invitation cards.",
        includes: "Printed cards · Basic envelopes · Design"
      },
      {
        name: "Premium Gifts & Cards",
        icon: "🎁",
        rate: 150,
        fixed: 5000,
        tag: "Premium",
        description: "Elegant invitation and return gift arrangements.",
        includes: "Premium cards · Gift packaging · Return gifts"
      }
    ]
  },

  "Makeup & Styling": {
    container: "makeup-list",
    packages: [
      {
        name: "Essential Styling",
        icon: "💄",
        rate: 0,
        fixed: 8000,
        tag: "Budget friendly",
        description: "Basic makeup and styling arrangements.",
        includes: "Basic makeup · Hairstyling"
      },
      {
        name: "Professional Styling",
        icon: "💐",
        rate: 0,
        fixed: 18000,
        tag: "Popular choice",
        description: "Professional event-ready makeup and styling.",
        includes: "Professional makeup · Hair · Touch-up"
      },
      {
        name: "Luxury Styling",
        icon: "👑",
        rate: 0,
        fixed: 35000,
        tag: "Premium",
        description: "Premium bridal or occasion styling.",
        includes: "Premium makeup · Hair design · Draping · Touch-up"
      }
    ]
  },

  "Lighting & Sound": {
    container: "lighting-list",
    packages: [
      {
        name: "Basic Setup",
        icon: "💡",
        rate: 0,
        fixed: 12000,
        tag: "Budget friendly",
        description: "Basic lighting and sound for smaller events.",
        includes: "Basic speakers · Microphones · Standard lights"
      },
      {
        name: "Premium Setup",
        icon: "🔊",
        rate: 0,
        fixed: 30000,
        tag: "Popular choice",
        description: "A better audio and lighting experience.",
        includes: "Professional speakers · Stage lights · Microphones"
      },
      {
        name: "Grand Production",
        icon: "🎆",
        rate: 0,
        fixed: 60000,
        tag: "Luxury",
        description: "A complete stage production setup.",
        includes: "Advanced sound · LED screen · Stage lighting"
      }
    ]
  },

  "Event Management": {
    container: "management-list",
    packages: [
      {
        name: "Day Coordination",
        icon: "📋",
        rate: 0,
        fixed: 15000,
        tag: "Budget friendly",
        description: "Coordination on the event day.",
        includes: "Event schedule · Vendor coordination"
      },
      {
        name: "Full Planning",
        icon: "🎯",
        rate: 0,
        fixed: 35000,
        tag: "Popular choice",
        description: "Planning support from preparation to event day.",
        includes: "Planning · Vendor coordination · Event management"
      },
      {
        name: "Luxury Planning",
        icon: "⭐",
        rate: 0,
        fixed: 75000,
        tag: "Premium",
        description: "Detailed planning and premium event coordination.",
        includes: "Full planning · Guest coordination · Event-day team"
      }
    ]
  }

};

// 4. CITY PRICE MULTIPLIERS
// These are sample prototype adjustments, not market research.

const cityFactors = {
  "Hyderabad": 1.20,
  "Bengaluru": 1.25,
  "Chennai": 1.20,
  "Vijayawada": 1.05,
  "Visakhapatnam": 1.10,
  "Guntur": 0.95,
  "Tenali": 0.90,
  "Nellore": 0.95,
  "Tirupati": 1.00,
  "Other": 1.00
};

// 5. EVENT PRICE MULTIPLIERS

const eventFactors = {
  "Wedding": 1.15,
  "Birthday": 0.90,
  "Baby Shower": 0.90,
  "Engagement": 1.00,
  "Anniversary": 0.95,
  "Graduation Party": 0.90,
  "Housewarming": 0.90,
  "College Fest": 1.10,
  "Corporate Event": 1.10,
  "Naming Ceremony": 0.90,
  "Farewell Party": 0.90,
  "Other Event": 1.00
};

// 6. STORAGE HELPERS

let expenses = {};

function getBudget() {
  return Number(
    selectedEvent?.budget ??
    selectedEvent?.totalBudget ??
    0
  );
}

function getStorageKey() {
  return `finoraExpenses_${user.email}_${selectedEvent.id}`;
}

function getPackageStorageKey() {
  return `finoraPackages_${user.email}_${selectedEvent.id}`;
}

function getSelectedPackages() {
  try {
    return JSON.parse(
      localStorage.getItem(getPackageStorageKey()) || "{}"
    );
  } catch {
    return {};
  }
}

function saveSelectedPackages(packages) {
  localStorage.setItem(
    getPackageStorageKey(),
    JSON.stringify(packages)
  );
}

function saveExpenses() {
  localStorage.setItem(
    getStorageKey(),
    JSON.stringify(expenses)
  );

  const status = document.getElementById("save-status");

  if (status) {
    status.textContent = "Changes saved automatically.";
  }
}

// 7. CURRENCY FORMAT

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

// 8. SAFE HTML TEXT

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// 9. PRICE CALCULATION

function getServicePrice(packageItem) {

  const guests = Number(selectedEvent.guests) || 0;

  const cityFactor =
    cityFactors[selectedEvent.city] || 1;

  const eventFactor =
    eventFactors[selectedEvent.type] || 1;

  const estimate =
    (packageItem.fixed + packageItem.rate * guests) *
    cityFactor *
    eventFactor;

  return Math.round(estimate / 1000) * 1000;
}

// 10. LOAD SAVED EVENT EXPENSES

function loadExpenses() {

  try {
    expenses = JSON.parse(
      localStorage.getItem(getStorageKey()) || "{}"
    );
  } catch {
    expenses = {};
  }

  categories.forEach(category => {

    // Preserve existing saved values, including old Other Expenses.
    const value = Number(expenses[category.name]);

    expenses[category.name] =
      Number.isFinite(value) && value >= 0 ? value : 0;
  });

  // Preserve any old category values that are no longer in the new list
  // as Other Expenses when possible.
  const legacyOther = Number(expenses["Other Expenses"]) || 0;

  if (!Number.isFinite(legacyOther) || legacyOther < 0) {
    expenses["Other Expenses"] = 0;
  }
}

// 11. INITIALIZE BUDGET PAGE

function initializeBudgetPage() {

  if (!selectedEvent) {
    alert("Please create or select an event first.");
    window.location.replace("index.html");
    return;
  }

  if (!getBudget() || getBudget() <= 0) {
    alert("Your event budget is missing. Please update your event details.");
    window.location.replace("index.html");
    return;
  }

  document.getElementById("event-title").textContent =
    selectedEvent.title || "Your Event";

  document.getElementById("event-type").textContent =
    selectedEvent.type || "EVENT";

  document.getElementById("event-details").textContent =
    `${selectedEvent.city || "City not specified"} · ${selectedEvent.guests || 0} guests · ${selectedEvent.date || ""}`;

  loadExpenses();

  createExpenseInputs();
  renderAllRecommendations();
  updateBudget();
}

// 12. CREATE EXPENSE INPUTS

function createExpenseInputs() {

  const container = document.getElementById("expense-list");
  const budget = getBudget();

  container.innerHTML = categories.map(category => {

    const suggestedAmount =
      budget * category.percentage / 100;

    return `
      <div class="expense-item">

        <div class="expense-info">
          <div class="expense-icon">${category.icon}</div>

          <div>
            <strong>${escapeHTML(category.name)}</strong>
            <small>
              Suggested: ${formatCurrency(suggestedAmount)}
            </small>
          </div>
        </div>

        <input
          class="expense-input"
          type="number"
          min="0"
          step="1"
          value="${Number(expenses[category.name]) || 0}"
          data-category="${escapeHTML(category.name)}"
          placeholder="Amount ₹"
          aria-label="Actual expense for ${escapeHTML(category.name)}"
        >

      </div>
    `;

  }).join("");

  container.querySelectorAll(".expense-input").forEach(input => {

    input.addEventListener("input", () => {

      const categoryName = input.dataset.category;
      const amount = Number(input.value);

      expenses[categoryName] =
        input.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount < 0
          ? 0
          : amount;

      // Manual edits clear the selected package marker for this category.
      const selectedPackages = getSelectedPackages();
      delete selectedPackages[categoryName];
      saveSelectedPackages(selectedPackages);

      saveExpenses();
      updateBudget();
    });

    input.addEventListener("change", () => {
      renderAllRecommendations();
    });

  });

}

// 13. CALCULATE TOTAL EXPENSES

function getTotalExpenses() {

  return categories.reduce((total, category) => {
    return total + (Number(expenses[category.name]) || 0);
  }, 0);

}

// 14. UPDATE BUDGET NUMBERS

function updateBudget() {

  const budget = getBudget();
  const totalSpent = getTotalExpenses();
  const remaining = budget - totalSpent;

  const percentage =
    budget > 0 ? totalSpent / budget * 100 : 0;

  const safePercentage =
    Math.min(Math.max(percentage, 0), 100);

  document.getElementById("total-budget").textContent =
    formatCurrency(budget);

  document.getElementById("total-spent").textContent =
    formatCurrency(totalSpent);

  document.getElementById("remaining-budget").textContent =
    formatCurrency(remaining);

  document.getElementById("remaining-budget").style.color =
    remaining < 0 ? "#bd4b3e" : "#1b1b17";

  document.getElementById("expense-total").textContent =
    formatCurrency(totalSpent);

  document.getElementById("spent-percent").textContent =
    Math.round(percentage) + "%";

  document.getElementById("progress-spent").textContent =
    formatCurrency(totalSpent);

  document.getElementById("progress-percent").textContent =
    Math.round(percentage) + "%";

  document.getElementById("progress-fill").style.width =
    safePercentage + "%";

  updateChart(totalSpent);
  updateTip(percentage, remaining);
  updateReport(totalSpent, remaining, percentage);
}

// 15. DONUT CHART

function updateChart(totalSpent) {

  const donut = document.getElementById("donut-chart");
  const legend = document.getElementById("chart-legend");

  let currentAngle = 0;
  const segments = [];

  categories.forEach(category => {

    const amount = Number(expenses[category.name]) || 0;

    if (totalSpent > 0 && amount > 0) {

      const angle = amount / totalSpent * 360;

      segments.push(
        `${category.color} ${currentAngle}deg ${currentAngle + angle}deg`
      );

      currentAngle += angle;
    }

  });

  donut.style.background = totalSpent > 0
    ? `conic-gradient(${segments.join(", ")})`
    : "conic-gradient(#e8e5dd 0% 100%)";

  legend.innerHTML = categories
    .filter(category => Number(expenses[category.name]) > 0)
    .map(category => {

      const amount = Number(expenses[category.name]) || 0;

      return `
        <div class="legend-item">
          <span
            class="legend-color"
            style="background:${category.color}"
          ></span>

          <span>
            ${escapeHTML(category.name)}: ${formatCurrency(amount)}
          </span>
        </div>
      `;

    }).join("");

  if (totalSpent === 0) {
    legend.innerHTML =
      '<span class="legend-item">No expenses entered yet.</span>';
  }

}

// 16. BUDGET WARNING

function updateTip(percentage, remaining) {

  const tip = document.getElementById("budget-tip");

  if (percentage > 100) {

    tip.textContent =
      `You have exceeded your budget by ${formatCurrency(Math.abs(remaining))}. Review your expenses.`;

  } else if (percentage >= 80) {

    tip.textContent =
      "You have used most of your budget. Be careful with remaining expenses.";

  } else if (percentage > 0) {

    tip.textContent =
      "Good progress! Keep tracking your expenses to stay within budget.";

  } else {

    tip.textContent =
      "Add your expenses to see your budget status.";

  }

  if (remaining < 0) {
    tip.style.background = "#f9e9e6";
    tip.style.color = "#a83d32";
  } else {
    tip.style.background = "#f5f1e8";
    tip.style.color = "#806b47";
  }

}

// 17. EVENT REPORT

function updateReport(totalSpent, remaining, percentage) {

  const report = document.getElementById("report-text");

  if (totalSpent === 0) {

    report.textContent =
      "No expenses entered yet. Select service packages or add your expenses.";

  } else if (remaining < 0) {

    report.textContent =
      `Your event expenses are ${formatCurrency(totalSpent)}. You have exceeded your planned budget by ${formatCurrency(Math.abs(remaining))}.`;

  } else {

    report.textContent =
      `You have spent ${formatCurrency(totalSpent)} (${Math.round(percentage)}% of your budget). ${formatCurrency(remaining)} remains available.`;

  }

}

// 18. RENDER ALL 30 RECOMMENDATIONS

function renderAllRecommendations() {

  const selectedPackages = getSelectedPackages();
  const budget = getBudget();

  Object.entries(serviceCatalog).forEach(([category, service]) => {

    const container = document.getElementById(service.container);

    if (!container) return;

    const currentExpense =
      Number(expenses[category]) || 0;

    const otherExpenses =
      getTotalExpenses() - currentExpense;

    container.innerHTML = service.packages.map((item, index) => {

      const price = getServicePrice(item);
      const isSelected = selectedPackages[category] === index;
      const wouldExceedBudget = otherExpenses + price > budget;

      return `
        <article class="recommendation-card ${isSelected ? "selected" : ""}">

          <div class="recommendation-card-top">

            <div class="recommendation-icon">
              ${item.icon}
            </div>

            <span class="recommendation-tag ${wouldExceedBudget ? "over-budget" : ""}">
              ${wouldExceedBudget ? "Over budget" : item.tag}
            </span>

          </div>

          <h4>${escapeHTML(item.name)}</h4>

          <p class="recommendation-description">
            ${escapeHTML(item.description)}
          </p>

          <div class="recommendation-price">
            ${formatCurrency(price)}

            <small>
              Estimated total for ${Number(selectedEvent.guests) || 0} guests
            </small>
          </div>

          <div class="recommendation-includes">
            <strong>Package includes</strong><br>
            ${escapeHTML(item.includes)}
          </div>

          <button
            class="recommendation-select"
            data-category="${escapeHTML(category)}"
            data-index="${index}"
          >
            ${isSelected ? "✓ Selected package" : "Select this package →"}
          </button>

        </article>
      `;

    }).join("");

    // PACKAGE SELECTION
    container.querySelectorAll(".recommendation-select").forEach(button => {

      button.addEventListener("click", () => {

        const categoryName = button.dataset.category;
        const packageIndex = Number(button.dataset.index);

        const chosenPackage =
          serviceCatalog[categoryName].packages[packageIndex];

        const price = getServicePrice(chosenPackage);

        // Replace the existing category expense.
        // This prevents duplicate package charges.
        expenses[categoryName] = price;

        // Save selected package
        const packages = getSelectedPackages();
        packages[categoryName] = packageIndex;

        saveSelectedPackages(packages);
        saveExpenses();

        // Update the expense input
        const expenseInput = Array.from(
          document.querySelectorAll(".expense-input")
        ).find(input => input.dataset.category === categoryName);

        if (expenseInput) {
          expenseInput.value = price;
        }

        updateBudget();
        renderAllRecommendations();

        // Show selection confirmation
        const message = document.getElementById(
          "recommendation-message"
        );

        const total = getTotalExpenses();
        const remaining = budget - total;

        if (remaining < 0) {

          message.style.color = "#bd4b3e";

          message.textContent =
            `${chosenPackage.name} selected. ${formatCurrency(price)} added to ${categoryName}. Your budget is exceeded by ${formatCurrency(Math.abs(remaining))}.`;

        } else {

          message.style.color = "#247a4b";

          message.textContent =
            `${chosenPackage.name} selected! ${formatCurrency(price)} added to ${categoryName}.`;

        }

      });

    });

  });

}

// 19. RESET ALL EXPENSES AND PACKAGES

function resetAllExpenses() {

  const confirmed = confirm(
    "Are you sure you want to reset all expenses and selected packages?"
  );

  if (!confirmed) return;

  categories.forEach(category => {
    expenses[category.name] = 0;
  });

  saveExpenses();
  saveSelectedPackages({});

  createExpenseInputs();
  renderAllRecommendations();
  updateBudget();

  document.getElementById("recommendation-message").textContent =
    "All expenses and selected packages have been reset.";

}

// 20. PRINT REPORT

function printBudgetReport() {
  window.print();
}

// 21. LOGOUT

function logoutUser() {

  sessionStorage.removeItem("finoraCurrentUser");
  sessionStorage.removeItem("finoraSelectedEvent");

  window.location.replace("login.html");

}

// 22. START APPLICATION

function startFinora() {

  if (!user) {
    window.location.replace("login.html");
    return;
  }

  if (!selectedEvent) {
    alert("Please create or select an event first.");
    window.location.replace("index.html");
    return;
  }

  initializeBudgetPage();

  document.getElementById("reset-btn")
    .addEventListener("click", resetAllExpenses);

  document.getElementById("print-btn")
    .addEventListener("click", printBudgetReport);

  document.getElementById("logout-btn")
    .addEventListener("click", logoutUser);

}

// Start after all functions have been defined.
startFinora();
