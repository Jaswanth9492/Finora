// FINORA — CITY-WISE BUSINESS DIRECTORY
// Save this file as: vendors.js

window.FINORA_VENDOR_DIRECTORY = {
  cities: [
    "Hyderabad", "Bengaluru", "Chennai", "Vijayawada",
    "Visakhapatnam", "Guntur", "Nellore", "Tirupati",
    "Kochi", "Thiruvananthapuram", "Coimbatore",
    "Mysuru", "Mangaluru", "Tiruchirappalli"
  ],

  categories: [
    { id: "venue-list", name: "Venue", category: "Venue" },
    { id: "catering-list", name: "Food & Catering", category: "Catering" },
    { id: "decoration-list", name: "Decoration", category: "Decoration" },
    { id: "photography-list", name: "Photography", category: "Photography" },
    { id: "entertainment-list", name: "Entertainment", category: "Entertainment" },
    { id: "transport-list", name: "Transportation", category: "Transportation" },
    { id: "invitation-list", name: "Invitations & Gifts", category: "Invitations & Gifts" },
    { id: "makeup-list", name: "Makeup & Styling", category: "Makeup & Styling" },
    { id: "lighting-list", name: "Lighting & Sound", category: "Lighting & Sound" },
    { id: "management-list", name: "Event Management", category: "Event Management" }
  ],

  // These are initial business leads surfaced in earlier research.
  // Confirm current services, addresses and contact details before booking.
  businesses: [
    {
      id: "vij-y-convention",
      name: "Y Convention",
      city: "Vijayawada",
      category: "Venue",
      address: "Ayodhya Nagar, Vijayawada, Andhra Pradesh",
      description: "Convention and event venue",
      status: "Listing found — confirm details"
    },
    {
      id: "vij-ss-convention",
      name: "S S Convention Hall",
      city: "Vijayawada",
      category: "Venue",
      address: "Vijayawada, Andhra Pradesh",
      description: "Convention and function venue",
      status: "Listing found — confirm details"
    },
    {
      id: "vij-aica-events",
      name: "Aica Events",
      city: "Vijayawada",
      category: "Event Management",
      address: "Vijayawada, Andhra Pradesh",
      description: "Event planning and decoration services",
      status: "Listing found — confirm details"
    },
    {
      id: "vij-orange-catering",
      name: "Orange Professional Catering",
      city: "Vijayawada",
      category: "Catering",
      address: "Vijayawada, Andhra Pradesh",
      description: "Catering services",
      status: "Listing found — confirm details"
    },
    {
      id: "viz-murali-photo",
      name: "Murali Photography",
      city: "Visakhapatnam",
      category: "Photography",
      address: "Visakhapatnam, Andhra Pradesh",
      description: "Photography and event coverage",
      status: "Listing found — confirm details"
    },
    {
      id: "viz-conventions",
      name: "Vizag Conventions",
      city: "Visakhapatnam",
      category: "Venue",
      address: "Visakhapatnam, Andhra Pradesh",
      description: "Convention and event venue",
      status: "Listing found — confirm details"
    },
    {
      id: "hyd-vinora",
      name: "Vinora Events",
      city: "Hyderabad",
      category: "Event Management",
      address: "LB Nagar, Hyderabad, Telangana",
      description: "Event planning and related event services",
      status: "Listing found — confirm details"
    },
    {
      id: "blr-sheraton",
      name: "Sheraton Grand Bengaluru Whitefield",
      city: "Bengaluru",
      category: "Venue",
      address: "Whitefield, Bengaluru, Karnataka",
      description: "Hotel and event venue",
      status: "Listing found — confirm details"
    },
    {
      id: "blr-dreamstrokes",
      name: "Dreamstrokes Wedding Planners",
      city: "Bengaluru",
      category: "Event Management",
      address: "Bengaluru, Karnataka",
      description: "Wedding planning services",
      status: "Listing found — confirm details"
    },
    {
      id: "blr-eventwave",
      name: "Event Wave",
      city: "Bengaluru",
      category: "Lighting & Sound",
      address: "Bengaluru, Karnataka",
      description: "Audio, lighting and AV services",
      status: "Listing found — confirm details"
    },
    {
      id: "chn-m-weddings",
      name: "M Weddings Conventions",
      city: "Chennai",
      category: "Venue",
      address: "Chennai, Tamil Nadu",
      description: "Wedding and convention venue",
      status: "Listing found — confirm details"
    },
    {
      id: "chn-menaka-card",
      name: "Menaka Card",
      city: "Chennai",
      category: "Invitations & Gifts",
      address: "Chennai, Tamil Nadu",
      description: "Wedding invitation cards",
      status: "Listing found — confirm details"
    }
  ]
};


// ---------------- CITY NORMALIZATION ----------------

function finoraNormalizeCity(city) {
  const value = String(city || "").trim().toLowerCase();

  const aliases = {
    "vizag": "visakhapatnam",
    "bangalore": "bengaluru",
    "trivandrum": "thiruvananthapuram",
    "cochin": "kochi",
    "trichy": "tiruchirappalli"
  };

  const normalized = aliases[value] || value;

  const match = window.FINORA_VENDOR_DIRECTORY.cities.find(
    item => item.toLowerCase() === normalized
  );

  return match || String(city || "").trim();
}


// ---------------- RENDER BUSINESS CARDS ----------------

function finoraEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function finoraMapsLink(business) {
  const query = encodeURIComponent(
    `${business.name} ${business.address}`
  );

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function finoraRenderBusinessCard(business) {
  return `
    <article class="finora-vendor-card">
      <div class="finora-vendor-top">
        <span class="finora-vendor-category">
          ${finoraEscape(business.category)}
        </span>
        <span class="finora-vendor-status">
          ${finoraEscape(business.status)}
        </span>
      </div>

      <h3>${finoraEscape(business.name)}</h3>

      <p>${finoraEscape(business.description)}</p>

      <p class="finora-vendor-address">
        <span aria-hidden="true">📍</span>
        ${finoraEscape(business.address)}
      </p>

      <div class="finora-vendor-bottom">
        <span class="finora-vendor-price">Price: Request a quote</span>
        <a href="${finoraMapsLink(business)}"
           target="_blank"
           rel="noopener noreferrer">
          View location ↗
        </a>
      </div>
    </article>
  `;
}


// ---------------- MAIN DIRECTORY FUNCTION ----------------

function renderFinoraVendors() {
  const selectedEvent = JSON.parse(
    sessionStorage.getItem("finoraSelectedEvent") || "null"
  );

  if (!selectedEvent) return;

  const city = finoraNormalizeCity(selectedEvent.city);

  const cityBusinesses =
    window.FINORA_VENDOR_DIRECTORY.businesses.filter(
      business =>
        finoraNormalizeCity(business.city).toLowerCase() ===
        city.toLowerCase()
    );

  window.FINORA_VENDOR_DIRECTORY.categories.forEach(category => {
    const container = document.getElementById(category.id);
    if (!container) return;

    const matches = cityBusinesses.filter(
      business => business.category === category.category
    );

    if (matches.length) {
      container.innerHTML = matches
        .map(finoraRenderBusinessCard)
        .join("");
    } else {
      container.innerHTML = `
        <div class="finora-no-vendors">
          <strong>No verified listing added yet</strong>
          <p>
            We don't have a confirmed ${finoraEscape(category.name)}
            business in ${finoraEscape(city)} in this starter directory.
          </p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(category.name + " " + city)}"
             target="_blank"
             rel="noopener noreferrer">
            Search ${finoraEscape(category.name)} in ${finoraEscape(city)} ↗
          </a>
        </div>
      `;
    }
  });
}


// Run after the page and its existing budget script have loaded.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderFinoraVendors);
} else {
  renderFinoraVendors();
}