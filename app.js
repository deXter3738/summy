const quickReplies = {
  "/hi": "Hi Neha, thanks for reaching out. I can help you with that.",
  "/price": "Here is the approved pricing template for this plan.",
  "/hours": "Our team is available from 10 AM to 7 PM, Monday to Saturday.",
  "/return": "Our return policy allows returns within 7 days when the item is unused and eligible."
};

const templateOptions = {
  hi: "Hi {{name}}, thanks for reaching out. We're here to help.",
  return: "Here is the return-policy template.",
  price: "Here is the approved pricing template for this plan."
};

const currentAgent = "Asha";
const workspaceAgents = ["Admin", "Asha", "Rohan", "Mira", "Priya"];

const conversations = [
  {
    id: "neha",
    initial: "N",
    color: "green-avatar",
    name: "Neha Sharma",
    phone: "+91 98765 11420",
    email: "neha@example.com",
    preview: "Delivery ETA + return policy template",
    time: "1m",
    status: "Open",
    assignee: "Asha",
    source: "WhatsApp QR",
    tags: ["VIP", "Lead", "WhatsApp QR"],
    filter: ["all", "attention", "mine"],
    note: "VIP lead. Confirm delivery ETA, then send approved return-policy template.",
    savedNotes: ["Prefers WhatsApp updates only."],
    activity: [
      ["1m", "Message received from WhatsApp"],
      ["1m", "Round-robin assigned to Asha"],
      ["2m", "Lead source tracked: WhatsApp QR"],
      ["5m", "Template delivery status synced"]
    ],
    messages: [
      { type: "feature", initial: "W", color: "green-avatar", time: "1m" },
      {
        type: "incoming",
        initial: "N",
        color: "green-avatar",
        text: "Hi, I came from the QR link on WhatsApp. Can someone confirm delivery time and share the return policy template?",
        time: "1m"
      },
      {
        type: "agent",
        initial: "A",
        color: "gray-avatar",
        text: "Auto-assigned to Asha by round-robin. Suggested canned replies: /hours, /return, /delivery.",
        time: "delivered 1m"
      }
    ],
    pinned: false
  },
  {
    id: "vijay",
    initial: "V",
    color: "purple-avatar",
    name: "Vijay Golani",
    phone: "+91 98220 55671",
    email: "vijay@example.com",
    preview: "New lead from QR, assign sales rep",
    time: "2m",
    status: "Open",
    assignee: "Rohan",
    source: "Click-to-chat link",
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
    ],
    pinned: false
  },
  {
    id: "arjun",
    initial: "A",
    color: "blue-avatar",
    name: "Arjun Mehta",
    phone: "+91 99880 44291",
    email: "arjun@example.com",
    preview: "WhatsApp API connection verified",
    time: "3m",
    status: "Pending",
    assignee: "Mira",
    source: "Organic",
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
    ],
    pinned: false
  },
  {
    id: "dev",
    initial: "D",
    color: "green-avatar",
    name: "Dev Patel",
    phone: "+91 90110 76543",
    email: "dev@example.com",
    preview: "Keyword trigger matched: price",
    time: "15m",
    status: "Open",
    assignee: "Unassigned",
    source: "Organic",
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
    ],
    pinned: false
  },
  {
    id: "campaigns",
    initial: "C",
    color: "yellow-avatar",
    name: "Campaigns",
    phone: "Post-launch module",
    email: "campaigns@whatboard.in",
    preview: "Broadcast module deferred 2-3 weeks",
    time: "1h",
    status: "Deferred",
    assignee: "Admin",
    source: "Roadmap",
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
    ],
    pinned: false
  }
];

const contacts = [
  {
    id: "contact-neha",
    name: "Neha Sharma",
    phone: "+91 98765 11420",
    email: "neha@example.com",
    status: "Open",
    source: "WhatsApp QR",
    assignee: "Asha",
    tags: ["VIP", "Lead"],
    customFields: [
      { label: "City", value: "Mumbai" },
      { label: "Plan", value: "Basic" },
      { label: "Interest", value: "Returns" }
    ],
    conversationIds: ["neha"]
  },
  {
    id: "contact-vijay",
    name: "Vijay Golani",
    phone: "+91 87654 32100",
    email: "vijay@example.com",
    status: "Open",
    source: "WhatsApp QR",
    assignee: "Rohan",
    tags: ["Lead"],
    customFields: [{ label: "City", value: "Pune" }],
    conversationIds: ["vijay"]
  },
  {
    id: "contact-dev",
    name: "Dev Patel",
    phone: "+91 90110 76543",
    email: "dev@example.com",
    status: "Open",
    source: "Organic",
    assignee: "Unassigned",
    tags: ["Support", "API"],
    customFields: [{ label: "City", value: "Bengaluru" }],
    conversationIds: ["dev"]
  },
  {
    id: "contact-team",
    name: "Arjun Mehta",
    phone: "+91 99880 44291",
    email: "arjun@example.com",
    status: "Pending",
    source: "Organic",
    assignee: "Mira",
    tags: ["Support", "VIP"],
    customFields: [],
    conversationIds: ["arjun"]
  }
];

const settingsData = {
  profile: {
    fullName: "Asha Kumar",
    email: "asha@company.com"
  },
  business: {
    companyName: "Whatboard Demo",
    industry: "E-commerce",
    address: "Mumbai, MH"
  },
  whatsapp: {
    status: "Connected",
    phone: "+91 98765 00000",
    displayName: "Whatboard Demo"
  },
  team: [
    { id: "u-asha", name: "Asha Kumar", email: "asha@co.com", role: "Admin", active: true, status: "Active" },
    { id: "u-rohan", name: "Rohan Shah", email: "rohan@co.com", role: "Agent", active: true, status: "Active" },
    { id: "u-priya", name: "Priya Nair", email: "priya@co.com", role: "Agent", active: false, status: "Offline" }
  ],
  roles: {
    admin: [
      "View all conversations",
      "Assign conversations",
      "Manage team",
      "View settings",
      "Manage automations",
      "View billing"
    ],
    agent: [
      "View assigned convs",
      "Reply to messages",
      "Add internal notes"
    ]
  },
  links: [
    { name: "Expo QR", alias: "expo", aliasValue: "wa.me/919800000000/expo", clicks: 48, created: "Apr 20, 2026" },
    { name: "Website Chat", alias: "web", aliasValue: "wa.me/919800000000/web", clicks: 124, created: "Apr 15, 2026" },
    { name: "WhatsApp Bio", alias: "ig", aliasValue: "wa.me/919800000000/ig", clicks: 73, created: "Apr 10, 2026" }
  ],
  invoices: [
    { month: "Apr 2026", amount: "INR 4,999" },
    { month: "Mar 2026", amount: "INR 4,999" }
  ]
};

const builtModules = new Set(["inbox", "dashboard", "contacts", "settings", "campaigns", "automations"]);
const byId = (id) => document.getElementById(id);

const state = {
  activeModule: "inbox",
  activeConversationId: conversations[0].id,
  activeFilter: "attention",
  activeTab: "details",
  activeContactId: contacts[0].id,
  activeContactTab: "details",
  activeContactTagFilters: [],
  contactCustomFieldFilter: "all",
  activeContactFieldEdit: null,
  contactFieldSearch: "",
  query: "",
  statusFilter: "All",
  sortOrder: "newest",
  settingsSection: "profile"
};

let shouldUseIconFallback = false;
let activeOverflowMenu = null;

function normalizeConversationData() {
  conversations.forEach((conversation) => {
    conversation.savedNotes = (conversation.savedNotes || []).map((note, index) => {
      if (typeof note === "string") {
        return { author: index === 0 ? "Asha" : "Asha", time: "earlier", text: note };
      }
      return note;
    });
    if (!Array.isArray(conversation.activity)) conversation.activity = [];
    if (!Array.isArray(conversation.filter)) conversation.filter = ["all"];
    if (conversation.pinned === undefined) conversation.pinned = false;
    if (conversation.source === "Instagram QR") conversation.source = "WhatsApp QR";
    conversation.tags = (conversation.tags || []).map((tag) => (tag === "Instagram QR" ? "WhatsApp QR" : tag));
    syncConversationStatusFilters(conversation);
  });
}

function normalizeContacts() {
  contacts.forEach((contact) => {
    if (!Array.isArray(contact.tags)) contact.tags = [];
    if (!Array.isArray(contact.conversationIds)) contact.conversationIds = [];
    if (!Array.isArray(contact.customFields)) contact.customFields = [];
    if (!contact.conversationIds.length) {
      const conversation = conversations.find((item) => item.phone === contact.phone);
      if (conversation) {
        contact.conversationIds = [conversation.id];
      }
    }
  });
}

function activeConversation() {
  return conversations.find((item) => item.id === state.activeConversationId) || conversations[0];
}

function activeContact() {
  return contacts.find((item) => item.id === state.activeContactId) || contacts[0];
}

function activeModuleData() {
  return state.activeModule === "contacts" ? activeContact() : null;
}

function activeSettingsNavLabel() {
  return state.settingsSection || "profile";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nowLabel() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function clearConversationTemplateError() {
  const errorNode = byId("new-conversation-template-error");
  if (errorNode) {
    errorNode.textContent = "";
    errorNode.classList.remove("is-visible");
  }
}

function setConversationTemplateError(message) {
  const errorNode = byId("new-conversation-template-error");
  if (!errorNode) return;
  errorNode.textContent = message;
  errorNode.classList.toggle("is-visible", true);
}

function setFieldError(input, message, fieldId) {
  if (!input) return;
  input.classList.toggle("is-invalid", Boolean(message));
  const key = `${fieldId || input.id}-error`;
  let errorNode = byId(key);
  if (!errorNode) {
    errorNode = document.createElement("p");
    errorNode.id = key;
    errorNode.className = "field-error";
    input.insertAdjacentElement("afterend", errorNode);
  }
  errorNode.textContent = message || "";
}

function isValidEmail(value) {
  const trimmed = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function openTemplatePicker(anchor) {
  const existing = byId("reply-template-menu");
  if (existing) existing.remove();

  const menu = document.createElement("div");
  menu.id = "reply-template-menu";
  menu.className = "overflow-menu quick-reply-menu";
  menu.innerHTML = `
    <button type="button" class="menu-item" data-template="price">/price — pricing reply</button>
    <button type="button" class="menu-item" data-template="hours">/hours — business hours</button>
    <button type="button" data-template="hi">/hi — greeting</button>
    <button type="button" class="menu-item" data-template="return">/return — return policy</button>
  `;
  byId("reply-input")?.insertAdjacentElement("afterend", menu);
  menu.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const templateKey = button.getAttribute("data-template");
      byId("reply-input").value = quickReplies[templateKey] || "";
      menu.remove();
    });
  });
}

function addActivity(conversation, event) {
  conversation.activity.unshift([nowLabel(), event]);
}

function addContactActivity(contact, event) {
  contact.activity = contact.activity || [];
  contact.activity.unshift([nowLabel(), event]);
}

function isInFolderFilter(conversation, filter) {
  if (!filter || filter === "all" || filter === "all-conversations") return true;
  if (filter === "dashboard") return false;
  if (filter === "attention") return conversation.status !== "Resolved";
  if (filter === "mine") return conversation.assignee === currentAgent;
  if (filter === "team") return conversation.assignee && conversation.assignee !== "Unassigned";
  if (filter === "unassigned") return conversation.assignee === "Unassigned";
  if (filter === "campaigns") return conversation.status === "Deferred";
  if (filter === "automations") return conversation.tags.includes("Automation") || conversation.filter.includes("automations");
  return conversation.filter.includes(filter);
}

function isInStatusFilter(conversation, status) {
  if (status === "All") return true;
  return conversation.status === status;
}

function matchesCurrentView(conversation) {
  const byFolder = isInFolderFilter(conversation, state.activeFilter);
  const byStatus = isInStatusFilter(conversation, state.statusFilter);
  const query = String(state.query || "").trim().toLowerCase();
  const haystack = `${conversation.name} ${conversation.phone} ${conversation.preview} ${conversation.tags.join(" ")}`.toLowerCase();
  return byFolder && byStatus && haystack.includes(query);
}

function matchesContactsFilter(contact) {
  const query = state.contactFieldSearch.toLowerCase();
  const tagMatches =
    state.activeContactTagFilters.length === 0 ||
    contact.tags.some((tag) => state.activeContactTagFilters.includes(tag));
  const fieldMatch =
    state.contactCustomFieldFilter === "all" ||
    (contact.customFields || []).some((field) => field.label === state.contactCustomFieldFilter);

  const byQuery =
    `${contact.name} ${contact.phone} ${contact.tags.join(" ")} ${contact.source}`.toLowerCase().includes(query);
  return tagMatches && fieldMatch && byQuery;
}

function setConversationStatus(conversation, nextStatus) {
  if (!conversation || conversation.status === nextStatus) return;
  const previousStatus = conversation.status;
  conversation.status = nextStatus;
  addActivity(conversation, `Status changed to ${nextStatus} by ${currentAgent}`);
  syncConversationStatusFilters(conversation, previousStatus, nextStatus);
  render();
}

function syncConversationStatusFilters(conversation) {
  if (!conversation || !Array.isArray(conversation.filter)) return;
  conversation.filter = conversation.filter.filter((item) => !["attention", "pending", "resolved"].includes(item));
  if (conversation.status === "Resolved") {
    conversation.filter.push("resolved");
  } else {
    conversation.filter.push("attention");
    if (conversation.status === "Pending") conversation.filter.push("pending");
  }
}

function setConversationAssignee(conversation, nextAssignee) {
  if (!conversation || conversation.assignee === nextAssignee) return;
  conversation.assignee = nextAssignee;
  addActivity(conversation, `Reassigned to ${nextAssignee} by ${currentAgent}`);
  if (nextAssignee === "Unassigned") {
    if (!conversation.filter.includes("unassigned")) conversation.filter.push("unassigned");
    conversation.filter = conversation.filter.filter((item) => item !== "mine");
  } else {
    conversation.filter = conversation.filter.filter((item) => item !== "unassigned");
    if (nextAssignee === currentAgent && !conversation.filter.includes("mine")) {
      conversation.filter.push("mine");
    }
  }
  render();
}

function appendNote(conversation, text) {
  conversation.savedNotes.unshift({
    author: currentAgent,
    time: nowLabel(),
    text
  });
  addActivity(conversation, `Note added by ${currentAgent}`);
  showToast("Note saved");
}

function createConversation({ name, phone, template }) {
  const conversation = {
    id: `lead-${Date.now()}`,
    initial: name.trim().charAt(0).toUpperCase(),
    color: "orange-avatar",
    name: name.trim(),
    phone: phone.trim(),
    email: "",
    preview: template ? `Template sent: ${template}` : "Conversation opened",
    time: "now",
    status: "Open",
    assignee: currentAgent,
    source: "Manual",
    tags: ["New", "Manual"],
    filter: ["all", "attention", "mine", "team"],
    note: "",
    savedNotes: [],
    activity: [],
    messages: [],
    pinned: false
  };
  if (template) {
    conversation.messages.push({
      type: "agent",
      initial: "A",
      color: "gray-avatar",
      text: template,
      time: "now"
    });
  }
  addActivity(conversation, `Conversation created by ${currentAgent}`);
  return conversation;
}

function ensureContactForConversation(conversation) {
  const existing = contacts.find((item) => item.phone === conversation.phone);
  if (existing) return;
  contacts.unshift({
    id: `contact-${conversation.id}`,
    name: conversation.name,
    phone: conversation.phone,
    email: "",
    status: conversation.status,
    source: conversation.source,
    assignee: conversation.assignee,
    tags: ["Open"],
    customFields: [],
    conversationIds: [conversation.id]
  });
}

function createContact({ name, phone }) {
  const newContact = {
    id: `contact-${Date.now()}`,
    name,
    phone,
    email: "",
    status: "Open",
    source: "Manual",
    assignee: "Unassigned",
    tags: ["Lead"],
    customFields: [],
    conversationIds: []
  };
  contacts.unshift(newContact);
  return newContact;
}

function hydrateIconFallback() {
  const timeout = new Promise((resolve) => {
    window.setTimeout(resolve, 1200);
  });
  const fontsReady = window.document.fonts
    ? Promise.race([window.document.fonts.ready.catch(() => {}), timeout])
    : Promise.resolve();
  return Promise.resolve(fontsReady).then(() => {
    const probe = document.querySelector("i.ph");
    const glyphsRendered = probe ? isPhosphorGlyphRendered(probe) : false;
    if (!glyphsRendered) {
      shouldUseIconFallback = true;
      const icons = [...document.querySelectorAll("i.ph")];
      if (icons.length) {
        replacePhosphorWithFallback(icons);
      }
      return;
    }
    shouldUseIconFallback = false;
  });
}

function isPhosphorGlyphRendered(icon) {
  if (!icon || !icon.classList || !icon.classList.contains("ph")) return false;
  try {
    const content = window.getComputedStyle(icon, "::before").content;
    if (!content || content === "none" || content === '""' || content === "\"\"") return false;
    return true;
  } catch (error) {
    return false;
  }
}

const phosphorFallbackMap = {
  "house": "H",
  "chats": "C",
  "chat": "C",
  "chats-circle": "C",
  "chat-teardrop-text": "C",
  "chat-circle": "C",
  "chat-circle-text": "C",
  "chat-teardrop": "C",
  "chat-text": "C",
  "chat-dots": "C",
  "list": "≡",
  "list-checks": "✓",
  "bell": "!",
  "plus": "+",
  "plus-circle": "+",
  "minus": "−",
  "minus-circle": "−",
  "whatsapp-logo": "W",
  "whatsapp-logo-fill": "W",
  "question": "?",
  "question-mark": "?",
  "arrow-right": "→",
  "arrow-clockwise": "↻",
  "arrow-up-right": "↗",
  "arrow-counter-clockwise": "↺",
  "caret-down": "▾",
  "clock": "⏱",
  "hand-waving": "Hi",
  "note": "✎",
  "star": "★",
  "star-fill": "★",
  "star-half": "★",
  "star-of-life": "+",
  "check": "✓",
  "check-bold": "✓",
  "check-circle": "✓",
  "circle-notch": "◌",
  "circle-dashed": "◌",
  "circle": "●",
  "circle-half": "◔",
  "calendar": "▦",
  "funnel": "⌕",
  "funnel-simple": "⌕",
  "magnifying-glass": "⌕",
  "magnifyingGlass": "⌕",
  "coins": "◈",
  "x": "×",
  "x-circle": "✕",
  "xCircle": "✕",
  "gear": "⚙",
  "gear-six": "⚙",
  "robot": "⚙",
  "robotFill": "⚙",
  "users": "U",
  "usersfour": "U",
  "usersFour": "U",
  "user": "U",
  "user-circle": "U",
  "userCircle": "U",
  "users-four": "U",
  "user-plus": "+",
  "circle-notched": "◌",
  "dots-three-outline": "⋯",
  "dots-three-vertical": "⋮",
  "phone": "☎",
  "phone-call": "☎",
  "trash": "⌫",
  "trash-simple": "⌫",
  "paperclip-horizontal": "⎘",
  "paper-plane": "↗",
  "paper-plane-right": "↗",
  "megaphone": "↗",
  "chart-line": "▂",
  "chart-bar": "▂",
  "chart-bar-horizontal": "▭",
  "chart-line-up": "↗",
  "circle-arrow-down": "↳",
  "warning": "⚠",
  "warning-circle": "⚠",
  "info": "ⓘ",
  "info-light": "ⓘ",
  "folder-open": "F",
  "folder-open-fill": "F",
  "folder": "▢",
  "text-indent": "¶",
  "panel-top": "▭",
  "copy": "⧉",
  "check-badge": "✓",
  "check-circle-offset": "✓",
  "sort-ascending": "⇧",
  "sort-descending": "⇩",
  "sorter": "⇅"
};

function replacePhosphorWithFallback(iconsToReplace = null) {
  const icons = iconsToReplace
    ? [...iconsToReplace]
    : [...document.querySelectorAll("i.ph")].filter((icon) => !isPhosphorGlyphRendered(icon));
  if (!icons.length) return;
  shouldUseIconFallback = true;
  icons.forEach((icon) => {
    const iconClass = [...icon.classList].find((item) => item.startsWith("ph-") && item !== "ph");
    const iconName = iconClass ? iconClass.replace("ph-", "") : "";
    const normalizedIconName = normalizePhosphorIconName(iconName);
    const visualClassName = [...icon.classList]
      .filter((item) => item !== "ph" && !item.startsWith("ph-") && item !== "ph-fallback")
      .join(" ");
    const fallback = phosphorFallbackMap[normalizedIconName] || phosphorFallbackMap[iconName] || "•";
    const fallbackIcon = document.createElement("span");
    const classes = `icon icon-fallback ${visualClassName}`.trim();
    fallbackIcon.className = classes;
    if (icon.title) fallbackIcon.title = icon.title;
    if (icon.getAttribute("aria-label")) {
      fallbackIcon.setAttribute("aria-label", icon.getAttribute("aria-label"));
    }
    fallbackIcon.textContent = fallback;
    icon.replaceWith(fallbackIcon);
  });
}

function hasPhosphorGlyph() {
  const probe = document.querySelector("i.ph");
  if (!probe) return true;
  const content = window.getComputedStyle(probe, "::before").content;
  return content && content !== "none" && content !== '""' && content !== "\"\"";
}

function normalizePhosphorIconName(iconName) {
  if (!iconName) return "";
  return iconName
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .trim();
}

function syncFallbackIcons() {
  const allIcons = [...document.querySelectorAll("i.ph")];
  if (!allIcons.length) return;
  if (shouldUseIconFallback) return;
  const probe = allIcons[0];
  if (probe && !isPhosphorGlyphRendered(probe)) {
    shouldUseIconFallback = true;
    replacePhosphorWithFallback(allIcons);
  }
}

function showToast(message) {
  const toast = byId("toast") || (() => {
    const el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
    return el;
  })();
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1700);
}

function setWorkspaceMode(mode) {
  const workspace = byId("workspace");
  if (!workspace) return;
  workspace.classList.remove(
    "module-inbox",
    "module-dashboard",
    "module-contacts",
    "module-settings",
    "module-campaigns",
    "module-automations"
  );
  workspace.classList.add(`module-${mode}`);
  const listHead = document.querySelector(".list-head");
  const searchBox = document.querySelector(".search-box");
  const listTools = byId("list-tools");
  const detailsPanel = document.querySelector(".details-panel");
  if (mode === "dashboard" || mode === "settings") {
    if (listHead) listHead.style.display = "none";
    if (searchBox) searchBox.style.display = "none";
    if (listTools) listTools.style.display = "none";
    if (detailsPanel) detailsPanel.style.display = "none";
  } else {
    if (listHead) listHead.style.display = "";
    if (searchBox) searchBox.style.display = "";
    if (listTools) listTools.style.display = "";
    if (detailsPanel) detailsPanel.style.display = "";
  }
  if (mode === "contacts") {
    if (listHead) listHead.style.display = "none";
    if (searchBox) searchBox.style.display = "none";
    if (listTools) listTools.style.display = "none";
  }
}

function activateRail(moduleName) {
  document.querySelectorAll(".rail-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.module === moduleName);
  });
}

function setModule(moduleName) {
  if (!builtModules.has(moduleName)) {
    showToast("This module is coming soon");
    return;
  }
  state.activeModule = moduleName;
  if (moduleName === "inbox") {
    state.activeFilter = "attention";
    state.statusFilter = "All";
    state.activeTab = "details";
  }
  if (moduleName === "contacts") {
    state.activeContactTagFilters = [];
    state.contactCustomFieldFilter = "all";
    state.contactFieldSearch = "";
    state.activeContactTab = "details";
    state.activeContactFieldEdit = null;
  }
  if (moduleName === "settings") {
    state.settingsSection = "profile";
  }
  if (moduleName === "campaigns" || moduleName === "automations") {
    state.query = "";
  }
  activateRail(moduleName);
  render();
}

function closeOverflowMenu() {
  if (activeOverflowMenu && activeOverflowMenu.parentElement) {
    activeOverflowMenu.remove();
  }
  activeOverflowMenu = null;
}

function buildStatusSelect(currentStatus) {
  return `
    <select class="inline-select" data-role="status-select" aria-label="Conversation status">
      <option value="Open" ${currentStatus === "Open" ? "selected" : ""}>Open</option>
      <option value="Pending" ${currentStatus === "Pending" ? "selected" : ""}>Pending</option>
      <option value="Resolved" ${currentStatus === "Resolved" ? "selected" : ""}>Resolved</option>
    </select>
  `;
}

function buildAssigneeSelect(currentAssignee) {
  const options = [...workspaceAgents, "Unassigned"];
  return `
    <select class="inline-select" data-role="assignee-select" aria-label="Conversation assignee">
      ${options
        .map(
          (agent) =>
            `<option value="${agent}" ${currentAssignee === agent ? "selected" : ""}>${escapeHtml(agent)}</option>`
        )
        .join("")}
    </select>
  `;
}

function showOverflowMenu() {
  const container = byId("overflow-anchor");
  const conversation = activeConversation();
  closeOverflowMenu();
  if (!container || !conversation) return;

  const menu = document.createElement("div");
  menu.className = "overflow-menu";
  menu.innerHTML = `
    <button type="button" data-overflow="reassign" class="menu-item">Reassign...</button>
    <button type="button" data-overflow="pending" class="menu-item">Mark as Pending</button>
    <button type="button" data-overflow="resolved" class="menu-item">Mark as Resolved</button>
    <button type="button" data-overflow="close" class="menu-item">Close conversation</button>
    <button type="button" data-overflow="pin" class="menu-item">${conversation.pinned ? "Unpin" : "Pin"} conversation</button>
  `;
  container.appendChild(menu);
  activeOverflowMenu = menu;

  menu.querySelectorAll("[data-overflow]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-overflow");
      if (action === "pending") setConversationStatus(conversation, "Pending");
      if (action === "resolved") setConversationStatus(conversation, "Resolved");
      if (action === "close") setConversationStatus(conversation, "Resolved");
      if (action === "pin") {
        conversation.pinned = !conversation.pinned;
        addActivity(conversation, `${conversation.pinned ? "Pinned" : "Unpinned"} by ${currentAgent}`);
        render();
      }
      if (action === "reassign") {
        openAssigneeMenu(conversation);
      }
      closeOverflowMenu();
    });
  });
}

function openAssigneeMenu(conversation) {
  const anchor = byId("overflow-anchor");
  closeOverflowMenu();
  if (!anchor || !conversation) return;
  const menu = document.createElement("div");
  menu.className = "overflow-menu";
  menu.innerHTML = workspaceAgents
    .map((agent) => `<button type="button" data-assignee="${agent}" class="menu-item">Assign to ${agent}</button>`)
    .join("");
  anchor.appendChild(menu);
  activeOverflowMenu = menu;

  menu.querySelectorAll("[data-assignee]").forEach((item) => {
    item.addEventListener("click", () => {
      setConversationAssignee(conversation, item.getAttribute("data-assignee"));
      closeOverflowMenu();
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
        <div class="message-meta"><i class="ph ph-circle-notch icon" aria-hidden="true"></i> live</div>
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

function conversationCountForFilter(filter) {
  return conversations.filter((item) => item.filter.includes(filter)).length;
}

function isContactActiveTag(tag) {
  return state.activeContactTagFilters.includes(tag);
}

function getContactTagsInventory() {
  const set = new Set();
  contacts.forEach((contact) => {
    contact.tags.forEach((tag) => set.add(tag));
  });
  return [...set].sort((a, b) => a.localeCompare(b));
}

function getContactCustomFieldsInventory() {
  const set = new Set();
  contacts.forEach((contact) => {
    contact.customFields.forEach((field) => set.add(field.label));
  });
  return ["all", ...[...set].sort((a, b) => a.localeCompare(b))];
}

function renderInboxSidebar() {
  const folders = byId("module-sidebar");
  folders.innerHTML = `
    <header class="panel-title">
      <h1>Whatboard</h1>
      <div class="title-actions">
        <button class="button button-icon ghost" data-action="help" type="button" aria-label="Help" title="Help">
          <i class="ph ph-question icon icon-sm" aria-hidden="true"></i>
        </button>
        <button class="button button-icon" data-action="new" type="button" aria-label="New conversation" title="New conversation">
          <i class="ph ph-plus icon icon-sm" aria-hidden="true"></i>
        </button>
      </div>
    </header>
    <nav class="folder-nav">
      <button class="folder-row ${state.activeFilter === "all" && state.statusFilter === "All" ? "selected" : ""}" data-filter="all" data-status-filter="All" type="button"><i class="ph ph-whatsapp-logo icon icon-list" aria-hidden="true"></i>WhatsApp inbox <strong>${conversationCountForFilter(
        "all"
      )}</strong></button>
      <button class="folder-row ${state.activeFilter === "attention" ? "selected" : ""}" data-filter="attention" type="button"><i class="ph ph-bell icon icon-list" aria-hidden="true"></i>Needs attention <strong>${conversations.filter(
        (item) => item.filter.includes("attention")
      ).length}</strong></button>
      <button class="folder-row ${state.activeFilter === "mine" ? "selected" : ""}" data-filter="mine" type="button"><i class="ph ph-check-circle icon icon-list" aria-hidden="true"></i>Assigned to me <strong>${conversations.filter(
        (item) => item.filter.includes("mine")
      ).length}</strong></button>
      <button class="folder-row ${state.activeFilter === "all-conversations" && state.statusFilter === "All" ? "selected" : ""}" data-filter="all-conversations" data-status-filter="All" type="button"><i class="ph ph-list icon icon-list" aria-hidden="true"></i>All conversations <strong>${conversations.length}</strong></button>
      <button class="folder-row ${state.activeFilter === "unassigned" ? "selected" : ""}" data-filter="unassigned" type="button"><i class="ph ph-user-circle icon icon-list" aria-hidden="true"></i>Unassigned <strong>${conversations.filter((item) => item.assignee === "Unassigned").length}</strong></button>
      <button class="folder-row" data-module-link="dashboard" type="button"><i class="ph ph-chart-line icon icon-list" aria-hidden="true"></i>Dashboard</button>
      <button class="folder-row ${state.activeFilter === "team" ? "selected" : ""}" data-filter="team" type="button"><i class="ph ph-users-four icon icon-list" aria-hidden="true"></i>Team inbox</button>
      <button class="folder-row" data-filter="campaigns" type="button"><i class="ph ph-megaphone icon icon-list" aria-hidden="true"></i>Campaigns <em class="inline-meta">defer</em></button>
      <button class="folder-row" data-filter="automations" type="button"><i class="ph ph-robot icon icon-list" aria-hidden="true"></i>Automations <em class="inline-meta">&gt;</em></button>
    </nav>
    <div class="subfolders">
      <button data-filter="all" type="button" class="${state.activeFilter === "all" && state.statusFilter === "All" ? "selected" : ""}">Open conversations</button>
      <button data-filter="all" data-status-filter="Pending" type="button" class="${state.statusFilter === "Pending" ? "selected" : ""}">Pending follow-ups</button>
      <button data-filter="automations" type="button">Template messages</button>
      <button data-filter="team" type="button">Click-to-chat links</button>
    </div>
    <button class="folder-row ai-row" data-filter="automations" type="button"><span>*</span>Keyword auto-replies <em>&gt;</em></button>
  `;
}

function renderInboxListTools() {
  const listTools = byId("list-tools");
  if (listTools) {
    listTools.innerHTML = `
        <label class="filter-select-wrap">
          <i class="ph ph-funnel icon icon-inline" aria-hidden="true"></i>
          <select id="open-filter-select" class="tiny-select select">
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </label>
        <label class="filter-select-wrap">
          <i class="ph ph-calendar icon icon-inline" aria-hidden="true"></i>
          <select id="sort-order-select" class="tiny-select select">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </label>`;
  }

  const headerLabel = byId("conversation-list-title");
  if (headerLabel) {
    const map = {
      "all-conversations": "All conversations",
      all: "All conversations",
      attention: "Needs attention",
      mine: "Assigned to me",
      team: "Team inbox",
      unassigned: "Unassigned",
      campaigns: state.statusFilter === "Pending" ? "Pending follow-ups" : "Campaigns",
      automations: "Automations"
    };
    const folderName = map[state.activeFilter] || "Conversations";
    headerLabel.textContent = state.statusFilter === "All" ? folderName : `${state.statusFilter} conversations`;
  }

  const statusSelect = byId("open-filter-select");
  const sortSelect = byId("sort-order-select");
  if (statusSelect && statusSelect.value !== state.statusFilter) statusSelect.value = state.statusFilter;
  if (sortSelect && sortSelect.value !== state.sortOrder) sortSelect.value = state.sortOrder;
}

function renderConversationList() {
  const list = byId("conversation-list");
  const rows = conversations.filter(matchesCurrentView);
  const orderedRows = state.sortOrder === "oldest" ? [...rows].reverse() : rows;
  if (!orderedRows.length) {
    list.innerHTML = `<div class="empty-state">No conversations match this view.</div>`;
    return;
  }
  if (!state.activeConversationId || !rows.find((item) => item.id === state.activeConversationId)) {
    state.activeConversationId = orderedRows[0].id;
  }
  list.innerHTML = orderedRows
    .map(
      (item) => `
        <button class="thread-row ${item.id === state.activeConversationId ? "active" : ""}" data-module-item="${item.id}" data-type="conversation" type="button">
          <span class="avatar ${item.color}">${item.initial}</span>
          <span class="thread-copy">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.preview)}</span>
          </span>
          <span class="thread-time">${escapeHtml(item.time)}</span>
        </button>
      `
    )
    .join("");
}

function renderChat() {
  const conversation = activeConversation();
  byId("chat-title").textContent = conversation.name;
  byId("status-badge").value = conversation.status;
  byId("messages").innerHTML = conversation.messages.map(messageMarkup).join("");
  byId("messages").scrollTop = byId("messages").scrollHeight;
}

function renderDetailsPanel() {
  const conversation = activeConversation();
  const linkedContact = contacts.find((contact) => contact.phone === conversation.phone);
  const customFieldCount = linkedContact ? linkedContact.customFields.length : 0;
  byId("contact-details").innerHTML = `
    <div class="profile-line">
      <span class="avatar ${conversation.color}">${conversation.initial}</span>
      <div>
        <h3>${escapeHtml(conversation.name)}</h3>
        <p>${escapeHtml(conversation.phone)}</p>
      </div>
    </div>
    <div class="tag-row">
      ${conversation.tags
        .map((tag, index) => `<span class="badge ${index === 0 ? "success" : index === 1 ? "" : "secondary"}">${escapeHtml(tag)}</span>`)
        .join("")}
    </div>
    <div class="attribute-grid">
      <p><span>Status</span><span>${buildStatusSelect(conversation.status)}</span></p>
      <p><span>Assignee</span><span>${buildAssigneeSelect(conversation.assignee)}</span></p>
      <p><span>Source</span><b>${escapeHtml(conversation.source)}</b></p>
      <p><span>Custom fields</span><b>${customFieldCount}/5 used</b></p>
    </div>
  `;

  const statusSelect = byId("contact-details").querySelector('[data-role="status-select"]');
  const assigneeSelect = byId("contact-details").querySelector('[data-role="assignee-select"]');
  if (statusSelect) {
    statusSelect.addEventListener("change", () => {
      const conv = activeConversation();
      setConversationStatus(conv, statusSelect.value);
    });
  }
  if (assigneeSelect) {
    assigneeSelect.addEventListener("change", () => {
      const conv = activeConversation();
      setConversationAssignee(conv, assigneeSelect.value);
    });
  }

  byId("activity-log").innerHTML = conversation.activity
    .map(([time, eventText]) => `<p><span>${escapeHtml(time)}</span><b>${escapeHtml(eventText)}</b></p>`)
    .join("");

  byId("internal-note").value = conversation.note || "";
  byId("saved-notes").innerHTML = conversation.savedNotes
    .map(
      (note) => `
        <article class="note-card">
          <header>
            <strong>${escapeHtml(note.author || currentAgent)}</strong>
            <span>${escapeHtml(note.time || "now")}</span>
          </header>
          <p>${escapeHtml(note.text || "")}</p>
        </article>
      `
    )
    .join("");
}

function renderTabs() {
  if (state.activeModule === "contacts") {
    return renderContactTabs();
  }
  if (state.activeModule !== "inbox") return;

  document.querySelectorAll("#detail-header-tabs .tabs-trigger").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
  document.querySelectorAll("[data-section]").forEach((section) => {
    const sectionType = section.dataset.section;
    const isTab = state.activeTab === "details" ? sectionType === "details" : sectionType === state.activeTab;
    section.classList.toggle("is-hidden", !isTab);
  });
}

function renderInbox() {
  setWorkspaceMode("inbox");
  renderInboxSidebar();
  byId("search-input").placeholder = "Search name, phone, or keyword";
  byId("search-input").value = state.query;
  renderConversationList();
  renderChat();
  renderDetailsPanel();
  renderTabs();
  renderInboxListTools();
}

function renderCampaigns() {
  setWorkspaceMode("campaigns");
  byId("module-sidebar").innerHTML = "";
  byId("conversation-list").innerHTML = `
    <section class="dashboard-shell">
      <header class="panel-title">
        <div>
          <h1>Campaigns</h1>
          <p class="kpi-subtitle">Deferred until post-launch.</p>
        </div>
        <span class="badge warning">Deferred</span>
      </header>
      <section class="card activity-pane">
        <h3>Broadcasts are deferred</h3>
        <p class="muted">Campaign creation, scheduling, CSV upload, and analytics will ship after MVP launch.</p>
      </section>
    </section>
  `;
}

function renderAutomations() {
  setWorkspaceMode("automations");
  byId("module-sidebar").innerHTML = "";
  byId("conversation-list").innerHTML = `
    <section class="dashboard-shell">
      <header class="panel-title">
        <div>
          <h1>Automations</h1>
          <p class="kpi-subtitle">Keyword and auto-reply rules.</p>
        </div>
      </header>
      <section class="card activity-pane">
        <h3>Rule management</h3>
        <div class="activity-list">
          <div class="activity-item"><span>On</span><p>Keyword: <b>price</b> -> send pricing template</p></div>
          <div class="activity-item"><span>On</span><p>Welcome message for new conversations</p></div>
          <div class="activity-item"><span>On</span><p>Away message outside business hours</p></div>
        </div>
      </section>
    </section>
  `;
}

function renderDashboard() {
  setWorkspaceMode("dashboard");
  byId("module-sidebar").innerHTML = "";
  const summary = {
    open: conversations.filter((item) => item.status === "Open").length,
    pending: conversations.filter((item) => item.status === "Pending").length,
    resolved: conversations.filter((item) => item.status === "Resolved").length
  };
  const now = nowLabel();
  byId("conversation-list").innerHTML = `
    <section class="dashboard-shell">
      <header class="panel-title">
        <div>
          <h1>Dashboard</h1>
          <p class="kpi-subtitle">Whatboard workspace insights</p>
        </div>
        <div class="button-row">
          <button class="button ghost" data-action="dashboard-refresh" type="button">
            <i class="ph ph-arrow-clockwise icon-sm icon" aria-hidden="true"></i>
            <span>Refresh</span>
          </button>
        </div>
      </header>
      <div class="dashboard-controls">
        <span class="kpi-subtitle">Today • Updated at ${now}</span>
      </div>
      <section class="kpi-grid">
        <article class="kpi-card">
          <h3>Open conversations</h3>
          <strong>${summary.open}</strong>
          <span>Current queue</span>
        </article>
        <article class="kpi-card">
          <h3>Pending follow-ups</h3>
          <strong>${summary.pending}</strong>
          <span>Need response soon</span>
        </article>
        <article class="kpi-card">
          <h3>Resolved</h3>
          <strong>${summary.resolved}</strong>
          <span>Updated today</span>
        </article>
        <article class="kpi-card">
          <h3>Avg response</h3>
          <strong>4m</strong>
          <span>Per chat</span>
        </article>
      </section>
      <section class="dashboard-panels">
        <div class="card">
          <div class="dashboard-panel-head">
            <h3>Agent performance</h3>
            <span class="muted">as of ${now}</span>
          </div>
          <div class="agent-table">
            <div class="agent-row header">
              <span>Agent</span><span>Chats handled</span><span>Avg response</span><span>Status</span>
            </div>
            <div class="agent-row"><span>Asha</span><span>12</span><span>3m</span><span><i class="status-dot online"></i> Online</span></div>
            <div class="agent-row"><span>Rohan</span><span>8</span><span>6m</span><span><i class="status-dot online"></i> Online</span></div>
            <div class="agent-row"><span>Priya</span><span>5</span><span>9m</span><span><i class="status-dot offline"></i> Offline</span></div>
          </div>
        </div>
        <div class="card">
          <div class="dashboard-panel-head">
            <h3>WhatsApp volume</h3>
            <span class="muted">Today: 142 messages</span>
          </div>
          <div class="volume-list">
            <p><span>Delivered</span><b>138</b></p>
            <p><span>Read</span><b>121</b></p>
            <p><span>Failed</span><b>4</b></p>
          </div>
          <div class="pill-row">
            <span class="badge">Sent</span>
            <span class="badge">Delivered</span>
            <span class="badge">Read</span>
          </div>
        </div>
      </section>
      <section class="card activity-pane">
        <h3>Activity feed</h3>
        <div class="activity-list">
          <button class="activity-item" data-action="activity-open" type="button" data-conversation-id="neha"><span>1m</span><p>Message from Neha Sharma</p></button>
          <button class="activity-item" data-action="activity-open" type="button" data-conversation-id="neha"><span>2m</span><p>Assigned to Asha (RR)</p></button>
          <button class="activity-item" data-action="activity-open" type="button" data-conversation-id="dev"><span>3m</span><p>Lead source: WhatsApp QR</p></button>
          <button class="activity-item" data-action="activity-open" type="button" data-conversation-id="arjun"><span>5m</span><p>Template sent: return</p></button>
          <button class="activity-item" data-action="activity-open" type="button" data-conversation-id="vijay"><span>15m</span><p>Keyword trigger: price</p></button>
          <button class="activity-item" data-action="activity-open" type="button" data-conversation-id="campaigns"><span>1h</span><p>Campaigns deferred note</p></button>
        </div>
      </section>
    </section>
  `;
}

function renderContactsSidebar() {
  const counts = {
    all: contacts.length,
    vip: contacts.filter((item) => item.tags.includes("VIP")).length,
    lead: contacts.filter((item) => item.tags.includes("Lead")).length,
    support: contacts.filter((item) => item.tags.includes("Support")).length
  };
  const tagOptions = getContactTagsInventory();
  const fieldOptions = getContactCustomFieldsInventory();
  byId("module-sidebar").innerHTML = `
    <header class="panel-title">
      <div>
        <h1>Contacts</h1>
        <p class="muted">Customer CRM</p>
      </div>
      <button class="button ghost" data-action="toggle-contact-form" type="button" title="Add contact">
        <i class="ph ph-plus icon-sm icon" aria-hidden="true"></i>
        <span>+ Add</span>
      </button>
    </header>
    <form id="contacts-add-form" class="contact-add-form ${state.activeModule === "contacts" && state._showContactAdd ? "" : "is-hidden"}">
      <label>
        <span>Name</span>
        <input class="input" id="contact-add-name" type="text" placeholder="Name" required />
      </label>
      <label>
        <span>Phone</span>
        <input class="input" id="contact-add-phone" type="tel" placeholder="+91XXXXXXXXXX" required />
      </label>
      <div class="contact-inline-actions">
        <button class="button primary compact" type="submit">Save</button>
      </div>
    </form>
    <div class="search-box">
      <input id="contact-query" class="input" type="search" value="${escapeHtml(state.contactFieldSearch)}" placeholder="Search name, phone, tag..." />
    </div>
      <nav class="folder-nav contact-side">
        <button class="folder-row ${state.activeContactTagFilters.length === 0 && state.contactCustomFieldFilter === "all" && state.contactFieldSearch === "" ? "selected" : ""}" data-contact-filter="all" type="button">All contacts <strong>${counts.all}</strong></button>
        <button class="folder-row" data-contact-filter="VIP" type="button">VIP <strong>${counts.vip}</strong></button>
        <button class="folder-row" data-contact-filter="Lead" type="button">Lead <strong>${counts.lead}</strong></button>
        <button class="folder-row" data-contact-filter="Support" type="button">Support <strong>${counts.support}</strong></button>
      <button class="folder-row" data-contact-filter-field="all" type="button">Filter by custom field</button>
    </nav>
    <div class="contact-filters">
      <p>Filter by tag</p>
      <div class="chip-row">
        ${tagOptions
          .map(
            (tag) =>
              `<button data-tag-chip="${escapeHtml(tag)}" type="button" class="chip-toggle ${isContactActiveTag(tag) ? "is-active" : ""}">${escapeHtml(tag)}</button>`
          )
          .join("")}
      </div>
      <p>Filter by custom field</p>
      <select id="contact-field-filter" class="select">
        ${fieldOptions
          .map(
            (field) => `<option value="${field}" ${state.contactCustomFieldFilter === field ? "selected" : ""}>${escapeHtml(field)}</option>`
          )
          .join("")}
      </select>
    </div>
  `;
}

function renderContactList() {
  const list = byId("conversation-list");
  const rows = contacts.filter(matchesContactsFilter);
  list.innerHTML = `
    <header class="list-head">
      <div><i class="ph ph-list icon" aria-hidden="true"></i><strong id="conversation-list-title">Contacts</strong></div>
    </header>
    <div class="thread-list contact-thread-list">
      ${rows.length ? rows
        .map(
          (contact) => `
            <button class="thread-row ${contact.id === state.activeContactId ? "active" : ""}" data-module-item="${contact.id}" data-type="contact" type="button">
              <span class="avatar green-avatar">${escapeHtml(contact.name.charAt(0))}</span>
              <span class="thread-copy">
                <strong>${escapeHtml(contact.name)}</strong>
              <span>${escapeHtml(contact.phone)} · ${escapeHtml(contact.tags.join(", ")) || "—"}</span>
                <span class="muted">Last active: ${escapeHtml(contact.activity?.[0]?.[0] || "1m ago")}</span>
              </span>
            </button>
          `
        )
        .join("") : `<div class="empty-state">No contacts match these filters.</div>`}
    </div>
  `;
}

function renderContactDetailPanel() {
  const contact = activeContact();
  if (state.activeContactFieldEdit !== null && state.activeContactFieldEdit >= contact.customFields.length) {
    state.activeContactFieldEdit = null;
  }
  byId("detail-header-title").innerHTML = `<h2>Contact</h2>`;
  byId("detail-header-tabs").innerHTML = `
    <div class="tabs-list" role="tablist" aria-label="Contact panel">
      <button class="tabs-trigger ${state.activeContactTab === "details" ? "active" : ""}" data-tab="details" type="button">Details</button>
      <button class="tabs-trigger ${state.activeContactTab === "history" ? "active" : ""}" data-tab="history" type="button">History</button>
    </div>
  `;
  byId("contact-details").innerHTML = `
      <div class="contact-profile">
        <div class="profile-line">
          <span class="avatar green-avatar">${escapeHtml(contact.name.charAt(0))}</span>
          <div>
            <h3>${escapeHtml(contact.name)}</h3>
            <p>${escapeHtml(contact.phone)}</p>
          </div>
        </div>
       <label class="field-label">Tags</label>
       <div class="tag-row">
         ${contact.tags
           .map(
             (tag) =>
               `<span class="badge" data-contact-tag-row="${escapeHtml(contact.id)}"><span>${escapeHtml(tag)}</span><button type="button" data-action="remove-contact-tag" data-tag="${escapeHtml(tag)}" title="Remove tag"><i class="ph ph-x icon-sm icon" aria-hidden="true"></i></button></span>`
           )
           .join("")}
         <span class="badge secondary" title="New tag">
           <input class="tag-input" id="new-tag-value" placeholder="Add tag" />
         </span>
         <button class="button compact" data-action="add-contact-tag" type="button">Add tag</button>
       </div>
       <label class="field-label">Contact details</label>
        <div class="attribute-grid contact-attrs">
          <p><span>Status</span><b>${escapeHtml(contact.status)}</b></p>
          <p><span>Source</span><b>${escapeHtml(contact.source)}</b></p>
          <p><span>Assignee</span><b>${escapeHtml(contact.assignee)}</b></p>
          <p><span>Open conversations</span><b>${contact.conversationIds.length}</b></p>
          <p><span>Email</span><b>${escapeHtml(contact.email || "—")}</b></p>
        </div>
        <label class="field-label">Custom fields</label>
        <div class="contact-custom">
         <h4 class="muted">${escapeHtml(`CUSTOM FIELDS (${contact.customFields.length}/5)`)}</h4>
         <div id="custom-fields-list">
           ${contact.customFields
             .map((field, index) => {
               if (state.activeContactFieldEdit === index) {
                 return `
                   <div class="custom-field-row contact-field-edit" data-field-index="${index}">
                     <input class="input" id="contact-field-label-${index}" value="${escapeHtml(field.label)}" placeholder="Label" />
                     <input class="input" id="contact-field-value-${index}" value="${escapeHtml(field.value)}" placeholder="Value" />
                     <button type="button" data-action="save-contact-field" data-index="${index}" class="chip-action">Save</button>
                     <button type="button" data-action="cancel-contact-field" data-index="${index}" class="chip-action">Cancel</button>
                   </div>`;
               }
               return `<div class="custom-field-row"><span>${escapeHtml(field.label)}</span><span>${escapeHtml(field.value)}</span><button type="button" data-action="edit-contact-field" data-index="${index}" class="chip-action">Edit</button><button type="button" data-action="delete-contact-field" data-index="${index}" class="chip-action">Delete</button></div>`;
             })
             .join("")}
         </div>
         <form id="contact-field-form" class="contact-inline-form">
           <div class="field">
             <label class="label" for="new-field-label">Label</label>
             <input class="input" id="new-field-label" placeholder="Label" ${contact.customFields.length >= 5 ? "disabled" : ""} />
           </div>
           <div class="field">
             <label class="label" for="new-field-value">Value</label>
             <input class="input" id="new-field-value" placeholder="Value" ${contact.customFields.length >= 5 ? "disabled" : ""} />
           </div>
           <button class="button compact" type="submit" ${contact.customFields.length >= 5 ? "disabled" : ""}><i class="ph ph-plus icon-sm icon" aria-hidden="true"></i> Add field</button>
           <p class="muted ${contact.customFields.length >= 5 ? "is-warning" : ""}">
             ${contact.customFields.length >= 5 ? "Max 5 custom fields reached" : "Custom fields are capped at 5"}
           </p>
         </form>
       </div>
      <button class="button primary" data-action="open-contact-conversation" type="button">
        <i class="ph ph-arrow-right icon-sm icon" aria-hidden="true"></i>
        Open conversation
      </button>
    </div>
  `;
  byId("contact-history").innerHTML = `
    <h4>Conversation history</h4>
    ${contact.conversationIds.length
      ? contact.conversationIds
          .map((conversationId) => {
            const convo = conversations.find((item) => item.id === conversationId);
            if (!convo) return "";
            return `<button class="contact-history-item" type="button" data-action="open-contact-chat" data-conversation-id="${escapeHtml(convo.id)}">
              <div><strong>${escapeHtml(convo.name)}</strong><span>${escapeHtml(convo.time)}</span></div>
              <p>${escapeHtml(convo.preview)}</p>
            </button>`;
          })
          .join("")
      : "<p class='muted'>No previous conversations yet.</p>"}
  `;

  byId("contact-details").dataset.section = "details";
  byId("contact-history").dataset.section = "history";
  renderContactTabs();
}

function settingsSectionTitle() {
  return {
    profile: "Profile",
    business: "Business",
    whatsapp: "WhatsApp API",
    team: "Team",
    roles: "Roles",
    tracking: "Tracking Links",
    billing: "Billing",
    support: "Support"
  }[state.settingsSection] || "Settings";
}

function renderSettingsShell({ title, description, content }) {
  return `
    <section class="settings-block">
      <header class="section-head">
        <div>
          <h2>${title}</h2>
          <p class="muted">${description}</p>
        </div>
      </header>
      ${content}
    </section>
  `;
}

function renderContactTabs() {
  document.querySelectorAll("#detail-header-tabs .tabs-trigger").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeContactTab);
  });
  byId("contact-details").classList.toggle("is-hidden", state.activeContactTab !== "details");
  byId("contact-history").classList.toggle("is-hidden", state.activeContactTab !== "history");
}

function renderContacts() {
  setWorkspaceMode("contacts");
  renderContactsSidebar();
  renderContactList();
  renderContactDetailPanel();
  byId("detail-header-title").innerHTML = "";
  byId("contact-history").classList.toggle("is-hidden", state.activeContactTab !== "history");
}

function renderSettingsContent() {
  const sectionTitle = settingsSectionTitle();
  let content = "";
  if (state.settingsSection === "profile") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Update personal profile information used across the workspace.",
      content: `
        <div class="card">
          <form id="settings-profile-form" class="settings-form">
            <div class="field">
              <label class="label" for="settings-profile-fullname">Full name</label>
              <input id="settings-profile-fullname" class="input" name="fullName" value="${escapeHtml(settingsData.profile.fullName)}" autocomplete="name" />
            </div>
            <div class="field">
              <label class="label" for="settings-profile-email">Email</label>
              <input id="settings-profile-email" class="input" name="email" value="${escapeHtml(settingsData.profile.email)}" autocomplete="email" />
            </div>
            <div class="button-row">
              <button class="button primary" type="submit">Save changes</button>
              <button class="button ghost" data-action="settings-avatar-upload" type="button"><i class="ph ph-user-circle icon-sm icon" aria-hidden="true"></i>Upload photo</button>
            </div>
          </form>
        </div>
      `
    });
  }
  if (state.settingsSection === "business") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Configure workspace branding and business details.",
      content: `
        <div class="card">
          <form id="settings-business-form" class="settings-form">
            <div class="field">
              <label class="label" for="settings-business-name">Company name</label>
              <input id="settings-business-name" class="input" name="companyName" value="${escapeHtml(settingsData.business.companyName)}" autocomplete="organization" />
            </div>
            <div class="field">
              <label class="label" for="settings-business-industry">Industry</label>
              <select id="settings-business-industry" class="select" name="industry">
                <option value="E-commerce" ${settingsData.business.industry === "E-commerce" ? "selected" : ""}>E-commerce</option>
                <option value="SaaS" ${settingsData.business.industry === "SaaS" ? "selected" : ""}>SaaS</option>
                <option value="Services" ${settingsData.business.industry === "Services" ? "selected" : ""}>Services</option>
              </select>
            </div>
            <div class="field">
              <label class="label" for="settings-business-address">Address</label>
              <input id="settings-business-address" class="input" name="address" value="${escapeHtml(settingsData.business.address)}" />
            </div>
            <div class="button-row">
              <button class="button primary" type="submit">Save changes</button>
              <button class="button ghost" data-action="settings-logo-upload" type="button"><i class="ph ph-paper-plane-right icon-sm icon" aria-hidden="true"></i>Upload logo</button>
            </div>
          </form>
        </div>
      `
    });
  }
  if (state.settingsSection === "whatsapp") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "BSP-managed connection details for WhatsApp Business API.",
      content: `
        <div class="card">
          <div class="connection-card">
            <p><span class="badge success"><i class="ph ph-check icon-sm icon" aria-hidden="true"></i>Connected</span> BSP-managed</p>
            <p><span class="label">Phone number</span><strong>${escapeHtml(settingsData.whatsapp.phone)}</strong></p>
            <p><span class="label">Display name</span><strong>${escapeHtml(settingsData.whatsapp.displayName)}</strong></p>
            <p><span class="label">API status</span><strong>${escapeHtml(settingsData.whatsapp.status)}</strong></p>
            <div class="button-row">
              <button class="button" data-action="whatsapp-reconnect" type="button">Reconnect</button>
            </div>
          </div>
        </div>
      `
    });
  }
  if (state.settingsSection === "team") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Invite teammates and manage active workspace members.",
      content: `
        <div class="card">
          <div class="section-head">
            <div>
              <h2>Team members</h2>
              <p class="muted">Current workspace access.</p>
            </div>
            <button class="button compact" data-action="invite-member" type="button"><i class="ph ph-user-plus icon-sm icon" aria-hidden="true"></i> Invite</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                ${settingsData.team
                  .map(
                    (member) => `
                      <tr>
                        <td>${escapeHtml(member.name)}</td>
                        <td>${escapeHtml(member.email)}</td>
                        <td>${escapeHtml(member.role)}</td>
                        <td><span class="badge ${member.status === "Active" ? "success" : ""}">${escapeHtml(member.status)}</span></td>
                        <td><button class="button compact" type="button" data-action="remove-team-member" data-id="${member.id}">Remove</button></td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="section-head">
            <div>
              <h3>Invite member</h3>
              <p class="muted">Add users quickly with role-based access.</p>
            </div>
          </div>
          <form id="settings-invite-form" class="settings-form">
            <div class="field">
              <label class="label" for="settings-invite-email">Email</label>
              <input id="settings-invite-email" class="input" name="invite-email" type="email" placeholder="team@company.com" />
            </div>
            <div class="field">
              <label class="label" for="settings-invite-role">Role</label>
              <select id="settings-invite-role" class="select" name="invite-role">
                <option value="Agent">Agent</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button class="button primary" type="submit">Send invite</button>
          </form>
        </div>
      `
    });
  }
  if (state.settingsSection === "roles") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Role capability matrix (read-only at MVP).",
      content: `
        <div class="card roles-block">
          <div class="roles-grid">
            <article class="card">
              <h3>ADMIN</h3>
              <ul>
                ${settingsData.roles.admin
                  .map((entry) => `<li><i class="ph ph-check icon-sm icon" aria-hidden="true"></i> ${escapeHtml(entry)}</li>`)
                  .join("")}
              </ul>
            </article>
            <article class="card">
              <h3>AGENT</h3>
              <ul>
                ${settingsData.roles.agent
                  .map((entry) => `<li><i class="ph ph-check icon-sm icon" aria-hidden="true"></i> ${escapeHtml(entry)}</li>`)
                  .join("")}
                <li><i class="ph ph-x icon-sm icon" aria-hidden="true"></i> Manage automations</li>
                <li><i class="ph ph-x icon-sm icon" aria-hidden="true"></i> View billing</li>
              </ul>
            </article>
          </div>
        </div>
      `
    });
  }
  if (state.settingsSection === "tracking") {
    const rows = settingsData.links
      .map(
        (link) =>
          `<tr><td>${escapeHtml(link.name)}</td><td>${escapeHtml(link.aliasValue)}</td><td>${link.clicks}</td><td>${escapeHtml(link.created)}</td></tr>`
      )
      .join("");
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Create and manage click-to-chat links with aliases.",
      content: `
        <div class="card">
          <form id="settings-link-form" class="settings-form">
            <div class="field">
              <label class="label" for="link-name">Name</label>
              <input id="link-name" class="input" placeholder="Expo April" required />
            </div>
            <div class="field">
              <label class="label" for="link-message">Message</label>
              <input id="link-message" class="input" placeholder="Hi, I came from..." required />
            </div>
            <div class="field">
              <label class="label" for="link-alias">Alias</label>
              <div class="field-inline">
                <span class="input-static">wa.me/91XXXXXXXXXX/</span>
                <input id="link-alias" class="input" placeholder="expo-apr" required />
              </div>
            </div>
            <button class="button primary" type="submit">Create link</button>
          </form>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>URL</th><th>Clicks</th><th>Created</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      `
    });
  }
  if (state.settingsSection === "billing") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Flat-plan billing details and invoice access.",
      content: `
        <div class="card">
          <div class="connection-card">
            <div class="field">
              <span class="label">Current plan</span>
              <strong>Flat Subscription</strong>
            </div>
            <div class="field">
              <span class="label">Status</span>
              <strong>Active</strong>
            </div>
            <div class="field">
              <span class="label">Next invoice</span>
              <strong>Manual — contact support</strong>
            </div>
            <p class="muted">For billing updates, write to billing@whatboard.in</p>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Invoice</th><th>Amount</th><th>Action</th></tr></thead>
              <tbody>
                ${settingsData.invoices
                  .map(
                    (inv) =>
                      `<tr><td>${escapeHtml(inv.month)}</td><td>${escapeHtml(inv.amount)}</td><td><button data-action="view-invoice" data-month="${escapeHtml(inv.month)}" class="button compact" type="button">View</button></td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      `
    });
  }
  if (state.settingsSection === "support") {
    content = renderSettingsShell({
      title: sectionTitle,
      description: "Raise support requests and get response within 24 hours.",
      content: `
        <div class="card">
          <form id="settings-support-form" class="settings-form">
            <div class="field">
              <label class="label" for="settings-support-name">Name</label>
              <input id="settings-support-name" class="input" name="name" value="${escapeHtml(settingsData.profile.fullName)}" />
            </div>
            <div class="field">
              <label class="label" for="settings-support-email">Email</label>
              <input id="settings-support-email" class="input" name="email" value="${escapeHtml(settingsData.profile.email)}" />
            </div>
            <div class="field">
              <label class="label" for="settings-support-message">Message</label>
              <textarea id="settings-support-message" class="textarea" name="message" rows="5"></textarea>
            </div>
            <button class="button primary" type="submit">Submit request</button>
          </form>
        </div>
      `
    });
  }

  byId("conversation-list").innerHTML = content;
}

function renderSettingsSidebar() {
  byId("module-sidebar").innerHTML = `
    <header class="panel-title">
      <h1>Settings</h1>
    </header>
    <nav class="settings-nav">
      <div class="settings-nav-group">
        <button class="folder-row ${state.settingsSection === "profile" ? "selected" : ""}" data-settings-section="profile" type="button">Profile</button>
        <button class="folder-row ${state.settingsSection === "business" ? "selected" : ""}" data-settings-section="business" type="button">Business</button>
        <button class="folder-row ${state.settingsSection === "whatsapp" ? "selected" : ""}" data-settings-section="whatsapp" type="button">WhatsApp API</button>
      </div>
      <div class="settings-nav-group">
        <p class="group-title">Workspace</p>
        <button class="folder-row ${state.settingsSection === "team" ? "selected" : ""}" data-settings-section="team" type="button">Team</button>
        <button class="folder-row ${state.settingsSection === "roles" ? "selected" : ""}" data-settings-section="roles" type="button">Roles</button>
      </div>
      <div class="settings-nav-group">
        <p class="group-title">Operations</p>
        <button class="folder-row ${state.settingsSection === "tracking" ? "selected" : ""}" data-settings-section="tracking" type="button">Tracking Links</button>
        <button class="folder-row ${state.settingsSection === "billing" ? "selected" : ""}" data-settings-section="billing" type="button">Billing</button>
        <button class="folder-row ${state.settingsSection === "support" ? "selected" : ""}" data-settings-section="support" type="button">Support</button>
      </div>
    </nav>
  `;
}

function renderSettings() {
  setWorkspaceMode("settings");
  renderSettingsSidebar();
  byId("detail-header-title").innerHTML = "";
  byId("detail-header-title").style.display = "none";
  byId("detail-header-tabs").style.display = "none";
  renderSettingsContent();
}

function render() {
  if (state.activeModule === "dashboard") {
    renderDashboard();
  }
  if (state.activeModule === "inbox") {
    renderInbox();
  }
  if (state.activeModule === "contacts") {
    renderContacts();
  }
  if (state.activeModule === "settings") {
    renderSettings();
  }
  if (state.activeModule === "campaigns") {
    renderCampaigns();
  }
  if (state.activeModule === "automations") {
    renderAutomations();
  }

  const isSideOnlyModule =
    state.activeModule === "dashboard" ||
    state.activeModule === "settings" ||
    state.activeModule === "campaigns" ||
    state.activeModule === "automations";
  if (state.activeModule === "inbox") {
    byId("detail-header-title").style.display = "";
    byId("detail-header-tabs").style.display = "";
    byId("detail-header-title").innerHTML = "";
    byId("detail-header-tabs").innerHTML = `
      <div class="tabs-list" role="tablist" aria-label="Conversation side panel">
        <button class="tabs-trigger ${state.activeTab === "details" ? "active" : ""}" data-tab="details" type="button">Details</button>
        <button class="tabs-trigger ${state.activeTab === "activity" ? "active" : ""}" data-tab="activity" type="button">Activity</button>
        <button class="tabs-trigger ${state.activeTab === "notes" ? "active" : ""}" data-tab="notes" type="button">Notes</button>
      </div>
    `;
  }
  if (isSideOnlyModule) {
    byId("detail-header-title").style.display = "none";
    byId("detail-header-tabs").style.display = "none";
  }

  renderTabs();
  updateModuleCounts();
  syncFallbackIcons();
}

function updateModuleCounts() {
  const counters = {
    all: conversationCountForFilter("all"),
    "all-conversations": conversations.length,
    attention: conversations.filter((item) => item.filter.includes("attention")).length,
    mine: conversations.filter((item) => item.filter.includes("mine")).length,
    team: conversations.filter((item) => item.filter.includes("team")).length,
    unassigned: conversations.filter((item) => item.assignee === "Unassigned").length
  };

  Object.entries(counters).forEach(([filter, count]) => {
    const row = document.querySelector(`.folder-row[data-filter="${filter}"]`);
    if (row) {
      const countNode = row.querySelector("strong");
      if (countNode) countNode.textContent = String(count);
    }
  });
}

function openModal() {
  byId("new-conversation-modal").classList.remove("is-hidden");
  byId("new-conversation-modal").setAttribute("aria-hidden", "false");
}

function closeModal() {
  byId("new-conversation-modal").classList.add("is-hidden");
  byId("new-conversation-modal").setAttribute("aria-hidden", "true");
}

function openConversation(conversationId) {
  state.activeModule = "inbox";
  state.activeConversationId = conversationId;
  activateRail("inbox");
  render();
}

function handleSettingsSubmit(form) {
  if (form.id === "settings-profile-form") {
    settingsData.profile.fullName = form.elements.fullName.value.trim() || settingsData.profile.fullName;
    settingsData.profile.email = form.elements.email.value.trim() || settingsData.profile.email;
    showToast("Profile updated");
  }
  if (form.id === "settings-business-form") {
    settingsData.business.companyName = form.elements.companyName.value.trim() || settingsData.business.companyName;
    settingsData.business.industry = form.elements.industry.value.trim() || settingsData.business.industry;
    settingsData.business.address = form.elements.address.value.trim() || settingsData.business.address;
    showToast("Business info updated");
  }
  if (form.id === "settings-invite-form") {
    const email = form.elements["invite-email"]?.value.trim();
    const role = form.elements["invite-role"]?.value || "Agent";
    if (!email || !isValidEmail(email)) {
      const input = byId("settings-invite-email");
      setFieldError(input, "Enter a valid email address");
      showToast("Invite email is required");
      return;
    }
    setFieldError(byId("settings-invite-email"), "");
    settingsData.team.push({
      id: `u-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      active: true,
      status: "Active"
    });
    showToast(`Invite sent to ${email}`);
    clearFormInputs(form);
  }
  if (form.id === "settings-link-form") {
    const name = byId("link-name").value.trim();
    const alias = byId("link-alias").value.trim();
    const message = byId("link-message").value.trim();
    if (name && alias && message) {
      const sanitizedPhone = String(settingsData.whatsapp.phone || "").replace(/\D/g, "");
      settingsData.links.unshift({
        name,
        alias,
        aliasValue: `wa.me/${sanitizedPhone || "919800000000"}/${alias}`,
        clicks: 0,
        created: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date())
      });
      showToast("Tracking link created");
      clearFormInputs(form);
    } else {
      showToast("Complete all fields to create link");
    }
  }
  if (form.id === "settings-support-form") {
    const name = form.elements["name"]?.value.trim();
    const email = form.elements["email"]?.value.trim();
    const message = form.elements["message"]?.value.trim();
    setFieldError(byId("settings-support-name"), name ? "" : "Name is required");
    setFieldError(byId("settings-support-email"), isValidEmail(email) ? "" : "Valid email is required");
    setFieldError(byId("settings-support-message"), message ? "" : "Message is required");
    if (!name || !isValidEmail(email) || !message) {
      showToast("Complete all support fields");
      return;
    }
    showToast("Support request submitted");
    clearFormInputs(form);
  }
  render();
}

function addContactTag(contact, tagValue) {
  const clean = tagValue.trim();
  if (!clean || !contact) return;
  if (!contact.tags.includes(clean)) {
    contact.tags.push(clean);
    addContactActivity(contact, `Tag added: ${clean}`);
  }
  render();
}

function addContactField(contact, label, value) {
  if (!contact.customFields) contact.customFields = [];
  if (contact.customFields.length >= 5) {
    showToast("Max 5 custom fields reached");
    return;
  }
  const cleanLabel = label.trim();
  const cleanValue = value.trim();
  if (!cleanLabel || !cleanValue) return;
  contact.customFields.push({ label: cleanLabel, value: cleanValue });
  addContactActivity(contact, `Added field ${cleanLabel}`);
  render();
}

function addOrUseContactTagChip(tag) {
  if (!tag) return;
  const already = state.activeContactTagFilters.includes(tag);
  if (already) {
    state.activeContactTagFilters = state.activeContactTagFilters.filter((item) => item !== tag);
  } else {
    state.activeContactTagFilters.push(tag);
  }
}

function clearFormInputs(form) {
  form.reset();
}

document.querySelector(".workspace")?.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.getAttribute("data-action");
    if (action === "new") openModal();
    if (action === "help") showToast("Help is coming soon");
    if (action === "template") {
      byId("reply-input").value = quickReplies["/return"];
    }
    if (action === "refresh") {
      addActivity(activeConversation(), "Conversation refreshed");
      render();
    }
    if (action === "dashboard-refresh") render();
    if (action === "star") {
      const conversation = activeConversation();
      conversation.pinned = !conversation.pinned;
      addActivity(conversation, `${conversation.pinned ? "Pinned" : "Unpinned"} by ${currentAgent}`);
      render();
    }
    if (action === "more") {
      if (state.activeModule === "inbox") showOverflowMenu();
    }
  if (action === "panel-menu") {
      showToast("Panel menu is available in the right rail for this build");
    }
    if (action === "remove-team-member") {
      const id = actionButton.getAttribute("data-id");
      const member = settingsData.team.find((item) => item.id === id);
      if (!member) return;
      const confirmRemove = window.confirm(`Remove ${member.name} from workspace?`);
      if (!confirmRemove) return;
      settingsData.team = settingsData.team.filter((member) => member.id !== id);
      showToast("Team member removed");
      render();
    }
    if (action === "invite-member") {
      const form = byId("settings-invite-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        form.querySelector('input[name="invite-email"]')?.focus();
      }
    }
    if (action === "toggle-contact-form") {
      state._showContactAdd = !state._showContactAdd;
      render();
    }
    if (action === "whatsapp-reconnect") {
      showToast("Reconnecting WhatsApp API...");
    }
    if (action === "settings-avatar-upload") {
      showToast("Profile photo upload is coming soon");
    }
    if (action === "settings-logo-upload") {
      showToast("Logo upload is coming soon");
    }
    if (action === "activity-open") {
      const conversationId = actionButton.getAttribute("data-conversation-id");
      openConversation(conversationId);
    }
    if (action === "open-contact-conversation") {
      const contact = activeContact();
      const conversation = conversations.find((item) => item.phone === contact.phone);
      if (conversation) {
        openConversation(conversation.id);
      } else if (contact.phone) {
        const convo = createConversation({ name: contact.name, phone: contact.phone, template: "" });
        convo.assignee = contact.assignee || "Asha";
        convo.status = contact.status || "Open";
        conversations.unshift(convo);
        contact.conversationIds.unshift(convo.id);
        openConversation(convo.id);
      }
    }
    if (action === "open-contact-chat") {
      const conversationId = actionButton.getAttribute("data-conversation-id");
      openConversation(conversationId);
    }
    if (action === "add-contact-tag") {
      addContactTag(activeContact(), byId("new-tag-value").value || "");
      byId("new-tag-value").value = "";
    }
    if (action === "remove-contact-tag") {
      const tag = actionButton.getAttribute("data-tag");
      const contact = activeContact();
      contact.tags = contact.tags.filter((item) => item !== tag);
      render();
    }
    if (action === "edit-contact-field") {
      const index = Number(actionButton.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        state.activeContactFieldEdit = index;
        render();
      }
    }
    if (action === "save-contact-field") {
      const index = Number(actionButton.getAttribute("data-index"));
      const contact = activeContact();
      if (!contact || Number.isNaN(index)) return;
      const labelInput = byId(`contact-field-label-${index}`);
      const valueInput = byId(`contact-field-value-${index}`);
      if (!labelInput || !valueInput) return;
      const nextLabel = labelInput.value.trim();
      const nextValue = valueInput.value.trim();
      if (!nextLabel || !nextValue) {
        showToast("Both label and value are required");
        return;
      }
      contact.customFields[index] = { label: nextLabel, value: nextValue };
      addContactActivity(contact, `Updated field ${nextLabel}`);
      state.activeContactFieldEdit = null;
      render();
    }
    if (action === "cancel-contact-field") {
      state.activeContactFieldEdit = null;
      render();
    }
    if (action === "delete-contact-field") {
      const index = Number(actionButton.getAttribute("data-index"));
      const contact = activeContact();
      contact.customFields.splice(index, 1);
      if (state.activeContactFieldEdit === index) state.activeContactFieldEdit = null;
      render();
    }
    if (action === "view-invoice") {
      const month = actionButton.getAttribute("data-month");
      showToast(`Invoice ${month || ""} download is coming soon`);
    }
  }

  const moduleButton = event.target.closest(".rail-btn");
  if (moduleButton) {
    const moduleName = moduleButton.dataset.module;
    setModule(moduleName);
  }

  const moduleLink = event.target.closest("[data-module-link]");
  if (moduleLink) {
    setModule("dashboard");
  }

  const folder = event.target.closest(".folder-row");
  if (folder) {
    if (state.activeModule === "inbox") {
      const filter = folder.dataset.filter || state.activeFilter;
      if (filter === "dashboard") {
        setModule("dashboard");
        return;
      }
      if (filter === "campaigns") {
        setModule("campaigns");
        return;
      }
      if (filter === "automations") {
        setModule("automations");
        return;
      }
      state.activeFilter = folder.dataset.filter || state.activeFilter;
      state.statusFilter = folder.dataset.statusFilter || state.statusFilter;
      render();
    }
    if (state.activeModule === "contacts") {
      const contactFilter = folder.getAttribute("data-contact-filter");
      if (contactFilter === "all") {
        state.activeContactTagFilters = [];
      } else if (contactFilter) {
        state.activeContactTagFilters = [contactFilter];
      }
      if (folder.getAttribute("data-contact-filter-field") === "all") {
        state.contactCustomFieldFilter = "all";
      }
      render();
    }
    if (state.activeModule === "settings") {
      const section = folder.getAttribute("data-settings-section");
      if (section) {
        state.settingsSection = section;
        render();
      }
    }
  }

  const subfolder = event.target.closest(".subfolders button");
  if (subfolder) {
    if (state.activeModule === "inbox") {
      if (subfolder.dataset.filter === "automations") {
        setModule("automations");
        return;
      }
      state.activeFilter = subfolder.dataset.filter || state.activeFilter;
      state.statusFilter = subfolder.dataset.statusFilter || state.statusFilter;
      render();
    }
  }

  const thread = event.target.closest("[data-module-item]");
  if (thread) {
    const type = thread.getAttribute("data-type");
    const id = thread.getAttribute("data-module-item");
    if (type === "conversation") {
      state.activeConversationId = id;
      render();
    }
    if (type === "contact") {
      state.activeContactId = id;
      state.activeContactTab = "details";
      state.activeContactFieldEdit = null;
      render();
    }
  }

  const chip = event.target.closest("[data-tag-chip]");
  if (chip) {
    const value = chip.getAttribute("data-tag-chip");
    addOrUseContactTagChip(value);
    render();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("#open-filter-select")) {
    state.statusFilter = event.target.value;
    render();
  }
  if (event.target.matches("#sort-order-select")) {
    state.sortOrder = event.target.value;
    render();
  }
  if (event.target.matches("#search-input")) {
    state.query = event.target.value;
    render();
  }
  if (event.target.matches("#contact-query")) {
    state.contactFieldSearch = event.target.value;
    render();
  }
  if (event.target.matches("#contact-field-filter")) {
    state.contactCustomFieldFilter = event.target.value;
    render();
  }
  if (event.target.matches('#contact-status')) {
    const contact = activeContact();
    contact.status = event.target.value;
    render();
  }
  if (event.target.matches('[data-role="status-select"]')) {
    const conversation = activeConversation();
    setConversationStatus(conversation, event.target.value);
  }
  if (event.target.matches('[data-role="assignee-select"]')) {
    const conversation = activeConversation();
    setConversationAssignee(conversation, event.target.value);
  }
  if (event.target.matches("#status-badge")) {
    const conversation = activeConversation();
    setConversationStatus(conversation, event.target.value);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("#search-input")) {
    state.query = event.target.value;
    render();
  }
  if (event.target.matches("#contact-query")) {
    state.contactFieldSearch = event.target.value;
    render();
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("form");
  if (!form) return;

  if (form.id === "note-form") {
    event.preventDefault();
    const input = form.querySelector("input");
    const text = (input?.value || "").trim() || (byId("internal-note")?.value || "").trim();
    const conversation = activeConversation();
    if (!text || !conversation) return;
    appendNote(conversation, text);
    conversation.note = text;
    if (input) input.value = "";
    byId("internal-note").value = "";
    state.activeTab = "notes";
    render();
    return;
  }

  if (form.id === "new-conversation-form") {
    event.preventDefault();
    const name = byId("new-conversation-name").value.trim();
    const phone = byId("new-conversation-phone").value.trim();
    const templateKey = byId("new-conversation-template").value;
    if (!name || !phone) return;

    const existing = conversations.find((item) => {
      const a = item.phone.replace(/\D/g, "");
      const b = phone.replace(/\D/g, "");
      return item.name.toLowerCase() === name.toLowerCase() || a === b;
    });
    if (existing) {
      state.activeConversationId = existing.id;
      closeModal();
      render();
      return;
    }

    if (!templateKey) {
      setConversationTemplateError("Template is required for first-time outbound WhatsApp conversations.");
      showToast("Choose a template before starting");
      return;
    }
    clearConversationTemplateError();
    const templateText = templateOptions[templateKey]
      ? templateOptions[templateKey].replace("{{name}}", name)
      : templateKey;
    const convo = createConversation({ name, phone, template: templateText });
    const existingContact = contacts.find((item) => item.phone === phone || item.name.toLowerCase() === name.toLowerCase());
    if (!existingContact) {
      const newContact = createContact({ name, phone });
      newContact.conversationIds = [convo.id];
    } else {
      existingContact.conversationIds.unshift(convo.id);
    }
    conversations.unshift(convo);
    state.activeConversationId = convo.id;
    ensureContactForConversation(convo);
    closeModal();
    byId("new-conversation-form").reset();
    render();
    return;
  }

  if (form.id === "settings-profile-form" || form.id === "settings-business-form" || form.id === "settings-invite-form" || form.id === "settings-link-form" || form.id === "settings-support-form") {
    event.preventDefault();
    handleSettingsSubmit(form);
    return;
  }

  if (form.id === "contact-field-form") {
    event.preventDefault();
    const contact = activeContact();
    const labelInput = byId("new-field-label");
    const valueInput = byId("new-field-value");
    addContactField(contact, labelInput.value, valueInput.value);
    state.activeContactFieldEdit = null;
    if (labelInput) labelInput.value = "";
    if (valueInput) valueInput.value = "";
    return;
  }

  if (form.id === "contacts-add-form") {
    event.preventDefault();
    const nameInput = byId("contact-add-name");
    const phoneInput = byId("contact-add-phone");
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    if (!name || !phone) return;
    const exists = contacts.find((item) => item.phone === phone || item.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      const contact = createContact({ name, phone });
      state.activeContactId = contact.id;
      showToast("Contact added");
    }
    nameInput.value = "";
    phoneInput.value = "";
    state._showContactAdd = false;
    render();
    return;
  }
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
  if (!text || state.activeModule !== "inbox") return;

  const conversation = activeConversation();
  conversation.messages.push({
    type: "agent",
    initial: "A",
    color: "gray-avatar",
    text,
    time: "sent now"
  });
  conversation.preview = text;
  conversation.time = "now";
  conversation.activity.unshift([nowLabel(), "Agent reply sent from Whatboard"]);
  input.value = "";
  render();
});

byId("reply-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    byId("send-reply").click();
  }
  if (event.key.toLowerCase() === "k" && event.ctrlKey) {
    event.preventDefault();
    openTemplatePicker(event.target);
  }
});

byId("close-conversation").addEventListener("click", () => {
  if (state.activeModule !== "inbox") return;
  const conversation = activeConversation();
  setConversationStatus(conversation, "Resolved");
  showToast("Conversation resolved");
});

byId("tabs-trigger-wrap")?.remove();

document.querySelector(".workspace").addEventListener("click", (event) => {
  const trigger = event.target.closest(".tabs-trigger");
  if (!trigger) return;
  const next = trigger.dataset.tab;
  if (state.activeModule === "contacts") {
    state.activeContactTab = next;
    renderContactTabs();
    return;
  }
  state.activeTab = next;
  renderTabs();
});

byId("new-conversation-form")?.addEventListener("submit", (event) => {
  // delegated in submit above; this keeps behavior if this handler exists
});

document.querySelector('[data-action="new"]').addEventListener("click", openModal);
byId("close-new-conversation").addEventListener("click", closeModal);
byId("new-conversation-modal").addEventListener("click", (event) => {
  if (event.target === byId("new-conversation-modal")) closeModal();
});

document.querySelector(".workspace").addEventListener("click", (event) => {
  if (!event.target.closest(".overflow-menu") && !event.target.closest('[data-action="more"]')) {
    closeOverflowMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeOverflowMenu();
  }
});

byId("internal-note").addEventListener("input", (event) => {
  const conversation = activeConversation();
  if (conversation) conversation.note = event.target.value;
});

byId("status-badge").addEventListener("change", (event) => {
  if (state.activeModule !== "inbox") return;
  setConversationStatus(activeConversation(), event.target.value);
});

normalizeConversationData();
normalizeContacts();
hydrateIconFallback().then(() => {
  render();
});

