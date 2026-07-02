# TrafficMark ML

TrafficMark ML is an early prototype for TrafficMark Systems, focused on helping cities prioritize intersection marking and safety improvements.

## Prototype Scope

- Risk-ranked intersection shortlist
- Simulated imagery, incident, marking-age, and cost signals
- Budget-based improvement package selection
- School-zone emphasis mode
- Intersection detail view with evidence and recommended updates
- Static dashboard that runs without a build step

## Run Locally

Open `index.html` directly, or serve the folder locally:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:4173/
```
