# WE HUBS Career Ladders

This is a working transcription of the career-structure chart supplied for WE STUDY, WE TRAVEL, and WE STUDY ACADEMY. It records departments, titles, and indicated progression paths only. Promotion eligibility, tenure, performance criteria, salary bands, and approval rules were not provided and must not be inferred.

## Career levels shown in the chart

Department, Managerial, Senior, Supervisor, Staff, Trainee/Intern.

## WE STUDY

- Business Development: BDD → BDM → ABM, then parallel tracks: BSP → BDA or PSP → PAS.
- Marketing: MKD → MKM → AMM → MSP → MKA.
- Administration, Human Resources & Legal: ADD → ADM → AAM → ASP → ADA.
- Operations, Admissions: OPD → OPM → ASV → ADS → AAS.
- Operations, Visa: OPD → OPM → VSP → VSS → VAS.
- Finance, Accounting: ACM → ASC → ACC → ACA.
- Finance, Auditing: ACM → AUS → ADT → AUA.

## WE TRAVEL

- Business Development: BDD → BDM → ABM, then parallel tracks: BSP → BDA or PSP → PAS.
- Marketing: MKD → MKM → AMM → MSP → MKA.
- Administration, Human Resources & Legal: ADD → ADM → AAM → ASP → ADA.
- Operations, Tour: OPD → OPM → TOS → TOR → TOA.
- Operations, Booking: OPD → OPM → TOS → BKS → BKA.
- Operations, Visa: OPD → OPM → VSP → VSS → VAS.
- Finance, Accounting: ACM → ASC → ACC → ACA.
- Finance, Auditing: ACM → AUS → ADT → AUA.

## WE STUDY ACADEMY

- Business Development: BDD → BDM → ABM, then parallel tracks: BSP → BDA or PSP → PAS.
- Marketing: MKD → MKM → AMM → MSP → MKA.
- Administration, Human Resources & Legal: ADD → ADM → AAM → ASP → ADA.
- Department of Studies: DOS branches into Training (TRM → TCR → TCA) and Student Services (SSM → ACS → AAS).
- Finance, Accounting: ACM → ASC → ACC → ACA.
- Finance, Auditing: ACM → AUS → ADT → AUA.

## Items to confirm before import

- The code `AAS` appears to refer to both Admission Assistant and Academic Assistant. Assign unique codes before using them as database identifiers.
- The Vietnamese label paired with `BDA` differs between chart renderings; confirm the official title while keeping the code stable.
- Confirm whether the arrows represent required promotion steps or suggested career paths, and define eligibility/approval criteria separately.

## System modeling rule

A job title and career level describe an employee's HR position. They do not automatically grant application permissions. Store title/history separately from company, branch, and system-role assignments in the access-control model.
