# WE HUBS Organization Master

This document records the organization hierarchy supplied for the production-planning work. The hierarchy is confirmed as three parent companies with nine branches. No employee or customer records are included.

## WE STUDY

Parent company name derived from the supplied branch names; verify against the official company registration before production use.

- Vietnamese: CÔNG TY TRÁCH NHIỆM HỮU HẠN TƯ VẤN GIÁO DỤC WE STUDY
- English: We Study Education Consulting Company Limited

| Short name / supplied code | Vietnamese branch name | English branch name |
|---|---|---|
| WE STUDY HCM | CÔNG TY TRÁCH NHIỆM HỮU HẠN TƯ VẤN GIÁO DỤC WE STUDY – CHI NHÁNH THÀNH PHỐ HỒ CHÍ MINH | We Study Education Consulting Company Limited – Ho Chi Minh City Branch |
| WE STUDY HATINH | CÔNG TY TRÁCH NHIỆM HỮU HẠN TƯ VẤN GIÁO DỤC WE STUDY – CHI NHÁNH HÀ TĨNH | We Study Education Consulting Company Limited – Ha Tinh Branch |
| WE STUDY DANANG | CÔNG TY TRÁCH NHIỆM HỮU HẠN TƯ VẤN GIÁO DỤC WE STUDY – CHI NHÁNH ĐÀ NẴNG | We Study Education Consulting Company Limited – Da Nang Branch |
| WE STUDY CANTHO | CÔNG TY TRÁCH NHIỆM HỮU HẠN TƯ VẤN GIÁO DỤC WE STUDY – CHI NHÁNH CẦN THƠ | We Study Education Consulting Company Limited – Can Tho Branch |

## WE TRAVEL

Parent company name derived from the supplied branch names; verify against the official company registration before production use.

- Vietnamese: CÔNG TY TRÁCH NHIỆM HỮU HẠN DỊCH VỤ LỮ HÀNH WE TRAVEL
- English: We Travel Tourism Services Company Limited

| Short name / supplied code | Vietnamese branch name | English branch name |
|---|---|---|
| WE TRAVEL HCM | CÔNG TY TRÁCH NHIỆM HỮU HẠN DỊCH VỤ LỮ HÀNH WE TRAVEL – CHI NHÁNH THÀNH PHỐ HỒ CHÍ MINH | We Travel Tourism Services Company Limited – Ho Chi Minh City Branch |
| WE TRAVEL HATINH | CÔNG TY TRÁCH NHIỆM HỮU HẠN DỊCH VỤ LỮ HÀNH WE TRAVEL – CHI NHÁNH HÀ TĨNH | We Travel Tourism Services Company Limited – Ha Tinh Branch |
| WE TRAVEL DANANG | CÔNG TY TRÁCH NHIỆM HỮU HẠN DỊCH VỤ LỮ HÀNH WE TRAVEL – CHI NHÁNH ĐÀ NẴNG | We Travel Tourism Services Company Limited – Da Nang Branch |

## WE STUDY ACADEMY

Parent company name derived from the supplied branch names; verify against the official company registration before production use.

- Vietnamese: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐÀO TẠO WE STUDY ACADEMY
- English: We Study Academy Training Company Limited

| Short name / supplied code | Vietnamese branch name | English branch name |
|---|---|---|
| WE STUDY ACADEMY HATINH | CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐÀO TẠO WE STUDY ACADEMY – CHI NHÁNH HÀ TĨNH | We Study Academy Training Company Limited – Ha Tinh Branch |
| WE STUDY ACADEMY DANANG | CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐÀO TẠO WE STUDY ACADEMY – CHI NHÁNH ĐÀ NẴNG | We Study Academy Training Company Limited – Da Nang Branch |

## Data-modeling notes

- Store the three parent companies separately from their nine branches.
- Preserve the supplied short names as business-facing codes/labels. Technical database IDs can be generated separately.
- Employee identity belongs in one employee record. Company, branch, and role access should be represented as separate assignments so an employee can work across companies.
- The branch hierarchy is confirmed; branch-level accounting, invoice numbering, and approval rules still need to be confirmed before production use.
- Parent company names above are derived by removing the branch suffix from the supplied names and must be checked against official registration records before go-live.
