const cityProfiles = {
  dayton: {
    name: "Dayton, OH",
    meta: "142 signalized intersections",
    multiplier: 1,
    note: "Core urban grid with mixed pedestrian and commuter traffic."
  },
  columbus: {
    name: "Columbus pilot district",
    meta: "214 reviewed intersections",
    multiplier: 1.14,
    note: "Higher-volume arterial district with larger marking packages."
  },
  toledo: {
    name: "Toledo riverfront zone",
    meta: "97 reviewed intersections",
    multiplier: 0.93,
    note: "Smaller district with visibility and crossing emphasis."
  }
};

const intersections = [
  {
    id: "main-3rd",
    name: "Main St & 3rd St",
    x: 54,
    y: 43,
    issueType: "crosswalk",
    issue: "Faded ladder crosswalks and missing stop-bar contrast",
    incidents: 18,
    markingAge: 5.8,
    risk: 92,
    benefit: 31,
    costLow: 22000,
    costHigh: 31000,
    value: 94,
    schoolZone: false,
    timeline: "2 night closures",
    vendorFit: "Thermoplastic striping crew",
    evidence: [
      ["Imagery", "Crosswalk reflectivity appears low on north and east legs."],
      ["Crash reports", "Rear-end and turning conflicts cluster during evening peak."],
      ["Operations", "Left-turn path is ambiguous through the box."]
    ],
    implementation: [
      "Refresh high-visibility crosswalks on all four approaches.",
      "Add stop bars and left-turn guide dots.",
      "Bundle with downtown night work to reduce traffic control cost."
    ],
    recommendation:
      "Refresh high-visibility crosswalks, add stop bars on all approaches, and paint left-turn guide dots through the intersection."
  },
  {
    id: "wayne-watervliet",
    name: "Wayne Ave & Watervliet Ave",
    x: 68,
    y: 62,
    issueType: "lane",
    issue: "Unclear lane assignment approaching offset geometry",
    incidents: 14,
    markingAge: 4.9,
    risk: 86,
    benefit: 27,
    costLow: 18000,
    costHigh: 26000,
    value: 89,
    schoolZone: true,
    timeline: "1 night closure",
    vendorFit: "Marking crew plus sign shop",
    evidence: [
      ["Imagery", "Lane arrows are inconsistent across the eastbound approach."],
      ["Incident pattern", "Sideswipe reports increase near the merge taper."],
      ["Context", "School-zone crossing demand elevates pedestrian exposure."]
    ],
    implementation: [
      "Repaint lane-use arrows and extend lane lines through the taper.",
      "Upgrade the south crossing to ladder markings.",
      "Schedule before school-year traffic returns."
    ],
    recommendation:
      "Repaint lane-use arrows, extend lane lines through the taper, and upgrade the south crossing to high-visibility markings."
  },
  {
    id: "brown-stewart",
    name: "Brown St & Stewart St",
    x: 42,
    y: 70,
    issueType: "crosswalk",
    issue: "Student crossing volume with worn transverse markings",
    incidents: 11,
    markingAge: 6.2,
    risk: 84,
    benefit: 29,
    costLow: 14000,
    costHigh: 22000,
    value: 91,
    schoolZone: true,
    timeline: "1 day work order",
    vendorFit: "Small marking crew",
    evidence: [
      ["Imagery", "South crosswalk markings are discontinuous."],
      ["Reports", "Pedestrian-involved complaints appear in two recent quarters."],
      ["Maintenance", "Last pavement marking work estimated at over six years ago."]
    ],
    implementation: [
      "Install ladder crosswalks on the two highest-demand crossings.",
      "Add advance yield markings where sight distance is constrained.",
      "Refresh curbside no-parking daylighting zones."
    ],
    recommendation:
      "Install ladder crosswalks, add advance yield markings, and refresh curbside no-parking daylighting zones."
  },
  {
    id: "salem-riverside",
    name: "Salem Ave & Riverside Dr",
    x: 27,
    y: 31,
    issueType: "lane",
    issue: "Turn channelization lacks visual guidance",
    incidents: 9,
    markingAge: 3.7,
    risk: 76,
    benefit: 22,
    costLow: 26000,
    costHigh: 41000,
    value: 67,
    schoolZone: false,
    timeline: "2 night closures",
    vendorFit: "Striping crew plus traffic control",
    evidence: [
      ["Imagery", "Wide receiving lanes create multiple informal paths."],
      ["Crash reports", "Angle collisions concentrate on the northbound left turn."],
      ["Geometry", "Large curb radius supports higher turn speeds."]
    ],
    implementation: [
      "Add turn guide markings through the wide intersection box.",
      "Refresh lane extensions on receiving approaches.",
      "Evaluate painted curb extensions as a phase-two treatment."
    ],
    recommendation:
      "Add turn guide markings, refresh lane extensions, and evaluate painted curb extensions for the south crossing."
  },
  {
    id: "keowee-valley",
    name: "Keowee St & Valley St",
    x: 73,
    y: 24,
    issueType: "visibility",
    issue: "Old stop bars and low night visibility",
    incidents: 7,
    markingAge: 7.1,
    risk: 72,
    benefit: 18,
    costLow: 11000,
    costHigh: 17000,
    value: 83,
    schoolZone: false,
    timeline: "Half-day work order",
    vendorFit: "Maintenance striping crew",
    evidence: [
      ["Imagery", "Stop bars are faded on two minor approaches."],
      ["Asset age", "Markings are likely beyond normal replacement cycle."],
      ["Cost model", "Small scope makes this a low-cost maintenance win."]
    ],
    implementation: [
      "Refresh stop bars and approach lane lines.",
      "Use retroreflective thermoplastic for night visibility.",
      "Pair with annual pavement marking maintenance list."
    ],
    recommendation:
      "Refresh stop bars, edge lines, and approach lane lines with retroreflective thermoplastic."
  },
  {
    id: "smithville-linden",
    name: "Smithville Rd & Linden Ave",
    x: 21,
    y: 76,
    issueType: "bike",
    issue: "Bike-lane conflict markings missing at right-turn lane",
    incidents: 6,
    markingAge: 4.2,
    risk: 69,
    benefit: 21,
    costLow: 16000,
    costHigh: 24000,
    value: 78,
    schoolZone: false,
    timeline: "1 day work order",
    vendorFit: "Specialty color pavement vendor",
    evidence: [
      ["Imagery", "Bike lane drops before a right-turn conflict area."],
      ["Reports", "Cyclist near-miss complaints reference the east approach."],
      ["Standards", "Green conflict markings would clarify yielding behavior."]
    ],
    implementation: [
      "Add green bike conflict markings through the turn lane.",
      "Add dashed lane continuity lines.",
      "Install right-turn yield sign as a companion treatment."
    ],
    recommendation:
      "Add green bike conflict markings, dashed lane continuity lines, and right-turn yield signage."
  }
];

const state = {
  selectedId: intersections[0].id,
  budget: 85000,
  city: "dayton",
  priority: "impact",
  issue: "all",
  schoolZone: false
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const els = {
  activeCityName: document.querySelector("#activeCityName"),
  activeCityMeta: document.querySelector("#activeCityMeta"),
  citySelect: document.querySelector("#citySelect"),
  budgetInput: document.querySelector("#budgetInput"),
  budgetOutput: document.querySelector("#budgetOutput"),
  prioritySelect: document.querySelector("#prioritySelect"),
  issueSelect: document.querySelector("#issueSelect"),
  schoolZoneToggle: document.querySelector("#schoolZoneToggle"),
  table: document.querySelector("#intersectionTable"),
  canvas: document.querySelector("#cityMap"),
  detailTitle: document.querySelector("#detailTitle"),
  detailRank: document.querySelector("#detailRank"),
  riskScore: document.querySelector("#riskScore"),
  costRange: document.querySelector("#costRange"),
  benefitScore: document.querySelector("#benefitScore"),
  detailTags: document.querySelector("#detailTags"),
  evidenceList: document.querySelector("#evidenceList"),
  recommendationText: document.querySelector("#recommendationText"),
  implementationList: document.querySelector("#implementationList"),
  highPriorityCount: document.querySelector("#highPriorityCount"),
  projectedCost: document.querySelector("#projectedCost"),
  safetyImpact: document.querySelector("#safetyImpact"),
  avgAge: document.querySelector("#avgAge"),
  paybackTier: document.querySelector("#paybackTier"),
  shortlistCount: document.querySelector("#shortlistCount"),
  reportSubtitle: document.querySelector("#reportSubtitle"),
  reportPackage: document.querySelector("#reportPackage"),
  reportPackageText: document.querySelector("#reportPackageText"),
  reportScope: document.querySelector("#reportScope"),
  reportScopeText: document.querySelector("#reportScopeText"),
  reportProcurement: document.querySelector("#reportProcurement"),
  reportProcurementText: document.querySelector("#reportProcurementText"),
  toast: document.querySelector("#toast"),
  exportBtn: document.querySelector("#exportBtn"),
  refreshBtn: document.querySelector("#refreshBtn"),
  copyReportBtn: document.querySelector("#copyReportBtn"),
  scenarioCards: [...document.querySelectorAll(".scenario-card")]
};

function getCityProfile() {
  return cityProfiles[state.city];
}

function getFilteredIntersections() {
  return intersections.filter((item) => state.issue === "all" || item.issueType === state.issue);
}

function getSortedIntersections() {
  const profile = getCityProfile();
  const data = getFilteredIntersections().map((item) => {
    const schoolBoost = state.schoolZone && item.schoolZone ? 8 : 0;
    return {
      ...item,
      adjustedRisk: item.risk + schoolBoost,
      adjustedValue: item.value + (state.schoolZone && item.schoolZone ? 7 : 0),
      cityCostLow: Math.round(item.costLow * profile.multiplier),
      cityCostHigh: Math.round(item.costHigh * profile.multiplier)
    };
  });

  const sorters = {
    impact: (a, b) => b.adjustedRisk - a.adjustedRisk,
    value: (a, b) => b.adjustedValue - a.adjustedValue,
    age: (a, b) => b.markingAge - a.markingAge,
    incidents: (a, b) => b.incidents - a.incidents
  };

  return data.sort(sorters[state.priority]);
}

function getShortlist(sorted) {
  const selected = [];
  let runningCost = 0;

  for (const item of sorted) {
    const midpoint = getMidpointCost(item);
    if (runningCost + midpoint <= state.budget) {
      selected.push(item);
      runningCost += midpoint;
    }
  }

  return selected;
}

function getMidpointCost(item) {
  const low = item.cityCostLow ?? item.costLow;
  const high = item.cityCostHigh ?? item.costHigh;
  return Math.round((low + high) / 2);
}

function renderMetrics(shortlist) {
  const cost = shortlist.reduce((sum, item) => sum + getMidpointCost(item), 0);
  const impact = shortlist.reduce((sum, item) => sum + item.benefit, 0);
  const filtered = getFilteredIntersections();
  const avgAge = filtered.reduce((sum, item) => sum + item.markingAge, 0) / Math.max(filtered.length, 1);
  const highPriority = filtered.filter((item) => item.risk >= 80).length;

  els.highPriorityCount.textContent = highPriority;
  els.projectedCost.textContent = formatter.format(cost);
  els.safetyImpact.textContent = `${Math.min(impact, 100)}%`;
  els.avgAge.textContent = `${avgAge.toFixed(1)} yr`;
  els.paybackTier.textContent = getPaybackTier(cost, impact);
  els.shortlistCount.textContent = `${shortlist.length} selected`;
}

function getPaybackTier(cost, impact) {
  if (!cost || !impact) return "-";
  const ratio = impact / (cost / 10000);
  if (ratio >= 9) return "High";
  if (ratio >= 6) return "Medium";
  return "Long";
}

function renderTable(sorted, shortlist) {
  const shortlistIds = new Set(shortlist.map((item) => item.id));
  els.table.innerHTML = "";

  if (sorted.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6"><strong>No intersections match this filter.</strong></td>`;
    els.table.appendChild(row);
    return;
  }

  sorted.forEach((item) => {
    const row = document.createElement("tr");
    row.className = item.id === state.selectedId ? "selected" : "";
    row.dataset.id = item.id;
    row.innerHTML = `
      <td><strong>${item.name}</strong>${shortlistIds.has(item.id) ? " - funded" : ""}</td>
      <td>${item.issue}</td>
      <td>${item.incidents}</td>
      <td>${item.markingAge.toFixed(1)} yr</td>
      <td>${formatter.format(item.cityCostLow)}-${formatter.format(item.cityCostHigh)}</td>
      <td><span class="value-chip">${item.adjustedValue}</span></td>
    `;
    row.addEventListener("click", () => {
      state.selectedId = item.id;
      render();
    });
    els.table.appendChild(row);
  });
}

function renderDetails(sorted) {
  const selected = sorted.find((item) => item.id === state.selectedId) ?? sorted[0];

  if (!selected) {
    els.detailTitle.textContent = "No intersection selected";
    els.detailRank.textContent = "-";
    els.riskScore.textContent = "0";
    els.costRange.textContent = "$0";
    els.benefitScore.textContent = "0%";
    els.detailTags.innerHTML = "";
    els.evidenceList.innerHTML = "";
    els.implementationList.innerHTML = "";
    els.recommendationText.textContent = "Adjust filters to view candidate intersections.";
    return;
  }

  state.selectedId = selected.id;
  const rank = sorted.findIndex((item) => item.id === selected.id) + 1;

  els.detailTitle.textContent = selected.name;
  els.detailRank.textContent = `#${rank}`;
  els.riskScore.textContent = selected.adjustedRisk;
  els.costRange.textContent = `${formatter.format(selected.cityCostLow)}-${formatter.format(selected.cityCostHigh)}`;
  els.benefitScore.textContent = `${selected.benefit}%`;
  els.recommendationText.textContent = selected.recommendation;

  els.detailTags.innerHTML = "";
  [
    labelForIssue(selected.issueType),
    selected.schoolZone ? "School zone" : "General network",
    selected.timeline,
    selected.vendorFit
  ].forEach((tag) => {
    const el = document.createElement("span");
    el.className = "detail-tag";
    el.textContent = tag;
    els.detailTags.appendChild(el);
  });

  els.evidenceList.innerHTML = "";
  selected.evidence.forEach(([label, text]) => {
    const item = document.createElement("div");
    item.className = "evidence-item";
    item.innerHTML = `<strong>${label}</strong><span>${text}</span>`;
    els.evidenceList.appendChild(item);
  });

  els.implementationList.innerHTML = "";
  selected.implementation.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    els.implementationList.appendChild(li);
  });
}

function labelForIssue(issueType) {
  const labels = {
    crosswalk: "Crosswalk package",
    lane: "Lane guidance",
    bike: "Bike conflict",
    visibility: "Visibility refresh"
  };
  return labels[issueType] ?? "General marking";
}

function renderReport(shortlist) {
  const profile = getCityProfile();
  const cost = shortlist.reduce((sum, item) => sum + getMidpointCost(item), 0);
  const impact = shortlist.reduce((sum, item) => sum + item.benefit, 0);
  const issueMix = [...new Set(shortlist.map((item) => labelForIssue(item.issueType)))].join(", ") || "No scope selected";

  els.reportSubtitle.textContent = `${profile.name} - ${profile.note}`;
  els.reportPackage.textContent = formatter.format(cost);
  els.reportPackageText.textContent = shortlist.length
    ? `${shortlist.length} sites fit inside the active ${formatter.format(state.budget)} budget.`
    : "No intersections fit inside the current filter and budget.";
  els.reportScope.textContent = `${shortlist.length} sites`;
  els.reportScopeText.textContent = `${issueMix}. Estimated cumulative safety impact: ${Math.min(impact, 100)}%.`;
  els.reportProcurement.textContent = cost > 100000 ? "Formal bid" : cost > 45000 ? "Small bid" : "Work order";
  els.reportProcurementText.textContent =
    cost > 100000
      ? "Package is large enough to bid as a bundled marking contract."
      : "Scope can likely move through maintenance crews or an existing on-call vendor.";
}

function drawMap(sorted, shortlist) {
  const canvas = els.canvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const shortlistIds = new Set(shortlist.map((item) => item.id));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#dfe9e3";
  ctx.fillRect(0, 0, width, height);

  drawDistricts(ctx, width, height);
  drawRoad(ctx, 120, 0, 180, height, 46);
  drawRoad(ctx, 0, 190, width, 230, 40);
  drawRoad(ctx, 0, 430, width, 390, 34);
  drawRoad(ctx, 410, 0, 462, height, 54);
  drawRoad(ctx, 685, 0, 630, height, 38);
  drawRoad(ctx, 0, 560, width, 570, 36);
  drawRoad(ctx, 0, 105, width, 85, 30);

  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 3;
  ctx.setLineDash([18, 18]);
  [160, 210, 408, 446, 640].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 24, height);
    ctx.stroke();
  });
  [104, 210, 410, 564].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y - 16);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  sorted.forEach((item) => {
    const x = (item.x / 100) * width;
    const y = (item.y / 100) * height;
    const radius = item.id === state.selectedId ? 16 : 11;

    ctx.beginPath();
    ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = shortlistIds.has(item.id) ? "rgba(31, 138, 112, 0.22)" : "rgba(189, 62, 50, 0.16)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = getRiskColor(item.adjustedRisk);
    ctx.fill();
    ctx.lineWidth = item.id === state.selectedId ? 4 : 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  });
}

function drawDistricts(ctx, width, height) {
  ctx.fillStyle = "#c9d9cf";
  ctx.fillRect(0, 0, width, 120);
  ctx.fillStyle = "#e7dfca";
  ctx.fillRect(35, 250, 250, 190);
  ctx.fillStyle = "#c7d9de";
  ctx.fillRect(650, 385, 210, 185);
  ctx.fillStyle = "#d7e4cf";
  ctx.fillRect(345, 60, 210, 180);
}

function drawRoad(ctx, x1, y1, x2, y2, width) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = width;
  ctx.strokeStyle = "#46515c";
  ctx.lineCap = "round";
  ctx.stroke();
}

function getRiskColor(risk) {
  if (risk >= 88) return "#bd3e32";
  if (risk >= 76) return "#c77700";
  return "#2867b2";
}

function getReportText() {
  const sorted = getSortedIntersections();
  const shortlist = getShortlist(sorted);
  const profile = getCityProfile();
  const lines = shortlist.map((item, index) => {
    return `${index + 1}. ${item.name}: ${item.recommendation} Estimated cost ${formatter.format(getMidpointCost(item))}.`;
  });

  return [
    `TrafficMark ML report summary for ${profile.name}`,
    `Budget: ${formatter.format(state.budget)}`,
    `Priority view: ${els.prioritySelect.options[els.prioritySelect.selectedIndex].textContent}`,
    `Selected intersections: ${shortlist.length}`,
    ...lines
  ].join("\n");
}

async function copyReportSummary() {
  const text = getReportText();
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    showToast("Report summary copied to clipboard.");
  } else {
    showToast("Report summary ready in export view.");
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function renderScenarioState() {
  els.scenarioCards.forEach((card) => {
    const matchesBudget = Number(card.dataset.budget) === state.budget;
    const matchesPriority = card.dataset.priority === state.priority;
    card.classList.toggle("active", matchesBudget && matchesPriority);
  });
}

function renderCityProfile() {
  const profile = getCityProfile();
  els.activeCityName.textContent = profile.name;
  els.activeCityMeta.textContent = profile.meta;
}

function render() {
  els.budgetOutput.textContent = formatter.format(state.budget);
  renderCityProfile();
  renderScenarioState();
  const sorted = getSortedIntersections();
  const shortlist = getShortlist(sorted);
  renderMetrics(shortlist);
  renderTable(sorted, shortlist);
  renderDetails(sorted);
  renderReport(shortlist);
  drawMap(sorted, shortlist);
}

els.citySelect.addEventListener("change", (event) => {
  state.city = event.target.value;
  render();
});

els.budgetInput.addEventListener("input", (event) => {
  state.budget = Number(event.target.value);
  render();
});

els.prioritySelect.addEventListener("change", (event) => {
  state.priority = event.target.value;
  render();
});

els.issueSelect.addEventListener("change", (event) => {
  state.issue = event.target.value;
  render();
});

els.schoolZoneToggle.addEventListener("change", (event) => {
  state.schoolZone = event.target.checked;
  render();
});

els.scenarioCards.forEach((card) => {
  card.addEventListener("click", () => {
    state.budget = Number(card.dataset.budget);
    state.priority = card.dataset.priority;
    els.budgetInput.value = String(state.budget);
    els.prioritySelect.value = state.priority;
    render();
  });
});

els.exportBtn.addEventListener("click", () => {
  const names = getShortlist(getSortedIntersections()).map((item) => item.name).join(", ");
  showToast(names ? `Shortlist prepared: ${names}` : "No shortlist items match the active filters.");
});

els.copyReportBtn.addEventListener("click", () => {
  copyReportSummary().catch(() => showToast("Clipboard access was blocked by the browser."));
});

els.refreshBtn.addEventListener("click", () => {
  showToast("Analysis refreshed with current prototype data.");
});

window.addEventListener("resize", render);

render();
