import { sva } from 'styled-system/css'
 
export const nav = sva({
  slots: ['menu', 'subMenu', 'item', 'trigger', 'check', 'dot', 'separator', 'rightSlot', 'icon', 'check', 'text'],
  base: {
    menu: { display: 'flex', flexDir: 'column', shadow: "lg", maxH: '300px', minW: '220px', rounded: "md", bg: "white", p: 1, lg: { h: "none" } },
    subMenu: { minW:'220px', shadow: 'md'  },
    item: { 
        minH: '24px',
        position: "relative", h: 6, rounded: "sm", pl: 6, pr: 1, color: "gray.900", outlineStyle: "solid", outlineWidth: 0, alignItems: "center", fontSize: "sm",
        _hover: {
            bg: 'gray.100'
        },
        '& [data-highlighted]': {
            bg: 'gray.200',
            color: 'gray.900'
        },
        '& [data-disabled]': {
            color: 'gray.300'
        }
    },
    trigger: {
        color: 'gray.900', p: '2', bg: 'transparent', rounded: 'full',
        _hover: { bg: "gray.100",  },
        '& [data-highlighted]': {
            outline: 'none',
            color: 'gray.900',
            h: 9, w: 9, alignItems: "center", justifyContent: "center", rounded: "full", bg: "white", p: 0, fontSize: "sm", fontWeight: "medium"
        }
    },
    check: {
        pos: 'absolute', left: '2', top: '1/2', color: 'gray.500'
    },
    dot: {
        h: '4.75px', w: '4.75px', rounded: 'full', bg: 'gray.500'
    },
    separator: {
        h: '1px', w: '5px', bg: 'gray.200'
    },
    rightSlot: {
        ml: 'auto',
        pl: '5'
    },
    icon: {
        h: '13px', w: '13px'
    },
    text: {
        pl: 6, fontSize: 'xs', color: 'gray.600'
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