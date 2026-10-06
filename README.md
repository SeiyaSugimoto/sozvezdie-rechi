# Созвездие речи — 公開・運用ガイド

ロシア・モスクワ州Солнечногорскの言語・発達支援センターの公式サイトです。Next.js App Router / TypeScript / Tailwind CSS / Sanity / Next Imageを使用し、表示言語はロシア語です。

**現在の状態：公開可能なソースと設定を準備済みです。まだインターネットへデプロイしていません。GitHub・Vercelのログイン、Sanityの実プロジェクト接続、ロシア国内からの実接続確認は未実施です。**

## 1. 最初にする操作

1. [GitHubの新規リポジトリ画面](https://github.com/new)を開きます。ログイン画面が出たら、ご自身でログインしてください。
2. Repository nameに `sozvezdie-rechi` と入力します。ソースの公開が不要なら **Private** を選びます。サイト自体は後で誰でも見られるように公開できます。
3. **Add a README file / Add .gitignore / Choose a license** は追加しません。このプロジェクトに既に必要なファイルがあります。
4. **Create repository** を押します。
5. 作成されたページのリポジトリURLを控えます。例の `YOUR_ACCOUNT` は、ご自身のアカウント名へ置き換えてください。

```sh
cd /Users/seiyasugimoto/Documents/Codex/2026-10-06/files-pasted-by-the-user-web/outputs/sozvezdie-rechi
git status
git add .
git commit -m "Prepare production website"
git remote add origin https://github.com/YOUR_ACCOUNT/sozvezdie-rechi.git
git push -u origin main
```

このフォルダは `main` ブランチのGitリポジトリとして初期化しています。既にコミットしていたら、不要な再コミットはありません。既存のremoteがある場合は `git remote -v` で確認し、重複して `remote add` しません。

Gitに氏名・メールの設定を求められた場合は、このリポジトリだけに設定します。

```sh
git config user.name "GitHubで使用する名前"
git config user.email "GitHubに登録したメール、またはGitHubのnoreplyメール"
```

GitHubが認証を求めたらご自身で完了してください。HTTPS認証でアカウントの通常のパスワードは使用できません。Git Credential ManagerやGitHub CLIのブラウザー認証、またはGitHubで作成した適切な権限のトークンを使います。トークンをリポジトリURL・ソース・チャットに書かないでください。

## 2. ローカル起動と品質確認

Node.js **24.x** を使用します。

```sh
npm install
npm run dev
```

[ローカルサイト](http://localhost:3000)を開きます。既にある `node_modules` を引き継がず再現可能なインストールを行う場合は `npm ci` を使用します。

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`.next` は生成ファイルです。開発サーバーを止めてから本番ビルドを実行してください。`npm start` は本番ビルド後にstandalone用の写真・フォント・静的ファイルをコピーして標準Nodeサーバーを起動します。

公開後、次のコマンドで全7ページ・ロシア語・canonical・robots・サイトマップ・画像最適化・404をまとめて確認できます。

```sh
npm run verify:deployment -- https://実際の公開ドメイン
```

このコマンドの成功は、実行した場所からの到達性を確認するものです。ロシア国内からのアクセス保証にはなりません。CMSで電話番号を変更した場合もページの電話リンクを検出する構成です。

## 3. Vercelへの公開

1. [Vercel](https://vercel.com/login)を開き、ご自身でログインします。
2. ダッシュボードで **Add New → Project**（または **New Project**）を押します。
3. **Import Git Repository** でGitHubを選びます。接続を求められたら **Continue with GitHub / Install** 等からご自身で接続し、今回のリポジトリへのアクセスを許可します。
4. `sozvezdie-rechi` の横の **Import** を押します。表示されなければ **Adjust GitHub App Permissions** から対象リポジトリを許可します。
5. 以下の設定を確認します。

| Vercel項目 | 設定 |
| --- | --- |
| Framework Preset | **Next.js**。通常自動検出されます |
| Root Directory | このフォルダだけをpushした場合は **`.` / リポジトリルート**。親フォルダ全体をpushした場合のみ `outputs/sozvezdie-rechi` 等の実際のパス |
| Node.js Version | **24.x**。`package.json` の engines と一致させます |
| Build Command | `npm run build`（標準設定） |
| Install Command | `npm ci`。標準のnpmインストールでも可 |
| Output Directory | **Overrideをオフ／標準のまま**。`out` や `dist` を指定しません |
| Production Branch | `main` |
| Environment Variables | 次の節の値を入力 |

Vercel用の `vercel.json`、独自Functions、独自ストレージ、Cron、ログイン機能は不要です。標準のNext.jsとして検出されます。

6. **Environment Variables** を開きます。最初はCMSなしで公開する場合、`CMS_PROVIDER=local` を **Production** に設定します。初期コンテンツと提供写真が表示されます。
7. Sanityを接続済みなら、`CMS_PROVIDER=sanity`、プロジェクトID、データセット、必要な読み取りトークンを設定します。
8. **Deploy** を押します。
9. **Ready** になったら、**Visit** または **Domains** に表示される安定したProduction URL（例：`https://プロジェクト名.vercel.app`）を開きます。
10. **ログアウト状態またはシークレットウィンドウ** でも開けることを確認します。生成された個別Deployment URLとProduction domainは保護状態が異なる場合があります。誰でも見られるProduction domainを案内してください。公開サイトにVercelログインが必要な場合は、**Settings → Deployment Protection** のProductionへの保護設定を見直します。Previewの保護まで解除する必要はありません。
11. **Settings → Environment Variables** で `NEXT_PUBLIC_SITE_URL` に、このProduction URLを設定し **Save** します。**Deployments → 最新のデプロイ → … → Redeploy** で反映します。
12. StudioやブラウザーからCMSへアクセスする構成のCORSを、後述のとおり設定します。

初回で公開URLが分からなくても、Vercelの **Enable access to System Environment Variables** を有効にしておけば `VERCEL_PROJECT_PRODUCTION_URL` からcanonical等を生成します。次点は `VERCEL_URL` です。明示した `NEXT_PUBLIC_SITE_URL` が最優先なので、Vercel以外へ移す場合もこの値だけで切り替えられます。VercelのPreviewは検索対象にせず、robotsでクロールを制限します。

Vercelの契約プランは公式サイト／事業用途に適したものをご自身で選択してください。プランの申込み・支払いは自動実行していません。

## 4. 環境変数一覧

`.env.example` を `.env.local` にコピーして設定します。実際のIDや秘密トークンは `.env.local` またはホスティングの環境変数画面にのみ入力します。

| 変数 | 用途・設定 | 必要な場所 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://実際のドメイン`。パス、認証情報、クエリなし。本番でlocalhostやHTTPを指定するとエラー | 本番ビルド・実行。Vercelの初回は自動URLで代替可能 |
| `CMS_PROVIDER` | `local` は初期データ、`sanity` は公開済みCMS。未指定はプロジェクトIDの有無から判定 | ビルド・実行 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | SanityプロジェクトID | Sanity使用時のビルド・実行、Studio、seed |
| `NEXT_PUBLIC_SANITY_DATASET` | 通常 `production` | Sanity使用時。未指定も `production` |
| `SANITY_API_VERSION` | 固定値 `2026-10-01`。SDKやCMS仕様の変更時に確認して更新 | Sanity取得・seed。未指定もこの固定値 |
| `SANITY_API_READ_TOKEN` | **秘密情報・サーバー専用**。Private datasetの場合のみViewer等の読取権限 | Sanity読取を行うビルド・実行。Public datasetでは不要 |
| `SANITY_API_WRITE_TOKEN` | **秘密情報**。初期データ登録用のEditor等の書込権限 | ローカル `npm run seed` のみ。VercelとDocker runtimeには登録しない |
| `SANITY_STUDIO_PROJECT_ID` | Studioだけ別プロジェクトを選ぶ場合の任意上書き | Studioのビルド・実行。通常不要 |
| `SANITY_STUDIO_DATASET` | Studioの任意データセット上書き | Studioのビルド・実行。通常不要 |
| `VERCEL_PROJECT_PRODUCTION_URL` | Vercelが自動提供するProduction domain。schemeなし | Vercelのみ。手入力不要 |
| `VERCEL_URL` | Vercelが自動提供するDeployment domain。schemeなし。前項がない場合の代替 | Vercelのみ。手入力不要 |
| `VERCEL_ENV` | Vercelが自動提供するproduction / preview / development | Vercelのみ。Previewのrobots判定に使用 |
| `NODE_ENV` | 開発・本番の判定 | Next.js／ホストが設定。通常手入力不要 |
| `PORT` / `HOSTNAME` | サーバー待受。Dockerは3000 / 0.0.0.0 | Node.js・Docker実行時 |
| `NEXT_TELEMETRY_DISABLED` | Docker内は `1`。Next.js CLIのテレメトリー設定 | 任意。フレームワーク制御用 |

`NEXT_PUBLIC_` は公開可能な設定専用です。ID・データセット名は秘密情報ではありません。トークンにこの接頭辞を付けません。NEXT_PUBLIC系と静的HTML・SEOの設定は**ビルド時に確定**するため、変更後は再ビルド／再デプロイします。

## 5. Sanityの本番設定

### プロジェクトと初期登録

1. [Sanity Manage](https://www.sanity.io/manage)でご自身でログインし、プロジェクトを作成します。
2. Project IDを確認し、`production` datasetを作ります。
3. `NEXT_PUBLIC_SANITY_PROJECT_ID` と `NEXT_PUBLIC_SANITY_DATASET` をローカルとVercelに登録します。
4. 公開サイト用の情報だけを保存する場合は **Public dataset** を選べます。このサイトのサーバー読取にトークンは不要です。患者情報・相談内容などを登録する用途ではありません。
5. Private datasetを選ぶ場合は **API → Tokens → Add API token** で読取権限を持つトークンを作り、`SANITY_API_READ_TOKEN` に登録します。Studioへのログインは運営者のSanityアカウントで行います。
6. 初期登録用の書込トークンを `SANITY_API_WRITE_TOKEN` にローカルだけ設定します。
7. 次を実行します。

```sh
npm run seed
npm run studio
```

seedは既存ドキュメントを上書きしません。既存CMSデータに新しい写真や修正を反映する場合はStudioで編集してください。初期登録後、書込トークンを削除・失効させて構いません。

8. `О центре` と `Контакты`、サービス・先生などを確認して公開します。
9. ローカルとVercelで **`CMS_PROVIDER=sanity`** に変更し、サイトを再ビルドします。`.env.example` のlocalのままではCMS更新は反映されません。

API Versionは固定しており `useCdn:false` でサーバーから取得します。公開済みコンテンツだけを取得し、Next.js標準キャッシュの再検証間隔は60秒です。隠した先生・口コミや終了した求人を仮データで補充しません。CMS障害時は再生成を失敗させ、ISRで既に生成されたページを維持できる場合はそのページを表示します。初回ビルドでSanityに接続できない場合は公開を失敗させます。公開済みの `about` / `contacts` がない場合も明示的にエラーにします。

### CORSと本番ドメイン

**今回の一般公開サイトはサーバーからSanityへアクセスするため、公開サイトのドメインをCORSに加えなくてもコンテンツ取得できます。** CORSはブラウザーに対する制御で、サーバー通信の可否を決めません。Next/Imageもホスト側からSanity画像を取得します。

StudioはブラウザーからAPIへアクセスするためCORS設定が必要です。

1. Sanity Manageで対象プロジェクトを選択。
2. **API → CORS origins → Add CORS origin**。
3. ローカルStudioには `http://localhost:3333`（実際に表示されたポート）を登録し **Allow credentials** をオン。
4. 公開Studioには `https://実際のStudioドメイン` を登録し **Allow credentials** をオン。
5. `sanity deploy` が自動追加していたら重複追加しません。ログインと編集ができるか確認します。
6. 公開サイトのURLも登録したい場合、または将来ブラウザー取得を導入する場合は `https://実際のサイトドメイン` を追加します。公開読取だけならcredentialsはオフ。**`https://*.vercel.app` のような全サービス共通ワイルドカードにcredentialsを許可しないでください。**

### Studioの公開・運用

公開サイトと別URLにStudioを置く構成を推奨します。

```sh
npm run studio:deploy
```

ご自身でSanity CLIへのログインを完了し、希望のホスト名を選ぶと `https://希望名.sanity.studio` に公開されます。運営者をプロジェクトのメンバーとして招待し、必要な編集権限を与えます。一般訪問者に編集トークンやアカウントを渡しません。

Studioも移行先ホストへ置く場合は `npm run studio:build` で `dist/` を生成し、**別の静的サイト／サブドメイン**で配信します。SPAの全パスをindex.htmlへ戻す設定と、そのStudio URLのCORS許可が必要です。一般公開サイト側は引き続きNext.jsとして配信します。

**StudioのHTMLを自前ホストへ移しても、Sanityの認証・API・Content Lakeへの依存は残ります。** ロシア国内からStudioへログインし、ドキュメントを開き、写真をアップロードし、公開できるかを実際に確認してください。地域ごとの利用可否を保証する設定はありません。

## 6. 内容・写真の編集

CMSメニューと編集項目はロシア語です。Sanity標準の操作バー・認証画面はSanityの標準言語です。

- **Специалисты**：氏名、役職、専門、経験、教育、資格、紹介、対応領域、写真、証明書・卒業証書、順序、表示。
- **Услуги**：名称、説明、写真、アイコン、対象、時間、料金、価格表示、個別／グループ、順序、有効状態。
- **Отзывы / Вакансии / О центре / Контакты / Галерея**：口コミ、求人、紹介、電話・住所・SNS・営業時間、写真を編集できます。

新しい先生・サービスはStudioで新規ドキュメントを作り、表示・有効をオンにして公開します。小さい「Порядок отображения」順に表示します。サービスの「Адрес раздела」は英小文字・数字・ハイフンの一意な値にします。

写真はStudioからアップロードしてロシア語のaltを設定します。ローカル配信にする場合は `public/images/` に追加し、CMSの「Путь к локальному фото」に `/images/ファイル名.jpg` を入力して再デプロイします。CMSアップロードだけなら再デプロイは不要です。

現在はユーザー提供の `IMG_7454.JPG` をメイン、`IMG_7453.JPG` をセンター紹介に使用しています。実際の先生情報はまだ仮データです。仮の口コミは実際の声として表示しません。実データを入力し `Это пример` をオフにすると通常の表示になります。

## 7. ロシア国内からのアクセス

**ロシアからの到達性は、Vercelでビルドが成功することや独自ドメインを付けることだけでは保証できません。** ISP・地域・接続回線・共有IP・時期で状況が異なります。

Vercel Communityにはロシアの特定ISPやIP範囲で接続できないという利用者報告があります。全国一律のブロックと断定していません。公開URL・Studio URLを確定した後、センター周辺の固定回線と複数の携帯回線で、VPNを使わない通常の状態で確認してください。

| 対象 | 確認すること |
| --- | --- |
| サイト本文 | トップ・サービス・連絡先が最後まで表示される |
| 画像・フォント | 写真、キリル文字、文字サイズが正常である |
| 電話 | ボタンから電話番号が開く |
| Studio | ログイン、先生や料金の編集、写真アップロード、公開ができる |
| CMS更新 | 更新後、通常60秒程度を目安にサイトへ反映される。ISRなので次のアクセスで再検証する場合あり |

依存は次のように整理しています。

- Manropeはライセンス同梱のローカルフォント。ビルド時・閲覧時ともGoogle Fontsへの通信不要。
- 初期写真・favicon・CSS・JSは同じサイトから配信。
- CMS内容はサーバーでHTMLへ描画し、重要情報を外部JavaScriptへ委ねない。
- CMS画像はNext/Imageの同一オリジンURLを通してホスト側で最適化。初回取得・再取得時にはサーバーからSanityへ接続が必要。
- 外部地図は必須情報の表示条件にしない。住所・電話をHTMLで表示し、Yandexへのリンクを提供。地図を埋め込んだ場合のみYandex iframeを読み込む。
- Vercel SDK、Vercelストレージ、Vercel専用APIは使用しない。

CloudflareもロシアのISPによるスロットリングを報告しているため、単に別の海外CDNへ変更すれば解決するとは考えません。問題があれば、実回線で確認できるNode.js／Docker対応ホストへサイト本体とローカル素材を移す方針です。Sanity自体への接続が不安定なら、国内等で運用可能なCMSへデータを移行します。現時点でSanityがロシア全域から利用できないと断定できる検証は行っていません。

参考：

- [Vercel Community：ロシアの一部ISPからの到達性に関する報告](https://community.vercel.com/t/48756)
- [Cloudflare：ロシアのISPによる制限の報告](https://blog.cloudflare.com/russian-internet-users-are-unable-to-access-the-open-internet/)
- [Sanity Studioのネットワーク要件](https://www.sanity.io/docs/studio/system-requirements)

## 8. Vercel以外へ移行する

### Node.jsホスト／VPS

Node.js 24、HTTPS対応のリバースプロキシ（Nginx等）を用意し、環境変数を登録して以下を実行します。

```sh
npm ci
npm run build
npm start
```

プロセス管理（systemd等）、TLS証明書、再起動、バックアップはホスト側で設定します。標準のNext.js画像最適化に必要な `sharp` を明示的に依存へ追加しています。

軽量なstandalone出力で運用する場合：

```sh
npm run build
npm run start:standalone
```

準備スクリプトが `public/` と `.next/static/` を `.next/standalone/` にコピーします。配布対象は、このコピー後のstandaloneディレクトリです。標準のNodeサーバーとして動作し、Vercelは不要です。

### Docker

シンプルな3段階ビルドのDockerfileを同梱しています。最終コンテナは非rootの `node` ユーザーで実行します。`.env` とGit情報はビルドコンテキストへ送りません。

CMSなしで公開する例（URLはご自身のドメインに置き換える）：

```sh
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.example \
  --build-arg CMS_PROVIDER=local \
  -t sozvezdie-rechi .
docker run -d --restart unless-stopped --name sozvezdie-rechi \
  -p 127.0.0.1:3000:3000 \
  sozvezdie-rechi
```

サーバーのNginx等から `127.0.0.1:3000` に接続し、外部にはHTTPSで公開します。ここでのloopbackは**サーバー内部通信**で、公開ページのURLではありません。

Sanity Public datasetを使う例：

```sh
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.example \
  --build-arg CMS_PROVIDER=sanity \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production \
  -t sozvezdie-rechi .
docker run -d --restart unless-stopped --name sozvezdie-rechi \
  --env-file .env.local \
  -p 127.0.0.1:3000:3000 \
  sozvezdie-rechi
```

実行用のenvファイルには `SANITY_API_WRITE_TOKEN` を入れず、実行時に必要な値のみを含めてください。Private datasetではビルド時にも読取トークンが必要です。BuildKit secretとして渡します。

```sh
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.example \
  --build-arg CMS_PROVIDER=sanity \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID \
  --secret id=sanity_read_token,env=SANITY_API_READ_TOKEN \
  -t sozvezdie-rechi .
```

読取トークンをDockerの `ARG` に書きません。実行時はホストの環境変数／シークレットから `SANITY_API_READ_TOKEN` を渡します。公開ID・CMS選択・URLが変わる場合はイメージを再ビルドします。

Dockerfileは用意済みですが、Dockerがこの作業環境に存在しない場合、実際の `docker build` は確認していません。代わりにstandaloneのNodeサーバーで起動・配信を確認します。

### CMSを移行する

`services/cms/index.ts` が取得の入口、`services/cms/sanity.ts` がSanity専用処理、`services/cms/types.ts` がSanity生データ型です。画面の型は `lib/types.ts` にあり、Sanityのasset参照を含みません。`lib/content.ts` はUI向けの薄い窓口です。

新CMSのadapterを作り、同じ `Content` 型へ変換してproviderを変更します。Sanityクエリ・画像URL生成・トークン処理を各コンポーネントへ持ち込んでいません。画像配信先を変えるときは `photoUrl` の許可条件と `next.config.ts` のremotePatternsも変更します。実データ・画像・承諾情報の移行と検証は別途必要です。

## 9. 独自ドメインへの切替

1. ドメインを取得後、Vercelのプロジェクトで **Settings → Domains → Add** にドメインを入力します。
2. Vercelが表示するDNSレコードをドメイン管理会社のDNS画面へ登録します。ルートドメインはA等、サブドメインはCNAME等が案内されます。**IPやレコード値を推測せず、その画面の現在の値を使います。** Nameserverを全面移行する必要は通常ありません。
3. 検証が完了し、HTTPSで開けることを確認します。
4. Primary／Redirect設定で、wwwあり・なし等の正式URLを一つ選びます。
5. `NEXT_PUBLIC_SITE_URL=https://正式なドメイン` に変更し、再デプロイします。
6. サイトのcanonical・OpenGraph URL・robots・サイトマップが新ドメインになることを確認します。
7. Studioのドメインも変える場合はSanity CORSへ新Studio originを追加し、編集を確認後に不要な旧originを削除します。サイトURLだけ変える場合、サーバーCMS取得のためのCORS更新は必須ではありません。既に登録しているサイトoriginやブラウザー取得がある場合は更新します。
8. 検索サービスへ新サイトマップを登録し、ロシアの回線から再確認します。

## 10. SEO・ロシア語・秘密情報

title・description・OpenGraphはロシア語、`html lang="ru"`、canonical・metadataBase・LocalBusiness JSON-LD・robots・7ページのsitemapを設定します。404と読込エラーもロシア語です。写真／フォントは文字化けなく読み込める構成です。

本番の公開URLがまだ不明なローカル本番ビルドでは、架空のドメインを作らずcanonicalを省略しsitemapは空になります。**公開時は `NEXT_PUBLIC_SITE_URL` またはVercelの自動URLを必ず有効にします。**

Gitには `node_modules/`、`.next/`、`.env`、`.env.*`、`.sanity/`、`.vercel/`、Studio出力 `dist/`、ログを追加しません。`.env.example` は空のトークンと説明のみです。サーバーCMSコードには `server-only` を使い、秘密トークンがクライアントコンポーネントへ混入するとビルド時に検出されます。

## 11. 公開前の残作業

- GitHubリポジトリ作成・pushとVercelのログイン・Import・Deploy。
- 本番URLの確定、匿名アクセス・全ページ・画像・電話・SEOの確認。
- Sanityの実プロジェクト設定、Studio公開、編集者招待、編集・反映の確認。
- 実際の先生の氏名・写真・経歴、営業時間、承諾済み口コミ、SNS URL、料金・求人条件の確定。
- ロシアの固定回線・携帯回線からサイトとStudioの到達性確認。

このプロジェクトにはオンライン予約・決済・訪問者アカウント・複雑なバックエンドは追加していません。

公式資料：

- [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting)
- [Next.js standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
- [Vercel GitHub連携](https://vercel.com/docs/git/vercel-for-github)
- [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables)
- [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection)
- [Vercel独自ドメイン](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Sanity CORS](https://www.sanity.io/docs/content-lake/cors)
- [Sanity Studio hosting](https://www.sanity.io/docs/studio/deployment)
- [Manrope原本・OFLライセンス](https://github.com/google/fonts/tree/main/ofl/manrope)

## 12. 最終確認記録

2026年10月6日：依存インストール、lint、TypeScriptチェック、Next.js本番ビルド成功。仮のVercel自動URLを設定したビルドとstandaloneサーバーで、7ページ、canonical・OpenGraph・robots・sitemap、提供写真、ローカルフォント、Next/Image最適化、ロシア語404を確認しました。確認用の仮ドメインはソースの初期値に保存していません。Sanity Studioも検証用IDで静的ビルド成功、実プロジェクトへの認証・編集は未確認です。Dockerエンジンは未導入のためDockerイメージ自体は未検証です。

`npm audit --omit=dev` は検出0件でした。PostCSSは互換範囲の修正済み版をoverrideし、再ビルドを確認しています。開発用Sanity CLI・ESLint等の依存には全体auditで22件（high 14 / moderate 8）の警告が残っています。公開Nodeサーバーのproduction dependenciesとは分離しましたが、Studioのビルド／開発環境では未解決です。破壊的なメジャーアップデートを強制せず、CLIや開発依存の更新を別途管理してください。

## ギャラリーの運用（運営者向け）

サイトの `/gallery` とトップページの「Галерея」は同じ写真データを使います。トップには並び順の先頭6枚まで表示します。現在の公開設定 `CMS_PROVIDER=local` は保存済みの2枚を表示します。Studioの編集をサイトへ反映するには、このREADMEのSanity接続手順でプロジェクト・データセットを設定し、初期データを登録したうえで、Vercelの `CMS_PROVIDER` を `sanity` に変更して再デプロイしてください。Studioはまだ本番公開されていません。公開後は、そのStudio URLを運営者に共有します。ローカル確認は `.env.local` を設定して `npm run studio` を実行し、表示されたURLを開きます。

運営者向け操作（Studio画面はロシア語の項目名）:

1. 共有されたSanity StudioのURLを開き、招待されたアカウントでログインします。
2. 左側の「Галерея」を開き、新規ドキュメントを作ります。「Фотография」に写真をドラッグするか、アップロード操作で選択します。1ドキュメントにつき1枚です。
3. 「Название」は写真のタイトル、「Подпись」は任意の説明文、「Описание для доступности」は写真の内容を短く説明する文章です。任意の「Категория」は Центр / Занятия / Творчество / Специалисты / События / Другое から選べます。
4. 「Порядок отображения」に 10、20、30 などの数値を入力します。小さい数値が先です。同値なら新しい写真が先です。写真のドラッグはアップロード用で、並び替えはこの数値を編集します。
5. 「Показывать на сайте」をオンにし、ドキュメントのPublish操作を押します。保存だけの下書きは表示されません。
6. 非公開にするには「Показывать на сайте」をオフにして、変更をPublishします。再公開するときはオンに戻してPublishします。
7. 削除するには対象の写真ドキュメントのメニューからDeleteを選び、確認します。再利用する可能性があれば非公開にしておく運用がおすすめです。他のページで使用中の画像アセット自体を消す必要はありません。
8. タイトル・説明文・順序の変更後もPublishしてください。更新は通常約60秒後以降のアクセスで反映されます。キャッシュ再生成のタイミングにより、さらに次のアクセスが必要な場合があります。

縦横比はグリッドで4:5にそろえ、拡大表示では写真全体を表示します。写真編集画面のHotspot（重要な領域）を顔の位置に合わせると、グリッドの切り抜き位置に反映されます。写真の公開前に、写っている方の掲載同意をセンター内で確認してください。

既存の古いgalleryItemの `photo` フィールドは読み取り互換を残していますが、新規作成は `image` を使います。古いドキュメントは新しいフィールドを入力し、`published` をオンにしてPublishしてから表示されます。

## Sanity 接続先と管理画面（2026-10-06）

接続先は Project ID `m0yruyhq`、Dataset `production`。識別子は秘密情報ではありません。StudioとCMSアダプターの既定値として設定し、環境変数で上書き可能にしています。`npm run build` はStudioを `public/studio` にビルドしてからNext.jsをビルドします。管理画面のURLは **https://sozvezdie-rechi.vercel.app/studio** です。独自ドメイン・VPSへの移行後も `/studio` で配信できます。初回はSanityへのログインとCORS許可が必要です。StudioのHTML/JavaScriptは公開ですが、編集操作にはSanityの認証とプロジェクト権限が必要です。Studioは検索対象から除外しています。

初回セットアップ:

1. プロジェクトフォルダーのターミナルで `npm run studio:login` を実行し、ブラウザーからこのプロジェクトを管理するSanityアカウントでログインします。
2. `npm run seed:login` で既存サイトの初期データと2枚の写真を登録します。既存ドキュメントは上書きしません。先生・口コミには既存のサンプル表示フラグを引き継ぎます。
3. `npm run studio:cors` を実行し、確認画面で本番originを許可します。管理画面から行う場合は https://www.sanity.io/manage → 対象プロジェクト → API → CORS Origins → Add CORS origin → `https://sozvezdie-rechi.vercel.app` → Allow credentialsをオン → 保存。URLに `/studio` は付けません。この許可はStudioのログイン済みブラウザー通信のためで、Next.jsサーバーからの読み取りには不要です。
4. Vercel → Project → Settings → Environment Variablesで `CMS_PROVIDER=sanity`、`NEXT_PUBLIC_SANITY_PROJECT_ID=m0yruyhq`、`NEXT_PUBLIC_SANITY_DATASET=production`、`SANITY_API_VERSION=2026-10-01`、`NEXT_PUBLIC_SITE_URL=https://sozvezdie-rechi.vercel.app` をProductionに設定し、再デプロイします。初期データ登録前は `CMS_PROVIDER=local` を維持します。現時点ではPublic datasetへの匿名読み取りが成功しており、READ_TOKENは不要です。WRITE_TOKEN・ログイントークンはVercelに設定しません。
5. Studioへ運営者を招待するにはSanity管理画面のMembersから招待し、必要な編集権限を付けます。料金は「Услуги」の各サービス内の「Стоимость, рубли」「Показывать цену」で編集します。

ログイン情報はローカルの `.sanity-cli/` のみに保存し、GitとDockerから除外します。Studioのスキーマは生成済みバンドルに含まれるため編集画面で有効です。Sanity Dashboardへスキーマ/Studio URLを登録する追加CLI操作はログイン後に実行可能です。`studio:deploy` は別のSanityホストへの公開用で、今回の `/studio` 公開には不要です。

## Sanity Dashboard の埋め込みエラーを解消する（2026-10-06）

`/studio` の直接表示が成功していても、Sanity Dashboardから開くと失敗する場合があります。Studioには `X-Frame-Options: SAMEORIGIN` を付けず、CSPの `frame-ancestors` で自分自身と `https://sanity.io` / `https://*.sanity.io` だけを許可します。その他のサイトページは同一originのみに制限しています。

StudioをManage画面で登録しただけでは、Dashboard用のmanifestとworkspace schemaの登録は完了しません。ブラウザーでのSanityログインとCLIログインも別です。以下をプロジェクトのターミナルで一度実行してください。

```sh
npm run studio:login
npm run studio:register
```

`studio:register` は公式の `sanity deploy --external --url https://sozvezdie-rechi.vercel.app/studio --schema-required` を実行します。Sanityホスティングへ移す操作ではなく、現在のVercel URL・manifest・スキーマを登録する操作です。スキーマ更新後にも実行してください。CLI資格情報は `.sanity-cli/` に保存され、コミットしません。認証前のログイン操作はユーザー自身が行います。

StudioはSanity 6.17.0でビルドします。ビルド時にmanifestを `public/studio/static` にも出力し、存在しないstaticファイルをHTMLに書き換えないルーティングにしています。Dashboardは登録されたmanifestを使うため、静的manifestの公開だけでは代用できません。ビルド済みStudioには公式bridgeスクリプトが含まれます。

CORSは `https://sozvezdie-rechi.vercel.app` のみ、Allow credentialsを有効にします。登録後のチェックで、このoriginに対する `Access-Control-Allow-Origin` と `Access-Control-Allow-Credentials: true` の応答を確認済みです。

公式手順: https://www.sanity.io/docs/dashboard/dashboard-configure
