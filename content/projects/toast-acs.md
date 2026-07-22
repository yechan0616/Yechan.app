---
title:
  ko: Toast ACS
  en: Toast ACS
year: 2026
order: 5
techStack: [Next.js, React, Emotion, Framer Motion, Spring Boot, PostgreSQL, ESP32]
repositoryUrl: https://github.com/yechan0616/Toast-ACS
meta:
  ko: The Toast · 프론트엔드·백엔드 개발
  en: The Toast · Frontend & backend development
summary:
  ko: 캡처해도 넘길 수 없는 티켓을 만드는 출입 인증 시스템
  en: An access control system that makes tickets impossible to hand over.
---

경기장·공연장의 QR 티켓은 캡처 한 장이면 남에게 넘어가고, 그렇게 암표가 생겨요. Toast ACS는 화면에 QR을 아예 띄우지 않는 것으로 이 문제를 원천 차단하는 출입 인증 시스템이에요. 티켓은 최초 등록한 기기에 잠기고, 검증은 전부 서버에서 이뤄져요.

제6회 전남 학생 SW융합 해커톤에 The Toast 팀으로 출품한 작품이고, 저는 프론트엔드와 백엔드를 만들었어요. 아래는 이 시스템이 실제로 어떻게 동작하는지에 대한 기술 기록이에요.

## 왜 QR로는 안 되는가

인기 경기는 티켓을 풀자마자 매진되고, 정가 3만 원짜리 티켓이 수십만 원에 거래돼요. 2025년에는 부정 판매 시 판매액의 50배를 물리는 암표 근절법까지 생겼지만, 처벌만 강화됐을 뿐 티켓은 여전히 넘어가요. QR이 본질적으로 "화면에 표시된 데이터"이기 때문이에요. 표시되는 순간 캡처할 수 있고, 캡처본은 원본과 구별되지 않아요. 갱신 주기를 줄인 동적 QR도 화면을 실시간으로 중계하면 뚫리는 구조 자체는 그대로예요. Toast ACS는 처벌 대신 구조로 접근을 바꿔서, 보여줄 것을 없앴어요. 게이트에는 판독기가 없고, 관객의 폰이 서버에 직접 입장을 요청해요. 인증 정보는 JavaScript조차 접근할 수 없는 HttpOnly 쿠키에만 있어서, 화면에 표시될 일 자체가 없어요.

## 티켓이 기기에 잠기는 과정

- 신청 — 이름과 연락처를 적고 좌석을 골라 티켓을 신청해요. 이미 예약된 좌석은 고를 수 없어요. 서버는 이 응답에 HttpOnly 기기 쿠키를 심고, 이 순간부터 발급될 코드는 이 기기에 귀속돼요.
- 승인 — 관리자가 대시보드에서 신청을 승인하거나 거절해요. 신청 시점의 IP가 함께 기록되어 중복·이상 신청을 가려내요. 승인되면 홈 화면에서 바로 알려주고, 앱을 껐다 켜도 이어져요.
- 등록 — 발급 코드는 신청한 그 기기에서만 등록돼요. 다른 기기는 DEVICE_MISMATCH로 거부돼요. 최초 등록 시 티켓이 기기에 바인딩되고, 이후 다른 기기의 등록 시도는 전부 거부돼요. 잠금 해제는 관리자만 할 수 있어요.

그래서 코드와 신청 내역을 통째로 남에게 보내도 소용없어요. 상대 기기에는 신청할 때 심은 쿠키가 없으니까요.

## 입장 검증 파이프라인

개찰구 앞에서 입장 버튼을 누르면 서버가 여섯 단계를 순서대로 검증해요. 실패한 단계의 에러 코드가 그대로 응답되고, 거부된 시도도 전부 로그로 남아요.

- 기기 각인 확인 — 쿠키가 없는 기기는 SESSION_REQUIRED
- HMAC 서명·시간창 검증 — 만료되거나 변조된 토큰은 TOKEN_EXPIRED
- 세션 활성 확인 — 다른 기기 등록으로 종료된 세션은 SESSION_KILLED
- 안티패스백 — 퇴장 없이 재입장하면 ALREADY_INSIDE, 입장 없이 퇴장하면 NOT_INSIDE
- 현장 확인 — 게이트 초음파가 최근 2초 안에 사람을 감지하지 못했으면 NO_PRESENCE
- 시간창 선점 — 같은 30초 창의 토큰 재사용은 TOKEN_REUSED

시간창 선점이 마지막 단계인 게 포인트예요. 조건부 UPDATE 한 번으로 원자적으로 처리되어, 같은 창의 동시 요청 두 건 중 정확히 하나만 통과해요 — 이중 개방 레이스가 DB 수준에서 차단돼요. 그리고 거부된 시도는 창을 소비하지 않아서, 게이트 앞이 아니라는 이유로 거절당했어도 곧바로 다시 시도할 수 있어요.

## 토큰 설계

쿠키 값은 세션ID·시간창·서명 세 조각이에요. 서명은 HMAC-SHA256이고, 서버 전역 키에서 세션별 시크릿으로 파생한 키로 만들어서 세션 하나가 새어도 다른 세션으로 번지지 않아요. 시간창은 30초 단위이고 서버는 현재와 직전 창까지만 받아요. 매 응답마다 현재 창으로 재서명해 Set-Cookie로 갱신하니, 훔친 토큰은 30초 안에 죽어요. 서명 비교는 상수 시간으로 해서 타이밍 공격을 피하고, 형식이 깨진 토큰은 이유를 구분하지 않고 전부 TOKEN_EXPIRED 하나로 응답해요 — 공격자에게 실패 원인을 세분화해서 알려줄 이유가 없으니까요.

"HttpOnly니까 탈취 불가"라고는 말하지 않아요. 개발자도구를 열면 쿠키 값은 보여요. 실제 방어는 조합이에요. 복사해가도 30초 뒤 만료되고, 다른 기기에서 등록하면 원본 세션이 종료되고(Session Kill), 활성 세션은 부분 유니크 인덱스로 티켓당 1개가 DB에서 강제돼요.

## 게이트 하드웨어

입장·퇴장 개찰구 2개를 보드 두 장이 맡아요. Nano ESP32가 서버 통신·초음파·OLED·판단을, UART로 연결된 Uno R3가 차단바 서보를 담당해요. 방향도 서버가 검증해서, 입장 버튼은 입장 개찰구 앞에서만 통해요.

ESP32는 서버를 0.7초 주기로 HTTP 폴링해요. WebSocket이나 MQTT 없이 요청 하나가 세 역할을 겸해요 — 하트비트(5초 무응답이면 게이트 오프라인 경보), 초음파 감지 보고(입장 검증의 현장 확인이 이 데이터를 참조), 개방 명령 수신. 개방 지연은 최대 0.7초라 체감되지 않고, 펌웨어 쪽 코드가 가장 단순해져요.

입장 쪽 OLED에는 좌석 현황과 승인 결과("입장 승인 / 좌석 A3")가, 퇴장 쪽에는 통과 안내가 떠요. 공격이 차단되면 그 사유도 OLED에 그대로 표시돼요. 네트워크는 폰 핫스팟 Wi-Fi가 기본이고, 전파가 나쁜 환경을 대비한 USB 시리얼 브리지 백업 모드가 있어요.

## 관리자 대시보드

재실 인원, 활성 기기, 승인 대기, 게이트 온라인 상태를 실시간으로 봐요. 티켓 강제 취소(즉시 만료 + 활성 세션 종료, 취소 사유는 이용자 화면에 그대로 표시), 기기 잠금 해제, 원격 개방이 전부 여기서 이뤄져요. 출입·거부·세션 종료 로그가 남고, 하루 3회 이상 기기가 교체된 티켓은 공유 의심으로 표시돼요. 관리자 로그인은 IP당 시도 횟수를 제한해 무차별 대입을 막아요.

## 공격 시연 페이지

"막힌다"를 말이 아니라 눈으로 보여주기 위한 페이지예요. 전용 엔드포인트는 하나도 없어요 — 시연용 우회 로직이 서버에 있으면 보안 시연의 의미가 없으니까, 실제 API를 공격 조건 그대로 호출해요. 미각인 입장, 원격 통과, 안티패스백 위반, 위조 티켓, 형식 위반 요청, 무차별 대입, 관리자 무단 접근, 게이트 위조를 버튼으로 실행하면 어느 방어 계층에서 막혔는지 단계별로 표시되고, 차단 순간 게이트 OLED에도 사유가 떠요.

## 구조와 배포

프론트엔드는 pnpm 모노레포예요 — apps/client(관객), apps/admin(관리자), packages/ui·shared. Next.js App Router에 Emotion으로 스타일링하고 Framer Motion으로 상태 전환을 표현해요. /api 요청은 Next.js rewrites로 백엔드에 프록시해서 브라우저 입장에서는 same-origin이에요 — HttpOnly 쿠키를 쓰면서 CORS·SameSite 문제를 아예 만들지 않기 위한 선택이에요.

백엔드는 Spring Boot 3(Java 21)이에요. 도메인 지향 구조(pass·session·entry·gate·alert·admin)에 JPA와 Flyway 마이그레이션, Spring Security 세션 로그인을 써요. 배포는 Docker Compose로 PostgreSQL·API·client·admin을 올리고 Cloudflare Tunnel로만 노출해요. 포트 개방이 없고 HTTPS가 기본이라 Secure 쿠키 조건도 충족돼요. 서버가 외부에 있어서 시연장 네트워크 품질과 무관하게 폰은 LTE로, ESP32는 핫스팟으로 각자 붙어요.

## 기대효과

- 티켓의 공정성 — 본인만 사용할 수 있는 티켓은 애초에 거래가 성립하지 않아요. 부정 사용과 암표를 적발이 아니라 구조로 막고, 정가에 산 사람이 정가에 입장해요.
- 병목 제거 — 종이 티켓 확인도 QR 스캔도 없는 원패스예요. 문 앞에서 버튼 하나로 통과하니 개찰구 혼잡과 병목현상이 줄어요.
- 확장성 — 검증이 전부 서버에 있어서 야구장·축구장·콘서트·공연장 등 인구가 밀집하는 어떤 장소에도 게이트만 늘려서 적용할 수 있어요.

여기서 더 나아갈 방향도 열려 있어요.

- 네이티브 앱 전환 — 인증 정보를 폰의 하드웨어 보안 칩(시큐어 스토리지)에 저장해요. 은행 앱이 쓰는 방식으로 서명키 보안을 한 단계 올려요.
- 블루투스·GPS 현장 확인 정밀화 — 개찰구 앞에 여러 명이 겹쳐 있어도 어느 기기가 요청했는지 식별하고, 입·퇴장 중복 신호를 걸러내요.
- NFC 태그리스 입장 — 비접촉 통과로 입장 시간을 더 줄여 특정 시간대 혼잡도를 개선해요.

## 팀과 역할

The Toast 팀으로 제6회 전남 학생 SW융합 해커톤에 참여했어요. 저는 프론트엔드와 백엔드를 맡아 관객 앱의 신청→등록→입장 흐름과 관리자 대시보드, 공격 시연 페이지, 그리고 토큰 검증·안티패스백·게이트 제어를 담은 Spring Boot API까지 만들었어요. 설계·구현 전반에 Claude를 페어 프로그래밍 도구로 썼고, 생성된 코드는 타입체크·테스트·실제 API 호출로 검증한 뒤 반영했어요.

<!-- en -->

QR tickets at stadiums and concert venues can be handed over with a single screenshot — that's how scalping happens. Toast ACS is an access control system that closes this gap at the root by never showing a QR code at all. Each ticket is locked to the first device that registers it, and every check happens on the server.

Built by team The Toast for the 6th Jeonnam Student SW Convergence Hackathon, where I built the frontend and the backend. What follows is a technical record of how the system actually works.

## Why QR codes can't work

Popular events sell out the moment tickets drop, and a 30,000-won ticket resells for hundreds of thousands. Korea's 2025 anti-scalping law fines illegal resellers up to 50 times the sale amount — yet tickets keep changing hands, because a QR code is, by nature, data shown on a screen. The moment it's displayed it can be captured, and a capture is indistinguishable from the original. Dynamic QR codes with short refresh intervals don't change the structure — live-streaming the screen still defeats them. Toast ACS swaps punishment for structure: there is nothing to show. The gate has no scanner; the visitor's phone requests entry directly from the server. Credentials live only in an HttpOnly cookie that even JavaScript can't touch, so they never appear on screen in the first place.

## How a ticket gets locked to a device

- Request — enter your name and contact, pick a seat, and request a ticket. Taken seats can't be selected. The response plants an HttpOnly device cookie, and from that moment the code to be issued belongs to this device.
- Approval — an admin approves or rejects the request from the dashboard. The request IP is recorded to spot duplicates and anomalies. Approval shows up on the home screen immediately and survives app restarts.
- Registration — the issued code only registers on the device that requested it; any other device gets DEVICE_MISMATCH. First registration binds the ticket to the device, and every later attempt from another device is rejected. Only an admin can release the lock.

So sending someone your code and request details accomplishes nothing — their device doesn't have the cookie planted at request time.

## The entry verification pipeline

Tapping the entry button at the gate runs six server-side checks in order. The failing step's error code is returned as-is, and every denied attempt is logged.

- Device imprint — no cookie means SESSION_REQUIRED
- HMAC signature and time window — expired or tampered tokens get TOKEN_EXPIRED
- Session liveness — sessions killed by registration on another device get SESSION_KILLED
- Anti-passback — re-entering without exiting gets ALREADY_INSIDE, exiting without entering gets NOT_INSIDE
- On-site presence — if the gate's ultrasonic sensor hasn't detected a person within 2 seconds, NO_PRESENCE
- Window claim — reusing a token within the same 30-second window gets TOKEN_REUSED

The window claim being last is the point. It's a single atomic conditional UPDATE, so of two concurrent requests in the same window exactly one passes — the double-open race is eliminated at the database level. And denied attempts don't consume the window, so being rejected for not standing at the gate doesn't block an immediate retry.

## Token design

The cookie value has three parts: session ID, time window, and signature. The signature is HMAC-SHA256, keyed by a per-session secret derived from the server's global key, so one leaked session doesn't spread to others. Windows are 30 seconds and the server accepts only the current and previous one. Every response re-signs for the current window via Set-Cookie, so a stolen token dies within 30 seconds. Signature comparison is constant-time to avoid timing attacks, and any malformed token gets the same TOKEN_EXPIRED response regardless of cause — there's no reason to tell an attacker exactly why they failed.

We never claim "HttpOnly means it can't be stolen." Open devtools and the cookie value is right there. The real defense is the combination: a copy expires within 30 seconds, registering on another device kills the original session (Session Kill), and a partial unique index enforces one active session per ticket in the database.

## Gate hardware

Two turnstiles — one entry, one exit — are driven by two boards. A Nano ESP32 handles server communication, ultrasonic sensors, OLEDs, and decisions; a Uno R3 connected over UART drives the barrier servos. Direction is verified server-side too: the entry button only works in front of the entry gate.

The ESP32 polls the server over HTTP every 0.7 seconds. No WebSocket, no MQTT — one request plays three roles: heartbeat (5 seconds of silence raises a gate-offline alert), ultrasonic presence reporting (which the entry pipeline's presence check reads), and receiving open commands. Worst-case open latency is 0.7 seconds, imperceptible in practice, and the firmware stays as simple as possible.

The entry-side OLED shows seat occupancy and approval results ("Entry approved / Seat A3"); the exit side shows passage guidance. When an attack is blocked, the reason appears on the OLED too. Networking defaults to phone-hotspot Wi-Fi, with a USB serial bridge as a backup mode for hostile radio environments.

## Admin dashboard

Live view of occupancy, active devices, pending approvals, and gate status. Force-revoking a ticket (immediate expiry plus session kill, with the reason shown verbatim on the user's screen), releasing device locks, and remote gate opening all happen here. Entry, denial, and session-kill logs are kept, and any ticket with three or more device switches in a day is flagged as suspected sharing. Admin login is rate-limited per IP against brute force.

## Attack demo page

A page built to show — not claim — that attacks fail. There are no dedicated endpoints: a demo bypass on the server would defeat the purpose of a security demo, so it fires the real APIs under real attack conditions. Unregistered entry, remote passage, anti-passback violations, forged tickets, malformed requests, brute force, unauthorized admin access, and gate forgery each run at the tap of a button, showing exactly which defense layer stopped them — with the reason appearing on the gate OLED at the moment of the block.

## Architecture and deployment

The frontend is a pnpm monorepo — apps/client (visitors), apps/admin (admins), packages/ui and shared — built on Next.js App Router, styled with Emotion, with state transitions expressed through Framer Motion. All /api requests are proxied to the backend via Next.js rewrites, so the browser sees a single origin — a deliberate choice to use HttpOnly cookies without ever creating CORS or SameSite problems.

The backend is Spring Boot 3 on Java 21, organized by domain (pass, session, entry, gate, alert, admin) with JPA, Flyway migrations, and Spring Security session login. Deployment runs PostgreSQL, the API, client, and admin under Docker Compose, exposed only through a Cloudflare Tunnel — no open ports, HTTPS by default, which also satisfies the Secure cookie requirement. With the server offsite, the demo is independent of venue network quality: phones connect over LTE, the ESP32 over a hotspot.

## Expected impact

- Ticket fairness — a ticket only its owner can use leaves nothing to trade. Fraud and scalping are stopped by structure rather than enforcement, and whoever paid face value walks in at face value.
- No bottlenecks — a one-pass flow with no paper checks and no QR scanning. One tap at the door means less congestion at the turnstiles.
- Extensibility — with all verification on the server, it deploys anywhere crowds gather — ballparks, stadiums, concerts, theaters — by simply adding gates.

There's also a clear path forward.

- Native app — store credentials in the phone's hardware security chip (secure storage), the way banking apps do, hardening the signing keys another level.
- Bluetooth and GPS refinement — identify exactly which device is requesting even with several people crowded at the gate, filtering duplicate entry and exit signals.
- NFC tagless entry — contactless passage cuts entry time further and eases peak-hour congestion.

## Team and role

I'm on team The Toast for the 6th Jeonnam Student SW Convergence Hackathon, where I built both the frontend and the backend: the visitor app's request-register-enter flow, the admin dashboard, the attack demo page, and the Spring Boot API housing token verification, anti-passback, and gate control. Claude was used as a pair-programming tool throughout design and implementation, with generated code verified through type checks, tests, and real API calls before landing.
