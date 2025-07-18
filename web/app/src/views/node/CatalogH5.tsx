'use client'

import docHeaderBgi from '@/assets/images/doc-header-bg.png'
import { NodeListItem } from "@/assets/type"
import { IconArrowDown, IconNav } from "@/components/icons"
import { StyledHeaderBgi } from "@/components/StyledHTML"
import { convertToTree } from '@/utils/drag'
import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import CatalogFolder from './CatalogFolder'

const CatalogH5 = ({
  activeId,
  nodes,
  onChange,
}: {
  activeId: string
  nodes: NodeListItem[]
  onChange: (id: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const tree = convertToTree(nodes)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onCatalogClick = (id: string) => {
    onChange(id)
    setOpen(false)
  }


  return <Box sx={{
    position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  }}>
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '76px',
      overflow: 'hidden',
    }}>
      <StyledHeaderBgi
        bgi={docHeaderBgi.src}
        sx={{
          position: 'absolute',
          backgroundSize: 'cover',
          zIndex: 1,
          mt: '-60px',
        }}
      />
    </Box>
    <Stack direction='row' alignItems='center' justifyContent='space-between'
      sx={{
        py: 3,
        mx: 3,
        position: 'relative',
        zIndex: 2,
        boxSizing: 'border-box',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      onClick={() => setOpen(!open)}>
      <Stack direction='row' alignItems='center' gap={1}>
        <IconNav sx={{ fontSize: 18 }} />
        <Box sx={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'text.primary',
        }}>目录</Box>
      </Stack>
      <IconArrowDown sx={{
        fontSize: 24,
        transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
      }} />
    </Stack>
    <Box sx={{
      px: 3,
      height: open ? 'calc(100vh - 137px)' : '0px',
      transition: 'height 0.3s ease-in-out',
      bgcolor: 'background.default',
      overflowY: 'auto',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    }}>
      <Box sx={{ py: 3 }}>
        {tree.map((item) => <CatalogFolder key={item.id} item={item} activeId={activeId} onChange={onCatalogClick} />)}
      </Box>
    </Box>
  </Box>
}

export default CatalogH5