## 🎯 Hive provides a communication platform similar to [Slack](https://slack.com/). It offers a clean and open surface for thinking, writing, and planning. It is made using NextJS, Tailwind CSS, Typescript,[Convex](https://www.convex.dev/) As Our Database, Authentication, File Storage.

## 🎯 Getting Started
First, Clone The Repo The Repository
```bash
git clone https://github.com/psykat1116/Hive.git
```

## 🎯 Start The Server
Start The Server on the Local Server. Change The Folder Name To Lower Case.
```bash
cd Hive
bun run dev
```

## 🎯 Setup Convex
- Create An Account In [Convex](https://www.convex.dev/).
    ```bash
    bun add convex
    ```

- Create a Convex Project
    ```bash
    bunx convex dev
    ```

- Choose `Create a new project` in the prompt if you have not create any project manually in [Convex Dashboard](https://dashboard.convex.dev) and give the `Project Name` and hit enter. Otherwise select `Choose an existing project` and select the project you want to use.

- After this automatically a `.env.local` file will be created in the root directory and will be populated with `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` variables.

## 🎯 Authentication
- Go To [Convex Auth](https://labs.convex.dev/auth/setup) for documentation and setup authentication as Convex Auth is in Beta. So It Might Be Change In Future.

- Run The Command
    ```bash
    bun add @convex-dev/auth @auth/core@0.37.0
    ```

- Then Run The Command Which Will Automatically Setup The Project Automatically via the library.
    ```bash
    bunx @convex-dev/auth
    ```
- Continue Anyway? - Give `Yes`
- Enter URL Of Local Web Server - Give `http://localhost:3000`

## 🎯 Add Github OAuth
- Go To [Convex Dashboard](https://dashboard.convex.dev) and select the project you created.
- Go To `Settings -> URL & Deploy Keys -> Show Development Crdentials` and copy the `HTTP Actions URL`
- - Go To [Github OAuth](https://github.com/settings/developers) and create a new OAuth App.
- Add the Homepage URL to be
    ```
    {Development HTTP Actions URL}
    ```
- Add the following URL in the `Authorization callback URL` field
    ```
    {Development HTTP Actions URL}/api/auth/callback/github
    ```
- If want to add the environmetal variable manually then open [Convex Dashboard](https://dashboard.convex.dev) select the project and go to `Settings -> Environment Variables` and add the following variables
    - AUTH_GITHUB_ID
    - AUTH_GITHUB_SECRET
    
    This name has to be exactly match otherwise it will fail. To Use Command Line follow the below steps.
- Copy the `Client ID` and run the below command
    ```bash
    bunx convex env set AUTH_GITHUB_ID <yourgithubclientid>
    ```
- Create a new client secret and copy the `Client Secret` and run the below command
    ```bash
    bunx convex env set AUTH_GITHUB_SECRET <yourgithubsecret>
    ```

For More Information Go To [Convex Auth](https://labs.convex.dev/auth/config/oauth).

## 🎯 Add Google OAuth
- Go To [Convex Dashboard](https://dashboard.convex.dev) and select the project you created.
- Go To `Settings -> URL & Deploy Keys -> Show Development Crdentials` and copy the `HTTP Actions URL`
- Go To [Google Dashboard](https://console.cloud.google.com/home/dashboard) and create a new OAuth App.
- The Go To `APIs & Services -> Enable APIs and Services -> OAuth Consent Screen -> Overview -> Get Started`.
- Give the `App Name` and `User Support Email`.
- Give `External` Permission.
- Give Email Address and Create.
- Then Go To `Clients -> Create Client`.
- Choose `Web Application` and give the name.
- Add Authorized Javascript Origins
    ```
    http://localhost:3000
    ```
- Add the following URL in the `Authorized redirect URIs` field
    ```
    {HTTP Actions URL}/api/auth/callback/google
    ```
- If want to add the environmetal variable manually then open [Convex Dashboard](https://dashboard.convex.dev) select the project and go to `Settings -> Environment Variables` and add the following variables
    - AUTH_GOOGLE_ID
    - AUTH_GOOGLE_SECRET
    
    This name has to be exactly match otherwise it will fail. To Use Command Line follow the below steps.
- Copy the `Client ID` and run the below command
    ```bash
    bunx convex env set AUTH_GOOGLE_ID <yourgoogleclientid>
    ```
- Create a new client secret and copy the `Client Secret` and run the below command
    ```bash
    bunx convex env set AUTH_GOOGLE_SECRET <yourgooglesecret>
    ```

For More Information Go To [Convex Auth](https://labs.convex.dev/auth/config/oauth).

## 🎯 Production Settings
After deploying to production, you need to set the environment variables in the production server. You need to follow the below steps.

- Go To [Convex Docs](https://docs.convex.dev/production/hosting/vercel) and deploy by following the steps.
- No need to add any environment variables except `CONVEX_DEPLOY_KEY` that is mentioned in the above step.
- Then Go To [Convex Dashboard](https://dashboard.convex.dev) and select the project you created.
- Change From `Development` to `Production` in the top right corner.
- Then Run The Command
    ```bash
    bunx @convex-dev/auth --prod
    ```
- Give your hosted site URL in the next step `https://{domain}.vercel.app` without forward slash at the end.
- It will automatically add the environment variables in the production server.
- But you have to manually add the `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` in the production server.
- You can repeat the same steps for the production server as well. But For Github OAuth you have to add the `Authorization callback URL` as
    ```
    {Production HTTP Actions URL}/api/auth/callback/github
    ```
- For Google OAuth you have to add the `Authorization callback URL` as
    ```
    {Production HTTP Actions URL}/api/auth/callback/google
    ```
- For Homepage URL in Github OAuth give the hosted site URL as
    ```
    https://{domain}.vercel.app
    ```
- For Authorized Javascript Origins in Google OAuth give the hosted site URL as
    ```
    https://{domain}.vercel.app
    ```
- For Add The Client ID and Client Secret in the production server you can use the command line as well.
  ```bash
    bunx convex env set AUTH_GITHUB_ID <yourgithubclientid> --prod
    bunx convex env set AUTH_GITHUB_SECRET <yourgithubsecret> --prod
    bunx convex env set AUTH_GOOGLE_ID <yourgoogleclientid> --prod
    bunx convex env set AUTH_GOOGLE_SECRET <yourgooglesecret> --prod
    ```
- Otherwise You Can Manually Add The Environment Variables In The Production Server located in the `Settings -> Environment Variables` in production server.

## 🎯 Tell Me You Face Any Problem During The Development & Production Into My Email From This [Profile](https://github.com/psykat1116) Or Tell Me In Issue Section. Tell Me You Want To Suggest Any Update. 