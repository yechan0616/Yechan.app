---
title:
  ko: Toast ACS
  en: Toast ACS
year: 2026
order: 5
techStack: [Next.js, React, Emotion, Framer Motion, Spring Boot, PostgreSQL, ESP32]
repositoryUrl: https://github.com/yechan0616/Toast-ACS
meta:
  ko: The Toast · 프론트엔드 개발
  en: The Toast · Frontend development
summary:
  ko: 넘겨줄 수 없는 무인 공간 출입 인증 시스템
  en: A non-transferable access control system for unstaffed spaces.
---

스터디카페·헬스장·무인매장처럼 사람이 지키지 않는 공간의 QR 출입권은 캡처 한 번이면 복제되고 남에게 넘어가요. 이 허점을 기기 단위 인증으로 원천 차단하는, 어떤 무인 공간에나 붙일 수 있는 출입 통제 시스템(ACS)이에요. HMAC 30초 회전 토큰, HttpOnly 쿠키 기기 바인딩, Session Kill, 게이트 초음파 현장 확인을 겹겹이 쌓아 "인증의 양도 불가능성"을 구현해요.

게이트가 QR을 읽는 대신 본인 기기가 서버에 직접 입장을 요청해요. 이용자는 문 앞에서 버튼 하나로 입장하고, 서버가 토큰과 현장 감지를 함께 검증한 뒤 ESP32 릴레이로 게이트를 열어요. 안티패스백 상태 머신과 관리자 실시간 대시보드, 공격 6종을 눈앞에서 막아내는 시연 페이지까지 함께 만들어요.

The Toast 팀으로 제6회 전남 학생 SW융합 해커톤에 참여해 프론트엔드를 맡고 있어요. 이용자 인증·입장 화면과 관리자 대시보드를 Next.js 모노레포로 만들고 Emotion과 Framer Motion으로 스타일링해요. 백엔드는 Spring Boot와 PostgreSQL로 구성하고, 서버에 Docker로 배포해 하드웨어와 연동해요.

<!-- en -->

QR passes at unstaffed spaces — study cafes, gyms, self-service stores — can be copied and handed over with a single screenshot. This access control system works for any unstaffed space, closing that gap with device-level authentication and layering HMAC tokens rotating every 30 seconds, HttpOnly cookie device binding, Session Kill, and ultrasonic on-site verification at the gate to make authentication truly non-transferable.

Instead of a gate scanning QR codes, the user's own device requests entry directly from the server. One tap at the door, the server verifies both the token and on-site presence, and an ESP32 relay opens the gate. It also includes an anti-passback state machine, a real-time admin dashboard, and a live demo page that defeats six attack scenarios on the spot.

I'm on team The Toast for the 6th Jeonnam Student SW Convergence Hackathon as the frontend developer, building the user entry flow and admin dashboard in a Next.js monorepo styled with Emotion and Framer Motion, backed by Spring Boot and PostgreSQL deployed via Docker on a Raspberry Pi with the gate hardware.
