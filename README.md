# Kontent and Next.js benchmark

Alternation of the [Gaatsby's willit.build benchmark](https://github.com/gatsbyjs/gatsby/tree/master/benchmarks/source-kontent) for [Next.js](https://nextjs.org/) and [Kentico Kontent](https://kontent.ai) as a data source.

## Results

### Locally

> Ran two time to ensure the content is on CDN

* 512 pages - cca 20s
* 4096 pages - cca 90s (1.5m)
* 8192 pages - cca 150s (2.5m)
* 32768 pages - cca 1260s (21m)

### On Github action

See [Github action logs](https://github.com/Simply007/kontent-nextjs-benchmark/actions?query=workflow%3ABenchmark) for all results.

[Results of this run](https://github.com/Simply007/kontent-nextjs-benchmark/runs/975272541?check_suite_focus=true)

* 512 pages - 53s
* 4096 pages - 278s (4.6m)
* 8192 pages - 533s (8.8m)
* 32768 pages - 2576s (42.9m)

### On Vercel

There is only 4k and 8k dataset build on [Vercel project](https://vercel.com/chrastinaondra/kontent-nextjs-benchmark)

> but the output for 8k items exceeds 16k files, so it is not deployed.

```plain
Error: The result of your build (16,410 files) exceeds the maximum of 16,000 files. Learn More: https://vercel.link/max-files
```

* 4096 pages - 216s (3.6m) [this run](https://vercel.com/chrastinaondra/kontent-nextjs-benchmark/q7l8n0qe8)
* 8192 pages - 418s (6.9m) [this run](https://vercel.com/chrastinaondra/kontent-nextjs-benchmark/gud33aquq)

## Deploy your own

Once you have access to [the environment variables you'll need](#step-4-set-up-environment-variables), deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?c=1&s=https://github.com/Simply007/kontent-nextjs-benchmark&env=KONTENT_PROJECT_ID,KONTENT_PREVIEW_API_KEY,KONTENT_PREVIEW_SECRET&envDescription=Required%20to%20connect%20the%20app%20with%20Kontent)

## How to use

### Download manually

Download the example:

```sh
git clone https://github.com/Simply007/kontent-nextjs-benchmark
cd cms-kontent
```

## Configuration

The site is already configured to use predefined dataset of 512 pages in kentico Kontent. If you just want to run the benchmark ship following spet and jump to [Run the benchmark section](#Run-the-benchmark).

### Import content models and it's data (512 pages)

1. Enter [Kontent application](https://app.kontent.ai)
1. Go to "Project Settings", select API keys
1. Activate Management API
1. Copy `Project ID` and `Management API` key
1. Install [Kontent Backup Manager](https://github.com/Kentico/kontent-backup-manager-js) and import data to newly created project from kontent-backup.zip file (place appropriate values for apiKey and projectId arguments):

   ```sh
   npm i -g @kentico/kontent-backup-manager
   kbm --action=restore --apiKey=<Management API key> --projectId=<Project ID> --zipFilename=kontent-backup
   ```

   > **:bulb: Alternatively, you can use the [Template Manager UI](https://kentico.github.io/kontent-template-manager/import-from-file) for importing the content.**

1. Go to your Kontent project and publish all the imported items.
   > You could deactivate Management API key, it is not necessary any more.

:Warning: If you want to generate bigger data sets, use [Kontent Data Generator](https://github.com/Simply007/kontent-data-generator).

## Run the benchmark

### Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local` from `Project settings` > `API keys`:

- `KONTENT_PROJECT_ID` - Project ID from the `API keys` section.
- `KONTENT_PREVIEW_API_KEY` - one of the Preview API keys from the `API keys` section.

## Run Next.js in development mode

You might want to extend the site with you features and measure the impact. For the development mode follow the instructions.

```sh
npm install
npm run dev

# or

yarn
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

## Run locally

If you have set `KONTENT_PROJECT_ID`, the only thing you need to do is to run:

```sh
npm install # if you haven't install dependencies yet
npm run build

# or

yarn # if you haven't install dependencies yet
yarn build
```

The measurements will be visible in the log - the result is on the last line i.e.:

```plain
     Total   86.2187s
```

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/import/git?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?c=1&s=https://github.com/Simply007/kontent-nextjs-benchmark&env=KONTENT_PROJECT_ID,KONTENT_PREVIEW_API_KEY,KONTENT_PREVIEW_SECRET&envDescription=Required%20to%20connect%20the%20app%20with%20Kontent)