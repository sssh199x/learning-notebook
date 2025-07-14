#!/bin/bash
# create-folders.sh - Script to create the learning-notebook-app folder structure

echo "Creating folder structure for learning-notebook-app..."

# Navigate to src/app directory (assuming you're in the project root)
cd src/app

# Create core module structure
mkdir -p core/guards
mkdir -p core/interceptors
mkdir -p core/models
mkdir -p core/services/storage
mkdir -p core/services/sync
mkdir -p core/services/search
mkdir -p core/services/ai
mkdir -p core/utils

# Create shared module structure
mkdir -p shared/components/ui/button
mkdir -p shared/components/ui/card
mkdir -p shared/components/ui/modal
mkdir -p shared/components/ui/toast
mkdir -p shared/components/ui/dropdown
mkdir -p shared/components/ui/tooltip
mkdir -p shared/components/ui/badge
mkdir -p shared/components/ui/avatar
mkdir -p shared/components/ui/input
mkdir -p shared/components/ui/textarea
mkdir -p shared/components/ui/checkbox
mkdir -p shared/components/ui/toggle
mkdir -p shared/components/ui/loader
mkdir -p shared/components/ui/virtual-scroll

mkdir -p shared/components/form/tag-selector
mkdir -p shared/components/form/link-selector
mkdir -p shared/components/form/date-picker
mkdir -p shared/components/form/search-input

mkdir -p shared/components/media/media-uploader
mkdir -p shared/components/media/image-viewer
mkdir -p shared/components/media/file-preview

mkdir -p shared/components/layout/split-pane
mkdir -p shared/components/layout/resizable-panel

mkdir -p shared/directives
mkdir -p shared/pipes
mkdir -p shared/validators

# Create layout module structure
mkdir -p layout/header
mkdir -p layout/sidebar/components/notebook-tree
mkdir -p layout/sidebar/components/recent-notes
mkdir -p layout/sidebar/components/tags-panel
mkdir -p layout/sidebar/components/search-panel
mkdir -p layout/main-content
mkdir -p layout/footer

# Create feature modules structure
mkdir -p features/notes/components/note-list
mkdir -p features/notes/components/note-card
mkdir -p features/notes/components/note-viewer
mkdir -p features/notes/components/note-metadata
mkdir -p features/notes/components/note-stats
mkdir -p features/notes/pages/notes-dashboard
mkdir -p features/notes/pages/note-detail
mkdir -p features/notes/services

# Create editor feature structure
mkdir -p features/editor/components/block-editor
mkdir -p features/editor/components/block-wrapper
mkdir -p features/editor/components/blocks/text-block
mkdir -p features/editor/components/blocks/heading-block
mkdir -p features/editor/components/blocks/list-block
mkdir -p features/editor/components/blocks/code-block
mkdir -p features/editor/components/blocks/image-block
mkdir -p features/editor/components/blocks/table-block
mkdir -p features/editor/components/blocks/math-block
mkdir -p features/editor/components/blocks/quote-block
mkdir -p features/editor/components/blocks/callout-block
mkdir -p features/editor/components/blocks/toggle-block
mkdir -p features/editor/components/blocks/divider-block

mkdir -p features/editor/components/toolbar/floating-toolbar
mkdir -p features/editor/components/toolbar/block-toolbar
mkdir -p features/editor/components/toolbar/format-toolbar

mkdir -p features/editor/components/menus/slash-menu
mkdir -p features/editor/components/menus/context-menu
mkdir -p features/editor/components/menus/block-selector
mkdir -p features/editor/components/menus/emoji-picker

mkdir -p features/editor/components/panels/outline-panel
mkdir -p features/editor/components/panels/links-panel
mkdir -p features/editor/components/panels/comments-panel

mkdir -p features/editor/services
mkdir -p features/editor/directives
mkdir -p features/editor/utils

# Create search feature structure
mkdir -p features/search/components/search-bar
mkdir -p features/search/components/search-results
mkdir -p features/search/components/search-filters
mkdir -p features/search/components/advanced-search
mkdir -p features/search/components/saved-searches
mkdir -p features/search/services

# Create sync feature structure
mkdir -p features/sync/components/sync-status
mkdir -p features/sync/components/conflict-resolver
mkdir -p features/sync/components/offline-banner
mkdir -p features/sync/components/sync-settings
mkdir -p features/sync/services

# Create notebooks feature structure
mkdir -p features/notebooks/components/notebook-list
mkdir -p features/notebooks/components/notebook-tree
mkdir -p features/notebooks/components/section-manager
mkdir -p features/notebooks/components/notebook-settings
mkdir -p features/notebooks/services

# Create settings feature structure
mkdir -p features/settings/components/user-preferences
mkdir -p features/settings/components/editor-settings
mkdir -p features/settings/components/theme-selector
mkdir -p features/settings/components/export-import
mkdir -p features/settings/components/account-settings
mkdir -p features/settings/services

# Create state management structure (optional)
mkdir -p state/actions
mkdir -p state/effects
mkdir -p state/reducers
mkdir -p state/selectors

# Go back to src directory
cd ..

# Create assets structure
mkdir -p assets/icons/lucide
mkdir -p assets/icons/custom
mkdir -p assets/icons/favicon
mkdir -p assets/images/placeholders
mkdir -p assets/images/backgrounds
mkdir -p assets/images/logos
mkdir -p assets/images/illustrations
mkdir -p assets/fonts/inter
mkdir -p assets/fonts/jetbrains-mono
mkdir -p assets/fonts/custom
mkdir -p assets/data/templates
mkdir -p assets/data/samples
mkdir -p assets/data/schemas
mkdir -p assets/i18n

# Create styles structure
mkdir -p styles/components
mkdir -p styles/utilities
mkdir -p styles/themes
mkdir -p styles/vendor

# Create environments structure (if not already exists)
mkdir -p environments

# Go back to project root
cd ..

# Create docs structure
mkdir -p docs/architecture
mkdir -p docs/development
mkdir -p docs/deployment

# Create scripts directory
mkdir -p scripts

# Create GitHub workflows
mkdir -p .github/workflows

echo "✅ Folder structure created successfully!"
echo ""
echo "📁 Created the following main directories:"
echo "   - src/app/core (models, services, guards, interceptors)"
echo "   - src/app/shared (reusable components, directives, pipes)"
echo "   - src/app/layout (app shell components)"
echo "   - src/app/features (feature modules: notes, editor, search, etc.)"
echo "   - src/app/state (NgRx store - optional)"
echo "   - src/assets (static files, icons, fonts)"
echo "   - src/styles (Tailwind CSS structure)"
echo "   - docs (documentation)"
echo "   - scripts (build scripts)"
echo "   - .github/workflows (CI/CD)"
echo ""
echo "🚀 Ready to start coding! Which file would you like to create first?"