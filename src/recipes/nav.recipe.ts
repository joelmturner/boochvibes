import { sva } from 'styled-system/css'
 
export const nav = sva({
  slots: ['menu', 'subMenu', 'item', 'trigger', 'check', 'dot', 'separator', 'rightSlot', 'icon', 'check', 'text'],
  base: {
    menu: { display: 'flex', flexDir: 'column', shadow: "lg", maxH: '300px', minW: '220px', rounded: "md", bg: "background", p: 1, lg: { h: "none" } },
    subMenu: { minW:'220px', shadow: 'md'  },
    item: { 
        minH: '24px',
        position: "relative", h: 6, rounded: "sm", pl: 6, pr: 1, color: "text", outlineStyle: "solid", outlineWidth: 0, alignItems: "center", fontSize: "sm",
        _hover: {
            bg: 'backgroundMuted'
        },
        '& [data-highlighted]': {
            bg: 'background',
            color: 'text'
        },
        '& [data-disabled]': {
            color: 'textMuted',
        }
    },
    trigger: {
        color: 'text', p: '2', bg: 'transparent', rounded: 'full',
        _hover: { bg: "backgroundMuted",  },
        '& [data-highlighted]': {
            outline: 'none',
            color: 'text',
            h: 9, w: 9, alignItems: "center", justifyContent: "center", rounded: "full", bg: "background", p: 0, fontSize: "sm", fontWeight: "medium"
        }
    },
    check: {
        pos: 'absolute', left: '2', top: '1/2', color: 'gray.500'
    },
    dot: {
        h: '4.75px', w: '4.75px', rounded: 'full', bg: 'gray.500'
    },
    separator: {
        h: '1px', w: '5px', bg: 'background'
    },
    rightSlot: {
        ml: 'auto',
        pl: '5'
    },
    icon: {
        h: '13px', w: '13px'
    },
    text: {
        pl: 6, fontSize: 'xs', color: 'text'
    }
  },
  variants: {
    size: {
        md: {}
    }
  },
  defaultVariants: {
    size: 'md'
  }
})