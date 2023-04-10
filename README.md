# SZN-ONE

## Core Technologies Used

- [NX](https://nx.dev/)
- [Next.js 13](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://github.com/vriad/zod)
- [Tailwind](https://tailwindcss.com/)
- [Radix-primitive](https://www.radix-ui.com/)
- [Playwrite](https://playwright.dev/)

## Core Ideas

### About typesafe

- Everything about type will be built around Zod, make runtime typesafe. And then infer all typescript type from zod schema and prisma to ensure DX for both BE and FE.

### About monorepo structures

- Only packages's materials can be imported at workspace level. (Packages and apps is not allowed to import from other apps)
- Packages is only for code sharing, not for standalone build because of difficulties of 3rd parties management, which can lead to unnecessarily large bundled size.

### Why monorepo?

- It's mostly for sharing code. Not only between Frontends, but also for sharing code between backend and server-side rendering.
- Remove overhead of opening multiple IDE for Landing/Backoffice/Backend in development.
- It's a good prepare for future architect.

### Future architect

- Sharing code between backend and Server-side of Nextjs facilitate future deployment to the edge.
- Instead of spawning backend's servers all over the world, Frontend's server will be deployed to the edge at global scale.
- Using monorepo will make the migration from calling query APIs from BE's server to FE's server a breeze.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (recommended version: v16.x.x)
- [Pnpm](https://yarnpkg.com/)

### Installation

1. Clone this repository to your local machine.
2. Install pnpm and install node_modules at root level.
3. Run landing app with: (other apps will apply the same format)

```
pnpm nx dev landing
<!-- or -->
pnpm nx run landing:dev
```
