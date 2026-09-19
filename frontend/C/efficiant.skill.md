# Copilot Token-Efficient Development Skill

## Mission

Work on the project with the **minimum possible Copilot token usage** while still producing correct, production-quality code.

Primary rule:

> **Do not spend tokens on information that is not required to complete the user's current task.**

Optimize for:

1. Correctness
2. Minimal file reading
3. Minimal code generation
4. Minimal tool/command usage
5. Minimal explanations
6. Reuse of existing code
7. No unnecessary refactoring

---

# 1. READ MINIMUM, NOT EVERYTHING

Never inspect the entire repository unless explicitly requested.

Before changing code:

1. Identify the relevant file.
2. Read only that file.
3. Read directly related files only if necessary.
4. Make the change.
5. Stop.

Do NOT automatically inspect:

```text
node_modules/
dist/
build/
.git/
coverage/
all components
all pages
all API files
all configuration files
```

---

# 2. DO NOT REPEAT INFORMATION

If a file or code section has already been inspected, do not read it again unless it changed.

If the architecture is already known, do not rediscover it.

If a dependency is already confirmed, do not check it repeatedly.

Avoid duplicate analysis.

---

# 3. TARGETED SEARCH ONLY

When searching the project, search for the exact:

* Component
* Function
* Route
* Variable
* API endpoint
* Error
* File

Do not perform broad repository searches without a reason.

Prefer:

```text
Search exact component name
```

over:

```text
Search entire project for related concepts
```

---

# 4. MINIMAL FILE CHANGES

Modify only files required for the current task.

If one file can solve the task, change one file.

Do NOT modify unrelated files.

Do NOT reformat unrelated code.

Do NOT rename existing variables/components unless required.

Do NOT restructure the project unless explicitly requested.

---

# 5. REUSE EXISTING CODE

Before creating something new, check whether an existing:

* Component
* Hook
* Utility
* API function
* Style
* Layout
* Validation schema

can be reused.

Prefer:

```text
reuse > modify > create
```

Do not create duplicate components.

---

# 6. NO UNNECESSARY DEPENDENCIES

Do not install a new package if the existing stack can solve the problem.

Before suggesting a dependency, check the existing `package.json` only if necessary.

For a React + Vite + Tailwind project, prefer existing project tools.

Do NOT introduce:

```text
Redux
another HTTP client
another form library
another CSS framework
another router
```

when equivalent functionality already exists.

---

# 7. MINIMAL CODE GENERATION

Generate only the code required for the requested feature.

Do NOT generate:

* Extra examples
* Demo components
* Unused utilities
* Unused functions
* Excessive comments
* Documentation unless requested
* Future features
* Unrequested error systems
* Unrequested abstractions

---

# 8. PRESERVE WORKING CODE

Never rewrite working code just to make it "cleaner."

If the current implementation works:

```text
leave it alone
```

unless the user asks for refactoring.

Make surgical changes.

---

# 9. NO UNREQUESTED FEATURES

If the user requests:

> Add a login button

Only add the login button.

Do NOT automatically add:

* Authentication
* Database changes
* New API
* Dashboard
* Forgot password
* Signup
* OAuth
* Animations

unless required or requested.

---

# 10. ASK ONLY WHEN ABSOLUTELY NECESSARY

Do not ask questions when the existing project provides enough information to make a reasonable implementation.

Ask only when proceeding would risk:

* Data loss
* Security problems
* Breaking architecture
* Ambiguous destructive changes
* Wrong business logic

Otherwise make the smallest reasonable implementation.

---

# 11. GOVERNMENT WEBSITE / PWA PRIORITY

When working on a government-style website or PWA:

Prioritize:

```text
Accessibility
Responsive design
Performance
Security
Clear UX
PWA functionality
```

Do not spend tokens creating unnecessary visual effects.

Avoid unnecessary:

```text
animations
gradients
glassmorphism
complex transitions
decorative components
```

---

# 12. PWA TOKEN-EFFICIENT RULE

When implementing PWA functionality:

First check whether PWA support already exists.

Only inspect:

```text
package.json
Vite/PWA configuration
manifest
service worker
main application entry
```

when relevant.

If PWA is already configured:

> Modify the existing configuration instead of creating a second PWA system.

Do not create duplicate:

```text
manifest files
service workers
install prompts
PWA plugins
icons
```

---

# 13. RESPONSIVE UI

For UI changes:

Check the existing component first.

Modify its responsive classes directly when possible.

Prefer:

```text
Tailwind utility modification
```

over creating new CSS files.

Do not create a new CSS abstraction for a small styling change.

---

# 14. COMPONENT RULE

Create a new component only when:

* The UI is reused.
* The existing component is becoming unnecessarily large.
* Separation materially improves maintainability.

For a one-time small UI section, keep it in the existing component.

---

# 15. ERROR FIXING MODE

When the user reports an error:

First identify the exact error.

Then:

1. Find the relevant file.
2. Locate the failing code.
3. Fix the smallest possible section.
4. Do not rewrite the whole feature.
5. Do not refactor unrelated code.

Do not inspect unrelated files.

---

# 16. DEBUGGING

Use the smallest diagnostic action.

Bad approach:

```text
Analyze entire project
Analyze all dependencies
Read every component
Read every API
```

Preferred:

```text
Identify error
→ locate file
→ inspect relevant code
→ fix
→ verify
```

---

# 17. TERMINAL COMMANDS

Use concise commands.

Prefer:

```bash
git status --short
npm run build
```

instead of commands producing huge output.

Avoid repeatedly running the same command.

Do not run expensive commands unless necessary.

---

# 18. TESTING

Test only what was changed.

For example:

If changing:

```text
Login.jsx
```

test the login flow.

Do not run a complete application-wide analysis unless required.

For a production build, use the project's existing build command when appropriate.

---

# 19. GIT

When asked to commit/push:

Use the minimum Git workflow:

```bash
git status --short
git diff --stat
git add <required-files>
git commit -m "<short message>"
git push
```

Do not print huge diffs.

Do not inspect the entire Git history.

Never automatically use:

```bash
git reset --hard
git clean -fd
git push --force
```

---

# 20. SECRETS

Never read or print secret values.

Be especially careful with:

```text
.env
.env.local
.env.production
credentials
API keys
private keys
tokens
JWT secrets
database passwords
```

If a secret is detected in Git changes:

```text
STOP
```

Do not commit it.

---

# 21. RESPONSE TOKEN OPTIMIZATION

Keep responses extremely short.

After completing a task, respond with:

```text
Done.

Changed:
- <file>: <change>

Verified:
- <test/build/result>
```

If there is an error:

```text
Blocked.

Reason:
<short reason>

Required:
<single next action>
```

Do NOT provide long explanations unless the user asks.

---

# 22. CODE COMMENT RULE

Comments consume tokens and increase maintenance cost.

Only add comments when the code would otherwise be genuinely difficult to understand.

Do NOT add comments such as:

```js
// Set the name
setName(name);
```

Prefer self-explanatory code.

---

# 23. NO UNNECESSARY DOCUMENTATION

Do not create or modify:

```text
README
CHANGELOG
documentation
comments
architecture docs
```

unless explicitly requested or necessary.

---

# 24. NO AUTOMATIC REFACTORING

Never combine a feature request with a refactor.

For example:

User:

> Fix the navbar on mobile.

Do:

```text
Fix navbar mobile behavior.
```

Do NOT also:

```text
rewrite navbar
rename components
change folder structure
replace Tailwind classes
change routing
```

---

# 25. NO AUTOMATIC FORMATTING

Do not reformat the entire file if only a small section needs modification.

Preserve the project's existing formatting.

---

# 26. NO DUPLICATE LOGIC

Before adding logic, check the immediate relevant file for existing implementation.

If existing logic can be reused, reuse it.

Do not create:

```text
getUser()
fetchUser()
loadUser()
retrieveUser()
```

when one existing function already performs the required operation.

---

# 27. CONTEXT WINDOW MANAGEMENT

Keep active context small.

Prioritize:

```text
Current task
Relevant file
Relevant function/component
Relevant error
Existing architecture needed for the change
```

Deprioritize:

```text
Unrelated files
Old implementations
Large generated files
Dependencies
Build output
Git history
```

---

# 28. WHEN USER PROVIDES CODE

If the user provides the relevant code:

**Use that code directly.**

Do not search the repository for the same code unless necessary.

Do not ask the user to provide it again.

---

# 29. WHEN USER SAYS "NEXT"

Continue from the current implementation state.

Do not repeat previous completed steps.

Do not explain previous steps again.

Only perform the next required step.

---

# 30. WHEN USER SAYS "WORKING"

Treat the reported feature as complete.

Do not inspect or modify that feature again unless the user reports a problem.

Example:

```text
User: Cloudinary upload working.

Copilot:
Treat Cloudinary upload as complete.
Move to the next required feature.
```

---

# 31. PROJECT MEMORY

Once the project architecture has been established during the current session, reuse that knowledge.

Example:

```text
Frontend: React + Vite + Tailwind
Backend: Node + Express
Database: MongoDB
Auth: JWT
```

Do not repeatedly rediscover these facts.

---

# 32. CHANGE SUMMARY

At the end of a task, report only:

```text
Done.
Files changed: <number>
Main change: <one sentence>
Verification: <result>
```

Do not produce a long summary.

---

# 33. GOLDEN RULE

Before every action, ask internally:

> "Is this necessary to complete the user's current request?"

If NO:

```text
Do not do it.
```

If YES:

```text
Do the smallest version that works.
```

---

# DEFAULT EXECUTION PATTERN

For every coding task:

```text
1. Understand request
2. Identify relevant file(s)
3. Read minimum required code
4. Reuse existing implementation
5. Make smallest correct change
6. Verify only affected functionality
7. Stop
8. Give concise result
```

Never turn a small task into a large refactor.

# END
