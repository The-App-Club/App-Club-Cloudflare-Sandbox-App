## Set Profile

Cloudflare にログイン後、アカウント ID を確認し、toml ファイルに記載する

```
$ wrangler whoami
```

## Set Env

```bash
$ wrangler secret put SLACK_WEBHOOK_URL
$ wrangler secret put FAUNA_DB_SERVER_KEY
```

## Serve Dev

```bash
$ wrangler dev
```

## Check After Serve Dev

```bash
$ curl -sL http://127.0.0.1:8787 | jq
{
  "allTodos": {
    "data": [
      {
        "_id": "326631268169024082",
        "title": "Build an awesome app!",
        "completed": false,
        "__typename": "Todo"
      }
    ],
    "__typename": "TodoPage"
  }
}
```

## Deploy

```bash
$ time wrangler publish

✨  Build completed successfully!
✨  Successfully published your script to
 https://fauna-graphql-client.something.workers.dev


real    0m6.783s
user    0m2.664s
sys     0m0.276s
```

## Check After Deploy

```bash
$ curl -X GET -sL 'https://fauna-graphql-client.something.workers.dev' | jq
{
  "allTodos": {
    "data": [
      {
        "_id": "326631268169024082",
        "title": "Build an awesome app!",
        "completed": false,
        "__typename": "Todo"
      }
    ],
    "__typename": "TodoPage"
  }
}
```
