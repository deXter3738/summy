const { useEffect, useMemo, useState } = React;

const quickReplies = {
  "/hi": "Hi there, thanks for reaching out. I can help you with that.",
  "/price": "Here is the approved pricing template for this plan.",
  "/hours": "Our team is available from 10 AM to 7 PM, Monday to Saturday.",
  "/return": "Our return policy allows returns within 7 days when the item is unused and eligible."
};

const templates = [
  { key: "hi", label: "Greeting", body: "Hi {{name}}, thanks for reaching out. We're here to help." },
  { key: "price", label: "Pricing", body: "Here is the approved pricing template for this plan." },
  { key: "return", label: "Return policy", body: "Here is the return-policy template." }
];

const currentAgent = "Asha";

const initialConversations = [
  {
    id: "neha",
    name: "Neha Sharma",
    initial: "N",
    color: "green-avatar",
    phone: "+91 98765 11420",
    preview: "Delivery ETA + return policy template",
    time: "1m",
    status: "Open",
    assignee: "Asha",
    source: "WhatsApp QR",
    tags: ["VIP", "Lead", "WhatsApp QR"],
    pinned: false,
    messages: [
      { type: "incoming", text: "Can you share delivery time and return policy?", time: "1m", initial: "N", color: "green-avatar" }
    ],
    notes: [{ author: "Asha", time: "earlier", text: "Prefers WhatsApp updates only." }],
    activity: [
      ["1m", "Message received from WhatsApp"],
      ["1m", "Round-robin assigned to Asha"],
      ["2m", "Lead source tracked: WhatsApp QR"]
    ]
  },
  {
    id: "vijay",
    name: "Vijay Golani",
    initial: "V",
    color: "purple-avatar",
    phone: "+91 98220 55671",
    preview: "New lead from QR, assign sales rep",
    time: "2m",
    status: "Open",
    assignee: "Rohan",
    source: "Click-to-chat link",
    tags: ["Lead", "Plan B"],
    pinned: false,
    messages: [{ type: "incoming", text: "Interested in Plan B.", time: "2m", initial: "V", color: "purple-avatar" }],
    notes: [],
    activity: [["2m", "Lead created from wa.me short link"]]
  },
  {
    id: "dev",
    name: "Dev Patel",
    initial: "D",
    color: "blue-avatar",
    phone: "+91 90110 76543",
    preview: "Keyword trigger matched: price",
    time: "15m",
    status: "Pending",
    assignee: "Unassigned",
    source: "Organic",
    tags: ["Automation", "Support"],
    pinned: false,
    messages: [{ type: "incoming", text: "price", time: "15m", initial: "D", color: "blue-avatar" }],
    notes: [],
    activity: [["15m", "Keyword detected: price"]]
  }
];

const initialContacts = [
  {
    id: "contact-neha",
    name: "Neha Sharma",
    phone: "+91 98765 11420",
    email: "neha@example.com",
    source: "WhatsApp QR",
    status: "Open",
    assignee: "Asha",
    tags: ["VIP", "Lead"],
    customFields: [
      { label: "City", value: "Mumbai" },
      { label: "Plan", value: "Basic" },
      { label: "Interest", value: "Returns" }
    ]
  },
  {
    id: "contact-vijay",
    name: "Vijay Golani",
    phone: "+91 98220 55671",
    email: "vijay@example.com",
    source: "WhatsApp QR",
    status: "Open",
    assignee: "Rohan",
    tags: ["Lead"],
    customFields: [{ label: "City", value: "Pune" }]
  },
  {
    id: "contact-dev",
    name: "Dev Patel",
    phone: "+91 90110 76543",
    email: "dev@example.com",
    source: "Organic",
    status: "Pending",
    assignee: "Unassigned",
    tags: ["Support"],
    customFields: []
  }
];

const initialTeam = [
  { id: "u-asha", name: "Asha Kumar", email: "asha@co.com", role: "Admin", status: "Active" },
  { id: "u-rohan", name: "Rohan Shah", email: "rohan@co.com", role: "Agent", status: "Active" },
  { id: "u-priya", name: "Priya Nair", email: "priya@co.com", role: "Agent", status: "Offline" }
];

function nowLabel() {
  return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ name, cls = "icon" }) {
  const iconName = String(name || "").replace(/^ph-/, "");
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    question: <path d="M9 7a3 3 0 1 1 2.5 2.95c-.9.14-1.5.9-1.5 1.8v.27M12 16h.01" {...common} />,
    plus: <path d="M12 5v14M5 12h14" {...common} />,
    "whatsapp-logo": <path d="M12 4a8 8 0 0 0-7 12l-1 4 4-1a8 8 0 1 0 4-15Z M9 9c.2 1.6 1.2 3 2.6 4 1 .7 2 .9 3 .6" {...common} />,
    bell: <path d="M12 4a4 4 0 0 0-4 4v2.5L6 13v1h12v-1l-2-2.5V8a4 4 0 0 0-4-4Zm-2 12a2 2 0 0 0 4 0" {...common} />,
    "check-circle": <><circle cx="12" cy="12" r="8" {...common} /><path d="m8.8 12 2.1 2.1 4.3-4.3" {...common} /></>,
    "user-circle": <><circle cx="12" cy="12" r="8" {...common} /><path d="M8.5 15c.9-1 2.2-1.6 3.5-1.6 1.3 0 2.6.6 3.5 1.6M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" {...common} /></>,
    clock: <><circle cx="12" cy="12" r="8" {...common} /><path d="M12 8v4l2.7 1.8" {...common} /></>,
    megaphone: <path d="M4 11h3l7-4v10l-7-4H4v-2Zm3 2 1.5 3" {...common} />,
    robot: <><rect x="7" y="8" width="10" height="8" rx="2" {...common} /><path d="M12 8V6M9.5 12h.01M14.5 12h.01M10 15h4" {...common} /></>,
    list: <path d="M8 7h10M8 12h10M8 17h10M5 7h.01M5 12h.01M5 17h.01" {...common} />,
    star: <path d="m12 5 2 4 4.5.7-3.3 3.2.8 4.6-4-2.1-4 2.1.8-4.6L5.5 9.7 10 9l2-4Z" {...common} />,
    "dots-three-outline": <path d="M7 12h.01M12 12h.01M17 12h.01" {...common} />,
    note: <path d="M8 5h8v14l-4-2-4 2V5Zm2 4h4M10 12h4" {...common} />,
    "arrow-clockwise": <path d="M18 8V5h-3M18 5a7 7 0 1 0 1.3 7.7" {...common} />,
    "paper-plane-right": <path d="m4 12 14-7-4 14-2.5-4.5L4 12Z" {...common} />,
    "paper-plane-tilt": <path d="m4 12 14-7-4 14-2.5-4.5L4 12Z" transform="rotate(-8 12 12)" {...common} />,
    "check-circle-fill": <><circle cx="12" cy="12" r="8" {...common} /><path d="m8.8 12 2.1 2.1 4.3-4.3" {...common} /></>,
    "floppy-disk": <path d="M6 5h10l2 2v12H6V5Zm2 0v4h6V5M9 16h6" {...common} />,
    "squares-four": <path d="M6 6h5v5H6zM13 6h5v5h-5zM6 13h5v5H6zM13 13h5v5h-5z" {...common} />,
    "arrow-left": <path d="M15 6 9 12l6 6M9 12h9" {...common} />,
    "pencil-simple": <path d="m6 17 3.5-.7L18 8.8 15.2 6 6.7 14.5 6 18Z" {...common} />,
    trash: <path d="M7 8h10M9 8v8M15 8v8M8 8l1-2h6l1 2M8.5 8l.5 10h6l.5-10" {...common} />,
    "check-circle": <><circle cx="12" cy="12" r="8" {...common} /><path d="m8.8 12 2.1 2.1 4.3-4.3" {...common} /></>,
    x: <path d="m8 8 8 8M16 8l-8 8" {...common} />,
    "x-circle": <><circle cx="12" cy="12" r="8" {...common} /><path d="m9 9 6 6M15 9l-6 6" {...common} /></>,
    link: <path d="M10 13a3 3 0 0 1 0-4l2-2a3 3 0 1 1 4 4l-1 1M14 11a3 3 0 0 1 0 4l-2 2a3 3 0 1 1-4-4l1-1" {...common} />,
    "arrow-square-out": <path d="M14 6h4v4M10 14l8-8M6 8v10h10" {...common} />,
    gear: <path d="m12 8 .6-1.8 2 .7 1.3-1.3 1.4 1.4-1.3 1.3.7 2 1.8.6v2l-1.8.6-.7 2 1.3 1.3-1.4 1.4-1.3-1.3-2 .7L12 20l-.6-1.8-2-.7-1.3 1.3-1.4-1.4 1.3-1.3-.7-2L5 13.2v-2l1.8-.6.7-2L6.2 7.3l1.4-1.4L9 7.2l2-.7L12 8Zm0 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" {...common} />,
    "users-four": <path d="M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 17c.7-1.3 2-2 3.4-2s2.7.7 3.4 2M12.5 17c.6-1 1.6-1.5 2.8-1.5s2.2.5 2.8 1.5" {...common} />,
    "chart-line": <path d="M5 17h14M6 15l3-4 3 2 4-6" {...common} />,
    "user-plus": <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-4 6c.8-2 2.3-3 4-3s3.2 1 4 3M17 8v6M14 11h6" {...common} />,
    "clock-counter-clockwise": <><circle cx="12" cy="12" r="8" {...common} /><path d="M8 8H5V5M5 8a7 7 0 1 1-1 4M12 8v4l2.5 1.5" {...common} /></>
  };

  return (
    <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
      {map[iconName] || <circle cx="12" cy="12" r="2" {...common} />}
    </svg>
  );
}

function Button({ children, className = "", ...props }) {
  return (
    <button {...props} className={cx("button", className)}>
      {children}
    </button>
  );
}

function Badge({ children, className = "" }) {
  return <span className={cx("badge", className)}>{children}</span>;
}

function TabTrigger({ active, onClick, children }) {
  return (
    <button type="button" className={cx("tabs-trigger", active && "active")} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [activeModule, setActiveModule] = useState("inbox");
  const [activeConversationId, setActiveConversationId] = useState(initialConversations[0].id);
  const [conversations, setConversations] = useState(initialConversations);
  const [contacts, setContacts] = useState(initialContacts);
  const [query, setQuery] = useState("");
  const [inboxFilter, setInboxFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeSideTab, setActiveSideTab] = useState("details");
  const [reply, setReply] = useState("");
  const [noteText, setNoteText] = useState("");
  const [toast, setToast] = useState("");
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [newConversation, setNewConversation] = useState({ name: "", phone: "", template: "" });
  const [newConversationError, setNewConversationError] = useState("");

  const [activeContactId, setActiveContactId] = useState(initialContacts[0].id);
  const [activeContactTab, setActiveContactTab] = useState("details");
  const [contactQuery, setContactQuery] = useState("");
  const [contactTagFilter, setContactTagFilter] = useState("All");
  const [newTag, setNewTag] = useState("");
  const [editingFieldIndex, setEditingFieldIndex] = useState(null);
  const [editingField, setEditingField] = useState({ label: "", value: "" });

  const [settingsSection, setSettingsSection] = useState("profile");
  const [profile, setProfile] = useState({ fullName: "Asha Kumar", email: "asha@company.com" });
  const [business, setBusiness] = useState({ companyName: "Whatboard Demo", industry: "E-commerce" });
  const [team, setTeam] = useState(initialTeam);
  const [invite, setInvite] = useState({ email: "", role: "Agent", error: "" });
  const [trackingLinks, setTrackingLinks] = useState([
    { name: "Expo QR", url: "wa.me/919876500000/expo", clicks: 48, created: "Apr 20, 2026" },
    { name: "Website Chat", url: "wa.me/919876500000/web", clicks: 124, created: "Apr 15, 2026" }
  ]);
  const [linkForm, setLinkForm] = useState({ name: "", message: "", alias: "" });
  const [support, setSupport] = useState({ name: "Asha Kumar", email: "asha@company.com", message: "", errors: {} });
  const [dashboardUpdatedAt, setDashboardUpdatedAt] = useState(nowLabel());
  const [automationView, setAutomationView] = useState("rules");
  const [trackingErrors, setTrackingErrors] = useState({});
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "" });
  const [newContactError, setNewContactError] = useState("");

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) || conversations[0],
    [conversations, activeConversationId]
  );

  const activeContact = useMemo(() => contacts.find((c) => c.id === activeContactId) || contacts[0], [contacts, activeContactId]);

  const filteredConversations = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = conversations.filter((c) => {
      const qMatch = `${c.name} ${c.phone} ${c.preview} ${c.tags.join(" ")}`.toLowerCase().includes(q);
      const queueMatch =
        inboxFilter === "all" ||
        (inboxFilter === "attention" && c.status !== "Resolved") ||
        (inboxFilter === "mine" && c.assignee === currentAgent) ||
        (inboxFilter === "unassigned" && c.assignee === "Unassigned") ||
        (inboxFilter === "pending" && c.status === "Pending");
      const statusMatch = statusFilter === "All" || c.status === statusFilter;
      return qMatch && queueMatch && statusMatch;
    });
    return sortOrder === "oldest" ? [...rows].reverse() : rows;
  }, [conversations, query, inboxFilter, statusFilter, sortOrder]);

  const filteredContacts = useMemo(() => {
    const q = contactQuery.trim().toLowerCase();
    return contacts.filter((c) => {
      const qMatch = `${c.name} ${c.phone} ${c.tags.join(" ")} ${c.source}`.toLowerCase().includes(q);
      const tagMatch = contactTagFilter === "All" || c.tags.includes(contactTagFilter);
      return qMatch && tagMatch;
    });
  }, [contacts, contactQuery, contactTagFilter]);

  const activeInboxConversation = useMemo(() => {
    if (!filteredConversations.length) return null;
    return filteredConversations.find((c) => c.id === activeConversationId) || filteredConversations[0];
  }, [filteredConversations, activeConversationId]);

  const dashboardMetrics = useMemo(() => {
    const open = conversations.filter((c) => c.status === "Open").length;
    const pending = conversations.filter((c) => c.status === "Pending").length;
    const resolved = conversations.filter((c) => c.status === "Resolved").length;
    return { open, pending, resolved, avg: "4m" };
  }, [conversations]);

  const assignees = useMemo(() => ["Unassigned", ...team.map((m) => m.name)], [team]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("whatboard-react-state");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.conversations)) setConversations(parsed.conversations);
      if (Array.isArray(parsed.contacts)) setContacts(parsed.contacts);
      if (Array.isArray(parsed.team)) setTeam(parsed.team);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.business) setBusiness(parsed.business);
    } catch {}
  }, []);

  useEffect(() => {
    const payload = { conversations, contacts, team, profile, business };
    window.localStorage.setItem("whatboard-react-state", JSON.stringify(payload));
  }, [conversations, contacts, team, profile, business]);

  useEffect(() => {
    setSupport((prev) => ({ ...prev, name: profile.fullName, email: profile.email }));
  }, [profile.fullName, profile.email]);

  useEffect(() => {
    if (activeModule !== "inbox") return;
    if (!filteredConversations.length) return;
    if (!filteredConversations.find((c) => c.id === activeConversationId)) {
      setActiveConversationId(filteredConversations[0].id);
    }
  }, [activeModule, filteredConversations, activeConversationId]);

  function mutateConversation(id, updater) {
    setConversations((prev) => prev.map((item) => (item.id === id ? updater(item) : item)));
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  }

  function onSendReply() {
    const text = reply.trim();
    if (!text || !activeInboxConversation) return;
    mutateConversation(activeInboxConversation.id, (c) => ({
      ...c,
      preview: text,
      time: "now",
      messages: [...c.messages, { type: "agent", text, time: "sent now", initial: "A", color: "gray-avatar" }],
      activity: [[nowLabel(), "Agent reply sent from Whatboard"], ...c.activity]
    }));
    setReply("");
    showToast("Message sent");
  }

  function onSetStatus(nextStatus) {
    if (!activeInboxConversation) return;
    mutateConversation(activeInboxConversation.id, (c) => ({
      ...c,
      status: nextStatus,
      activity: [[nowLabel(), `Status changed to ${nextStatus} by ${currentAgent}`], ...c.activity]
    }));
    showToast(`Status set to ${nextStatus}`);
  }

  function onSetAssignee(nextAssignee) {
    if (!activeInboxConversation) return;
    mutateConversation(activeInboxConversation.id, (c) => ({
      ...c,
      assignee: nextAssignee,
      activity: [[nowLabel(), `Reassigned to ${nextAssignee} by ${currentAgent}`], ...c.activity]
    }));
    showToast(`Assigned to ${nextAssignee}`);
  }

  function onAddNote() {
    const text = noteText.trim();
    if (!text || !activeInboxConversation) return;
    mutateConversation(activeInboxConversation.id, (c) => ({
      ...c,
      notes: [{ author: currentAgent, time: nowLabel(), text }, ...c.notes],
      activity: [[nowLabel(), `Note added by ${currentAgent}`], ...c.activity]
    }));
    setNoteText("");
    setActiveSideTab("notes");
    showToast("Note saved");
  }

  function onCreateConversation(e) {
    e.preventDefault();
    const cleanName = newConversation.name.trim();
    const cleanPhone = newConversation.phone.trim();
    if (!cleanName || !cleanPhone) return;
    if (!newConversation.template) {
      setNewConversationError("Template is required for first-time outbound WhatsApp conversations.");
      return;
    }
    const selectedTemplate = templates.find((t) => t.key === newConversation.template);
    const body = (selectedTemplate?.body || "").replace("{{name}}", cleanName);
    const id = `lead-${Date.now()}`;
    const record = {
      id,
      name: cleanName,
      initial: cleanName.charAt(0).toUpperCase(),
      color: "orange-avatar",
      phone: cleanPhone,
      preview: `Template sent: ${selectedTemplate?.label || "message"}`,
      time: "now",
      status: "Open",
      assignee: currentAgent,
      source: "Manual",
      tags: ["Lead", "Manual"],
      pinned: false,
      messages: [{ type: "agent", text: body, time: "now", initial: "A", color: "gray-avatar" }],
      notes: [],
      activity: [[nowLabel(), `Conversation created by ${currentAgent}`]]
    };
    setConversations((prev) => [record, ...prev]);
    setContacts((prev) => {
      const exists = prev.find((c) => c.phone === cleanPhone);
      if (exists) return prev;
      return [
        { id: `contact-${id}`, name: cleanName, phone: cleanPhone, email: "", source: "Manual", status: "Open", assignee: currentAgent, tags: ["Lead"], customFields: [] },
        ...prev
      ];
    });
    setActiveConversationId(id);
    setShowNewConversation(false);
    setNewConversation({ name: "", phone: "", template: "" });
    setNewConversationError("");
    setActiveModule("inbox");
    setInboxFilter("all");
    showToast("Conversation created");
  }

  function onAddContact() {
    setShowAddContact(true);
  }

  function onCreateContact(e) {
    e.preventDefault();
    const name = newContact.name.trim();
    const phone = newContact.phone.trim();
    if (!name || !phone) {
      setNewContactError("Name and phone are required");
      return;
    }
    const exists = contacts.find((c) => c.phone === phone || c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setNewContactError("Contact already exists");
      return;
    }
    const record = {
      id: `contact-${Date.now()}`,
      name,
      phone,
      email: newContact.email.trim(),
      source: "Manual",
      status: "Open",
      assignee: "Unassigned",
      tags: ["Lead"],
      customFields: []
    };
    setContacts((prev) => [record, ...prev]);
    setActiveContactId(record.id);
    setShowAddContact(false);
    setNewContact({ name: "", phone: "", email: "" });
    setNewContactError("");
    showToast("Contact added");
  }

  function onAddTag() {
    const clean = newTag.trim();
    if (!clean || !activeContact) return;
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== activeContact.id) return c;
        if (c.tags.includes(clean)) return c;
        return { ...c, tags: [...c.tags, clean] };
      })
    );
    setNewTag("");
    showToast("Tag added");
  }

  function onEditCustomField(index) {
    if (!activeContact) return;
    const field = activeContact.customFields[index];
    if (!field) return;
    setEditingFieldIndex(index);
    setEditingField({ label: field.label, value: field.value });
  }

  function onSaveCustomField() {
    if (editingFieldIndex === null || !activeContact) return;
    const label = editingField.label.trim();
    const value = editingField.value.trim();
    if (!label || !value) return;
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== activeContact.id) return c;
        const next = [...c.customFields];
        next[editingFieldIndex] = { label, value };
        return { ...c, customFields: next };
      })
    );
    setEditingFieldIndex(null);
    setEditingField({ label: "", value: "" });
    showToast("Custom field updated");
  }

  function onDeleteCustomField(index) {
    if (!activeContact) return;
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== activeContact.id) return c;
        return { ...c, customFields: c.customFields.filter((_, idx) => idx !== index) };
      })
    );
    setEditingFieldIndex(null);
    setEditingField({ label: "", value: "" });
    showToast("Custom field deleted");
  }

  function onSaveInvite(e) {
    e.preventDefault();
    const email = invite.email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setInvite((prev) => ({ ...prev, error: "Enter a valid email address" }));
      return;
    }
    setTeam((prev) => [...prev, { id: `u-${Date.now()}`, name: email.split("@")[0], email, role: invite.role, status: "Active" }]);
    setInvite({ email: "", role: "Agent", error: "" });
    showToast(`Invite sent to ${email}`);
  }

  function onCreateTrackingLink(e) {
    e.preventDefault();
    const { name, message, alias } = linkForm;
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!alias.trim()) errors.alias = "Alias is required";
    if (Object.keys(errors).length) {
      setTrackingErrors(errors);
      return;
    }
    setTrackingErrors({});
    setTrackingLinks((prev) => [
      {
        name: name.trim(),
        url: `wa.me/919876500000/${alias.trim()}`,
        clicks: 0,
        created: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date())
      },
      ...prev
    ]);
    setLinkForm({ name: "", message: "", alias: "" });
    showToast("Tracking link created");
  }

  function onSubmitSupport(e) {
    e.preventDefault();
    const errors = {};
    if (!support.name.trim()) errors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(support.email.trim())) errors.email = "Valid email is required";
    if (!support.message.trim()) errors.message = "Message is required";
    if (Object.keys(errors).length) {
      setSupport((prev) => ({ ...prev, errors }));
      return;
    }
    showToast("Support request submitted");
    setSupport((prev) => ({ ...prev, message: "", errors: {} }));
  }

  function conversationPanel() {
    return (
      <>
        <aside className="folders">
          <header className="panel-title">
            <h1>Whatboard</h1>
            <div className="title-actions">
              <Button className="button-icon ghost" type="button" title="Help" onClick={() => showToast("Help center coming soon")}>
                <Icon name="ph-question" cls="icon icon-sm" />
              </Button>
              <Button className="button-icon" type="button" title="New conversation" onClick={() => setShowNewConversation(true)}>
                <Icon name="ph-plus" cls="icon icon-sm" />
              </Button>
            </div>
          </header>
          <nav className="folder-nav">
            <button className={cx("folder-row", inboxFilter === "all" && "selected")} type="button" onClick={() => setInboxFilter("all")}><Icon name="ph-whatsapp-logo" cls="icon icon-list" />WhatsApp inbox <strong>{conversations.length}</strong></button>
            <button className={cx("folder-row", inboxFilter === "attention" && "selected")} type="button" onClick={() => setInboxFilter("attention")}><Icon name="ph-bell" cls="icon icon-list" />Needs attention <strong>{conversations.filter((c) => c.status !== "Resolved").length}</strong></button>
            <button className={cx("folder-row", inboxFilter === "mine" && "selected")} type="button" onClick={() => setInboxFilter("mine")}><Icon name="ph-check-circle" cls="icon icon-list" />Assigned to me <strong>{conversations.filter((c) => c.assignee === currentAgent).length}</strong></button>
            <button className={cx("folder-row", inboxFilter === "unassigned" && "selected")} type="button" onClick={() => setInboxFilter("unassigned")}><Icon name="ph-user-circle" cls="icon icon-list" />Unassigned <strong>{conversations.filter((c) => c.assignee === "Unassigned").length}</strong></button>
            <button className={cx("folder-row", inboxFilter === "pending" && "selected")} type="button" onClick={() => setInboxFilter("pending")}><Icon name="ph-clock" cls="icon icon-list" />Pending follow-ups <strong>{conversations.filter((c) => c.status === "Pending").length}</strong></button>
            <button className="folder-row" type="button" onClick={() => setActiveModule("campaigns")}><Icon name="ph-megaphone" cls="icon icon-list" />Campaigns <em>defer</em></button>
            <button className="folder-row" type="button" onClick={() => setActiveModule("automations")}><Icon name="ph-robot" cls="icon icon-list" />Automations</button>
          </nav>
        </aside>

        <aside className="conversation-list">
          <header className="list-head"><div><Icon name="ph-list" cls="icon" /><strong>Conversations</strong></div></header>
          <div className="search-box">
            <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone, or keyword" />
          </div>
          <div className="list-tools">
            <select className="tiny-select select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option><option>Open</option><option>Pending</option><option>Resolved</option>
            </select>
            <select className="tiny-select select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Newest</option><option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="thread-list">
            {filteredConversations.length ? filteredConversations.map((row) => (
              <button key={row.id} type="button" className={cx("thread-row", row.id === activeConversationId && "active")} onClick={() => setActiveConversationId(row.id)}>
                <span className={cx("avatar", row.color)}>{row.initial}</span>
                <span className="thread-copy"><strong>{row.name}</strong><span>{row.preview}</span></span>
                <span className="thread-time">{row.time}</span>
              </button>
            )) : <div className="empty-state">No conversations match this view.</div>}
          </div>
        </aside>

        <section className="chat">
          <header className="chat-head">
            <h2>{activeInboxConversation?.name || "No conversation selected"}</h2>
            <div className="chat-actions">
              <Badge className="success">WhatsApp</Badge>
              <select className="select status-select" value={activeInboxConversation?.status || "Open"} onChange={(e) => onSetStatus(e.target.value)} disabled={!activeInboxConversation}>
                <option>Open</option><option>Pending</option><option>Resolved</option>
              </select>
              <Button className="button-icon ghost" type="button" title="Pin" onClick={() => showToast("Conversation pinned")}><Icon name="ph-star" cls="icon icon-sm" /></Button>
              <Button className="button-icon ghost" type="button" title="More" onClick={() => showToast("More options coming next")}><Icon name="ph-dots-three-outline" cls="icon icon-sm" /></Button>
              <Button className="button-icon ghost" type="button" title="Insert template" onClick={() => setReply(quickReplies["/return"])}><Icon name="ph-note" cls="icon icon-sm" /></Button>
              <Button className="button-icon ghost" type="button" title="Refresh" onClick={() => showToast("Conversation refreshed")}><Icon name="ph-arrow-clockwise" cls="icon icon-sm" /></Button>
              <Button className="primary compact" type="button" onClick={() => onSetStatus("Resolved")}><Icon name="ph-check-circle" cls="icon icon-inline" />Close</Button>
            </div>
          </header>
          <div className="messages">
            {(activeInboxConversation?.messages || []).map((m, idx) => (
              <article key={idx} className={cx("text-message", m.type === "agent" && "agent-message")}>
                <span className={cx("avatar", m.color)}>{m.initial}</span>
                <div className="text-bubble">
                  {m.text}
                  <div className="message-meta">{m.time}</div>
                </div>
              </article>
            ))}
          </div>
          <footer className="composer">
            <div className="reply-mode"><Icon name="ph-whatsapp-logo" cls="icon icon-inline" /> WhatsApp reply</div>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSendReply();
                }
                if (e.ctrlKey && e.key.toLowerCase() === "k") {
                  e.preventDefault();
                  setReply(quickReplies["/price"]);
                }
              }}
              placeholder="Use /hi, /price, /hours or Ctrl K"
            />
            <div className="composer-bar">
              <div>
                {Object.keys(quickReplies).map((key) => (
                  <Button key={key} className="button-icon ghost" type="button" title={key} onClick={() => setReply(quickReplies[key])}>
                    <span style={{ fontSize: 10 }}>{key.replace("/", "")}</span>
                  </Button>
                ))}
              </div>
              <Button className="primary compact" type="button" onClick={onSendReply} disabled={!activeInboxConversation}>
                <Icon name="ph-paper-plane-right" cls="icon icon-inline" /> Send
              </Button>
            </div>
          </footer>
        </section>

        <aside className="details-panel">
          <header className="detail-header">
            <div className="tabs-list">
              <TabTrigger active={activeSideTab === "details"} onClick={() => setActiveSideTab("details")}>Details</TabTrigger>
              <TabTrigger active={activeSideTab === "activity"} onClick={() => setActiveSideTab("activity")}>Activity</TabTrigger>
              <TabTrigger active={activeSideTab === "notes"} onClick={() => setActiveSideTab("notes")}>Notes</TabTrigger>
            </div>
          </header>

          <section className={cx("contact-details card", activeSideTab !== "details" && "is-hidden")}>
            <div className="profile-line">
              <span className={cx("avatar", activeInboxConversation?.color)}>{activeInboxConversation?.initial || "-"}</span>
              <div><h3>{activeInboxConversation?.name || "-"}</h3><p>{activeInboxConversation?.phone || "-"}</p></div>
            </div>
            <div className="tag-row">{(activeInboxConversation?.tags || []).map((t) => <Badge key={t}>{t}</Badge>)}</div>
            <div className="attribute-grid">
              <p>
                <span>Status</span>
                <span>
                  <select className="inline-select" value={activeInboxConversation?.status || "Open"} onChange={(e) => onSetStatus(e.target.value)} disabled={!activeInboxConversation}>
                    <option>Open</option><option>Pending</option><option>Resolved</option>
                  </select>
                </span>
              </p>
              <p>
                <span>Assignee</span>
                <span>
                  <select className="inline-select" value={activeInboxConversation?.assignee || "Unassigned"} onChange={(e) => onSetAssignee(e.target.value)} disabled={!activeInboxConversation}>
                    {assignees.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </span>
              </p>
              <p><span>Source</span><b title={activeInboxConversation?.source || "-"}>{activeInboxConversation?.source || "-"}</b></p>
            </div>
          </section>

          <section className={cx("right-scroll", activeSideTab !== "activity" && "is-hidden")}>
            <div className="right-group card">
              <h4>Activity logs</h4>
              {(activeInboxConversation?.activity || []).map(([time, text], idx) => <p key={idx}><span>{time}</span><b>{text}</b></p>)}
            </div>
          </section>

          <section className={cx("right-scroll", activeSideTab !== "notes" && "is-hidden")}>
            <div className="right-group card">
              <h4>Internal notes</h4>
              <label className="note-box"><span>Private handoff note</span><textarea className="textarea" value={noteText} onChange={(e) => setNoteText(e.target.value)} /></label>
              <Button className="primary compact" type="button" onClick={onAddNote}><Icon name="ph-floppy-disk" cls="icon icon-inline" />Save</Button>
              {(activeInboxConversation?.notes || []).map((n, idx) => (
                <article key={idx} className="note-card"><header><strong>{n.author}</strong><span>{n.time}</span></header><p>{n.text}</p></article>
              ))}
            </div>
          </section>
        </aside>
      </>
    );
  }

  function dashboardPanel() {
    return (
      <>
        <aside className="folders">
          <header className="panel-title"><h1>Dashboard</h1></header>
          <nav className="folder-nav">
            <button className="folder-row selected" type="button"><Icon name="ph-squares-four" cls="icon icon-list" />Overview</button>
            <button className="folder-row" type="button" onClick={() => setActiveModule("inbox")}><Icon name="ph-arrow-left" cls="icon icon-list" />Go to inbox</button>
          </nav>
        </aside>
        <main className="conversation-list">
          <section className="dashboard-shell">
            <header className="panel-title">
              <div><h1>Dashboard</h1><p className="kpi-subtitle">Actionable insights</p></div>
              <Button className="ghost" type="button" onClick={() => setDashboardUpdatedAt(nowLabel())}><Icon name="ph-arrow-clockwise" cls="icon icon-sm" /> Refresh</Button>
            </header>
            <div className="dashboard-controls"><span className="kpi-subtitle">Updated at {dashboardUpdatedAt}</span></div>
            <section className="kpi-grid">
              <article className="kpi-card"><h3>Open conversations</h3><strong>{dashboardMetrics.open}</strong><span>Current queue</span></article>
              <article className="kpi-card"><h3>Pending follow-ups</h3><strong>{dashboardMetrics.pending}</strong><span>Need response soon</span></article>
              <article className="kpi-card"><h3>Resolved</h3><strong>{dashboardMetrics.resolved}</strong><span>Updated today</span></article>
              <article className="kpi-card"><h3>Avg response</h3><strong>{dashboardMetrics.avg}</strong><span>Per chat</span></article>
            </section>
            <section className="dashboard-panels">
              <div className="card activity-pane">
                <h3>Agent performance</h3>
                <div className="agent-table">
                  <div className="agent-row header"><span>Agent</span><span>Chats</span><span>Avg response</span><span>Status</span></div>
                  <div className="agent-row"><span>Asha</span><span>12</span><span>3m</span><span><i className="status-dot online" />Online</span></div>
                  <div className="agent-row"><span>Rohan</span><span>8</span><span>6m</span><span><i className="status-dot online" />Online</span></div>
                  <div className="agent-row"><span>Priya</span><span>5</span><span>9m</span><span><i className="status-dot offline" />Offline</span></div>
                </div>
              </div>
              <div className="card activity-pane">
                <h3>WhatsApp volume</h3>
                <div className="volume-list"><p><span>Delivered</span><b>138</b></p><p><span>Read</span><b>121</b></p><p><span>Failed</span><b>4</b></p></div>
                <div className="pill-row"><Badge>Sent</Badge><Badge>Delivered</Badge><Badge>Read</Badge></div>
              </div>
            </section>
          </section>
        </main>
      </>
    );
  }

  function contactsPanel() {
    return (
      <>
        <aside className="folders">
          <header className="panel-title">
            <h1>Contacts</h1>
            <Button className="compact ghost" type="button" onClick={onAddContact}><Icon name="ph-user-plus" cls="icon icon-sm" /> Add</Button>
          </header>
          <div className="search-box"><input className="input" value={contactQuery} onChange={(e) => setContactQuery(e.target.value)} placeholder="Search name, phone, tag..." /></div>
          <div className="contact-filters">
            <p>Filter by tag</p>
            <div className="chip-row">
              {["All", "VIP", "Lead", "Support"].map((tag) => (
                <button key={tag} className={cx("chip-toggle", contactTagFilter === tag && "is-active")} type="button" onClick={() => setContactTagFilter(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <aside className="conversation-list">
          <div className="thread-list contact-thread-list">
            {filteredContacts.length ? filteredContacts.map((c) => (
              <button key={c.id} className={cx("thread-row", c.id === activeContactId && "active")} type="button" onClick={() => setActiveContactId(c.id)}>
                <span className="avatar green-avatar">{c.name.charAt(0)}</span>
                <span className="thread-copy"><strong>{c.name}</strong><span>{c.phone} - {c.tags.join(", ")}</span></span>
                <span className="thread-time">1m</span>
              </button>
            )) : <div className="empty-state">No contacts match these filters.</div>}
          </div>
        </aside>

        <aside className="details-panel">
          <header className="detail-header">
            <div className="tabs-list">
              <TabTrigger active={activeContactTab === "details"} onClick={() => setActiveContactTab("details")}>Details</TabTrigger>
              <TabTrigger active={activeContactTab === "history"} onClick={() => setActiveContactTab("history")}>History</TabTrigger>
            </div>
          </header>
          <section className={cx("contact-details card", activeContactTab !== "details" && "is-hidden")}>
            <div className="profile-line"><span className="avatar green-avatar">{activeContact?.name?.charAt(0)}</span><div><h3>{activeContact?.name}</h3><p>{activeContact?.phone}</p></div></div>
            <div className="tag-row">
              {(activeContact?.tags || []).map((tag) => <Badge key={tag}>{tag}</Badge>)}
              <input className="tag-input" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAddTag(); } }} placeholder="Add tag" />
              <Button className="compact" type="button" onClick={onAddTag}><Icon name="ph-plus" cls="icon icon-inline" />Add</Button>
            </div>
            <div className="attribute-grid">
              <p><span>Status</span><b>{activeContact?.status}</b></p>
              <p><span>Source</span><b>{activeContact?.source}</b></p>
              <p><span>Assignee</span><b>{activeContact?.assignee}</b></p>
              <p><span>Email</span><b>{activeContact?.email || "-"}</b></p>
            </div>
            <div className="contact-custom">
              <h4>Custom fields</h4>
              {(activeContact?.customFields || []).map((field, idx) => (
                <div className="custom-field-row" key={`${field.label}-${idx}`}>
                  {editingFieldIndex === idx ? (
                    <>
                      <input className="input" value={editingField.label} onChange={(e) => setEditingField((prev) => ({ ...prev, label: e.target.value }))} />
                      <input className="input" value={editingField.value} onChange={(e) => setEditingField((prev) => ({ ...prev, value: e.target.value }))} />
                      <Button className="compact" type="button" onClick={onSaveCustomField}><Icon name="ph-check" cls="icon icon-inline" />Save</Button>
                      <Button className="compact ghost" type="button" onClick={() => setEditingFieldIndex(null)}><Icon name="ph-x" cls="icon icon-inline" />Cancel</Button>
                    </>
                  ) : (
                    <>
                      <span title={field.label}>{field.label}</span>
                      <span title={field.value}>{field.value}</span>
                      <Button className="compact ghost" type="button" onClick={() => onEditCustomField(idx)}><Icon name="ph-pencil-simple" cls="icon icon-inline" />Edit</Button>
                      <Button className="compact ghost" type="button" onClick={() => onDeleteCustomField(idx)}><Icon name="ph-trash" cls="icon icon-inline" />Delete</Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className={cx("right-scroll", activeContactTab !== "history" && "is-hidden")}>
            <div className="right-group card">
              <h4>Conversation history</h4>
              {conversations.filter((c) => c.phone === activeContact?.phone).map((c) => (
                <button key={c.id} className="contact-history-item" type="button" onClick={() => { setActiveConversationId(c.id); setActiveModule("inbox"); }}>
                  <div><strong>{c.name}</strong><span>{c.time}</span></div>
                  <p>{c.preview}</p>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </>
    );
  }

  function settingsPanel() {
    return (
      <>
        <aside className="folders">
          <header className="panel-title"><h1>Settings</h1></header>
          <nav className="settings-nav">
            {["profile", "business", "whatsapp", "team", "roles", "tracking", "billing", "support"].map((s) => (
              <button key={s} className={cx("folder-row", settingsSection === s && "selected")} type="button" onClick={() => setSettingsSection(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>
        </aside>
        <main className="conversation-list">
          <section className="settings-block">
            {settingsSection === "profile" && (
              <div className="card">
                <h2>Profile</h2>
                <div className="settings-form">
                  <div className="field"><label className="label">Full name</label><input className="input" value={profile.fullName} onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))} /></div>
                  <div className="field"><label className="label">Email</label><input className="input" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} /></div>
                  <Button className="primary" type="button" onClick={() => showToast("Profile saved")}><Icon name="ph-floppy-disk" cls="icon icon-inline" />Save changes</Button>
                </div>
              </div>
            )}
            {settingsSection === "business" && (
              <div className="card">
                <h2>Business</h2>
                <div className="settings-form">
                  <div className="field"><label className="label">Company name</label><input className="input" value={business.companyName} onChange={(e) => setBusiness((b) => ({ ...b, companyName: e.target.value }))} /></div>
                  <div className="field"><label className="label">Industry</label><input className="input" value={business.industry} onChange={(e) => setBusiness((b) => ({ ...b, industry: e.target.value }))} /></div>
                  <Button className="primary" type="button" onClick={() => showToast("Business details saved")}><Icon name="ph-floppy-disk" cls="icon icon-inline" />Save changes</Button>
                </div>
              </div>
            )}
            {settingsSection === "whatsapp" && <div className="card"><h2>WhatsApp API</h2><div className="connection-card"><p><Badge className="success"><Icon name="ph-check" cls="icon icon-sm" />Connected</Badge> BSP-managed</p><p><span className="label">Phone number</span><strong>+91 98765 00000</strong></p><p><span className="label">Display name</span><strong>Whatboard Demo</strong></p><p><span className="label">API status</span><strong>Active</strong></p></div></div>}
            {settingsSection === "team" && (
              <div className="card">
                <h2>Team</h2>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      {team.map((m) => (
                        <tr key={m.id}>
                          <td>{m.name}</td><td>{m.email}</td><td>{m.role}</td><td>{m.status}</td>
                          <td>
                            <Button
                              className="compact"
                              type="button"
                              disabled={m.email === profile.email}
                              onClick={() => {
                                if (m.email === profile.email) return;
                                if (window.confirm(`Remove ${m.name} from workspace?`)) setTeam((prev) => prev.filter((x) => x.id !== m.id));
                              }}
                            >
                              <Icon name="ph-user-minus" cls="icon icon-inline" />Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <form className="settings-form" onSubmit={onSaveInvite}>
                  <div className="field"><label className="label">Invite email</label><input className={cx("input", invite.error && "is-invalid")} value={invite.email} onChange={(e) => setInvite((prev) => ({ ...prev, email: e.target.value, error: "" }))} placeholder="team@company.com" /><p className="field-error">{invite.error}</p></div>
                  <div className="field"><label className="label">Role</label><select className="select" value={invite.role} onChange={(e) => setInvite((prev) => ({ ...prev, role: e.target.value }))}><option>Agent</option><option>Admin</option></select></div>
                  <Button className="primary" type="submit"><Icon name="ph-paper-plane-tilt" cls="icon icon-inline" />Send invite</Button>
                </form>
              </div>
            )}
            {settingsSection === "roles" && <div className="card roles-block"><h2>Roles</h2><div className="roles-grid"><article className="card"><h3>ADMIN</h3><ul><li><Icon name="ph-check-circle" cls="icon icon-sm" /> View all conversations</li><li><Icon name="ph-check-circle" cls="icon icon-sm" /> Manage team</li><li><Icon name="ph-check-circle" cls="icon icon-sm" /> Manage billing</li></ul></article><article className="card"><h3>AGENT</h3><ul><li><Icon name="ph-check-circle" cls="icon icon-sm" /> Reply to messages</li><li><Icon name="ph-check-circle" cls="icon icon-sm" /> Add notes</li></ul></article></div></div>}
            {settingsSection === "tracking" && (
              <div className="card">
                <h2>Tracking links</h2>
                <form className="settings-form" onSubmit={onCreateTrackingLink}>
                  <div className="field"><label className="label">Name</label><input className={cx("input", trackingErrors.name && "is-invalid")} value={linkForm.name} onChange={(e) => { setLinkForm((prev) => ({ ...prev, name: e.target.value })); setTrackingErrors((p) => ({ ...p, name: "" })); }} /><p className="field-error">{trackingErrors.name || ""}</p></div>
                  <div className="field"><label className="label">Message</label><input className="input" value={linkForm.message} onChange={(e) => setLinkForm((prev) => ({ ...prev, message: e.target.value }))} /></div>
                  <div className="field"><label className="label">Alias</label><input className={cx("input", trackingErrors.alias && "is-invalid")} value={linkForm.alias} onChange={(e) => { setLinkForm((prev) => ({ ...prev, alias: e.target.value })); setTrackingErrors((p) => ({ ...p, alias: "" })); }} /><p className="field-error">{trackingErrors.alias || ""}</p></div>
                  <Button className="primary" type="submit"><Icon name="ph-link" cls="icon icon-inline" />Create link</Button>
                </form>
                <div className="table-wrap">
                  <table><thead><tr><th>Name</th><th>URL</th><th>Clicks</th><th>Created</th></tr></thead><tbody>{trackingLinks.map((l, idx) => <tr key={idx}><td>{l.name}</td><td>{l.url}</td><td>{l.clicks}</td><td>{l.created}</td></tr>)}</tbody></table>
                </div>
              </div>
            )}
            {settingsSection === "billing" && <div className="card"><h2>Billing</h2><div className="connection-card"><p><span className="label">Current plan</span><strong>Flat Subscription</strong></p><p><span className="label">Status</span><strong>Active</strong></p><p><span className="label">Next invoice</span><strong>Manual - contact support</strong></p></div></div>}
            {settingsSection === "support" && (
              <div className="card">
                <h2>Support</h2>
                <form className="settings-form" onSubmit={onSubmitSupport}>
                  <div className="field"><label className="label">Name</label><input className={cx("input", support.errors.name && "is-invalid")} value={support.name} onChange={(e) => setSupport((prev) => ({ ...prev, name: e.target.value, errors: { ...prev.errors, name: "" } }))} /><p className="field-error">{support.errors.name || ""}</p></div>
                  <div className="field"><label className="label">Email</label><input className={cx("input", support.errors.email && "is-invalid")} value={support.email} onChange={(e) => setSupport((prev) => ({ ...prev, email: e.target.value, errors: { ...prev.errors, email: "" } }))} /><p className="field-error">{support.errors.email || ""}</p></div>
                  <div className="field"><label className="label">Message</label><textarea className={cx("textarea", support.errors.message && "is-invalid")} value={support.message} onChange={(e) => setSupport((prev) => ({ ...prev, message: e.target.value, errors: { ...prev.errors, message: "" } }))} /><p className="field-error">{support.errors.message || ""}</p></div>
                  <Button className="primary" type="submit"><Icon name="ph-paper-plane-right" cls="icon icon-inline" />Submit</Button>
                </form>
              </div>
            )}
          </section>
        </main>
      </>
    );
  }

  function campaignsPanel() {
    return (
      <>
        <aside className="folders">
          <header className="panel-title"><h1>Campaigns</h1></header>
          <nav className="folder-nav">
            <button className="folder-row selected" type="button"><Icon name="ph-clock-counter-clockwise" cls="icon icon-list" />Deferred</button>
            <button className="folder-row" type="button" onClick={() => setActiveModule("inbox")}><Icon name="ph-arrow-left" cls="icon icon-list" />Back to inbox</button>
          </nav>
        </aside>
        <main className="conversation-list">
          <section className="dashboard-shell">
            <header className="panel-title"><div><h1>Campaigns</h1><p className="kpi-subtitle">Deferred for MVP launch phase.</p></div><Badge className="warning">Deferred</Badge></header>
            <section className="card activity-pane"><h3>Campaign module status</h3><p className="muted">Broadcast composer, scheduling, and analytics are intentionally deferred.</p></section>
          </section>
        </main>
      </>
    );
  }

  function automationsPanel() {
    return (
      <>
        <aside className="folders">
          <header className="panel-title"><h1>Automations</h1></header>
          <nav className="folder-nav">
            <button className={cx("folder-row", automationView === "rules" && "selected")} type="button" onClick={() => setAutomationView("rules")}>Rules</button>
            <button className={cx("folder-row", automationView === "templates" && "selected")} type="button" onClick={() => setAutomationView("templates")}>Template messages</button>
            <button className={cx("folder-row", automationView === "links" && "selected")} type="button" onClick={() => setAutomationView("links")}>Click-to-chat links</button>
          </nav>
        </aside>
        <main className="conversation-list">
          <section className="dashboard-shell">
            <header className="panel-title"><div><h1>Automations</h1><p className="kpi-subtitle">Keyword and auto-reply rules.</p></div></header>
            <section className="card activity-pane">
              {automationView === "rules" && (
                <>
                  <h3>Automation rules</h3>
                  <div className="activity-list">
                    <div className="activity-item"><span>On</span><p>Keyword: price -> send pricing template</p></div>
                    <div className="activity-item"><span>On</span><p>Welcome message for new conversations</p></div>
                    <div className="activity-item"><span>On</span><p>Away message outside business hours</p></div>
                  </div>
                </>
              )}
              {automationView === "templates" && (
                <>
                  <h3>Template messages</h3>
                  <div className="activity-list">
                    {templates.map((t) => (
                      <div key={t.key} className="activity-item"><span>{t.key}</span><p>{t.body}</p></div>
                    ))}
                  </div>
                </>
              )}
              {automationView === "links" && <p className="muted">Click-to-chat links live in Settings. <button className="button compact" type="button" onClick={() => { setActiveModule("settings"); setSettingsSection("tracking"); }}><Icon name="ph-arrow-square-out" cls="icon icon-inline" />Open tracking links</button></p>}
            </section>
          </section>
        </main>
      </>
    );
  }

  return (
    <main className="stage">
      <section id="workspace" className={cx("workspace", `module-${activeModule}`)}>
        <aside className="rail">
          <div className="rail-top">
            <button className={cx("rail-btn", activeModule === "dashboard" && "active")} type="button" title="Dashboard" onClick={() => setActiveModule("dashboard")}><Icon name="ph-chart-line" /></button>
            <button className={cx("rail-btn", activeModule === "inbox" && "active")} type="button" title="Inbox" onClick={() => setActiveModule("inbox")}><Icon name="ph-chats" /></button>
            <button className={cx("rail-btn", activeModule === "contacts" && "active")} type="button" title="Contacts" onClick={() => setActiveModule("contacts")}><Icon name="ph-users-four" /></button>
            <button className={cx("rail-btn", activeModule === "settings" && "active")} type="button" title="Settings" onClick={() => setActiveModule("settings")}><Icon name="ph-gear" /></button>
          </div>
          <div className="rail-bottom">
            <Badge className="secondary">Online</Badge>
          </div>
        </aside>
        {activeModule === "inbox" && conversationPanel()}
        {activeModule === "dashboard" && dashboardPanel()}
        {activeModule === "contacts" && contactsPanel()}
        {activeModule === "settings" && settingsPanel()}
        {activeModule === "campaigns" && campaignsPanel()}
        {activeModule === "automations" && automationsPanel()}
      </section>

      {showNewConversation && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlay-panel">
            <header className="overlay-head">
              <h3>New conversation</h3>
              <Button className="button-icon ghost" type="button" onClick={() => setShowNewConversation(false)}><Icon name="ph-x" cls="icon icon-sm" /></Button>
            </header>
            <form className="settings-form" onSubmit={onCreateConversation}>
              <div className="field"><label className="label">Contact name</label><input className="input" value={newConversation.name} onChange={(e) => setNewConversation((prev) => ({ ...prev, name: e.target.value }))} /></div>
              <div className="field"><label className="label">Phone number</label><input className="input" value={newConversation.phone} onChange={(e) => setNewConversation((prev) => ({ ...prev, phone: e.target.value }))} /></div>
              <div className="field">
                <label className="label">Template</label>
                <select className={cx("select", newConversationError && "is-invalid")} value={newConversation.template} onChange={(e) => { setNewConversation((prev) => ({ ...prev, template: e.target.value })); setNewConversationError(""); }}>
                  <option value="">Select template</option>
                  {templates.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
                <p className="field-error">{newConversationError}</p>
              </div>
              <Button className="primary" type="submit"><Icon name="ph-paper-plane-right" cls="icon icon-inline" />Start conversation</Button>
            </form>
          </div>
        </div>
      )}
      {showAddContact && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlay-panel">
            <header className="overlay-head">
              <h3>Add contact</h3>
              <Button className="button-icon ghost" type="button" onClick={() => setShowAddContact(false)}><Icon name="ph-x" cls="icon icon-sm" /></Button>
            </header>
            <form className="settings-form" onSubmit={onCreateContact}>
              <div className="field"><label className="label">Name</label><input className="input" value={newContact.name} onChange={(e) => { setNewContact((p) => ({ ...p, name: e.target.value })); setNewContactError(""); }} /></div>
              <div className="field"><label className="label">Phone</label><input className="input" value={newContact.phone} onChange={(e) => { setNewContact((p) => ({ ...p, phone: e.target.value })); setNewContactError(""); }} /></div>
              <div className="field"><label className="label">Email (optional)</label><input className="input" value={newContact.email} onChange={(e) => setNewContact((p) => ({ ...p, email: e.target.value }))} /></div>
              <p className="field-error">{newContactError}</p>
              <Button className="primary" type="submit"><Icon name="ph-user-plus" cls="icon icon-inline" />Save contact</Button>
            </form>
          </div>
        </div>
      )}
      {toast ? <div id="toast" className="is-visible">{toast}</div> : null}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);




