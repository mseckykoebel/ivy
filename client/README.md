# 💻 Ivy/client

Ivy's client is the app that users see and interact with. **Ivy's currently in pre-release. This means not all v1.0 features are available, or stable. Ivy 1.0 is slated for release on Tuesday, September 13th, 2022.**

## Roadmap and feature list

### Ivy v1.0 - September 13th, 2022:

1. **📚 Extensive, historical course catalogue**: Ivy supports searching for courses from as far back as 2004. Plan and record courses from any year or quarter in the past fifteen years. Instant next-quarter support, no waiting for courses to be released. All real-time
2. **🗓 Calendar view**: plan out a single quarter at NU by selecting courses based on year and quarter. Add and remove as many courses as you want
3. **📖 Schedule view**: plan out your entire time at NU with our schedule view. We support an unlimited number of quarters, and automatically determine the quarter based on the courses you add
4. **👀 Detailed course view**: Ivy knows as much as CAESAR: class number, enrollment capacity, enrollment requirements, and the name, phone, and office hours of the instructor
5. **🔐 Authentication**: pick up where you left off with storage and retrieval of calendar and schedule view. Your information is totally anonymous to our developers. No more saving links
6. **🦹‍♂️ Superuser**: view and use Ivy without signing in. Search our entire knowledge base of past courses with no login friction
7. **👑 Major and minor support**: enter up to one major and minor. In a future version of Ivy, this will be used to recommend courses to you
8. **💙 Home-grown**: Ivy's a joint development effort between Raiso (https://raiso.org), and Northwestern IT. This means it'll last as long as NU does. Ivy isn't a side project - it's designed to be used by NU students for the rest of time

### Ivy v1.1 - November 1st, 2022

1. **🐎 Speed and stability improvements**: we're going to re-factor Ivy to use the least amount of code as possible. This will make it a lot quicker than it already is. And, it'll make it easier to contribute to
2. **💾 API improvements:** Ivy's API will be re-worked for speed and security
3. **🗓 Calendar and schedule improvements**: feature improvements and enhancements to calendar and schedule. Small hitlist: calendar exporting, course conflict detection, and multiple schedules for one quarter

### Ivy v2.0 - Coming 2023

1. **🪄 Course recommendations**: when enough people use Ivy, Ivy will become smart enough to be able to *predict* the courses you should take. The more people that use Ivy, the better predictions will become
2. **😳 CTEC support**: we're going to gun for native CTEC support. View past course and instructor ratings right in Ivy

And much, much more!

With 💚,
Raiso + NUIT

### FAQ

| Topic              | Answer                  | Comments                                                                                      |
| ------------------ | ----------------------- | --------------------------------------------------------------------------------------------- |
| **Runtime**        | Node                    | v16 and runs as an HTTP server                                                                |
| **Lint**           | eslint                  | `npm run lint`                                                                                |
| **Builds**         | swc                     | `npm run build`                                                                               |
| **Dev**            | Node                    | `npm run start`                                                                               |
| **Env**            | .env.local              | process.env and .env.local are merged via dotenv                                              |
| **Hosting**        | Firebase hosting        | https:ivy.raiso.org                                                                           |
| **Authentication** | Firebase authentication | Protected routes, and superuser support                                                       |
| **Storage**        | Firebase firestore      | noSQL, nested document -> collection syntax Tight integration with Firebase functions, and ML |
| **Localhost**      | 3000                    | Default is http://localhost:3000/                                                             |

### Quickstart for devs

- `cd ivy/client`
- `npm i`
- `npm run start`

Run this in parallel with `ivy/client`.
