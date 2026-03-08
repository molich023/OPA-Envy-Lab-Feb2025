# 🏃 HATUA — The Full App Design

**"Kila hatua ni ushindi mdogo"** — *Every step is a small victory.*

---

## § 01 — Market Analysis
Analysis of the Top 5 global apps with weaknesses and futuristic vision:
- **Strava**: Overly competitive; intimidates casual walkers. *Vision: Social fitness as a lifestyle.*
- **Nike Run Club**: Limited focus on low-intensity activities. *Vision: Guided storytelling.*
- **MapMyWalk**: Clunky UI and heavy ads. *Vision: Detailed route insights.*
- **Walkmeter**: Technical and outdated interface. *Vision: High-precision logging.*
- **Pacer**: Generic community features. *Vision: Gamified goal tracking.*

---

## § 02 — App Screen Mockups
- **🔢 Odometer screen**: Live metres + km, real-time points, indoor/outdoor/race modes.
- **🗺 Live OSM Map**: AI route suggestion overlay, safety mode triggers.
- **🏆 Leaderboard**: Avatar identities & rank tracking.
- **🔐 Auth Flow**: Splash screen, Secure Registration (Strength meter), OTP Verification.
- **🛡 Security Panel**: OWASP Top 10 compliance tracker (Shield icon).

---

## § 03 — 12 Core Features
1. Dual-mode odometer (Indoor/Outdoor). 2. OSM Integration. 3. Multi-constellation GPS (±2m). 4. AI Route Suggestions. 5. Safety Mode (Walk with me). 6. M-Pesa Integration. 7. Offline Maps. 8. Voice Guidance. 9. Social Challenges. 10. Health Sync (Apple/Google). 11. Weather Overlay. 12. Milestone Badges.

---

## § 04 — Avatar System
Unlockable East African-inspired avatars:
- 🦁 **Simba** (Lion), 🐆 **Chui** (Leopard), 🦅 **Tai** (Eagle), 🐘 **Tembo** (Elephant), 🏔 **Kilima** (Mountain).
- 🦏 **Kifaru** (Rhino), 🦒 **Twiga** (Giraffe), 🦓 **Punda Milia** (Zebra), 🐃 **Nyati** (Buffalo), 🦌 **Swala** (Impala).

---

## § 05 — Pricing in KSH
| Tier | Name (Swahili) | Price |
|------|---------------|-------|
| Basic | **Msingi** | KSH 100/yr |
| Pro | **Nguvu** | KSH 500/yr |
| Platinum | **Dhahabu** | KSH 1,000/yr |

---

## § 06 — Hatua Points Economy
- **Earn**: 1 pt per 100 steps, streaks (7+ days), one-off challenges.
- **Redeem**: M-Pesa cash, Airtime, Gym passes, Nike vouchers, or **Plant a tree in Kenya 🌳**.

---

## § 07 — Referral Programme
- 500 pts per signup.
- 10% of referee points for 6 months.
- 2x Multiplier active after 10 referrals.

---

## § 08-09 — Tech Stack & Security
- **Frontend**: React Native / React.
- **Mapping**: OSM / MapLibre.
- **Backend**: Node.js / PostGIS.
- **Security**: OWASP Top 10 ready, Bcrypt hashing, JWT sessions, 2FA (OTP via Daraja), Rate limiting (5 attempts), Input sanitisation.

---

## § 10 — 4-Phase Roadmap
1. **Phase 1 (MVP)**: Core tracking, basic avatars, M-Pesa & Auth.
2. **Phase 2 (Social)**: Leaderboards, challenges, AI routes.
3. **Phase 3 (Ecosystem)**: Partner rewards (Nike, Gyms), tree planting.
4. **Phase 4 (Regional)**: Expansion to TZ, UG, RW.
