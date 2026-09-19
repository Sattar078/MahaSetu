# GitHub Push Skill

## Purpose

Safely and efficiently push the current project code to GitHub while using the minimum possible Copilot tokens.

The goal is:

* Check the current Git state.
* Review only relevant changes.
* Create a concise commit.
* Push to the correct remote/branch.
* Avoid unnecessary explanations, file scans, or code modifications.
* Never destroy or overwrite user work.

---

## Core Rules

### 1. Inspect Before Acting

Before modifying anything, run only the minimum required commands:

```bash
git status --short
git branch --show-current
git remote -v
```

Do NOT scan the entire project unless required.

Do NOT read every file.

Do NOT analyze code quality unless explicitly requested.

---

### 2. Determine What Needs to Be Committed

Use:

```bash
git status --short
```

If changes exist, inspect the diff:

```bash
git diff --stat
git diff --cached --stat
```

Only inspect detailed diffs when necessary to understand what will be committed.

Prefer targeted inspection:

```bash
git diff -- path/to/file
```

Avoid:

```bash
git diff
```

on very large projects unless necessary.

---

### 3. Never Commit Unwanted Files

Before committing, check for common unwanted files:

```text
.env
.env.*
node_modules/
dist/
build/
coverage/
*.log
.DS_Store
.vscode/
.idea/
```

If these are already correctly ignored, do nothing.

If a sensitive file such as `.env` appears as an untracked/staged file:

**STOP. Do not commit it.**

Tell the user that a potentially sensitive file is detected.

Never print secret values.

---

## Gitignore Check

If an unwanted file is untracked and not ignored, suggest adding the appropriate pattern to `.gitignore`.

Do not modify `.gitignore` automatically if doing so could hide an important user file.

For normal generated files, adding the appropriate ignore rule is acceptable when clearly safe.

---

## 4. Check Remote

Use:

```bash
git remote -v
```

If a remote already exists, use it.

Do NOT create a new remote automatically.

If no remote exists, stop and tell the user that the GitHub remote needs to be configured.

---

## 5. Check Branch

Use:

```bash
git branch --show-current
```

Push to the current branch unless the user explicitly specifies another branch.

Do not rename branches automatically.

For the first push of a branch, use:

```bash
git push -u origin <current-branch>
```

For subsequent pushes:

```bash
git push
```

---

## 6. Commit Strategy

Create a short, meaningful commit message based only on the actual changes.

Examples:

```text
feat: add product image upload
fix: resolve auth validation issue
feat: add address management
refactor: improve product controller
docs: update README
chore: update dependencies
```

Do not generate long commit messages.

Do not use generic messages such as:

```text
update
changes
final
new changes
code
```

unless the changes genuinely cannot be categorized.

---

## 7. Stage Changes

Prefer:

```bash
git add <specific-files>
```

when the changed files are clearly known.

Use:

```bash
git add .
```

only when all current changes are intended to be committed and no sensitive/unwanted files are present.

Never use:

```bash
git add -A
```

blindly on an unfamiliar repository.

---

## 8. Verify Staging

After staging:

```bash
git diff --cached --stat
```

If necessary, inspect specific staged files:

```bash
git diff --cached -- path/to/file
```

Do not repeatedly inspect the same diff.

---

## 9. Commit

Create exactly one focused commit:

```bash
git commit -m "<short commit message>"
```

Avoid multiple commits unless the user explicitly asks for them.

---

## 10. Push

After a successful commit:

```bash
git push
```

If the branch has no upstream:

```bash
git push -u origin <current-branch>
```

Never force push by default.

Never use:

```bash
git push --force
git push -f
```

unless the user explicitly requests it and the consequences are clearly explained.

---

## 11. Handle Push Failures Efficiently

### Authentication failure

Do not repeatedly retry.

Report that GitHub authentication needs to be fixed.

### Non-fast-forward error

Do NOT automatically overwrite remote history.

First inspect:

```bash
git status
git log --oneline --decorate -5
```

Then tell the user that the remote contains changes that are not present locally.

### Merge/rebase conflict

Stop.

Do not automatically resolve conflicts.

Tell the user which files are conflicted.

### Network failure

Retry at most once if appropriate.

Do not repeatedly execute the same command.

---

# Token Optimization Rules

## Minimize Tool Calls

Use the smallest useful command sequence.

Typical workflow:

```bash
git status --short
git branch --show-current
git remote -v
git diff --stat
git add <files>
git diff --cached --stat
git commit -m "<message>"
git push
```

Do not run commands that provide redundant information.

---

## Avoid Large Outputs

Prefer:

```bash
git status --short
git diff --stat
git log --oneline -5
```

instead of huge outputs.

Do not print:

* complete source files
* complete Git logs
* complete dependency trees
* complete diffs

unless required.

---

## Avoid Unnecessary Reasoning

Do not explain basic Git concepts unless the user asks.

Do not provide tutorials after a successful push.

After success, provide only:

```text
Pushed successfully.

Branch: <branch>
Commit: <short hash> <commit message>
Remote: <remote>
```

---

# Safety Rules

Never automatically:

```bash
git reset --hard
git clean -fd
git checkout -- .
git restore .
git push --force
git push --force-with-lease
```

These can destroy user work or rewrite history.

Ask for confirmation before any destructive Git operation.

---

# Existing Changes Rule

If the repository contains unrelated existing changes:

Do NOT automatically commit everything.

Separate the intended changes from unrelated changes whenever possible.

If it is unclear which changes belong to the current task, ask the user.

---

# Monorepo / Full-Stack Rule

For projects containing multiple applications such as:

```text
frontend/
backend/
```

do not assume that all changes should be committed together.

Check:

```bash
git status --short
git diff --stat
```

If the changes clearly belong to the same completed feature, one commit is acceptable.

If they represent unrelated work, keep them separate.

---

# GitHub Push Completion Checklist

Before declaring success:

* [ ] Correct repository detected
* [ ] Correct branch detected
* [ ] No secrets staged
* [ ] No `node_modules` staged
* [ ] No build artifacts accidentally staged
* [ ] Intended files staged
* [ ] Commit created successfully
* [ ] Push completed successfully

Only report success after the push command succeeds.

---

# Default Behavior

When the user says:

> Push my code to GitHub

execute this workflow:

```bash
git status --short
git branch --show-current
git remote -v
git diff --stat
```

Then:

1. Check for sensitive/unwanted files.
2. Determine whether all changes are intended.
3. Stage the appropriate files.
4. Verify staged summary.
5. Create one concise commit.
6. Push to the current branch.
7. Report the result briefly.

Do not modify application code.

Do not refactor.

Do not fix unrelated bugs.

Do not install packages.

Do not change project configuration unless required for GitHub pushing.

Do not create a README unless explicitly requested.

Do not create GitHub Actions unless explicitly requested.

Do not create releases/tags unless explicitly requested.

---

# Response Style

Keep responses extremely concise.

### Success

```text
✅ Pushed successfully.

Branch: main
Commit: a1b2c3d feat: add product image upload
```

### Blocked

```text
⚠️ Push stopped.

Reason: `.env` contains potentially sensitive configuration and is not ignored.
```

### Failure

```text
❌ Push failed.

Reason: GitHub rejected the push because the remote branch contains changes not present locally.
```

Only provide additional details when necessary or requested.
