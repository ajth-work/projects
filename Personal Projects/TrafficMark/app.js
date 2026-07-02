const intersections = [
  {
    id: "main-3rd",
    name: "Main St & 3rd St",
    x: 54,
    y: 43,
    issue: "Faded ladder crosswalks and missing stop-bar contrast",
    incidents: 18,
    markingAge: 5.8,
    risk: 92,
    benefit: 31,
    costLow: 22000,
    costHigh: 31000,
    value: 94,
    schoolZone: false,
    evidence: [
      ["Imagery", "Crosswalk reflectivity appears low on north and east legs."],
      ["Crash reports", "Rear-end and turning conflicts cluster during evening peak."],
      ["Operations", "Left-turn path is ambiguous through the box."]
    ],
    recommendation:
      "Refresh high-visibility crosswalks, add stop bars on all approaches, and paint left-turn guide dots through the intersection."
  },
  {
    id: "wayne-watervliet",
    name: "Wayne Ave & Watervliet Ave",
    x: 68,
    y: 62,
    issue: "Unclear lane assignment approaching offset geometry",
    incidents: 14,
    markingAge: 4.9,
    risk: 86,
    benefit: 27,
    costLow: 18000,
    costHigh: 26000,
    value: 89,
    schoolZone: true,
    evidence: [
      ["Imagery", "Lane arrows are inconsistent across the eastbound approach."],
      ["Incident pattern", "Sideswipe reports increase near the merge taper."],
      ["Context", "School-zone crossing demand elevates pedestrian exposure."]
    ],
    recommendation:
      "Repaint lane-use arrows, extend lane lines through the taper, and upgrade the south crossing to high-visibility markings."
  },
  {
    id: "brown-stewart",
    name: "Brown St & Stewart St",
    x: 42,
    y: 70,
    issue: "Student crossing volume with worn transverse markings",
    incidents: 11,
    markingAge: 6.2,
    risk: 84,
    benefit: 29,
    costLow: 14000,
    costHigh: 22000,
    value: 91,
    schoolZone: true,
    evidence: [
      ["Imagery", "South crosswalk markings are discontinuous."],
      ["Reports", "Pedestrian-involved complaints appear in two recent quarters."],
      ["Maintenance", "Last pavement marking work estimated at over six years ago."]
    ],
    recommendation:
      "Install ladder crosswalks, add advance yield markings, and refresh curbside no-parking daylighting zones."
  },
  {
    id: "salem-riverside",
    name: "Salem Ave & Riverside Dr",
    x: 27,
    y: 31,
    issue: "Turn channelization lacks visual guidance",
    incidents: 9,
    markingAge: 3.7,
    risk: 76,
    benefit: 22,
    costLow: 26000,
    costHigh: 41000,
    value: 67,
    schoolZone: false,
    evidence: [
      ["Imagery", "Wide receiving lanes create multiple informal paths."],
      ["Crash reports", "Angle collisions concentrate on the northbound left turn."],
      ["Geometry", "Large curb radius supports higher turn speeds."]
    ],
    recommendation:
      "Add turn guide markings, refresh lane extensions, and evaluate painted curb extensions for the south crossing."
  },
  {
    id: "keowee-valley",
    name: "Keowee St & Valley St",
    x: 73,
    y: 24,
    issue: "Old stop bars and low night visibility",
    incidents: 7,
    markingAge: 7.1,
    risk: 72,
    benefit: 18,
    costLow: 11000,
    costHigh: 17000,
    value: 83,
    schoolZone: false,
    evidence: [
      ["Imagery", "Stop bars are faded on two minor approaches."],
      ["Asset age", "Markings are likely beyond normal replacement cycle."],
      ["Cost model", "Small scope makes this a low-cost maintenance win."]
    ],
    recommendation:
      "Refresh stop bars, edge lines, and approach lane lines with retroreflective thermoplastic."
  },
  {
    id: "smithville-linden",
    name: "Smithville Rd & Linden Ave",
    x: 21,
    y: 76,
    issue: "Bike-lane conflict markings missing at right-turn lane",
    incidents: 6,
    markingAge: 4.2,
    risk: 69,
    benefit: 21,
    costLow: 16000,
    costHigh: 24000,
    value: 78,
    schoolZone: false,
    evidence: [
      ["Imagery", "Bike lane drops before a right-turn conflict area."],
      ["Reports", "Cyclist near-miss complaints reference the east approach."],
      ["Standards", "Green conflict markings would clarify yielding behavior."]
    ],
    recommendation:
      "Add green bike conflict markings, dashed lane continuity lines, and right-turn yield signage."
  }
];

const state = {
  selectedId: intersections[0].id,
  budget: 85000,
  priority: "impact",
  schoolZone: false
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const els = {
  budgetInput: document.querySelector("#budgetInput"),
  budgetOutput: document.querySelector("#budgetOutput"),
  prioritySelect: document.querySelector("#prioritySelect"),
  schoolZoneToggle: document.querySelector("#schoolZoneToggle"),
  table: document.querySelector("#intersectionTable"),
  canvas: document.querySelector("#cityMap"),
  detailTitle: document.querySelector("#detailTitle"),
  detailRank: document.querySelector("#detailRank"),
  riskScore: document.querySelector("#riskScore"),
  costRange: document.querySelector("#costRange"),
  benefitScore: document.querySelector("#benefitScore"),
  evidenceList: document.querySelector("#evidenceList"),
  recommendationText: document.querySelector("#recommendationText"),
  highPriorityCount: document.querySelector("#highPriorityCount"),
  projectedCost: document.querySelector("#projectedCost"),
  safetyImpact: document.querySelector("#safetyImpact"),
  avgAge: document.querySelector("#avgAge"),
  shortlistCount: document.querySelector("#shortlistCount"),
  toast: document.querySelector("#toast"),
  exportBtn: document.querySelector("#exportBtn"),
  refreshBtn: document.querySelector("#refreshBtn")
};

function getSortedIntersections() {
  const data = state.schoolZone
    ? intersections.map((item) => ({
        ...item,
        adjustedRisk: item.risk + (item.schoolZone ? 8 : 0),
        adjustedValue: item.value + (item.schoolZone ? 7 : 0)
      }))
    : intersections.map((item) => ({ ...item, adjustedRisk: item.risk, adjustedValue: item.value }));

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
  return Math.round((item.costLow + item.costHigh) / 2);
}

function renderMetrics(shortlist) {
  const cost = shortlist.reduce((sum, item) => sum + getMidpointCost(item), 0);
  const impact = shortlist.reduce((sum, item) => sum + item.benefit, 0);
  const avgAge =
    intersections.reduce((sum, item) => sum + item.markingAge, 0) / Math.max(intersections.length, 1);

  els.highPriorityCount.textContent = intersections.filter((item) => item.risk >= 80).length;
  els.projectedCost.textContent = formatter.format(cost);
  els.safetyImpact.textContent = `${Math.min(impact, 100)}%`;
  els.avgAge.textContent = `${avgAge.toFixed(1)} yr`;
  els.shortlistCount.textContent = `${shortlist.length} selected`;
}

function renderTable(sorted, shortlist) {
  const shortlistIds = new Set(shortlist.map((item) => item.id));
  els.table.innerHTML = "";

  sorted.forEach((item) => {
    const row = document.createElement("tr");
    row.className = item.id === state.selectedId ? "selected" : "";
    row.dataset.id = item.id;
    row.innerHTML = `
      <td><strong>${item.name}</strong>${shortlistIds.has(item.id) ? " · funded" : ""}</td>
      <td>${item.issue}</td>
      <td>${item.incidents}</td>
      <td>${item.markingAge.toFixed(1)} yr</td>
      <td>${formatter.format(item.costLow)}-${formatter.format(item.costHigh)}</td>
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
  const rank = sorted.findIndex((item) => item.id === selected.id) + 1;

  els.detailTitle.textContent = selected.name;
  els.detailRank.textContent = `#${rank}`;
  els.riskScore.textContent = selected.adjustedRisk;
  els.costRange.textContent = `${formatter.format(selected.costLow)}-${formatter.format(selected.costHigh)}`;
  els.benefitScore.textContent = `${selected.benefit}%`;
  els.recommendationText.textContent = selected.recommendation;

  els.evidenceList.innerHTML = "";
  selected.evidence.forEach(([label, text]) => {
    const item = document.createElement("div");
    item.className = "evidence-item";
    item.innerHTML = `<strong>${label}</strong><span>${text}</span>`;
    els.evidenceList.appendChild(item);
  });
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

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function render() {
  els.budgetOutput.textContent = formatter.format(state.budget);
  const sorted = getSortedIntersections();
  const shortlist = getShortlist(sorted);
  renderMetrics(shortlist);
  renderTable(sorted, shortlist);
  renderDetails(sorted);
  drawMap(sorted, shortlist);
}

els.budgetInput.addEventListener("input", (event) => {
  state.budget = Number(event.target.value);
  render();
});

els.prioritySelect.addEventListener("change", (event) => {
  state.priority = event.target.value;
  render();
});

els.schoolZoneToggle.addEventListener("change", (event) => {
  state.schoolZone = event.target.checked;
  render();
});

els.exportBtn.addEventListener("click", () => {
  const names = getShortlist(getSortedIntersections()).map((item) => item.name).join(", ");
  showToast(`Shortlist prepared: ${names}`);
});

els.refreshBtn.addEventListener("click", () => {
  showToast("Analysis refreshed with current prototype data.");
});

window.addEventListener("resize", render);

render();
