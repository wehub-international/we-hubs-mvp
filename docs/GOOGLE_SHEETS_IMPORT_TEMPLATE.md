# Google Sheets Import Template (Draft)

This is a structure-only template. Do not put production student, passport, payment, or employee data into the demo or this repository. Import real records only after authentication, server-side authorization, secure storage, backups, and access logging are implemented and tested.

Use one Google Sheets tab per table below. Keep all codes stable and unique. Do not merge cells.

## 1. Companies

| Column | Required | Notes |
|---|---|---|
| MaCongTy | Yes | Stable company code, e.g. `WE-STUDY`; technical codes can be agreed before import. |
| TenNgan | Yes | Business-facing short name. |
| TenTiengViet | Yes | Verify the parent legal name against official registration. |
| TenTiengAnh | Optional | Verify against official registration. |

## 2. Branches

| Column | Required | Notes |
|---|---|---|
| MaChiNhanh | Yes | Use the supplied short name/code, e.g. `WE STUDY HCM`. |
| MaCongTy | Yes | Must match a code in Companies. |
| TenTiengViet | Yes | Full branch name supplied by the organization. |
| TenTiengAnh | Optional | Full English branch name. |

The confirmed hierarchy is three parent companies and nine branches; see [ORGANIZATION_MASTER.md](ORGANIZATION_MASTER.md). Parent-company names derived from branch names must be verified before production import.

## 3. HocVien

| Column | Required | Notes |
|---|---|---|
| MaHocVien | Yes | Stable student code; store as text. |
| HoTen | Yes | Full name. |
| NgaySinh | Optional | Use `YYYY-MM-DD`. |
| SoDienThoai | Optional | Store as text to preserve a leading zero and `+` prefix. |

Keep class and contract rows out of this tab so a student can have multiple enrollments and contracts without duplicating their identity record.

## 4. HopDong

| Column | Required | Notes |
|---|---|---|
| MaHopDong | Yes | Stable contract code. |
| MaHocVien | Yes | Must match a student code in HocVien. |
| MaChiNhanh | Yes | Branch responsible for the contract. |
| LoaiHopDong | Yes | Use an agreed, validated list of values. |
| NgayKy | Optional | Use `YYYY-MM-DD`. |
| NgayHetHan | Optional | Use `YYYY-MM-DD`. |
| TrangThai | Yes | Use an agreed status list; do not infer from dates without review. |

One row represents one contract. A student may have multiple rows over time.

## 5. ChuongTrinh

| Column | Required | Notes |
|---|---|---|
| MaChuongTrinh | Yes | Stable code: `SEEDS`, `GEN`, `COMMUNICATION`, `BUSINESS_ENGLISH`, or `IELTS_PRACTICE`. |
| TenChuongTrinh | Yes | Program name. |
| NhomChuongTrinh | Yes | Foundation, general English, or specialization. |
| TrangThai | Yes | For example, `ACTIVE` or `INACTIVE`. |

Durations belong to individual levels, not the parent program. The earlier draft's 10-month GEN duration is superseded by the level durations below.

## 5a. CapDoChuongTrinh

| Column | Required | Notes |
|---|---|---|
| MaCapDo | Yes | Stable level code, such as `GEN-BEGINNER` or `IELTS-L1`. |
| MaChuongTrinh | Yes | Parent program code. |
| TenCapDo | Yes | Level name. |
| ThuTuCapDo | Yes | Order within the program. |
| ThoiLuongTuan | Optional | Published duration in weeks; leave blank if not specified. |
| SoBuoi | Optional | Published lesson count, when available. |
| BandDauRa | Optional | For example, an IELTS band range. |

| Program | Level | Weeks | Sessions / notes |
|---|---|---:|---|
| SEEDS | SEEDS | 24 | 72 sessions |
| GEN | Beginner | 41 | |
| GEN | Intermediate | 50 | |
| GEN | Advanced | 37 | Required before specialization, according to the program information. |
| Communication | A1/Foundation | Not specified | Foundation/exit level; not included in the three-level, 60-week total. |
| Communication | A2 | 20 | |
| Communication | B1 | 20 | |
| Communication | B2 | 20 | Three levels total 60 weeks. |
| Business English | Elementary | 14 | |
| Business English | Pre-Intermediate | 13 | |
| Business English | Intermediate | 15 | |
| Business English | Upper-Intermediate | 14 | |
| Business English | Advanced | 14 | Five levels total 70 weeks. |
| IELTS Practice | Foundation (Band 3.0) | 20 | |
| IELTS Practice | Level 1 | 20 | Band 4.0-5.0/5.5 |
| IELTS Practice | Level 2 | 16 | Band 5.5-6.5 |
| IELTS Practice | Level 3 | 16 | Band 6.5+; four levels total 72 weeks. |

## 5b. BangGiaCapDo

| Column | Required | Notes |
|---|---|---|
| MaBangGia | Yes | Stable price-version code. |
| MaCapDo | Yes | Level whose price is being set. |
| HinhThucHoc | Yes | Use `BOTH` for the supplied schedule; online and offline have the same listed price. |
| NhomSiSo | Yes | `6-8` students for SEEDS/GEN; `6-10` for IELTS and other specialized programs. No price is defined outside these ranges. |
| SoBuoi | Optional | Number of sessions in the full level. |
| DonGiaMoiBuoiVND | Optional | Source schedule rate per session; SEEDS rate was not provided. |
| HocPhiTronCapDoVND | Yes | Full-level tuition before late-entry proration. |
| NgayHieuLucTu | Yes before billing | The original start date of the current version is unknown (`TBD`); later annual versions start each January 1. |
| NgayHieuLucDen | Optional | Current version ends `2027-12-31`; annual versions end December 31 before the next increase. |

The following rate versions are nationwide and apply to online and offline classes at the stated class-size ranges. `WESA-20260212` identifies the schedule updated on `2026-02-12`; this is not its start date. That current schedule remains applicable through `2027-12-31`. Each later version increases all listed fees by 10% over the previous year, effective January 1. Do not bill outside the stated class-size ranges or while a required field is `TBD`.

| MaBangGia | MaCapDo | HinhThucHoc | NhomSiSo | SoBuoi | DonGiaMoiBuoiVND | HocPhiTronCapDoVND | NgayHieuLucTu | NgayHieuLucDen |
|---|---|---|---|---:|---:|---:|---|---|
| WESA-20260212 | SEEDS | BOTH | 6-8 | 72 |  | 18000000 | TBD | 2027-12-31 |
| WESA-20260212 | GEN-BEGINNER | BOTH | 6-8 | 122 | 250000 | 30500000 | TBD | 2027-12-31 |
| WESA-20260212 | GEN-INTERMEDIATE | BOTH | 6-8 | 150 | 250000 | 37500000 | TBD | 2027-12-31 |
| WESA-20260212 | GEN-ADVANCED | BOTH | 6-8 | 110 | 250000 | 27500000 | TBD | 2027-12-31 |
| WESA-20260212 | COMM-A2 | BOTH | 6-10 | 40 | 300000 | 12000000 | TBD | 2027-12-31 |
| WESA-20260212 | COMM-B1 | BOTH | 6-10 | 40 | 300000 | 12000000 | TBD | 2027-12-31 |
| WESA-20260212 | COMM-B2 | BOTH | 6-10 | 40 | 300000 | 12000000 | TBD | 2027-12-31 |
| WESA-20260212 | BUS-ELEMENTARY | BOTH | 6-10 | 41 | 200000 | 8200000 | TBD | 2027-12-31 |
| WESA-20260212 | BUS-PREINTERMEDIATE | BOTH | 6-10 | 37 | 200000 | 7400000 | TBD | 2027-12-31 |
| WESA-20260212 | BUS-INTERMEDIATE | BOTH | 6-10 | 45 | 200000 | 9000000 | TBD | 2027-12-31 |
| WESA-20260212 | BUS-UPPERINTERMEDIATE | BOTH | 6-10 | 42 | 200000 | 8400000 | TBD | 2027-12-31 |
| WESA-20260212 | BUS-ADVANCED | BOTH | 6-10 | 41 | 200000 | 8200000 | TBD | 2027-12-31 |
| WESA-20260212 | IELTS-FOUNDATION | BOTH | 6-10 | 40 | 450000 | 18000000 | TBD | 2027-12-31 |
| WESA-20260212 | IELTS-L1 | BOTH | 6-10 | 40 | 450000 | 18000000 | TBD | 2027-12-31 |
| WESA-20260212 | IELTS-L2 | BOTH | 6-10 | 32 | 500000 | 16000000 | TBD | 2027-12-31 |
| WESA-20260212 | IELTS-L3 | BOTH | 6-10 | 32 | 500000 | 16000000 | TBD | 2027-12-31 |
| WESA-20280101 | SEEDS | BOTH | 6-8 | 72 |  | 19800000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | GEN-BEGINNER | BOTH | 6-8 | 122 | 275000 | 33550000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | GEN-INTERMEDIATE | BOTH | 6-8 | 150 | 275000 | 41250000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | GEN-ADVANCED | BOTH | 6-8 | 110 | 275000 | 30250000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | COMM-A2 | BOTH | 6-10 | 40 | 330000 | 13200000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | COMM-B1 | BOTH | 6-10 | 40 | 330000 | 13200000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | COMM-B2 | BOTH | 6-10 | 40 | 330000 | 13200000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | BUS-ELEMENTARY | BOTH | 6-10 | 41 | 220000 | 9020000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | BUS-PREINTERMEDIATE | BOTH | 6-10 | 37 | 220000 | 8140000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | BUS-INTERMEDIATE | BOTH | 6-10 | 45 | 220000 | 9900000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | BUS-UPPERINTERMEDIATE | BOTH | 6-10 | 42 | 220000 | 9240000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | BUS-ADVANCED | BOTH | 6-10 | 41 | 220000 | 9020000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | IELTS-FOUNDATION | BOTH | 6-10 | 40 | 495000 | 19800000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | IELTS-L1 | BOTH | 6-10 | 40 | 495000 | 19800000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | IELTS-L2 | BOTH | 6-10 | 32 | 550000 | 17600000 | 2028-01-01 | 2028-12-31 |
| WESA-20280101 | IELTS-L3 | BOTH | 6-10 | 32 | 550000 | 17600000 | 2028-01-01 | 2028-12-31 |
| WESA-20290101 | SEEDS | BOTH | 6-8 | 72 |  | 21780000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | GEN-BEGINNER | BOTH | 6-8 | 122 | 302500 | 36905000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | GEN-INTERMEDIATE | BOTH | 6-8 | 150 | 302500 | 45375000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | GEN-ADVANCED | BOTH | 6-8 | 110 | 302500 | 33275000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | COMM-A2 | BOTH | 6-10 | 40 | 363000 | 14520000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | COMM-B1 | BOTH | 6-10 | 40 | 363000 | 14520000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | COMM-B2 | BOTH | 6-10 | 40 | 363000 | 14520000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | BUS-ELEMENTARY | BOTH | 6-10 | 41 | 242000 | 9922000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | BUS-PREINTERMEDIATE | BOTH | 6-10 | 37 | 242000 | 8954000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | BUS-INTERMEDIATE | BOTH | 6-10 | 45 | 242000 | 10890000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | BUS-UPPERINTERMEDIATE | BOTH | 6-10 | 42 | 242000 | 10164000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | BUS-ADVANCED | BOTH | 6-10 | 41 | 242000 | 9922000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | IELTS-FOUNDATION | BOTH | 6-10 | 40 | 544500 | 21780000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | IELTS-L1 | BOTH | 6-10 | 40 | 544500 | 21780000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | IELTS-L2 | BOTH | 6-10 | 32 | 605000 | 19360000 | 2029-01-01 | 2029-12-31 |
| WESA-20290101 | IELTS-L3 | BOTH | 6-10 | 32 | 605000 | 19360000 | 2029-01-01 | 2029-12-31 |
| WESA-20300101 | SEEDS | BOTH | 6-8 | 72 |  | 23958000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | GEN-BEGINNER | BOTH | 6-8 | 122 | 332750 | 40595500 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | GEN-INTERMEDIATE | BOTH | 6-8 | 150 | 332750 | 49912500 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | GEN-ADVANCED | BOTH | 6-8 | 110 | 332750 | 36602500 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | COMM-A2 | BOTH | 6-10 | 40 | 399300 | 15972000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | COMM-B1 | BOTH | 6-10 | 40 | 399300 | 15972000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | COMM-B2 | BOTH | 6-10 | 40 | 399300 | 15972000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | BUS-ELEMENTARY | BOTH | 6-10 | 41 | 266200 | 10914200 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | BUS-PREINTERMEDIATE | BOTH | 6-10 | 37 | 266200 | 9849400 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | BUS-INTERMEDIATE | BOTH | 6-10 | 45 | 266200 | 11979000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | BUS-UPPERINTERMEDIATE | BOTH | 6-10 | 42 | 266200 | 11180400 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | BUS-ADVANCED | BOTH | 6-10 | 41 | 266200 | 10914200 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | IELTS-FOUNDATION | BOTH | 6-10 | 40 | 598950 | 23958000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | IELTS-L1 | BOTH | 6-10 | 40 | 598950 | 23958000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | IELTS-L2 | BOTH | 6-10 | 32 | 665500 | 21296000 | 2030-01-01 | 2030-12-31 |
| WESA-20300101 | IELTS-L3 | BOTH | 6-10 | 32 | 665500 | 21296000 | 2030-01-01 | 2030-12-31 |

Communication A1/Foundation has no price in the supplied fee schedule and is intentionally omitted until its fee is confirmed.

## 5c. HoTroHocVien

| Column | Required | Notes |
|---|---|---|
| MaHoTro | Yes | Stable award/support record code. |
| MaHocVien | Yes | Student receiving the benefit. |
| MaGiaiDoan | Yes | Program level to which this support award applies. |
| LoaiHoTro | Yes | `SCHOLARSHIP` or `LEARNING_SUPPORT`. |
| TenHoTro | Yes | Scholarship name or academic service, such as assessment or mentoring. |
| SoLuong | Optional | Number of sessions/services when countable. |
| GiaTriQuyDoiVND | Yes | Approved support value used toward the 20% per-student/per-level cap. Valuation basis needs an approved standard. |
| TieuChiXetDuyet | Yes | Published eligibility criterion or decision reference. |
| NguoiPheDuyet | Yes | Employee code of authorized approver. |
| NgayPheDuyet | Yes | Use `YYYY-MM-DD`. |
| TrangThai | Yes | For example, `PENDING`, `APPROVED`, or `REJECTED`. |

For each student and level, the total approved scholarship plus Learning Support Package value must not exceed 20% of that level's standard tuition. Baseline unlimited tutoring and late-entry makeup credits are tracked separately and do not consume this cap.

## 6. LoTrinhHocVien

| Column | Required | Notes |
|---|---|---|
| MaGiaiDoan | Yes | Stable ID for this student's program stage. |
| MaHocVien | Yes | Must match a student code in HocVien. |
| ThuTuGiaiDoan | Yes | Sequence for this student, starting at 1. |
| MaCapDo | Yes | Must match a level code in CapDoChuongTrinh. |
| NgayBatDau | Optional | Actual or planned start date; use `YYYY-MM-DD`. |
| NgayDuKienKetThuc | Optional | Calculate from the program duration, then confirm. |
| NgayKetThucThucTe | Optional | Fill when the stage is completed. |
| TrangThai | Yes | For example, `PLANNED`, `ACTIVE`, `COMPLETED`, or `PAUSED`. |

Create one row per completed/current/planned level: SEEDS, GEN Beginner, GEN Intermediate, and GEN Advanced. The standard path then opens a specialization choice. Total planned duration through GEN Advanced is 152 weeks (24 + 41 + 50 + 37).

## 7. MocChonChuongTrinh

| Column | Required | Notes |
|---|---|---|
| MaHocVien | Yes | Student making the decision. |
| MaGiaiDoanTruoc | Yes | The student's GEN Advanced stage in LoTrinhHocVien. |
| NgayCanChon | Optional | Target date for the program-selection discussion. |
| TrangThai | Yes | For example, `PENDING`, `DECIDED`, or `DEFERRED`. |
| MaChuongTrinhDaChon | Optional | Selected specialization; fill only after the decision. |
| MaCapDoDaChon | Optional | Level chosen after advising or placement. |
| NgayChon | Optional | Use `YYYY-MM-DD`. |

After GEN Advanced, the student may choose Communication, Business English, or IELTS Practice based on need. This is a decision checkpoint, not an enrollment. Record the chosen level in LoTrinhHocVien after advising or placement.

## 8. LopHoc

| Column | Required | Notes |
|---|---|---|
| MaLop | Yes | Stable class code. |
| MaChiNhanh | Yes | Must match a branch code. |
| MaCapDo | Yes | Program level this class/cohort delivers. |
| TenLop | Yes | Class name. |
| MaGiaoVien | Optional | Must match an employee code when supplied. |
| TrangThai | Optional | Use an agreed status list. |

## 9. GhiDanhLop

| Column | Required | Notes |
|---|---|---|
| MaHocVien | Yes | Student code. |
| MaLop | Yes | Class code. |
| MaGiaiDoan | Yes | The student's matching program stage in LoTrinhHocVien. |
| NgayVaoHocThucTe | Yes | Student's first attended date; used to calculate scheduled sessions missed before entry. Use `YYYY-MM-DD`. |
| NgayKetThuc | Optional | Use `YYYY-MM-DD`. |
| TrangThai | Yes | Use an agreed enrollment status list. |

One row represents one student-to-class enrollment. This supports multiple classes and enrollment history.

## 9a. BuoiHoc

| Column | Required | Notes |
|---|---|---|
| MaBuoiHoc | Yes | Stable scheduled-session code. |
| MaLop | Yes | Class/cohort code. |
| NgayGioBatDau | Yes | Scheduled date and time. |
| ThoiLuongPhut | Optional | Planned lesson duration. |
| TrangThai | Yes | For example, `SCHEDULED`, `COMPLETED`, or `CANCELLED`. Cancelled sessions do not create makeup credits. |

For late entry, count only completed cohort sessions before the student's first attendance. Future and cancelled sessions do not create makeup credits.

## 9b. BuoiHocHoTro

| Column | Required | Notes |
|---|---|---|
| MaBuoiHoTro | Yes | Stable tutoring/makeup booking code. |
| MaHocVien | Yes | Student receiving support. |
| MaGiaiDoan | Yes | Current student program stage. |
| MaLop | Optional | Related class/cohort. |
| LoaiBuoi | Yes | `TUTORING` or `MAKEUP`; every booking must be classified. |
| SoBuoiBuTru | Yes | `0` for tutoring, `1` for one makeup, or `2` for an approved two-in-one makeup. |
| NgayGio | Yes | Scheduled support-session date and time. |
| MaGiaoVien | Optional | Assigned teacher. |
| TrangThai | Yes | For example, `SCHEDULED`, `COMPLETED`, or `CANCELLED`. Only completed makeup sessions consume credits. |
| GhiChu | Optional | Record approval/learning-fit note for a two-in-one session. |

Tutoring is unlimited during active enrollment, subject to available slots. It does not reduce makeup balance unless the booking is explicitly classified as `MAKEUP`.

## 10. PhongBan

| Column | Required | Notes |
|---|---|---|
| MaPhongBan | Yes | Stable department code, for example `BD`, `OP`, `FD`, or `DS`. |
| MaCongTy | Yes | Company that owns this department. |
| TenPhongBanVi | Yes | Vietnamese department name. |
| TenPhongBanEn | Optional | English department name. |

## 11. ChucDanh

| Column | Required | Notes |
|---|---|---|
| MaChucDanh | Yes | Unique, stable title code. Resolve duplicate codes in [CAREER_LADDERS.md](CAREER_LADDERS.md) before import. |
| MaCongTy | Yes | Company or brand where the title applies. |
| MaPhongBan | Yes | Department code. |
| TenChucDanhVi | Yes | Vietnamese job title. |
| TenChucDanhEn | Optional | English job title. |
| CapBac | Optional | One of the agreed career levels shown in the chart. |

Job titles and career levels are HR data; they do not grant application permissions.

## 12. LoTrinhThangTien

| Column | Required | Notes |
|---|---|---|
| MaCongTy | Yes | Company/brand for this path. |
| MaPhongBan | Yes | Department for this path. |
| MaChucDanhNguon | Yes | Current title code. |
| MaChucDanhDich | Yes | Next title code. |
| ThuTuGoiY | Optional | Suggested order when a path has multiple steps. |
| LoaiChuyenDoi | Optional | For example, promotion or parallel career track. |

Use one row per allowed/recommended transition. A title can have multiple next steps for parallel tracks. Promotion criteria and approval rules must be defined separately.

## 13. NhanVien

| Column | Required | Notes |
|---|---|---|
| MaNhanVien | Yes | Stable employee code. |
| HoTen | Yes | Full name. |
| Email | Yes | Work email; must be unique. |
| MaPhongBan | Optional | Current department code. |
| MaChucDanhHienTai | Optional | Current HR title code; keep consistent with the latest title-history row. |
| TrangThai | Yes | For example, `ACTIVE` or `INACTIVE`. |

## 14. LichSuChucDanh

| Column | Required | Notes |
|---|---|---|
| MaNhanVien | Yes | Employee code. |
| MaChucDanh | Yes | Title held during this period. |
| NgayHieuLuc | Yes | Use `YYYY-MM-DD`. |
| NgayKetThuc | Optional | Blank for the current title. |
| NguoiPheDuyet | Optional | Employee code of the approving manager. |
| GhiChu | Optional | Reason or reference to the HR decision. |

## 15. PhanQuyen

| Column | Required | Notes |
|---|---|---|
| MaNhanVien | Yes | Must match an employee code. |
| MaCongTy | Yes | Company scope for this assignment. |
| MaChiNhanh | Optional | Blank means company-wide scope only for roles explicitly allowed that scope. |
| VaiTro | Yes | Use the approved role list. |
| TrangThai | Yes | For example, `ACTIVE` or `INACTIVE`. |

Use one row per employee/company/branch/role assignment. Employees working across companies or branches receive multiple rows; do not duplicate their NhanVien record.
System roles in PhanQuyen are separate from MaChucDanh and MaPhongBan. A promotion does not automatically change system permissions.

## Import order and validation

1. Companies, then Branches.
2. Departments, job titles, and career paths.
3. Employees, title history, then access assignments.
4. Program catalog and levels, then approved level price versions.
5. Students, contracts, student program stages, specialization decisions, and approved support awards.
6. Classes, class schedules, enrollments, then tutoring/makeup bookings.
7. Check for duplicate codes, missing references, invalid dates, unknown company/branch/program/level codes, out-of-range class sizes, support-cap violations, and unauthorized access scopes before importing.

Before building the import process, agree on the code and status lists, the owner for each data type, and which Google Sheets columns contain each field. Share only tab names and column headers here, never real rows or credentials.
