# ddc-gitmoji
gitmoji source for ddc.vim
## Required
### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
" Use gitmoji source
call ddc#custom#patch_global('sources', ['gitmoji'])

" Add matching pattern
call ddc#custom#patch_global('keywordPattern', '[a-zA-Z_:]\w*')

" Change source options
call ddc#custom#patch_global('sourceOptions', {
  \ 'gitmoji': {
  \	'mark': 'gitmoji',
  \	'matchers': ['gitmoji'],
  \	'sorters': [],
  \	},
  \  })

" Change source params
call ddc#custom#patch_global('sourceParams', {
  \ 'gitmoji': {
  \	'altCodes': {
  \      ':bug:': ':fix:',
  \      ':fire:': ':remove:'
  \      },
  \    },
  \  })
```

## Screenshots
