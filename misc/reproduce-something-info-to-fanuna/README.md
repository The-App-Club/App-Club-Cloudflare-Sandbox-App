## Set Profile

Cloudflare にログイン後、アカウント ID を確認し、toml ファイルに記載する

```
$ wrangler whoami
```

## Set Env

```bash
$ wrangler secret put FAUNA_DB_SERVER_KEY
```

## Serve Dev

```bash
$ wrangler dev
```

## Check After Serve Dev

```bash
$ time curl -sL 'http://127.0.0.1:8787/api/clean-something-info-from-fanuna' | awk 4
{"status":0,"message":"something ok"}

real    0m3.271s
user    0m0.003s
sys     0m0.014s

#beloww do it after 60 seconds
$ time curl -sL 'http://127.0.0.1:8787/api/index-something-info-to-fanuna' | awk 4
{"status":0,"message":"something ok"}

real    0m4.151s
user    0m0.018s
sys     0m0.000s

$ time curl -sL 'http://127.0.0.1:8787/api/patch-something-info-to-fanuna' | awk 4
{"status":0,"message":"something ok"}

real    0m0.311s
user    0m0.004s
sys     0m0.013s
```

## Deploy

```bash
$ time wrangler publish
✨  Build completed successfully!
✨  Successfully published your script to
 https://reproduce-something-info-to-fanuna.something.workers.dev


real    0m6.445s
user    0m2.691s
sys     0m0.295s
```

## Check After Deploy

```bash
$ time curl -sL 'https://reproduce-something-info-to-fanuna.something.workers.dev/api/clean-something-info-from-fanuna' | awk 4
{"status":0,"message":"something ok"}

real    0m1.659s
user    0m0.022s
sys     0m0.011s

#beloww do it after 60 seconds
$ time curl -sL 'https://reproduce-something-info-to-fanuna.something.workers.dev/api/index-something-info-to-fanuna' | awk 4
{"status":0,"message":"something ok"}

real    0m4.356s
user    0m0.016s
sys     0m0.012s

$ time curl -sL 'https://reproduce-something-info-to-fanuna.something.workers.dev/api/patch-something-info-to-fanuna' | awk 4
{"status":0,"message":"something ok"}

real    0m1.192s
user    0m0.032s
sys     0m0.000s
```
