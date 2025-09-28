# update.ps1 - Script de atualização automática do Pandabot (PowerShell)
# Autor: Dev Gui
# Versão: 1.0.0

$ErrorActionPreference = "Stop"

function Print-Color {
    param([string]$Color, [string]$Message)
    Write-Host $Message -ForegroundColor $Color
}

function Ask-YesNo($Question) {
    while ($true) {
        $response = Read-Host "$Question (s/n)"
        if ($response -match '^[SsYy]') { return $true }
        elseif ($response -match '^[Nn]') { return $false }
        else { Write-Host "Por favor, responda s (sim) ou n (não)." -ForegroundColor Yellow }
    }
}

function Check-GitRepo {
    if (-not (Test-Path ".git")) {
        Print-Color Red "❌ Este diretório não é um repositório Git!"
        Exit 1
    }
}

function Check-PackageJson {
    if (-not (Test-Path "package.json")) {
        Print-Color Red "❌ Arquivo package.json não encontrado!"
        Exit 1
    }
}

function Get-Version {
    param([string]$Path)
    if (Test-Path $Path) {
        $json = Get-Content $Path -Raw | ConvertFrom-Json
        return $json.version
    } else {
        return "não encontrada"
    }
}

function Create-Backup {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupDir = "backup_$timestamp"
    New-Item -ItemType Directory -Path $backupDir | Out-Null

    git status --porcelain | ForEach-Object {
        $line = $_
        $status = $line.Substring(0,2).Trim()
        $file = $line.Substring(3)
        if ($status -match "M") {
            $dest = Join-Path $backupDir $file
            $folder = Split-Path $dest
            if (-not (Test-Path $folder)) {
                New-Item -ItemType Directory -Path $folder -Force | Out-Null
            }
            Copy-Item $file $dest -Force
            Print-Color Green "  ✅ Backup criado para: $file"
        }
    }

    Set-Content ".update_backup_info" "backup_dir=$backupDir"
    Print-Color Green "✅ Backup completo!"
}

function Show-Differences {
    git fetch origin | Out-Null

    $currentBranch = (git branch --show-current).Trim()
    $remoteBranch = "origin/$currentBranch"

    if (-not (git show-ref --verify --quiet "refs/remotes/$remoteBranch")) {
        if (git show-ref --verify --quiet "refs/remotes/origin/main") {
            $remoteBranch = "origin/main"
        } elseif (git show-ref --verify --quiet "refs/remotes/origin/master") {
            $remoteBranch = "origin/master"
        } else {
            Print-Color Red "❌ Não foi possível encontrar uma branch remota válida!"
            Exit 1
        }
    }

    Add-Content ".update_backup_info" "remote_branch=$remoteBranch"

    $newFiles = git diff --name-only HEAD..$remoteBranch --diff-filter=A
    if ($newFiles) {
        Print-Color Green "📁 Arquivos NOVOS que serão baixados:"
        $newFiles | ForEach-Object { Print-Color Green "  + $_" }
    }

    $deletedFiles = git diff --name-only HEAD..$remoteBranch --diff-filter=D
    if ($deletedFiles) {
        Print-Color Red "`n🗑️ Arquivos REMOVIDOS no repositório oficial:"
        $deletedFiles | ForEach-Object { Print-Color Red "  - $_" }

        if (Ask-YesNo "Deseja deletar estes arquivos localmente também?") {
            Add-Content ".update_backup_info" "delete_files=yes"
        } else {
            Add-Content ".update_backup_info" "delete_files=no"
        }
    }

    $modifiedFiles = git diff --name-only HEAD..$remoteBranch --diff-filter=M
    if ($modifiedFiles) {
        Print-Color Yellow "`n✏️ Arquivos MODIFICADOS:"
        $modifiedFiles | ForEach-Object { Print-Color Yellow "  ~ $_" }
    }
}

function Apply-Updates {
    . .\.update_backup_info

    git config merge.ours.driver true
    git config pull.rebase false

    Print-Color Yellow "`n🔧 Tentando aplicar atualizações automáticas..."

    try {
        git merge -X ort $remote_branch --no-commit --no-ff | Out-Null

        if ($delete_files -eq "yes") {
            git diff --name-only HEAD..$remote_branch --diff-filter=D | ForEach-Object {
                if (Test-Path $_) {
                    Remove-Item $_ -Force
                    git add $_
                    Print-Color Green "  🗑️ Arquivo deletado: $_"
                }
            }
        }

        git commit -m "🤖 Atualização automática via update.ps1" | Out-Null
        Print-Color Green "✅ Merge automático realizado com sucesso!"
    } catch {
        Print-Color Red "❌ Merge automático falhou!"

        Print-Color Yellow "⚠️ Arquivos com conflito:"
        $conflicts = git diff --name-only --diff-filter=U
        $conflicts | ForEach-Object { Print-Color Red "  ⚠️ $_" }

        $choice = Read-Host "1) Aceitar tudo remoto | 2) Manter local | 3) Cancelar"
        switch ($choice) {
            "1" {
                git reset --hard $remote_branch
                Print-Color Green "✅ Atualizado com base no remoto."
            }
            "2" {
                Print-Color Cyan "ℹ️ Atualização cancelada. Suas alterações locais foram mantidas."
            }
            default {
                Print-Color Yellow "🔧 Resolva os conflitos manualmente com: git merge $remote_branch"
            }
        }
    }
}

function Cleanup {
    Remove-Item -Path ".update_backup_info" -ErrorAction SilentlyContinue
}

function Main {
    Print-Color Cyan "==================================="
    Print-Color Cyan "🤖 SCRIPT DE ATUALIZAÇÃO PANDABOT"
    Print-Color Cyan "==================================="

    Check-GitRepo
    Check-PackageJson

    $localVersion = Get-Version "package.json"

    git fetch origin | Out-Null
    $remoteBranch = "origin/$(git branch --show-current)"
    if (git show $remoteBranch:package.json > $null 2>&1) {
        git show $remoteBranch:package.json > "$env:TEMP\remote_package.json"
        $remoteVersion = Get-Version "$env:TEMP\remote_package.json"
        Remove-Item "$env:TEMP\remote_package.json"
    } else {
        $remoteVersion = "não encontrada"
    }

    Print-Color Cyan "`n📦 Sua versão: $localVersion"
    Print-Color Cyan "🌐 Versão oficial: $remoteVersion`n"

    if (-not (git diff-index --quiet HEAD --)) {
        Print-Color Yellow "⚠️ Você tem alterações locais!"
        if (Ask-YesNo "Deseja criar um backup antes?") {
            Create-Backup
        }
    }

    if (git diff --quiet HEAD $remoteBranch 2>$null) {
        Print-Color Green "✅ Seu bot já está atualizado!"
        Cleanup
        Exit 0
    }

    Show-Differences

    if (Ask-YesNo "🚀 Deseja aplicar as atualizações agora?") {
        Apply-Updates
    } else {
        Print-Color Cyan "ℹ️ Atualização cancelada pelo usuário."
    }

    Cleanup
    Print-Color Cyan "`n🏁 Script finalizado!"
}

Main
