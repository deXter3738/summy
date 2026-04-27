const quickReplies = {
  "/hi": "Hi Neha, thanks for reaching out. I can help you with that.",
  "/price": "Here is the approved pricing template for this plan.",
  "/hours": "Our team is available from 10 AM to 7 PM, Monday to Saturday.",
  "/return": "Our return policy allows returns within 7 days when the item is unused and eligible."
};

const conversations = [
  {
    id: "neha",
    initial: "N",
    color: "green-avatar",
    name: "Neha Sharma",
    phone: "+91 98765 11420",
    preview: "Delivery ETA + return policy template",
    time: "1m",
    status: "Open",
    assignee: "Asha",
    source: "Instagram QR",
    language: "English",
    tags: ["VIP", "Lead", "Instagram QR"],
    filter: ["all", "attention", "mine"],
    note: "VIP lead. Confirm delivery ETA, then send approved return-policy template.",
    savedNotes: ["Prefers WhatsApp updates only."],
    activity: [
      ["1m", "Message received from WhatsApp"],
      ["1m", "Round-robin assigned to Asha"],
      ["2m", "Lead source tracked: Instagram QR"],
      ["5m", "Template delivery status synced"]
    ],
    messages: [
      { type: "feature", initial: "W", color: "green-avatar", time: "1m" },
      {
        type: "incoming",
        initial: "N",
        color: "green-avatar",
        text: "Hi, I came from the QR link on Instagram. Can someone confirm delivery time and share the return policy template?",
        time: "1m"
      },
      {
        type: "agent",
        initial: "A",
        color: "gray-avatar",
        text: "Auto-assigned to Asha by round-robin. Suggested canned replies: /hours, /return, /delivery.",
        time: "delivered 1m"
      }
    ]
  },
  {
    id: "vijay",
    initial: "V",
    color: "purple-avatar",
    name: "Vijay Golani",
    phone: "+91 98220 55671",
    preview: "New lead from QR, assign sales rep",
    time: "2m",
    status: "Open",
    assignee: "Rohan",
    source: "Click-to-chat link",
    language: "English",
    tags: ["New lead", "QR", "Plan B"],
    filter: ["all", "attention", "team"],
    note: "Create lead record and assign sales rep for quotation follow-up.",
    savedNotes: ["Interested in Plan B after expo visit."],
    activity: [
      ["2m", "Lead created from wa.me short link"],
      ["2m", "Manual assignment available"],
      ["4m", "Contact profile enriched with source"]
    ],
    messages: [
      { type: "feature", initial: "W", color: "purple-avatar", time: "2m" },
      {
        type: "incoming",
        initial: "V",
        color: "purple-avatar",
        text: "New lead from expo. Interested in Plan B. Please have a sales rep contact me on WhatsApp.",
        time: "2m"
      }
    ]
  },
  {
    id: "arjun",
    initial: "A",
    color: "blue-avatar",
    name: "Arjun Mehta",
    phone: "+91 99880 44291",
    preview: "WhatsApp API connection verified",
    time: "3m",
    status: "Pending",
    assignee: "Mira",
    source: "Organic",
    language: "English",
    tags: ["Support", "API"],
    filter: ["all", "mine"],
    note: "BSP setup completed. Confirm template approval status before sending.",
    savedNotes: ["Workspace uses flat subscription."],
    activity: [
      ["3m", "WhatsApp Business API connected"],
      ["3m", "BSP-managed connection verified"],
      ["6m", "Template sync completed"]
    ],
    messages: [
      {
        type: "incoming",
        initial: "A",
        color: "blue-avatar",
        text: "Can you confirm whether our WhatsApp API connection is active?",
        time: "3m"
      },
      {
        type: "agent",
        initial: "M",
        color: "gray-avatar",
        text: "Connection verified. You can send text, images, documents, and approved templates.",
        time: "sent 2m"
      }
    ]
  },
  {
    id: "dev",
    initial: "D",
    color: "green-avatar",
    name: "Dev Patel",
    phone: "+91 90110 76543",
    preview: "Keyword trigger matched: price",
    time: "15m",
    status: "Open",
    assignee: "Unassigned",
    source: "Organic",
    language: "English",
    tags: ["Automation", "Price"],
    filter: ["all", "attention", "unassigned", "automations"],
    note: "Keyword automation should send pricing template and assign if no response.",
    savedNotes: ["Price-sensitive lead."],
    activity: [
      ["15m", "Keyword detected: price"],
      ["15m", "Auto-reply rule queued"],
      ["16m", "No available agent found"]
    ],
    messages: [
      { type: "incoming", initial: "D", color: "green-avatar", text: "price", time: "15m" },
      {
        type: "agent",
        initial: "W",
        color: "gray-avatar",
        text: "Keyword trigger matched. Pricing template is ready to send.",
        time: "system"
      }
    ]
  },
  {
    id: "campaigns",
    initial: "C",
    color: "yellow-avatar",
    name: "Campaigns",
    phone: "Post-launch module",
    preview: "Broadcast module deferred 2-3 weeks",
    time: "1h",
    status: "Deferred",
    assignee: "Admin",
    source: "Roadmap",
    language: "English",
    tags: ["Campaigns", "Deferred"],
    filter: ["all", "campaigns"],
    note: "Bulk campaigns, CSV upload, scheduling, and analytics ship after MVP launch.",
    savedNotes: ["Dashboard campaign widget is deferred with broadcasts."],
    activity: [
      ["1h", "Campaign snapshot marked deferred"],
      ["1h", "Broadcast analytics moved to week 2-3"],
      ["1h", "Saved segments cut for MVP"]
    ],
    messages: [
      {
        type: "incoming",
        initial: "C",
        color: "yellow-avatar",
        text: "Broadcast messaging, CSV upload, template campaigns, scheduling, and campaign analytics are deferred until after MVP launch.",
        time: "1h"
      }
    ]
  }
];

const state = {
  activeConversationId: conversations[0].id,
  activeFilter: "attention",
  activeTab: "details",
  query: "",
  newestFirst: true
};

const byId = (id) => document.getElementById(id);
const activeConversation = () => conversations.find((item) => item.id === state.activeConversationId) || conversations[0];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function matchesCurrentView(conversation) {
  const matchesFilter = conversation.filter.includes(state.activeFilter) || state.activeFilter === "dashboard";
  const text = `${conversation.name} ${conversation.phone} ${conversation.preview} ${conversation.tags.join(" ")}`.toLowerCase();
  return matchesFilter && text.includes(state.query.toLowerCase());
}

function renderConversationList() {
  const list = byId("conversation-list");
  const rows = conversations.filter(matchesCurrentView);
  if (!state.newestFirst) rows.reverse();

  list.innerHTML = rows.length
    ? rows
        .map(
          (item) => `
            <button class="thread-row ${item.id === state.activeConversationId ? "active" : ""}" data-conversation-id="${item.id}" type="button">
              <span class="avatar ${item.color}">${item.initial}</span>
              <span class="thread-copy">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.preview)}</span>
              </span>
              <span class="thread-time">${escapeHtml(item.time)}</span>
            </button>
          `
        )
        .join("")
    : `<div class="empty-state">No conversations match this view.</div>`;

  list.querySelectorAll("[data-conversation-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeConversationId = button.dataset.conversationId;
      render();
    });
  });
}

function featurePreview() {
  return `
    <article class="photo-message">
      <span class="avatar green-avatar">W</span>
      <div class="photo-bubble">
        <div class="feature-preview" aria-label="WhatsApp MVP feature preview">
          <div class="preview-header">
            <strong>WhatsApp MVP</strong>
            <span>BSP-managed API</span>
          </div>
          <div class="feature-grid">
            <span>Open 21</span>
            <span>Pending 8</span>
            <span>Resolved 36</span>
            <span>Avg response 4m</span>
          </div>
          <div class="status-strip">
            <b>Sent</b>
            <b>Delivered</b>
            <b>Read</b>
          </div>
        </div>
        <div class="message-meta">[] live</div>
      </div>
    </article>
  `;
}

function messageMarkup(message) {
  if (message.type === "feature") return featurePreview();
  const isAgent = message.type === "agent";
  return `
    <article class="text-message ${isAgent ? "agent-message" : ""}">
      <span class="avatar ${message.color}">${escapeHtml(message.initial)}</span>
      <div class="text-bubble">
        ${escapeHtml(message.text)}
        <div class="message-meta">${escapeHtml(message.time)}</div>
      </div>
    </article>
  `;
}

function renderChat() {
  const conversation = activeConversation();
  byId("chat-title").textContent = conversation.name;
  byId("status-badge").textContent = conversation.status;
  byId("messages").innerHTML = conversation.messages.map(messageMarkup).join("");
  byId("messages").scrollTop = byId("messages").scrollHeight;
}

function renderDetails() {
  const conversation = activeConversation();
  byId("contact-details").innerHTML = `
    <div class="profile-line">
      <span class="avatar ${conversation.color}">${conversation.initial}</span>
      <div>
        <h3>${escapeHtml(conversation.name)}</h3>
        <p>${escapeHtml(conversation.phone)}</p>
      </div>
    </div>
    <div class="tag-row">
      ${conversation.tags.map((tag, index) => `<span class="badge ${index === 0 ? "success" : index === 2 ? "secondary" : ""}">${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="attribute-grid">
      <p><span>Status</span><b>${escapeHtml(conversation.status)}</b></p>
      <p><span>Assignee</span><b>${escapeHtml(conversation.assignee)}</b></p>
      <p><span>Source</span><b>${escapeHtml(conversation.source)}</b></p>
      <p><span>Language</span><b>${escapeHtml(conversation.language)}</b></p>
      <p><span>Custom fields</span><b>3 / 5 used</b></p>
      <p><span>Subscription</span><b>Flat plan</b></p>
    </div>
  `;

  byId("activity-log").innerHTML = conversation.activity
    .map(([time, event]) => `<p><span>${escapeHtml(time)}</span><b>${escapeHtml(event)}</b></p>`)
    .join("");
  byId("internal-note").value = conversation.note;
  byId("saved-notes").innerHTML = conversation.savedNotes
    .map((note) => `<p><span>${escapeHtml(conversation.assignee)}</span><b>${escapeHtml(note)}</b></p>`)
    .join("");
}

function renderTabs() {
  document.querySelectorAll(".tabs-trigger").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });

  document.querySelectorAll("[data-section]").forEach((section) => {
    const sectionType = section.dataset.section;
    const show = state.activeTab === "details" ? sectionType === "details" : sectionType === state.activeTab;
    section.classList.toggle("is-hidden", !show);
  });
}

function render() {
  renderConversationList();
  renderChat();
  renderDetails();
  renderTabs();
}

document.querySelectorAll(".rail-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".rail-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".folder-row").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".folder-row").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    state.activeFilter = button.dataset.filter || "all";
    const firstMatch = conversations.find(matchesCurrentView);
    if (firstMatch) state.activeConversationId = firstMatch.id;
    render();
  });
});

document.querySelectorAll(".subfolders button").forEach((button) => {
  button.addEventListener("click", () => {
    state.activeFilter = button.dataset.filter || "all";
    document.querySelectorAll(".folder-row").forEach((item) => item.classList.remove("selected"));
    const firstMatch = conversations.find(matchesCurrentView);
    if (firstMatch) state.activeConversationId = firstMatch.id;
    render();
  });
});

document.querySelectorAll(".list-tools button").forEach((button, index) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".list-tools button").forEach((item) => item.classList.remove("active-tool"));
    button.classList.add("active-tool");
    if (index === 0) {
      state.activeFilter = state.activeFilter === "attention" ? "all" : "attention";
      button.textContent = state.activeFilter === "attention" ? "8 Open v" : "All Open v";
    } else {
      state.newestFirst = !state.newestFirst;
      button.textContent = state.newestFirst ? "Newest v" : "Oldest v";
    }
    const firstMatch = conversations.find(matchesCurrentView);
    if (firstMatch) state.activeConversationId = firstMatch.id;
    render();
  });
});

document.querySelectorAll(".tabs-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    state.activeTab = button.dataset.tab;
    renderTabs();
  });
});

byId("search-input").addEventListener("input", (event) => {
  state.query = event.target.value;
  const firstMatch = conversations.find(matchesCurrentView);
  if (firstMatch) state.activeConversationId = firstMatch.id;
  render();
});

document.querySelectorAll("[data-reply]").forEach((button) => {
  button.addEventListener("click", () => {
    byId("reply-input").value = quickReplies[button.dataset.reply] || button.dataset.reply;
    byId("reply-input").focus();
  });
});

byId("send-reply").addEventListener("click", () => {
  const input = byId("reply-input");
  const text = input.value.trim();
  if (!text) return;
  const conversation = activeConversation();
  conversation.messages.push({ type: "agent", initial: "A", color: "gray-avatar", text, time: "sent now" });
  conversation.activity.unshift(["now", "Agent reply sent from Whatboard"]);
  conversation.preview = text;
  conversation.time = "now";
  input.value = "";
  render();
});

byId("reply-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") byId("send-reply").click();
});

byId("close-conversation").addEventListener("click", () => {
  const conversation = activeConversation();
  conversation.status = conversation.status === "Resolved" ? "Open" : "Resolved";
  conversation.activity.unshift(["now", `Conversation marked ${conversation.status}`]);
  render();
});

byId("note-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const text = input.value.trim();
  const conversation = activeConversation();
  if (text) {
    conversation.savedNotes.unshift(text);
    conversation.activity.unshift(["now", "Internal note added"]);
    input.value = "";
  }
  conversation.note = byId("internal-note").value;
  state.activeTab = "notes";
  render();
});

byId("internal-note").addEventListener("input", (event) => {
  activeConversation().note = event.target.value;
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const conversation = activeConversation();
    const action = button.dataset.action;
    conversation.activity.unshift(["now", `${action} action used`]);
    if (action === "template") byId("reply-input").value = quickReplies["/return"];
    render();
  });
});

render();
