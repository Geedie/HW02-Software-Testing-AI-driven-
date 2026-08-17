---
name: jmeter-performance-testing
description: Agent Skill for designing, executing, and analyzing JMeter load, stress, and spike performance tests on REST APIs, collecting system resource metrics, and auditing AI analysis against raw JTL logs.
---

# JMeter Performance Testing & Log Analysis Skill

This skill provides an end-to-end automated workflow for conducting performance testing (Load, Stress, Spike, Endurance) against RESTful APIs using Apache JMeter and evaluating test metrics.

## Quick Start

### 1. Prerequisites
- Java JDK 11 or higher (`java -version`).
- Apache JMeter 5.6+ installed and added to `PATH` or at `C:\tools\apache-jmeter-5.6.3\bin\jmeter.bat`.
- Target SUT (System Under Test) backend running (e.g. `http://localhost:3000`).

### 2. Test Execution Workflow

#### Step 1: Prepare CSV Data Sets
Create dedicated CSV files for each endpoint scenario under `jmeter-data/`:
- `jmeter-data/products.csv` (read operations)
- `jmeter-data/auth.csv` (login credentials)
- `jmeter-data/orders.csv` (transactions)

#### Step 2: Generate or Run Test Plans
Run tests in non-GUI (CLI) mode to conserve system resources:

```powershell
# Read-Heavy Load Test
jmeter -n -t {StudentID}_Load_{YYYYMMDD}.jmx -l results/load.jtl -e -o html-reports/load

# Auth-Heavy Stress Test
jmeter -n -t {StudentID}_Stress_{YYYYMMDD}.jmx -l results/stress.jtl -e -o html-reports/stress

# Transactional Spike Test
jmeter -n -t {StudentID}_Spike_{YYYYMMDD}.jmx -l results/spike.jtl -e -o html-reports/spike
```

#### Step 3: Resource Monitoring Evidence
Open Task Manager side-by-side with the execution terminal to monitor:
- Backend Node.js process CPU (%) & Memory (MB)
- Disk I/O & Network throughput

#### Step 4: Account Lockout Handling
If testing auth endpoints with lockout security rules (e.g. 3 failed attempts lock account):
- Reset database state between runs using `node database.js` or SQLite reset query:
  `UPDATE users SET login_attempts = 0, locked_until = NULL;`

### 3. Log Analysis & AI Audit Protocol
When evaluating `.jtl` raw logs with AI assistants:
1. **Never rely on surface averages**: Always inspect P95/P99 latency and exact HTTP response codes.
2. **Verify Error Types**: Differentiate between functional business errors (HTTP 403 Lockout) and infrastructure failures (HTTP 500, Connection Reset).
3. **Validate Recommendations**: Classify suggested optimizations as **Feasible** (e.g., SQLite WAL mode, database indexing) vs **Hallucinated** (e.g., unnecessary K8s autoscaling for single-threaded local SQLite).
