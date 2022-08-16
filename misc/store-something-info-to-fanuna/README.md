## Test Rss URL

XML 形式であること
以下はうまくいった例
RSS パースがうまくいかない場合はこける

```bash
https://www.reddit.com/r/news/.rss

https://www.reddit.com/r/Firebase/.rss

https://tympanus.net/codrops/tag/locomotive-scroll/feed/

https://hashnode.com/n/programming-blogs/rss

https://qiita.com/tags/react/feed

https://zenn.dev/topics/rust/feed

#https://hnrss.github.io/
https://hnrss.org/newest?q=shopify
```

## Set Profile

Cloudflare にログイン後、アカウント ID を確認し、toml ファイルに記載する

```
$ wrangler whoami
```

## Set Env

```bash
$ wrangler secret put SLACK_WEBHOOK_URL
```

## Serve Dev

```bash
$ wrangler dev
```

## Check After Serve Dev

```bash
$ curl -sL 'http://127.0.0.1:8787/?feedURL=https://tympanus.net/codrops/tag/locomotive-scroll/feed/' | awk 4
{"status":0,"message":"something ok"}

$ curl -sL 'http://127.0.0.1:8787/api/store-something-info-to-fanuna?feedURL=https://tympanus.net/codrops/tag/locomotive-scroll/feed/' | awk 4
{"status":0,"message":"something ok"}
```

## Deploy

```bash
$ time wrangler publish
✨  Build completed successfully!
✨  Successfully published your script to
 https://store-something-info-to-fanuna.something.workers.dev

real    0m5.801s
user    0m4.593s
sys     0m0.413s
```

## Check After Deploy

```bash
$ curl -sL 'https://store-something-info-to-fanuna.something.workers.dev/?feedURL=https://tympanus.net/codrops/tag/locomotive-scroll/feed/' | awk 4
{"status":0,"message":"something ok"}

$ curl -sL 'https://store-something-info-to-fanuna.something.workers.dev/api/store-something-info-to-fanuna/?feedURL=https://tympanus.net/codrops/tag/locomotive-scroll/feed/' | awk 4
{"status":0,"message":"something ok"}
```

## Load Data

```bash
$ time node -r esm load.js

$ time node -r esm load2.js
```

## Select Data

```bash
$ time node -r esm select.js
```

## Online Tool

- https://transform.tools/json-to-graphql
- https://www.json2sdl.com/
