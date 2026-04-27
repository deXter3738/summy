const conversations = [
  ["N", "Neha Sharma", "Delivery ETA + return policy template", "1m", "green-avatar"],
  ["V", "Vijay Golani", "New lead from QR, assign sales rep", "2m", "purple-avatar"],
  ["A", "Arjun Mehta", "WhatsApp API connection verified", "3m", "blue-avatar"],
  ["S", "Sara Khan", "Message status: sent, delivered, read", "10m", "gray-avatar"],
  ["D", "Dev Patel", "Keyword trigger matched: price", "15m", "green-avatar"],
  ["R", "Riya Shah", "24h session expired, template only", "18m", "pink-avatar"],
  ["M", "Manav Desai", "Manual assignment override requested", "25m", "orange-avatar"],
  ["K", "Kavya Rao", "Internal note added for handoff", "30m", "yellow-avatar"],
  ["O", "Om Traders", "Click-to-chat link source tracked", "41m", "green-avatar"],
  ["P", "Priya Nair", "Canned reply shortcut /return used", "56m", "gray-avatar"],
  ["H", "Harsh Ltd", "Contact custom fields: 3 of 5 used", "59m", "green-avatar"],
  ["C", "Campaigns", "Broadcast module deferred 2-3 weeks", "1h", "yellow-avatar"],
  ["T", "Team", "Asha 6 chats, Rohan 4, Mira away", "1h", "green-avatar"]
];

const list = document.querySelector("#conversation-list");

list.innerHTML = conversations
  .map(
    ([initial, name, preview, time, color], index) => `
      <button class="thread-row ${index === 0 ? "active" : ""}" type="button">
        <span class="avatar ${color}">${initial}</span>
        <span class="thread-copy">
          <strong>${name}</strong>
          <span>${preview}</span>
        </span>
        <span class="thread-time">${time}</span>
      </button>
    `
  )
  .join("");

document.querySelectorAll(".thread-row").forEach((row) => {
  row.addEventListener("click", () => {
    document.querySelectorAll(".thread-row").forEach((item) => item.classList.remove("active"));
    row.classList.add("active");
  });
});
